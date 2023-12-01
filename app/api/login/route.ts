import { prisma } from "@/lib/db";
import * as bcrypt from"bcrypt";
import { NextResponse } from "next/server";

interface RequestBody {
    email: string;
    password: string;
}

interface LoginResponse {
    id: string;
    name: string;
    email: string;
}

export async function POST(req: Request){
    const body = (await req.json()) as RequestBody;

    const user = await prisma.user?.findUnique({
        where: {
            email: body.email
        }
    })
    if(!user){
        return NextResponse.json(
            { error: "Coś tu się nie zgadza"},
            { status: 422}
        )
    }


    if(user && user.password) {
        const passwordMatch = await bcrypt.compare(body.password, user.password)
        if(!passwordMatch){
            return NextResponse.json(
                { error: "Coś tu się nie zgadza"},
                { status: 422}
            )
        }
        const { password, ...userWithoutPassword } = user;
        return NextResponse.json(userWithoutPassword)
    } else {
        return NextResponse.json({
            error: "Coś poszło nie tak"
        })
    }
}