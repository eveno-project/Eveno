import { NextResponse } from "next/server";
import { getAll } from "@services/tag";


export async function GET() {
    try {
        const tags = await getAll();
        return NextResponse.json({ data: tags }, { status: 200 });
    } catch (e) {
        throw NextResponse.json({ error: e }, { status: 500 });
    }
}