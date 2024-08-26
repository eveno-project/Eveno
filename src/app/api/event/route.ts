import { NextResponse } from "next/server";
import { getAll } from "@services/event";


export async function GET() {
    try {
        const events = await getAll();
        return NextResponse.json({ data: events }, { status: 200 });
    } catch (error) {
        console.error({error});
        throw NextResponse.json({ error }, { status: 500 });
    }
}