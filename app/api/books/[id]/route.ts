import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
export async function DELETE(req: Request, {params} : {params: {id: string}}) {
    try {
        const { id } = params;
        const deleteBook = await prisma.book.delete({
            where: {
                id: id
            }
        })

        return NextResponse.json({message: "Book has been deleted", deleteBook}, { status: 200})

    } catch (error) {
        return NextResponse.json({
            message: "DELETE error", error
        },
        {
            status: 500
        })
    }

}