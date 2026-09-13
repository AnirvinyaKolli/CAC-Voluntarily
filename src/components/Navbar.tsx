import { Link, Outlet } from "react-router-dom";
import {useAuth} from "../context/AuthContext"
import AccountManager from "./AccountManger";
function Navbar(){
    const {user, } = useAuth(); 
    return (
        <>
            <nav>
                { user ? <AccountManager/>: <Link to="/login">Login</Link> }
                <Link to="/home">Dashboard</Link> 
                <Link to="/list">List</Link>
            </nav>

            <Outlet />
        </>
    );
}
export default Navbar; 