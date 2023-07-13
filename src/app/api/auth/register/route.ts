import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";


connect();

export async function POST(
    request: Request
) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        // Checking if the user already exists or not
        const user = await User.findOne({
            email
        });

        if (user) return NextResponse.json({
            error : "This email is already taken"
        }, { status: 429 });

        // Hashing the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();

        // send verification email
        await sendEmail({
            email, emailType: 'VERIFY', userId: savedUser._id
        })
        return NextResponse.json({
            message: "User created Successfully",
            savedUser
        }, { status: 201 })

    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
        }, { status: 500 })
    }
}