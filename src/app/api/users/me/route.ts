import {getDataFromToken} from "@/helpers/tokeData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {connectDB} from "@/dbConfig/dbConfig";


connectDB();

export async function GET(request: NextRequest) {
    try{
        const userId = getDataFromToken(request);
        const user = await User.findOne({_id:userId}).select("-password");
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 404});
        }
        return NextResponse.json({message: " user found" , data : user});
    }catch(error:any){
        return NextResponse.json({error: error.message}, {status: 500});
    }
}