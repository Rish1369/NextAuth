import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest , NextResponse } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request:NextResponse){
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);

         const user = await User.findOneAndUpdate({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt:  Date.now()} // greater than current time
         });
         if(!user){
            return NextResponse.json({error: "Invalid or expired token"}, {status: 400});
         } ;
         console.log("User found:", user); 
         user.forgotPasswordToken = undefined;
         user.forgotPasswordTokenExpiry = undefined;
         await user.save();
         return NextResponse.json({message: "Password reset successfully" , success:true});

        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
        
    }
}