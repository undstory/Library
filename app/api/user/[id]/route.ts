import { prisma } from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";
import { access } from "fs";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { id: number}}) {

    const accessToken = req.headers.get("authorization")

    if(!accessToken || !verifyJwt(accessToken)){

        return NextResponse.json(
            { error: "Nie masz dostępu do tej strony"},
            { status: 422}
        )
    }
    const dashboard = await prisma.book.findMany({
        where: {
            userId: params.id.toString()
        },
        include: {
            user: {
                select: {
                    email: true,
                    name: true
                }
            }
        }
    });

    return new Response(JSON.stringify(dashboard))
}