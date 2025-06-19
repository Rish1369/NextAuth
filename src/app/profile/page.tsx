"use client";
import axios from "axios";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function userProfilePage({params}:any) {
  const router = useRouter();
  const logout = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try{
      const response = await axios.get("/api/users/logout");
      toast.success(response.data.message || "Logged out successfully");
      router.push("/login");
    }
    catch (error: any) {
      console.error("Logout failed:", error);
      toast.error(error?.response?.data?.error || "Something went wrong");
    }
  };
  return (
  
    <div>
      <h2>Logout</h2>
      <p>Click the button below to logout.</p>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300 cursor-pointer">
        Logout
      </button>
    </div>
  );
}