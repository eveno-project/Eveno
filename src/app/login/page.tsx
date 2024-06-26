"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { Container } from "@mui/material";

import style from './page.module.css';

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
		<Container maxWidth="md">
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<button type="submit">Login</button>
			</form>
		</Container>
	);
}
