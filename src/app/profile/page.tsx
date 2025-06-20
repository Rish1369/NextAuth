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
  const [data, setData] = React.useState<any>(null);
  const getUser = async () =>{
    try{
      const response = await axios.get("/api/users/me");
      console.log("User data:"  , response.data);
      setData(response.data.data.email);
      
    }catch (error: any) {
      console.error("Failed to fetch user data:", error);
      toast.error(error?.response?.data?.error || "Something went wrong");
  }
}
const resetPassword = async() =>{
  try{
    router.push("/resetPasswordPage");
  }
  catch (error: any) {
    console.error("Failed to reset password:", error);
    toast.error(error?.response?.data?.error || "Something went wrong");
  }
};
  return (
  
    <div>
      <h2>Logout</h2>
      <p>Click the button below to logout.</p>
      <p>User ID: {data? data : "NULL"}</p>
      <button onClick={getUser} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 cursor-pointer">
        Get User Data
      </button>
      <button onClick={resetPassword} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors duration-300 cursor-pointer">
        Reset Password
      </button>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300 cursor-pointer">
        Logout
      </button>
    </div>
  );
}
