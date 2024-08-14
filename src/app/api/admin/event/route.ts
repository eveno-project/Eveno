import { NextResponse } from "next/server";
import { deleteOne, getById, update } from "@services/event";
import { redirect } from "next/navigation";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import { Role } from "@constants/role";


export async function GET(req: Request, { params }: { params: { id: string } }) {
    const parsedId = parseInt(params.id);

    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        if (session.user.role !== Role.ADMIN) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const event = await getById(parsedId);
        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        event.isValid = true;

        const updatedEvent = await update(event);

        return NextResponse.json({ data: event }, { status: 200 });
    } catch (e) {
        throw NextResponse.json({ error: e }, { status: 500 });
    }

}