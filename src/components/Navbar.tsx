// Size the account manager button properly so that the things in the drop down don't get squished

import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AccountManager from "./AccountManger";

function Navbar() {
  const { user } = useAuth();

  return (
    <div>
      <nav className="flex items-stretch justify-between bg-[#05014a] font-bold text-white shadow-md">
        <div className="flex items-stretch">
          <Link
            to="/home"
            className="flex w-40 items-center justify-center px-4 py-5 transition-colors duration-200 hover:bg-[#020079]"
          >
            Dashboard
          </Link>
          <Link
            to="/list"
            className="flex w-40 items-center justify-center px-4 py-5 transition-colors duration-200 hover:bg-[#020079]"
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
              className="flex w-40 items-center justify-center px-10 py-8 transition-colors duration-200 hover:bg-[#020079]"
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
