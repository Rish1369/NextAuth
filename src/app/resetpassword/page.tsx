"use client";
import axios from "axios";
import Link from "next/link";
import { useState , useEffect } from "react";
import {useRouter} from "next/navigation";
export default function resetPassword(){
    const [token , setToken] = useState("");
    const [success , setSuccess] = useState<boolean>(false);
    const [error , setError] = useState(false);
    const router = useRouter();
    const resetUserPassword = async() => {
        try {
            const response = await axios.post("/api/users/resetPassword", { token });
            setSuccess(true);
            console.log("Password changed successfully", response.data);
            router.push("/login");
        } catch (error:any) {
            setError(true);
            console.error("Error changing password", error);
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
            resetUserPassword();
        }
    }, [token])

    return(
        <div>
            <h1 className="text-2xl font-bold">Reset Password</h1>{success && <div className="text-green-500"> <p>Password changed successfully!</p><Link href="/login" className="text-green-500">login</Link></div>}

            <h2 className="text-red-500">{error && <p>Error changing password. Please try again.</p>}</h2>
        </div>
    )
}

