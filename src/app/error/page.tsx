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

			<style jsx>{`
        .error-container {
          max-width: 400px;
          margin: 0 auto;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: red;
        }
        p {
          color: #333;
        }
        button {
          margin-top: 1rem;
          padding: 0.75rem;
          background: #f4f4f4;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background: #e4e4e4;
        }
      `}</style>
		</div>
	);
}
