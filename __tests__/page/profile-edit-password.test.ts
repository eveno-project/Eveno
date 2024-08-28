import { render } from '@testing-library/react';
import Page from '../../src/app/profile/page';
import { getServerSession } from 'next-auth';
import '@testing-library/jest-dom';
import { redirect } from 'next/navigation';

jest.mock('next-auth', () => ({
	getServerSession: jest.fn(),
}));

jest.mock('next/navigation', () => ({
	redirect: jest.fn(),
}));

describe('Page Component', () => {
	it('should redirect to "/" if there is no session', async () => {
		(getServerSession as jest.Mock).mockResolvedValue(null);

		await Page();

		expect(redirect).toHaveBeenCalledWith('/');
	});

});
