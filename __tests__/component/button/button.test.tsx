import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from '@components/button/button';
import '@testing-library/jest-dom';

describe('Button component', () => {
	it('renders correctly', () => {
		render(
			<Button color="primary" type="button">
				Click me
			</Button>
		);
		expect(screen.getByText('Click me')).toBeInTheDocument();
	});

	it('calls onClick handler when clicked', () => {
		const handleClick = jest.fn();
		render(
			<Button color="primary" type="button" onClick={handleClick}>
				Click me
			</Button>
		);
		fireEvent.click(screen.getByText('Click me'));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('applies the correct color class', () => {
		const { container } = render(
			<Button color="primary" type="button">
				Click me
			</Button>
		);
		expect(container.firstChild).toHaveClass('primary');
	});

	it('renders with the correct type attribute', () => {
		const { container } = render(
			<Button color="primary" type="submit">
				Submit
			</Button>
		);
		expect(container.querySelector('button')).toHaveAttribute('type', 'submit');
	});

	it('is disabled when the disabled prop is true', () => {
		const { container } = render(
			<Button color="primary" type="button" disabled>
				Click me
			</Button>
		);
		expect(container.querySelector('button')).toBeDisabled();
	});

	it('applies additional classes when provided', () => {
		const { container } = render(
			<Button color="primary" type="button" className="extra-class">
				Click me
			</Button>
		);
		expect(container.firstChild).toHaveClass('primary');
		expect(container.firstChild).toHaveClass('extra-class');
	});

	it('renders children correctly', () => {
		render(
			<Button color="primary" type="button">
				<span>Click me</span>
			</Button>
		);
		expect(screen.getByText('Click me')).toBeInTheDocument();
		expect(screen.getByText('Click me').tagName).toBe('SPAN');
	});

	it('applies outline class when isOutline is true', () => {
		const { container } = render(
			<Button color="primary" type="button" isOutline>
				Click me
			</Button>
		);
		expect(container.firstChild).toHaveClass('primary_outline');
	});
});
