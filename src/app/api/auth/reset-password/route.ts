import prisma from "@utils/db";
import { NextRequest, NextResponse } from "next/server";
import { compare, hash } from "bcryptjs";

export async function POST(req: NextRequest) {
	if (req.method !== "POST") {
		return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
	}

	try {
		const { email, oldPassword, newPassword } = await req.json();

		const user = await prisma.user.findUnique({
			where: {
				email
			}
		});

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		const isPasswordValid = await compare(oldPassword, user.password);

		if (!isPasswordValid) {
			return NextResponse.json({ message: 'Ancien mot de passe incorrecte' }, { status: 401 });
		}
		if(newPassword.length < 8){
			return NextResponse.json({ message: 'Le mot de passe doit faire au minimum 8 caractères' }, { status: 400 });
		}

		const hashedNewPassword = await hash(newPassword, 10);

		await prisma.user.update({
			where: { email },
			data: { password: hashedNewPassword },
		});

		return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}
}
