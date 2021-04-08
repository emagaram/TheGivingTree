import React, { FormEvent, useState } from "react"
import { useAuth } from "../contexts/AuthContext"


export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);


    const [error, setError] = useState('');
    const { signup }: any = useAuth();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {

        event.preventDefault();
        if (password !== confirmPassword) {
            return setError('Passwords do not match')
        }
        try {
            setError('');
            setLoading(true)
            await signup(email, password);
        }
        catch {
            setError('Failed to create account')
        }
        setLoading(false)

        console.log(event);
    }

    return (
        <div className="container">
            {error && <h1>{error}</h1>}
            <form onSubmit={handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Sign-Up</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={(e) => {
                        setEmail(e.target.value)
                        console.log(e.target.value + " " + password);
                    }} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={(e) => {
                        setPassword(e.target.value);
                        console.log(email + " " + e.target.value);
                    }} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" id="password" onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        console.log(email + " " + e.target.value);
                    }} />
                </div>
                <div className="input-field">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" onChange={(e) => {
                        setFirstName(e.target.value)
                        console.log(e.target.value + " " + password);
                    }} />
                </div>
                <div className="input-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" onChange={(e) => {
                        setLastName(e.target.value)
                        console.log(e.target.value + " " + password);
                    }} />
                </div>

                <div className="input-field">
                    <button disabled={loading} className="btn pink lighten-1 z-depth-0">Sign Up</button>
                </div>
            </form>

        </div>
    )
}


