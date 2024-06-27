import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '@components/event/card/card';
import '@testing-library/jest-dom';
import Event from "@interfaces/event";

const mockEvent: Partial<Event> = {
	id: 1,
	title: 'Sample Event',
	images: [
		{ path: 'path/to/image.jpg', name: 'Event Image' }
	],
	localizations: [
		{
			address: '123 Main St',
			zipCode: 12345,
			city: 'Sample City',
			latitude: 0,
			longitude: 0,
			regionName: 'Sample Region'
		}
	],
	linkTicketing: 'http://ticketing.com'
};

describe('Card component', () => {
	it('renders correctly with all props', () => {
		render(<Card event={mockEvent} />);

		expect(screen.getByText('Sample Event')).toBeInTheDocument();
		expect(screen.getByAltText('Event Image')).toBeInTheDocument();
		expect(screen.getByText('123 Main St, 12345 Sample City')).toBeInTheDocument();
		expect(screen.getByText('Ticketing')).toHaveAttribute('href', 'http://ticketing.com');
		expect(screen.getByText('Voir plus')).toHaveAttribute('href', '/event/1');
	});

	it('renders with default width', () => {
		const { container } = render(<Card event={mockEvent} />);
		expect(container.firstChild).toHaveStyle('width: 200px');
	});

	it('renders with custom width', () => {
		const { container } = render(<Card event={mockEvent} width={300} />);
		expect(container.firstChild).toHaveStyle('width: 300px');
	});

	it('renders the image with correct src and alt attributes', () => {
		render(<Card event={mockEvent} />);

		const imgElement = screen.getByAltText('Event Image');
		expect(imgElement).toBeInTheDocument();
		expect(imgElement).toHaveAttribute('src', 'path/to/image.jpg');
		expect(imgElement).toHaveAttribute('alt', 'Event Image');
	});

	it('renders correctly without images', () => {
		const eventWithoutImages = { ...mockEvent, images: undefined };
		render(<Card event={eventWithoutImages} />);
		expect(screen.queryByAltText('Event Image')).not.toBeInTheDocument();
	});

	it('renders correctly without localizations', () => {
		const eventWithoutLocalizations = { ...mockEvent, localizations: undefined };
		render(<Card event={eventWithoutLocalizations} />);
		expect(screen.getByText('À distance')).toBeInTheDocument();
	});

	it('renders correctly without linkTicketing', () => {
		const eventWithoutLinkTicketing = { ...mockEvent, linkTicketing: undefined };
		render(<Card event={eventWithoutLinkTicketing} />);
		expect(screen.queryByText('Ticketing')).not.toBeInTheDocument();
	});


});
