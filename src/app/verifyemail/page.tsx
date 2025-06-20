"use client";
import axios from "axios";
import Link from "next/link";
import { useState , useEffect } from "react";

export default function VerifyEmailPage(){
    const [token , setToken] = useState("");
    const [verified , setVerified] = useState<boolean>(false);
    const [error , setError] = useState(false);

    const verifyUserEmail = async() => {
        try {
            const response = await axios.post("/api/users/verifyEmail", { token });
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.error("Error verifying email:", error);
        }
    }

    useEffect(() => {
        const urlToken =  window.location.search.split("=")[1];
        if(urlToken && urlToken.length > 0){
            setToken(urlToken || "");
        }
    }, [])


    useEffect(() => {
        if(token.length>0){
            verifyUserEmail();
        }
    }, [token])

    return(
        <div>
            <h1 className="text-2xl font-bold">Email Verification</h1>{verified && <div className="text-green-500"> <p>Email verified successfully!</p><Link href="/login" className="text-green-500">login</Link></div>}

            <h2 className="text-red-500">{error && <p>Error verifying email. Please try again.</p>}</h2>
        </div>
    )
}

