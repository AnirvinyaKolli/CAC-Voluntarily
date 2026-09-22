import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AccountManager from "./AccountManger";

function Navbar() {
    const { user } = useAuth();

    return (
        <div>
            <nav className="flex items-stretch justify-between bg-[#4a4a4a] text-[#ffffe3] shadow-md">
                <div className="flex items-stretch">
                    <Link
                        to="/home"
                        className="flex w-40 items-center justify-center px-4 py-5 transition-colors duration-200 hover:bg-[#6d8196]"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/list"
                        className="flex w-40 items-center justify-center px-4 py-5 transition-colors duration-200 hover:bg-[#6d8196]"
                    >
                        List
                    </Link>
                </div>

                <div className="flex items-stretch">
                    {user ? (
                        <AccountManager />
                    ) : (
                        <Link
                            to="/login"
                            className="flex w-40 items-center justify-center px-4 py-5 transition-colors duration-200 hover:bg-[#6d8196]"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </nav>

            <Outlet />
        </div>
    );
}
export default Navbar;
