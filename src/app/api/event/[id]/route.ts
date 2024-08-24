import { NextResponse } from "next/server";
import { deleteOne, getById } from "@services/event";
import { redirect } from "next/navigation";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const parsedId = parseInt(params.id);
    const session = await getServerSession(authOptions);
    try {
        if(!session || !session.user){
            deleteOne(parsedId, session.user.id);
        } 
        NextResponse.redirect("/");
    } catch (e) {
        throw NextResponse.json({ error: e }, { status: 500 });
    }

}



export async function GET(req: Request, { params }: { params: { id: string } }) {
    const parsedId = parseInt(params.id);

    try {
        const event = await getById(parsedId);
        return NextResponse.json({ data: event }, { status: 200 });

    } catch (e) {
        throw NextResponse.json({ error: e }, { status: 500 });
    }

}