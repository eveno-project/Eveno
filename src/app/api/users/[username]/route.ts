import { NextRequest, NextResponse } from 'next/server';
import prisma from "@utils/db";
import { deleteUser } from "@services/user";

export async function DELETE(nextRequest : NextRequest, { params }: { params: { username: string } }) {


	if (nextRequest.method !== 'DELETE') {
		return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
	}

	try {
		const username = params.username;

		const deletedUser = await deleteUser(username)

		return NextResponse.json(deletedUser, { status: 200 })
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Internal error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
