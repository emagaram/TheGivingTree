import React, { FormEvent, useEffect, useState } from "react"
import firebase from "../../config/firebase";

interface Donation {
    amount: number,
    charity: string,
    donor_id: number,
    memo?: string,
    parent_id: number,
    layer: number,
    display_name: string
}

function DonatePage() {
    const [charity, setCharity] = useState("");
    const [amount, setAmount] = useState(-1);
    const [referral, setReferall] = useState(0);
    let donations: Donation[] = useDonations();
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
                        parent_id: doc.get('parent_id'),
                        layer: doc.get('layer'),
                        display_name: doc.get('display_name')
                    }))
                    setDonations(newDonations);
                })
            return () => unsubscribe();
        }, [])
        return donations;
    }
    function findDonationLayer(id: number | undefined): number {
        for (let i = 0; i < donations.length; i++) {
            if (donations[i].donor_id === id) {
                return donations[i].layer;
            }
        }
        return 0;
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let docRef = firebase.firestore().collection("DonationsCount").doc("count");
        let count: number;

        await docRef.get().then((doc) => {
            if (doc.exists) {
                let data: any = doc.data();
                if (data.count !== null) {
                    count = data.count;
                }
                console.log("Found document data:", data);
            } else {
                docRef.set({
                    count: 0
                })
                console.log("No such document! Creating one");
            }
            //Date created and memo added
            firebase.firestore().collection("Donations").add({
                amount: amount,
                charity: charity,
                parent_id: referral,
                donor_id: count,
                layer: findDonationLayer(referral) + 1,
                display_name: ""
            });
            docRef.set({
                count: count + 1
            })

        }).catch((error) => {
            console.log("Error getting document:", error);
        });


    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Donate</h5>
                <div className="input-field">
                    <label htmlFor="charity">Charity</label>
                    <input type="text" id="charity" onChange={(e) => {
                        setCharity(e.target.value)
                        console.log(e.target.value);
                    }} />
                </div>
                <div className="input-field">
                    <label htmlFor="amount">Amount</label>
                    <input type="text" pattern="[0-9]*" id="amount" onChange={(e) => {
                        setAmount(parseInt(e.target.value, 10))
                        console.log(e.target.value);
                    }} />
                </div>
                <div className="input-field">
                    <label htmlFor="referall">Referall</label>
                    <input type="text" id="referall" onChange={(e) => {
                        setReferall(parseInt(e.target.value, 10))
                        console.log(e.target.value);
                    }} />
                </div>

                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Donate</button>
                </div>
            </form>

        </div>
    )
}

export default DonatePage
