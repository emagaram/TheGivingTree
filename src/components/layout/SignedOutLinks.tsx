import React from "react"
import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const SignedOutLinks = () => {
    const { currentUser } = useAuth();

    return (
        <>
            { !currentUser &&
                <ul className="right">
                    <li><NavLink to='/signup'>Sign up</NavLink> </li>
                    <li><NavLink to='/signin'>Log in</NavLink> </li>
                </ul >
            }
        </>

    )
}

export default SignedOutLinks