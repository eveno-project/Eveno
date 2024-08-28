import prisma from "@utils/db";
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";

export async function DELETE(req: NextRequest) {
	const session = await getServerSession(authOptions);
	if (!session || !session.user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	if (req.method !== "DELETE") {
		return NextResponse.json({ message: 'Méthode non autorisée' }, { status: 405 });
	}

	try {
		const { password, email } = await req.json();

		if(!password || !email){
			return NextResponse.json({ message: 'Mauvaise reqûete' }, { status: 400 });
		}

		const user = await prisma.user.findUnique({
			where: {
				email
			}
		});

		if (!user) {
			return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 });
		}

		const isPasswordValid = await compare(password, user.password);

		if (!isPasswordValid) {
			return NextResponse.json({ message: 'Mot de passe incorrect' }, { status: 401 });
		}

		await prisma.user.delete({
			where: { email }
		});

		return NextResponse.json({ message: 'Utilisateur supprimé avec succès' }, { status: 200 });
	} catch (error) {
		console.error('Error deleting user:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
