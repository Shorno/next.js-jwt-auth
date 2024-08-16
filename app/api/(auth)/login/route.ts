import {NextRequest, NextResponse} from "next/server";
import User from "@/models/User";
import {dbConnect} from "@/lib/db";
import bcrypt from "bcryptjs";
import {sign} from "jsonwebtoken";
import {cookies} from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export async function POST(request: NextRequest) {
    await dbConnect();

    const {email, password} = await request.json();

    if (!email || !password) {
        return new Response("Please provide all required fields", {status: 400});
    }

    const existingUser = await User.findOne({email});

    if (!existingUser) {
        return NextResponse.json("User not found", {status: 404});
    }

    const isValid = await bcrypt.compare(password, existingUser.password);

    if (!isValid) {
        return NextResponse.json("Invalid credentials", {status: 401});
    }

    const jwt_token = sign({id: existingUser._id}, JWT_SECRET!, {expiresIn: "1h"});

    cookies().set({
        name: "auth_token",
        value: jwt_token,
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60,
    })

    return NextResponse.json({message: "Login successfully"}, {
        status: 200,
        headers: {
            "Content-type": "application/json",
        }
    });

}