"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const handleSubmit = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();

		console.log('Trying to sign in with:', { email, password });

		const result = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});
		console.log('Sign in result:', result);

		if (result?.error) {
			setError(result.error);
			console.error('Sign in error:', result.error);
			router.push(`/error?error=${encodeURIComponent(result.error)}`);
		} else {
			router.push('/');
		}
	};

	return (
		<div>
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
		</div>
	);
}
