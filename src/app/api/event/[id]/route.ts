import { NextResponse } from "next/server";
import { deleteOne, getById } from "@services/event";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const parsedId = parseInt(params.id);
    const session = await getServerSession(authOptions);
    try {
        if(session && session.user){
            deleteOne(parsedId, session.user.id);
        } 
        NextResponse.redirect("/");
    } catch (error) {
        throw NextResponse.json({ error }, { status: 500 });
    }

}

export async function GET(_: Request, { params }: { params: { id: string } }) {
    try {
        const parsedId = parseInt(params.id);
        const event = await getById(parsedId);
        return NextResponse.json({ data: event }, { status: 200 });
    } catch (error) {
        throw NextResponse.json({ error }, { status: 500 });
    }
}