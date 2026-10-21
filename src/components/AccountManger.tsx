import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function AccountManager() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div className="flex min-w-0 items-center md:w-full">
      <button
        onClick={handleSignOut}
        className="rounded-lg px-3 py-2 text-xs font-medium text-white/70 transition-colors hover:text-white md:w-full md:px-3 md:text-left md:hover:bg-white/10"
      >
        Sign out
      </button>
    </div>
  );
}
export default AccountManager;
