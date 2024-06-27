'use client';

import Button from '@components/button/button';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ErrorPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const error = searchParams.get('error');

	const handleBack = () => {
		router.push('/login');
	};

	return (
		<div className="error-container">
			<h1>Error</h1>
			{error && <p>{error}</p>}
			<Button color='primary' type='button' onClick={handleBack}>Back to Login</Button>
		</div>
	);
}
