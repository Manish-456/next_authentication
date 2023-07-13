import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { confirmPassword, password, token } = reqBody;

        if (confirmPassword !== password) {
            return NextResponse.json({
                error: "Password doesnot match",
                success: false
            }, {
                    status: 400
                })
        }

        if(!password){
            return NextResponse.json({
                error : "Password is required",
                success : false
            }, {status : 400})
        }
        if(!token){
            return NextResponse.json({
                error : "Token is required",
                success : false
            }, {status : 400})
        }

        
        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry : {
                $gt : Date.now()
            }
        });
        
        if(!user) return NextResponse.json({
            error : "Invalid token",
            success : false
        }, {
            status : 400
        })
        
        const salt = await bcryptjs.genSalt(10);
        const newPassword = await bcryptjs.hash(password, salt);

        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        user.password = newPassword;

        await user.save();
        return NextResponse.json({
            message : "Password updated successfully",
            success : true
        });

    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            success : false
        })
    }
}