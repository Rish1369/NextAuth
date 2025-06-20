import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email , emailType , userId} : any) =>{
    try{
        const hashedToken = await bcryptjs.hash(userId.toString() , 10);
        
        if(emailType === 'verifyEmail'){
            await User.findByIdAndUpdate(userId ,
            {
                verifyToken:hashedToken,
                verifyTokenExpiry: Date.now() + 24 * 60 * 60 * 1000 // 24 hours expiry              
            }
        );
        }
        else if(emailType === 'resetPassword'){
            await User.findByIdAndUpdate(userId ,
            {
                forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 24 * 60 * 60 * 1000 // 24 hours expiry          
            }
        );
        };
        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "e051b75b77f8ab",
            pass: "87acbe06f2aa95"
        }
        });
        const mailOptions = {
            from:"Rishabhrai5649@gmail.com",
            to:email,
            subject: emailType === 'verifyEmail' ? 'Verify Your Email' : 'Reset Your Password',
            html: `<p>Click the link below to ${emailType === 'verifyEmail' ? 'verify your email' : 'reset your password'}:</p>
                   <a href="${process.env.domain}/${emailType === 'verifyEmail' ? 'verifyemail' : 'resetpassword'}?token=${hashedToken}">Click here</a>`
        }
        const mailResponse = await transport.sendMail(mailOptions);
    }
    catch (error:any) {
        throw new Error(error.message);
    }
}