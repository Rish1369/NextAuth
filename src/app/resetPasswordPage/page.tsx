"use client"
import axios from "axios";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { sendEmail } from "@/helpers/mailer";
import { send } from "process";

export default function resetPasswordPage(){
    const router = useRouter();
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const[email , setEmail] = React.useState("");
    const[userId , setUserId] = React.useState("");
    const [error, setError] = React.useState("");

    const resetPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
           const response = await axios.post("/api/users/resetPasswordEmail", {
                email,
                newPassword
            });
            toast.success(response.data.message || "Password reset successfully");
            router.push("/login");
        } catch (error: any) {
            console.error("Failed to reset password:", error);
            setError(error?.response?.data?.error || "Something went wrong");
        }
    }
    return(
        <div>
            <form action="">
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button onClick={resetPassword}>Reset Password</button>
            </form>
        </div>
    )
}