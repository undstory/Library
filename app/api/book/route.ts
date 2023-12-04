import getLoggedUser from "@/app/sessions/getLoggedUser";
import { prisma } from "@/lib/db";
import { now } from "next-auth/client/_utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    if(!body){
        return NextResponse.json({
            error: 'Invalid data'
        })
    }
    const loggedUser = await getLoggedUser();
    const { dateOfStart, dateOfEnd} = body
    console.log(loggedUser);
    console.log(body)

    const newBook = await prisma.book.create({
        data: {
            ...body,
            dateOfEnd: dateOfEnd !== '' ? new Date(dateOfEnd).toISOString() : undefined,
            dateOfStart: dateOfStart !== '' ? new Date(dateOfStart).toISOString() : undefined,
            userId: loggedUser?.id
        }
    })
    return NextResponse.json(newBook)
}