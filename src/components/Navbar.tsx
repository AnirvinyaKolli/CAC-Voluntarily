// Size the account manager button properly so that the things in the drop down don't get squished

import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AccountManager from "./AccountManger";

function Navbar() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`min-h-screen ${sidebarOpen ? "md:pl-64" : "md:pl-0"}`}>
      <nav className={`sticky top-0 z-50 flex h-16 items-center justify-between bg-[#15133d] px-3 font-bold text-white shadow-sm transition-transform duration-200 md:fixed md:inset-y-0 md:left-0 md:h-screen md:w-64 md:flex-col md:items-stretch md:px-4 md:py-6 ${sidebarOpen ? "md:translate-x-0" : "md:-translate-x-full"}`}>
        <div className="hidden items-center justify-between px-4 pb-8 pt-2 text-xl font-semibold tracking-wide md:flex">
          <span>Voluntarily</span>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Hide sidebar"
            title="Hide sidebar"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl font-normal text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            ‹
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center gap-1 md:flex-none md:flex-col md:items-stretch md:gap-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${isActive ? "bg-white/10 text-white" : "text-white/70 hover:text-white"}`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/list"
            className={({ isActive }) => `rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${isActive ? "bg-white/10 text-white" : "text-white/70 hover:text-white"}`}
          >
            List
          </NavLink>
        </div>

        <div className="flex items-stretch md:mt-auto">
          {user ? (
            <AccountManager />
          ) : (
            <NavLink
              to="/login"
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white"
            >
              Sign in
            </NavLink>
          )}
        </div>
      </nav>

      {!sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Show sidebar"
          title="Show sidebar"
          className="fixed left-3 top-3 z-50 hidden rounded-lg bg-[#15133d] px-3 py-2 text-white shadow-sm transition hover:bg-[#24215c] md:block"
        >
          ☰
        </button>
      )}

      <div className="min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
export default Navbar;
