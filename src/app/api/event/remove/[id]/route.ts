import { NextResponse } from "next/server";
import { deleteOne } from "@services/event";
import { redirect } from "next/navigation";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    console.log(params)
    const parsedId = parseInt(params.id);

    try {
        deleteOne(parsedId);
        NextResponse.redirect("/");
    } catch (e) {
        throw NextResponse.json({ error: e }, { status: 500 });
    }

}