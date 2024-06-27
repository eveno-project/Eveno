"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { Container } from "@mui/material";

import style from './page.module.css';
import Button from "@components/button/button";
import Link from "@components/link/link";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const handleSubmit = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		const result = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		if (result?.error) {
			setError(result.error);
			console.error('Sign in error:', result.error);
			router.push(`/error?error=${encodeURIComponent(result.error)}`);
		} else {
			router.push('/');
		}
	};

	return (
		<Container className={style.container} maxWidth="md">
			<form onSubmit={handleSubmit} className={style.form__container}>
				<h2>Connexion</h2>
				<input
					className={style.form__input}
					name="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
				/>
				<input
					className={style.form__input}
					name="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<Link className={style.form__register} href="/register">Pas encore inscrit ?</Link>
				<Button className={style.form__submit} color="primary" type="submit">Se connecter</Button>
			</form>
		</Container>
	);
}
