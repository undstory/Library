import getLoggedUser from "@/app/sessions/getLoggedUser";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const loggedUser = await getLoggedUser();
    const loggedUserId = loggedUser?.id;

    const books = await prisma.book.findMany({
        where: {
            userId: loggedUserId
        }
    })
    if(!books) {
        return NextResponse.json({
            error: "Nie znaleziono szukanych danych"
        })
    }

    return NextResponse.json(books)
}

