import React, { FormEvent, useEffect, useState } from "react"
import firebase from "../../config/firebase";

interface DonationRequest {
    amount: number
    charity: string
    memo?: string
    parent_id: number
    display_name: string
}

function DonatePage() {
    const [charity, setCharity] = useState("");
    const [amount, setAmount] = useState(-1);
    const [referral, setReferall] = useState(0);


    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        //Date created and memo added


        let data: DonationRequest = {
            amount: amount,
            charity: charity,
            parent_id: referral,
            display_name: ""
        }
        let addDonation = firebase.functions().httpsCallable('addDonation');
        addDonation((data))
            .then((result) => {
                // Read result of the Cloud Function.
                console.log(result.data);
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

/*
interface Donation {
amount: number,
charity: string,
donor_id: number,
memo?: string,
parent_id: number,
layer: number,
display_name: string
}

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
*/