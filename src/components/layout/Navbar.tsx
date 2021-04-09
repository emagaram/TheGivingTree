import SignedInLinks from "./SignedInLinks"
import SignedOutLinks from "./SignedOutLinks"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Navbar = () => {


    let x: string = "hi";


    const { currentUser, logout } = useAuth()
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brandLogo">Giving Trees</Link>
                <div className="right">
                    <Link to='/donate'>Donate</Link>
                    <SignedInLinks></SignedInLinks>
                    <SignedOutLinks></SignedOutLinks>
                </div>

            </div>
        </nav>
    )
}

export default Navbar