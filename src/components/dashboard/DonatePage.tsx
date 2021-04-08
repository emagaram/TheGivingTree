import React, { FormEvent, useState } from "react"
import firebase from "../../config/firebase";


type DonorProps = {
    donorNum: number
}

function DonatePage({ donorNum }: DonorProps) {
    const [charity, setCharity] = useState("");
    const [amount, setAmount] = useState(-1);
    const [referral, setReferall] = useState(0);
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(donorNum + "hello");


        //Date created and memo added
        firebase.firestore().collection("Donations").add({
            amount: amount,
            charity: charity,
            parent_id: referral,
            donor_id: donorNum
        });
        donorNum++;

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
