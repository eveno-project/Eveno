'use client';
import { Container } from "@mui/material";

import style from './page.module.css';
import Button from "@components/button/button";
import Link from "@components/link/link";
import Login from "@actions/auth/login";
import { useFormState } from "react-dom";
import { ZodError, string } from "zod";
import { useEffect } from "react";

export default function LoginPage() {
	const [state, action] = useFormState(
		Login,
		{
			data: { email: '', password: '' },
			error: {} as ZodError<{
				email: string,
				password: string
			}>,
			success: null
		}
	);
	
	useEffect(() => console.log({state}), [state.success])
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	// const [error, setError] = useState<string | null>(null);
	// const router = useRouter();

	// const handleSubmit = async (e: { preventDefault: () => void; }) => {
	// 	e.preventDefault();
	// 	const result = await signIn("credentials", {
	// 		redirect: false,
	// 		email,
	// 		password,
	// 	});

	// 	if (result?.error) {
	// 		setError(result.error);
	// 		console.error('Sign in error:', result.error);
	// 		router.push(`/error?error=${encodeURIComponent(result.error)}`);
	// 	} else {
	// 		router.push('/');
	// 	}
	// };

	return (
		<Container className={style.container} maxWidth="md">
			<form action={action} className={style.form__container}>
				<h2>Connexion</h2>
				<input
					className={style.form__input}
					name="email"
					type="email"
					placeholder="Email"
				/>
				<section>
					<input
						className={style.form__input}
						name="password"
						type="password"
						placeholder="Password"
					/>
				</section>
				<Link className={style.form__register} href="/register">Pas encore inscrit ?</Link>
				<Button className={style.form__submit} color="primary" type="submit">Se connecter</Button>
			</form>
		</Container>
	);
}
