import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterPage from '../../src/app/authentication/register/page';
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

		expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText('Password*')).toBeInTheDocument();
		expect(screen.getByLabelText('Confirm Password*')).toBeInTheDocument();
		expect(screen.getByLabelText(/adult/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/birthday/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
	});

	it('should handle form input changes', () => {
		render(<RegisterPage />);

		fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
		fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
		fireEvent.change(screen.getByLabelText('Password*'), { target: { value: 'password123' } });
		fireEvent.change(screen.getByLabelText('Confirm Password*'), { target: { value: 'password123' } });
		fireEvent.change(screen.getByLabelText(/birthday/i), { target: { value: '2000-01-01' } });
		fireEvent.click(screen.getByLabelText(/adult/i));

		expect(screen.getByLabelText(/username/i)).toHaveValue('testuser');
		expect(screen.getByLabelText(/email/i)).toHaveValue('test@example.com');
		expect(screen.getByLabelText('Password*')).toHaveValue('password123');
		expect(screen.getByLabelText('Confirm Password*')).toHaveValue('password123');
		expect(screen.getByLabelText(/birthday/i)).toHaveValue('2000-01-01');
		expect(screen.getByLabelText(/adult/i)).toBeChecked();
	});
});
