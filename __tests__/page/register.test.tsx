import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterPage from '../../src/app/(authentication)/register/page';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

jest.mock('next-auth/react');
jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
}));

describe('RegisterPage', () => {
	let mockRouterPush: jest.Mock;

	beforeEach(() => {
		mockRouterPush = jest.fn();
		(useRouter as jest.Mock).mockReturnValue({
			push: mockRouterPush,
		});
		(signIn as jest.Mock).mockResolvedValue({ ok: true });

		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve({}),
			})
		) as jest.Mock;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should render the registration form', () => {
		render(<RegisterPage />);

		expect(screen.getByLabelText(/Nom d'utilisateur/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Courriel/i)).toBeInTheDocument();
		expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument();
		expect(screen.getByLabelText('Confirmation')).toBeInTheDocument();
		// expect(screen.getByLabelText(/adult/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /S'inscrire/i })).toBeInTheDocument();
	});

	it('should handle form input changes', () => {
		render(<RegisterPage />);

		fireEvent.change(screen.getByLabelText(/Nom d'utilisateur/i), { target: { value: 'testuser' } });
		fireEvent.change(screen.getByLabelText(/Courriel/i), { target: { value: 'test@example.com' } });
		fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: 'password123' } });
		fireEvent.change(screen.getByLabelText('Confirmation'), { target: { value: 'password123' } });
		fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2000-01-01' } });
		// fireEvent.click(screen.getByLabelText(/adult/i));

		expect(screen.getByLabelText(/Nom d'utilisateur/i)).toHaveValue('testuser');
		expect(screen.getByLabelText(/Courriel/i)).toHaveValue('test@example.com');
		expect(screen.getByLabelText('Mot de passe')).toHaveValue('password123');
		expect(screen.getByLabelText('Confirmation')).toHaveValue('password123');
		expect(screen.getByLabelText(/Date/i)).toHaveValue('2000-01-01');
		// expect(screen.getByLabelText(/adult/i)).toBeChecked();
	});
});
