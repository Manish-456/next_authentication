import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: Request) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({
            email
        });


        if (!user) return new NextResponse(
            "Invalid credentials", {
                status: 400
            });

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!user.isVerified) return NextResponse.json({
            error: "Please verify your email first"
        },
            {
                status: 400
            })
        if (!validPassword) return NextResponse.json({
            error: "Invalid password"
        }, {
                status: 400
            })

        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }



        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
            expiresIn: '1d'
        });

        const response = NextResponse.json({
            message: "User Logged in successfully",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure : true
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            success: false
        })
    }
}