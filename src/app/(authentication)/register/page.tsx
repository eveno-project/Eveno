"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
import { Box, Container, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { RegisterSchema, RegisterValues } from "@validators/register.shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Login, Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";

export default function RegisterPage() {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterValues>({
		resolver: zodResolver(RegisterSchema),
	});
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};
	const [signInResponseError, setSignInResponseError] = useState<string>('');
	const router = useRouter();

	const onSumbit = async ({ email, birthday, confirm, password, username }: RegisterValues) => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email, birthday, confirmPassword: confirm, password, username
			}),
		});

		if (response.ok) {
			await signIn("credentials", {
				redirect: true,
				callbackUrl: '/',
				email: email,
				password: password,
			});
		} else {
			setSignInResponseError(await response.json())
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<Typography variant="h6">Inscription</Typography>
			<Box component="form" onSubmit={handleSubmit(onSumbit)}>
				<FormControl fullWidth margin="normal" error={!!errors.username}>
					<Controller
						name="username"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<TextField
								{...field}
								label="Nom d'utilisateur"
								variant="outlined"
								fullWidth
								error={!!errors.username}
								helperText={errors.username?.message}
							/>
						)}
					/>
				</FormControl>
				<FormControl fullWidth margin="normal" error={!!errors.email}>
					<Controller
						name="email"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<TextField
								{...field}
								label="Courriel"
								variant="outlined"
								fullWidth
								error={!!errors.email}
								helperText={errors.email?.message}
							/>
						)}
					/>
				</FormControl>
				<FormControl fullWidth margin="normal" error={!!errors.password}>
					<Controller
						name="password"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<>
								<InputLabel htmlFor="password">Mot de passe</InputLabel>
								<OutlinedInput
									id="password"
									{...field}
									type={showPassword ? 'text' : 'password'}
									endAdornment={
										<InputAdornment position="end">
											<IconButton

												aria-label="Voir le mot de passe"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									}
									label="Password"
								/>
								{
									!!signInResponseError && (
										<FormHelperText error={!!signInResponseError}>{signInResponseError}</FormHelperText>
									)
								}
								{
									!!errors.password && (
										<FormHelperText error={!!errors.password}>{errors.password.message}</FormHelperText>
									)
								}
							</>
						)}
					/>
				</FormControl>
				<FormControl fullWidth margin="normal" error={!!errors.password}>
					<Controller
						name="confirm"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<>
								<InputLabel htmlFor="confirm">Confirmation</InputLabel>
								<OutlinedInput
									id="confirm"
									{...field}
									type={showPassword ? 'text' : 'password'}
									endAdornment={
										<InputAdornment position="end">
											<IconButton

												aria-label="Voir le mot de passe"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									}
									label="Password"
								/>
								{
									!!signInResponseError && (
										<FormHelperText error={!!signInResponseError}>{signInResponseError}</FormHelperText>
									)
								}
								{
									!!errors.password && (
										<FormHelperText error={!!errors.password}>{errors.password.message}</FormHelperText>
									)
								}
							</>
						)}
					/>
				</FormControl>
				<FormControl fullWidth margin="normal" error={!!errors.birthday}>
					<Controller
						name="birthday"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Date"
								type="date"
								InputLabelProps={{
									shrink: true,
								}}
								error={!!errors.birthday}
								helperText={errors.birthday?.message}
							/>
						)}
					/>
				</FormControl>
				<LoadingButton
					fullWidth
					type="submit"
					disabled={isSubmitting}
					endIcon={<Login />}
					loading={isSubmitting}
					loadingPosition="end"
					variant="contained"
				>
					<span>S&apos;inscrire</span>
				</LoadingButton>
			</Box>
		</Container>
	);
};
