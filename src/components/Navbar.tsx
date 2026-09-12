import { Link, Outlet } from "react-router-dom";
function Navbar(){
    return (
        <>
            <nav>
                <Link to="/">Login</Link> 
                <Link to="/home">Dashboard</Link> 
                <Link to="/list">List</Link>
            </nav>
            <Outlet />
        </>
    );
}
export default Navbar; 