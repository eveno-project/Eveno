import { NextRequest, NextResponse } from "next/server";
import { create, deleteOne, getAll } from "@services/tag";
import { NextApiRequest } from "next";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { z } from "zod";
import { TAG_NAME_EXISTING } from "@constants/message-schema";


export async function GET() {
    try {
        const tags = await getAll();
        return NextResponse.json({ data: tags }, { status: 200 });
    } catch (error) {
        throw NextResponse.json({ error }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name } = body;
        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }
        return NextResponse.json({ data: await create({name}) }, { status: 201 });
    } catch (error) {
        if ((error as PrismaClientKnownRequestError).code === 'P2002') {
            return NextResponse.json({ error: { code: z.ZodIssueCode.custom, path: ['name'], message: TAG_NAME_EXISTING }}, { status: 409 });
        }
        throw error;
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }
        const tag = await deleteOne(+id);
        return NextResponse.json({data: tag}, { status: 200})
    } catch (error) {
        throw error;
    }
}