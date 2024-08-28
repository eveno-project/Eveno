export const dynamic = 'force-dynamic';
import prisma from "@utils/db";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import { getByUserEmailFollow } from "@services/event";

export async function GET(req: NextRequest) {
    if (req.method !== "GET") {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }

    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const events = await getByUserEmailFollow(session.user.email);
        return NextResponse.json({ data: events }, { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

