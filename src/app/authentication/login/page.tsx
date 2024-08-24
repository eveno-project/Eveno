"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from 'next/navigation';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Container, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from "@mui/material";
import { LoginValues, LoginSchema } from '@validators/login.schema';
import { VisibilityOff, Visibility, Login } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';

export default function LoginPage() {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginValues>({
		resolver: zodResolver(LoginSchema),
	});
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const [signInResponseError, setSignInResponseError] = useState<string>('');
	const router = useRouter();

	const onSubmit = async ({ email, password }: LoginValues) => {
		const signInResponse = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});
		if (signInResponse?.error) {
			setSignInResponseError(signInResponse.error);
		} else {
			redirect('/');
		}
	};

	return (
		<Container
			component="main"
			maxWidth="sm"
			sx={{
				height: "calc(100% - 90px)",
				display: "flex",
				justifyContent: "center"
			}}>
			<Box
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Typography variant="h4">Connexion</Typography>
				<FormControl fullWidth margin="normal" error={!!errors.email}>
					<Controller
						name="email"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<TextField
								{...field}
								label="Email"
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
								<InputLabel htmlFor="password">Password</InputLabel>
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
				<Link href="/register" sx={{ alignSelf: 'flex-start' }}>Pas encore inscrit ?</Link>
				<LoadingButton
					fullWidth
					type="submit"
					disabled={isSubmitting}
					endIcon={<Login />}
					loading={isSubmitting}
					loadingPosition="end"
					variant="contained"
				>
					<span>Se connecter</span>
				</LoadingButton>
			</Box>
		</Container >
	);
}
