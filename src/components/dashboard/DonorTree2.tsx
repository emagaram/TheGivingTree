import { useState, useEffect } from "react";
import { Graph } from "react-d3-graph";

import firebase from "../../config/firebase"

interface Donation {
    amount: number,
    charity: string,
    donor_id: string,
    memo?: string,
    parent_id: string
}

function useDonations() {
    const [donations, setDonations] = useState<Donation[]>([]);

    useEffect(() => {
        firebase.firestore().collection("Donations").
            onSnapshot((snapshot) => {
                const newDonations: Donation[] = snapshot.docs.map((doc) => ({
                    amount: doc.get('amount'),
                    charity: doc.get('charity'),
                    donor_id: doc.get('donor_id'),
                    memo: doc.get('memo'),
                    parent_id: doc.get('parent_id')
                }))
                setDonations(newDonations);
            })
    }, [])
    return donations;
}





// the graph configuration, just override the ones you need
const myConfig = {
    nodeHighlightBehavior: true,
    "highlightDegree": 0,
    //"staticGraph": true,
    "linkHighlightBehavior": false,
    node: {
        color: "lightgreen",
        size: 220,
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

export default function DonorTree2() {
    // graph payload (with minimalist structure)
    const data: { nodes: { id: string }[], links: { source: string, target: string }[] } = {
        nodes: useDonations().map((donation) => ({
            id: donation.donor_id,
            //amount: donation.amount
        })),
        links: useDonations().filter(donation => donation.parent_id !== "").map((donation) => ({
            source: donation.donor_id,
            target: donation.parent_id
        }))
        /*[
            { source: "Harry", target: "Sally" },
            { source: "Harry", target: "Alice" },
        ],*/
    };
    return <Graph
        id="graph-id" // id is mandatory
        data={data}
        config={myConfig}
        onClickNode={onClickNode}
        onClickLink={onClickLink}
    />;
}
