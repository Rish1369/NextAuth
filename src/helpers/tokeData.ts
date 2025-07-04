import { NextRequest , NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export const getDataFromToken = (request: NextRequest) => {
    const token = request.cookies.get('token')?.value || '';
    try {
        const decodedToken:any = jwt.verify(token , process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error) {
        return null;
    }
}