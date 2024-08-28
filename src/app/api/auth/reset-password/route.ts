import prisma from "@utils/db";
import { NextRequest, NextResponse } from "next/server";
import { compare, hash } from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { PASSWORD_MIN, PASSWORD_ERROR_OLD, PASSWORD_SUCCESSFULLY, SERVER_ERROR_INTERNAL, USER_ERROR_NOT_FOUND } from "@constants/message-schema";

export async function POST(req: NextRequest) {
	if (req.method !== "POST") {
		return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
	}
	const session = await getServerSession(authOptions);
	if (!session || !session.user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { email, oldPassword, newPassword } = await req.json();

		const user = await prisma.user.findUnique({
			where: {
				email
			}
		});

		if (!user) {
			return NextResponse.json({ error: USER_ERROR_NOT_FOUND }, { status: 404 });
		}

		const isPasswordValid = await compare(oldPassword, user.password);

		if (!isPasswordValid) {
			return NextResponse.json({ message: PASSWORD_ERROR_OLD }, { status: 401 });
		}
		if(newPassword.length < 8){
			return NextResponse.json({ message: PASSWORD_MIN }, { status: 400 });
		}

		const hashedNewPassword = await hash(newPassword, 10);

		await prisma.user.update({
			where: { email },
			data: { password: hashedNewPassword },
		});

		return NextResponse.json({ message: PASSWORD_SUCCESSFULLY }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: SERVER_ERROR_INTERNAL }, { status: 500 });
	}
}
