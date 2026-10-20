import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserDataContext";
import { profilePictures } from "../assets/ProfilePictures";

//Change the html stuff for proper styling later. i.e. proper dropdowns what not
function AccountManager() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { userData } = useUserData();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSignOut = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div className="relative flex items-stretch">
      <button
        onClick={handleClick}
        className="flex items-center px-12 py-5 font-normal text-[#ffffe3] transition-colors duration-200 hover:bg-[#020079]"
      >
        <img
          src={userData?.pfpChoice ? profilePictures[userData.pfpChoice] : profilePictures[0]}
          alt="Profile"
          className="mr-2 h-8 w-8 rounded-full"
        />
        {userData?.displayName}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-10 w-full min-w-full bg-[#0006b1] shadow-md">
          <button
            onClick={handleSignOut}
            className="flex h-full w-full items-center justify-center px-4 py-5 text-center text-[#ffffe3] transition-colors duration-200 hover:bg-[#0021f3]"
          >
            Sign out?
          </button>
        </div>
      )}
    </div>
  );
}
export default AccountManager;
