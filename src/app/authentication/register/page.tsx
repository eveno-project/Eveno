"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";

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
		<div>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">Username*</label>
					<input
						id="username"
						type="text"
						name="username"
						value={formData.username}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="email">Email*</label>
					<input
						id="email"
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="password">Password*</label>
					<input
						id="password"
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="confirmPassword">Confirm Password*</label>
					<input
						id="confirmPassword"
						type="password"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="adult">Adult</label>
					<input
						id="adult"
						type="checkbox"
						name="adult"
						checked={formData.adult}
						onChange={(e) =>
							setFormData({ ...formData, adult: e.target.checked })
						}
					/>
				</div>
				<div>
					<label htmlFor="birthday">Birthday*</label>
					<input
						id="birthday"
						type="date"
						name="birthday"
						value={formData.birthday}
						onChange={handleChange}
						required
					/>
				</div>
				<button type="submit">Register</button>
			</form>
		</div>
	);
};

export default RegisterPage;
