import {NextRequest, NextResponse} from "next/server";
import {dbConnect} from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET(request: NextRequest, response: NextResponse) {
    return NextResponse.json({message: "Signup route"});
}



export async function POST(request: NextRequest, response: NextResponse) {
    const {name, username, email, password} = await request.json();

    if (!name || !username || !email || !password) {
        return NextResponse.json({error: "Please provide all required fields"}, {status: 400});
    }

    try {
        await dbConnect();

        const existingEmail = await User.findOne({email});
        const existingUsername = await User.findOne({username});


        if (existingEmail && existingUsername) {

            return NextResponse.json({error: "Email and Username already in use"}, {status: 409});
        }
        if (existingEmail) {
            return NextResponse.json({error: "Email already in use"}, {status: 409});

        }
        if (existingUsername) {
            return NextResponse.json({error: "Username already in use"}, {status: 409});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            name,
            username,
            email,
            password: hashedPassword,
        });

        await user.save();
        return NextResponse.json({message: "User registered successfully"});

    } catch (error: any) {
        return NextResponse.json({error: error.message});
    }
}