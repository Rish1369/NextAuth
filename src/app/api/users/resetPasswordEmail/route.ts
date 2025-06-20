import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {connectDB} from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, newPassword } = reqBody;

        console.log("Received reset password body:", reqBody);
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await User.findOne({ email });
        user.password = hashedPassword;
        await user.save();
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }
        user.password = hashedPassword;
        await user.save();
        await sendEmail({ email, emailType: 'resetPassword', userId: user._id });

        return NextResponse.json({ message: "Password reset successfully", success: true });
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}