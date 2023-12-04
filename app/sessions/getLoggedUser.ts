import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";


export async function getSession() {
    return await getServerSession(authOptions)
}

export default async function getLoggedUser() {
    try {
        const session = await getSession()

        if (!session?.user?.email) {
            return null
        }

        const loggedUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            },
        })

        if (!loggedUser) {
            return null
        }

        return {
            ...loggedUser
        }
    } catch (error: unknown) {
        return null
    }
}
