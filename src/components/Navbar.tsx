// Size the account manager button properly so that the things in the drop down don't get squished

import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AccountManager from "./AccountManger";

function Navbar() {
  const { user } = useAuth();

  return (
    <div>
      <nav className="sticky top-0 z-50 grid grid-cols-[1fr_auto_1fr] items-stretch bg-[#15133d] font-bold text-white shadow-sm">
        <div aria-hidden="true" />
        <div className="flex items-stretch justify-center">
          <Link
            to="/home"
            className="flex items-center justify-center px-5 py-5 text-sm font-medium text-white/75 transition-colors duration-200 hover:text-white sm:px-7"
          >
            Dashboard
          </Link>
          <Link
            to="/list"
            className="flex items-center justify-center px-5 py-5 text-sm font-medium text-white/75 transition-colors duration-200 hover:text-white sm:px-7"
          >
            List
          </Link>
        </div>

        <div className="flex items-stretch justify-self-end">
          {user ? (
            <AccountManager />
          ) : (
            <Link
              to="/login"
              className="flex items-center justify-center px-6 py-5 text-sm font-medium text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white sm:px-10"
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
