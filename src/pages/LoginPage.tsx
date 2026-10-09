import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import type { UserData } from "../UserData";
function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const handleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const user = (
          await createUserWithEmailAndPassword(auth, email, password)
        ).user;

        const nUser: UserData = {
          uid: user.uid,
          email: email,
          totalHours: 0,
          completedSignup: false,

          displayName: email,
          pfpChoice: 0,
          zip: "00000",
        };

        await setDoc(doc(db, "users", user.uid), nUser);
        nav("/completeProfile");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        nav("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[url(src/assets/background3.jpg)] bg-cover bg-center">
      <h1 className="mb-6 text-center text-5xl font-bold text-gray-900">
        {isSignUp ? "Sign Up:" : "Log in:"}
      </h1>
      <div className="w-full max-w-md bg-clear p-8 justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-sm font-medium text-gray-900">
            Enter email:
          </label>
          <input
            type="text"
            onChange={handleEChange}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-[#6d8196] focus:ring-1 focus:ring-[#6d8196]"
          />
          <label className="text-sm font-medium text-gray-900">
            Enter password:
          </label>
          <input
            type="password"
            onChange={handlePChange}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-[#6d8196] focus:ring-1 focus:ring-[#6d8196]"
          />
          <input
            type="submit"
            value={isSignUp ? "Sign Up" : "Log in"}
            className="rounded-full mt-2 cursor-pointer bg-[#6d8196] px-3 py-2 font-medium text-[#ffffe3] transition-colors hover:bg-[#8da1b6]"
          />
          <button
            type="button"
            onClick={handleSignUp}
            className="rounded-full inline-block bg-[#4a4a4a] px-3 py-2 text-[#ffffe3] transition-colors hover:bg-[#6a6a6a]"
          >
            {isSignUp ? "Have an account? log in" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
