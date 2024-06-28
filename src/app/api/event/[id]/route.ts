import { NextResponse } from "next/server";
import { deleteOne, getById } from "@services/event";
import { redirect } from "next/navigation";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const parsedId = parseInt(params.id);

    try {
        deleteOne(parsedId);
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