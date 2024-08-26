import React from 'react';
import { render, screen } from '@testing-library/react';
import EventList from '@components/event/event-list';
import '@testing-library/jest-dom';
import Event from "@interfaces/event";

const mockEvents: Partial<Event>[] = [
	{
		id: 1,
		title: 'Event One',
		images: [{ src: 'path/to/image1.jpg', alt: 'Image 1' }],
		localizations: [{ address: '123 Main St', zipCode: 12345, city: 'Sample City 1', latitude: 0, longitude: 0, regionName: 'Sample Region 1'}],
		linkTicketing: 'http://ticketing.com/event1',
		adult: true
	},
	{
		id: 2,
		title: 'Event Two',
		images: [{ src: 'path/to/image2.jpg', alt: 'Image 2' }],
		localizations: [{ address: '456 Main St', zipCode: 67890, city: 'Sample City 2', latitude: 0, longitude: 0, regionName: 'Sample Region 2'}],
		linkTicketing: 'http://ticketing.com/event2',
		adult: false
	}
];

describe('EventList component', () => {
	it('renders correctly', () => {
		render(<EventList events={mockEvents} />);

		expect(screen.getByText('Event One')).toBeInTheDocument();
		expect(screen.getByText('Event Two')).toBeInTheDocument();
	});

	it('renders the correct number of EventCard components', () => {
		render(<EventList events={mockEvents} />);

		const eventCards = screen.getAllByRole('article'); // Assuming EventCard uses an <article> tag
		expect(eventCards).toHaveLength(mockEvents.length);
	});

	it('renders EventCard with correct props', () => {
		render(<EventList events={mockEvents} />);

		mockEvents.forEach(event => {
			if(event.title) {
				expect(screen.getByText(event.title)).toBeInTheDocument();
			}
			if(event.images) {
				expect(screen.getByAltText(event.images[0].alt)).toHaveAttribute('src', event.images[0].src);
			}
			if(event.localizations) {
				expect(screen.getByText(`${event.localizations[0].address}, ${event.localizations[0].zipCode} ${event.localizations[0].city}`)).toBeInTheDocument();
			}
			if (event.linkTicketing) {

				const ticketingLink = screen.getAllByText('Ticketing');
				ticketingLink.forEach((link, index) => {

					expect(link).toBeInTheDocument();
					expect(link).toHaveAttribute('href', mockEvents[index].linkTicketing);
				});

			}
		});
	});
});
