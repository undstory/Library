import { prisma } from "@/lib/db";
import * as bcrypt from"bcrypt"
import { NextResponse } from "next/server";

interface RequestBody {
    name: string;
    email: string;
    password: string
}

interface NewUserResponse {
    id: string;
    name: string;
    email: string;
}

type NewResponse = NextResponse<{ user?: NewUserResponse; error?: string}>;

export async function POST(req: Request): Promise<NewResponse>{
const body = (await req.json()) as RequestBody;

const oldUser = await prisma.user?.findUnique({
    where: {
        email: body.email
    }
    });
if(oldUser){
    return NextResponse.json(
        { error: "Istnieje już taki email w naszej bazie"},
        { status: 422}
    )
}

const user = await prisma.user.create({
    data: {
        name: body.name,
        email: body.email,
        password: await bcrypt.hash(body.password, 10)
    }
 });

return NextResponse.json({
    user: {
        id: user.id,
        email: user.email,
        name: user.name,
} })};