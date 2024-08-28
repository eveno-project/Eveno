import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '@components/event/card/card';
import Event from '@interfaces/event';

describe('Card Component', () => {
	const mockEvent: Partial<Event> = {
		id: 1,
		title: 'Test Event',
		images: [
			{ src: '/test-image.jpg', alt: 'Test Image' }
		],
		localizations: [
			{ address: '123 Test St', zipCode: 12345, city: 'Test City', latitude: 0, longitude: 0, regionName: 'Test Region' }
		],
		linkTicketing: 'http://example.com/tickets',
		startDate: new Date(),
		endDate: new Date(),
		createdAt: new Date(),
		updatedAt: new Date(),
		published: false,
		description: 'A description of the event',
		adult: false,
		user: { id: 1, username: 'Test User', email: 'test@example.com', birthday: new Date(), role: {id: 1, name: "USER"}, password: 'password', token: 'token', adult: true },
		tags: [{ id: 1, name: 'Tag1' }],
		networks: [{ id: 1, name: 'Network1', link: 'http://example.com/network' }],
		notes: [{ id: 1, value: 5, user: { id: 1, username: 'Test User', email: 'test@example.com', birthday: new Date(), role: {id: 1, name: "USER"}, password: 'password', token: 'token', adult: true } }],
		comments: [{
			id: 1,
			content: 'Test Comment',
			user: { id: 2, username: 'Commenter', email: 'commenter@example.com', birthday: new Date(), role: {id: 1, name: "USER"}, password: 'password', token: 'token', adult: true },
			replies: [],
			createdAt: new Date(),
			updatedAt: new Date()
		}],
		eventSubscribes: [{ id: 1, user: { id: 3, username: 'Subscriber', email: 'subscriber@example.com', birthday: new Date(), role: {id: 1, name: "USER"}, password: 'password', token: 'token', adult: true }, event: { id: 1 }, type: 'standard' }],
	};

	it('renders the card with event data', () => {
		render(<Card event={mockEvent}  index={0}/>);

		expect(screen.getByText('Test Event')).toBeInTheDocument();
		expect(screen.getByAltText('Test Image')).toBeInTheDocument();
		expect(screen.getByText('123 Test St, 12345 Test City')).toBeInTheDocument();
		expect(screen.getByText('Voir plus')).toBeInTheDocument();
	});

	it('renders a fallback image if no event image is provided', () => {
		const eventWithoutImage = { ...mockEvent, images: [] };
		render(<Card event={eventWithoutImage} index={0} />);

		expect(screen.getByAltText('Nothing image')).toBeInTheDocument();
	});

	it('renders the address as "À distance" if no localization is provided', () => {
		const eventWithoutLocalization = { ...mockEvent, localizations: [] };
		render(<Card event={eventWithoutLocalization} index={0} />);

		expect(screen.getByText('À distance')).toBeInTheDocument();
	});

	it('renders the card with a custom width', () => {
		const { container } = render(<Card event={mockEvent} width={300} index={0} />);

		expect(container.firstChild).toHaveStyle('max-width: 300px');
	});

	it('applies the correct transition delay based on index', () => {
		const { container } = render(<Card event={mockEvent} index={1} />);
		const paperElement = container.firstChild;

		expect(paperElement).toHaveStyle('transition-delay: 250ms');
	});

	it('renders the "Voir plus" button with the correct link', () => {
		render(<Card event={mockEvent} index={0} />);

		const linkElement = screen.getByText('Voir plus').closest('a');
		expect(linkElement).toHaveAttribute('href', '/event/1');
	});
});
