import prisma from "@utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
	const { username, email, password, confirmPassword, adult, birthday} = await req.json();

	if (password !== confirmPassword) {
		return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	console.log(username, email, password, adult, birthday);
	console.log(hashedPassword);

	const dateBirthday = new Date(birthday);

	try {
		const user = await prisma.user.create({
			data: {
				username: username,
				email: email,
				password: hashedPassword,
				token: Math.random().toString(36).slice(2),
				adult: adult,
				birthday: dateBirthday,
				roleId: 1
			}
		});

		return NextResponse.json(user, { status:	 201 })
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Internal error" }, { status: 500 });
	}
}
