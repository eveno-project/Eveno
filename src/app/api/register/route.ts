import prisma from "@utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(NextRequest: NextRequest) {
	const { username, email, password, confirmPassword, adult, birthday } = await NextRequest.json();

	if (!username || !email || !password || !confirmPassword || !birthday) {
		return NextResponse.json({ error: "Missing fields" }, { status: 400 });
	}

	if (email === "" || !email.includes("@")) {
		return NextResponse.json({ error: "Invalid email" }, { status: 400 });
	}

	if (password !== confirmPassword) {
		return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
	}

	if (adult !== true && adult !== false) {
		return NextResponse.json({ error: "Adult must be a boolean" }, { status: 400 });
	}

	if (birthday.length !== 10) {
		return NextResponse.json({ error: "Birthday must be in the format 'YYYY-MM-DD'" }, { status: 400 });
	}

	const dateBirthday = new Date(birthday);

	const hashedPassword = await bcrypt.hash(password, 10);

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

		return NextResponse.json(user, { status: 201 })
	} catch (error: any) {
		if (error.code === "P2002") {
			if (error.meta.target.includes("email")) {
				return NextResponse.json({ error: "Email already exists" }, { status: 400 });
			} else if (error.meta.target.includes("username")) {
				return NextResponse.json({ error: "Username already exists" }, { status: 400 });
			}
		}
		console.log(error);
		return NextResponse.json({ error: "Internal error" }, { status: 500 });
	}
}
