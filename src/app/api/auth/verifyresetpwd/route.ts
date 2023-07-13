import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";

connect();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        if (!email) return NextResponse.json({
            error: "Email is required",
            success: false
        }, {
                status: 400
            })
        const user = await User.findOne({
            email
        })

        if (!user) return NextResponse.json({
            error: "Invalid email",
            success: false
        }, { status: 400 });

        await sendEmail({
            email,
            emailType: "RESET",
            userId: user._id
        });

        return NextResponse.json({
            message: "You should receive an email",
            success: true
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            success: false
        }, {
                status: 500
            })
    }
}