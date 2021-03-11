import React from "react"
import { Link, NavLink } from "react-router-dom"

const SignedInLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to='/donate'>Donate</NavLink> </li>
            <li><NavLink to='/'>Log Out</NavLink> </li>
            <li><NavLink to='/' className="btn btn-floating-pink lighten-1">Ezra</NavLink> </li>
        </ul >
    )
}

export default SignedInLinks