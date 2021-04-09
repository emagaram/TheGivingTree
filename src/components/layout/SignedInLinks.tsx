import React from "react"
import { Link, NavLink, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const SignedInLinks = () => {
    const { logout, currentUser } = useAuth();
    const history = useHistory();
    async function handleSignout() {

        try {
            await logout()
            history.push("/")
        } catch {

        }
    }
    return (

        <>
            { currentUser &&
                <ul className="right">
                    <li><button onClick={handleSignout}>Log Out</button></li>
                    <li><NavLink to='/' className="btn btn-floating-pink lighten-1">Ezra</NavLink> </li>
                </ul >
            }

        </>
    )
}

export default SignedInLinks