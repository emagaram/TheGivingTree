import React, { FormEvent, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"



export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login }: any = useAuth();
    const history = useHistory();
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            setError('');
            setLoading(true)
            await login(email, password);
            history.push("/")
        }
        catch {
            setError('Failed to sign in')
        }
        setLoading(false)

        console.log(email + password);
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Sign-In</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={(e) => {
                        setEmail(e.target.value)
                        console.log("email: " + e.target.value);
                    }} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={(e) => {
                        setPassword(e.target.value);
                        console.log("password: " + e.target.value);
                    }} />
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Login</button>
                </div>
            </form>
            <div>
                <Link to="/forgot-password">Forgot Password?</Link>
            </div>
        </div>
    )
}
