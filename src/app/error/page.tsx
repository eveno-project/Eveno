'use client';
import Route from '@enums/routes.enum';
import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ErrorPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const error = searchParams.get('error');

	const handleBack = () => {
		router.push(Route.LOGIN);
	};

	return (
		<Container component="main" maxWidth="md">
			<Typography variant="h1">Error</Typography>
			{error && <Typography>{error}</Typography>}
			<Button variant="contained" type="button" onClick={handleBack}>Retournée vers l&apos;accueil</Button>
		</Container>
	);
}
