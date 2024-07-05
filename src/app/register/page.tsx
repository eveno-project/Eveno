"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
import Button from "@components/button/button";
import style from "../register/page.module.css";
import { Container } from "@mui/material";

const RegisterPage = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		birthday: "",
		adult: false,
	});
	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const res = await fetch("/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		if (res.ok) {
			await signIn("credentials", {
				redirect: false,
				email: formData.email,
				password: formData.password,
			});
			router.push("/");
		} else {
			const errorData = await res.json();
			console.error("Registration error:", errorData.error);
		}
	};

	return (
		<Container className={style.container} maxWidth="md">
			<form onSubmit={handleSubmit} className={style.form__container}>
				<h2>Inscription</h2>
				<input
					className={style.form__input}
					name="username"
					type="text"
					value={formData.username}
					onChange={handleChange}
					placeholder="Username*"
					required
				/>
				<input
					className={style.form__input}
					name="email"
					type="email"
					value={formData.email}
					onChange={handleChange}
					placeholder="Email*"
					required
				/>
				<input
					className={style.form__input}
					name="password"
					type="password"
					value={formData.password}
					onChange={handleChange}
					placeholder="Password*"
					required
				/>
				<input
					className={style.form__input}
					name="confirmPassword"
					type="password"
					value={formData.confirmPassword}
					onChange={handleChange}
					placeholder="Confirm Password*"
					required
				/>
				<div className={style.form__input + ' ' + style.form__input__adult}>
					<label htmlFor="adult" className={style.form__label}>Adult</label>
					<input
						className={style.form__input__checkbox}
						id="adult"
						name="adult"
						type="checkbox"
						checked={formData.adult}
						onChange={(e) =>
							setFormData({...formData, adult: e.target.checked})
						}
					/>
				</div>

				<input
					className={style.form__input}
					name="birthday"
					type="date"
					value={formData.birthday}
					onChange={handleChange}
					placeholder="Birthday*"
					required
				/>
				<Button className={style.form__submit} color="primary" type="submit">Créer le compte</Button>
			</form>
		</Container>
	);
};

export default RegisterPage;
