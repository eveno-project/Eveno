import { NextResponse } from "next/server";
import { getAll } from "@services/tag";


export async function GET() {
    try {
        const events = await getAll();
        return NextResponse.json({ data: events }, { status: 200 });
    } catch (e) {
        throw NextResponse.json({ error: e }, { status: 500 });
    }
}