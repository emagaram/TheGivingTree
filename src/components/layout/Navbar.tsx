import SignedInLinks from "./SignedInLinks"
import SignedOutLinks from "./SignedOutLinks"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Navbar = () => {
    const { currentUser, logout } = useAuth()
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brandLogo">Giving Trees</Link>
                <SignedInLinks></SignedInLinks>
                <SignedOutLinks></SignedOutLinks>
            </div>
        </nav>
    )
}

export default Navbar