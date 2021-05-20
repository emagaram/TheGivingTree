import { useState, useEffect } from "react";
import { Graph } from "react-d3-graph";
import { sortedTree } from "./treespace"

import firebase from "../../../config/firebase"
interface Donation {
    amount: number,
    charity: string,
    donor_id: number,
    memo?: string,
    parent_id: number,
    layer: number,
    rightSibling: number | null,
    leftSibling: number | null,
    children: number[]
}

function DonationComparison(a: Donation, b: Donation): number {
    if (a.parent_id < b.parent_id) {
        return -1;
    }
    else if (a.parent_id > b.parent_id) {
        return 1;
    }
    else {
        return 0;
    }
}

interface ParentPlacer {
    id: number,
    childAverage: number
}
function useDonations() {
    const [donations, setDonations] = useState<Donation[]>([]);

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection("Donations").
            onSnapshot((snapshot) => {
                const newDonations: Donation[] = snapshot.docs.map((doc) => ({
                    amount: doc.get('amount'),
                    charity: doc.get('charity'),
                    donor_id: doc.get('donor_id'),
                    memo: doc.get('memo'),
                    parent_id: doc.get('parent_id'), //Set by Cloud function, user gives referral code
                    layer: doc.get('layer'), //Set by Cloud function
                    rightSibling: null,
                    leftSibling: null,
                    children: []
                }))


                setDonations(newDonations);
            })
        return () => unsubscribe();
    }, [])

    return donations;
}



let size: number = 520;
let height: number = 700;
let width: number = 700;
// the graph configuration, just override the ones you need
const myConfig = {
    nodeHighlightBehavior: true,
    "highlightDegree": 0,
    //"staticGraph": true,
    height: height,
    width: width,
    linkHighlightBehavior: false,
    staticGraphWithDragAndDrop: true,
    node: {
        color: "lightgreen",
        size: size,
        highlightStrokeColor: "blue",
        "svg": "https://mario.nintendo.com/static/fd723b2893d4d2b39ef71bfdb4e3329c/579b4/mario-background.png",
        "symbolType": "circle"
    },
    link: {
        highlightColor: "lightblue",
    },
};

const onClickNode = function (nodeId: string) {
    window.alert(`Clicked node ${nodeId}`);
};

const onClickLink = function (source: string, target: string) {
    window.alert(`Clicked link between ${source} and ${target}`);
};

export default function DonorTree() {
    let donations = useDonations();
    //console.log(donations);
    function findDonation(id: number): any {
        for (let i = 0; i < donations.length; i++) {
            if (donations[i].donor_id === id) {
                return donations[i];
            }
        }
        return null;
    }
    let numOfLayers = 0;
    for (let i = 0; i < donations.length; i++) {
        if (donations[i].layer > numOfLayers) {
            numOfLayers = donations[i].layer;
        }

        //assign children
        if (donations[i].donor_id !== donations[i].parent_id) {
            let d: Donation = findDonation(donations[i].parent_id)
            if (!d.children.find(d => d === donations[i].donor_id)) {
                d.children.push(donations[i].donor_id);
            }
        }
    }

    let itemsInLayer: Donation[][] = new Array(numOfLayers);
    let numItemsInLayer: number[] = new Array(numOfLayers);


    for (let layer = 0; layer < numOfLayers; layer++) {

        let count = 0;
        for (let j = 0; j < donations.length; j++) {
            if (donations[j] != null && donations[j].layer === layer + 1) {
                count++;
            }
        }
        numItemsInLayer[layer] = count;
    }



    for (let i = 0; i < numOfLayers; i++) {
        let count: number = 0;
        itemsInLayer[i] = new Array(numItemsInLayer[i]);
        for (let j = 0; j < donations.length; j++) {
            if (donations[j] != null && donations[j].layer === i + 1) {
                itemsInLayer[i][count] = donations[j];
                count++;
                //Could break out if count === numItems in layer, all are found
            }
        }

        itemsInLayer[i] = itemsInLayer[i].sort(DonationComparison);
        for (let p = 0; p < itemsInLayer[i].length; p++) {
            if (p !== 0) {
                if (itemsInLayer[i][p - 1].parent_id === itemsInLayer[i][p - 1].parent_id) {
                    itemsInLayer[i][p].leftSibling = itemsInLayer[i][p - 1].donor_id;
                }
            }
            if (p < itemsInLayer[i].length - 1) {
                if (itemsInLayer[i][p].parent_id === itemsInLayer[i][p + 1].parent_id) {
                    itemsInLayer[i][p].rightSibling = itemsInLayer[i][p + 1].donor_id;
                }
            }
        }
    }

    //console.log(donations);

    let treeData = (donations.map((doc) => ({
        parent: [doc.parent_id],
        rightSibling: doc.rightSibling,
        child: doc.children,
        leftSibling: doc.leftSibling,
        ID: doc.donor_id,
    })));
    let foundIndex = treeData.findIndex(x => x.parent.includes(0) && x.ID === 0);
    if (treeData[foundIndex] != null && treeData[foundIndex].parent !== null) {
        treeData[foundIndex].parent.pop();
    }
    console.log(treeData)
    let s = JSON.stringify(treeData);
    let nodeArray: any[] = [];
    s = '{"Data":' + s + "}";
    console.log(s);
    if (s.length > 20) {
        //initialTest();
        nodeArray = sortedTree(s);
    }
    const data: { nodes: { id: string }[], links: { source: string, target: string }[] } = {
        nodes: nodeArray.map((donation) => ({
            id: donation.id.toString(),
            x: donation.x,
            y: donation.y
        })),
        links: donations.filter(donation => donation.donor_id !== 0).map((donation) => ({
            source: donation.donor_id.toString(),
            target: donation.parent_id.toString()
        }))
    };
    return <Graph
        id="graph-id" // id is mandatory
        data={data}
        config={myConfig}
        onClickNode={onClickNode}
        onClickLink={onClickLink}
    />;
}
