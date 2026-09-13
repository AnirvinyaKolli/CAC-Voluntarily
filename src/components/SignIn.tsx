import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

function SignIn(){

    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email + password)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            nav('/home')
        }catch (err){
            console.log("OH NO!")
            console.log(err);
        }
    }

    const handleEChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    
    const handlePChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    return (
        <>
            <h1> HI</h1>
            <form onSubmit={handleSubmit}>
                <label > Enter email: </label>
                <input type="text" onChange={handleEChange} />
                <label > Enter password: </label>
                <input type="password" onChange={handlePChange} />
                <input type="submit" />
            </form>
        </>
    );
    
}

export default SignIn; 
