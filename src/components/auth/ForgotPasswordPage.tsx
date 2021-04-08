import React, { FormEvent, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { auth } from "../../config/firebase"



export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();

    function resetPassword(email: string) {
        return auth.sendPasswordResetEmail(email);
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {

        event.preventDefault();
        try {
            console.log("Working")
            setError('');
            setLoading(true)
            await resetPassword(email);
            setMessage("Check email inbox for further instructions")
        }
        catch {
            setError('Failed to reset password')
        }
        setLoading(false)

        console.log(event);
    }
    return (
        <div className="container">
            {error && <h1>{error}</h1>}
            {message && <h1>{message}</h1>}
            <form onSubmit={handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Forgot Password</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Submit</button>
                </div>
            </form>
        </div>
    )
}
