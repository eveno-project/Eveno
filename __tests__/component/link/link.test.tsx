import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Link from '@components/link/link';

describe('Link component', () => {
	it('renders the children correctly', () => {
		render(<Link href="/test">Test Link</Link>);
		expect(screen.getByText('Test Link')).toBeInTheDocument();
	});

	it('applies the default color class', () => {
		render(<Link href="/test">Test Link</Link>);
		const linkElement = screen.getByText('Test Link');
		expect(linkElement).toHaveClass('primary');
	});

	it('applies the correct color class', () => {
		render(<Link href="/test" color="secondary">Test Link</Link>);
		const linkElement = screen.getByText('Test Link');
		expect(linkElement).toHaveClass('secondary');
	});

	it('applies additional classes when provided', () => {
		render(<Link href="/test" className="extra-class">Test Link</Link>);
		const linkElement = screen.getByText('Test Link');
		expect(linkElement).toHaveClass('extra-class');
	});

	it('applies the correct href attribute', () => {
		render(<Link href="/test">Test Link</Link>);
		const linkElement = screen.getByText('Test Link');
		expect(linkElement.closest('a')).toHaveAttribute('href', '/test');
	});
});
