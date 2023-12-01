import { prisma } from "@/lib/db";


export async function GET(req: Request, { params }: { params: { id: number}}) {
    const dashboard = await prisma.book.findMany({
        where: {
            createdById: params.id.toString()
        },
        include: {
            createdBy: {
                select: {
                    email: true,
                    name: true
                }
            }
        }
    });

    return new Response(JSON.stringify(dashboard))
}