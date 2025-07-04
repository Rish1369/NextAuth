import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest , NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDB();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {username , email , password} = reqBody;

        console.log(reqBody);
        const user = await User.findOne({email});
        if(user) return NextResponse.json({error: "user already exist"} , {status:400});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })
        const savedUser = await newUser.save();
        //send verification email
        await sendEmail({email , emailType: 'verifyEmail' ,  userId : savedUser._id});
        return NextResponse.json({message: "user created successfully" , user:savedUser} , {status:201});
    }
    catch(error:any){
        return NextResponse.json({error : error.message});
    }
}
