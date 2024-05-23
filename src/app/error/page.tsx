// app/error.tsx
'use client';

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
			<button onClick={handleBack}>Back to Login</button>
		</div>
	);
}
