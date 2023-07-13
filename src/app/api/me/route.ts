import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({
            _id: userId
        }).select("-password");

        if (!user) return NextResponse.json({
            error: "User not found",
            success: false
        }, { status: 404 })

        return NextResponse.json({
            message: 'User found',
            data: user,
            success: true
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {
                status: 500
            })
    }
}