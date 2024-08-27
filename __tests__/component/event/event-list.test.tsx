import React from 'react';
import { render, screen } from '@testing-library/react';
import EventList from '@components/event/event-list';
import Card from '@components/event/card/card';
import '@testing-library/jest-dom';


jest.mock('@components/event/card/card', () => ({
	__esModule: true,
	default: jest.fn(() => <div data-testid="mock-card" />),
}));

describe('EventList Component', () => {
	it('should render without events', () => {
		const { container } = render(<EventList events={[]} />);

		const sectionElement = container.querySelector('section');
		expect(sectionElement).toBeInTheDocument();

		expect(screen.queryByTestId('mock-card')).toBeNull();
	});

	it('should render the correct number of Card components when events are provided', () => {
		const events = [
			{ id: 1, title: 'Event 1', images: [], localizations: [] },
			{ id: 2, title: 'Event 2', images: [], localizations: [] },
		];

		render(<EventList events={events} />);

		expect(screen.getAllByTestId('mock-card')).toHaveLength(events.length);
	});

	it('should pass the correct props to each Card component', () => {
		const events = [
			{ id: 1, title: 'Event 1', images: [], localizations: [] },
			{ id: 2, title: 'Event 2', images: [], localizations: [] },
		];

		render(<EventList events={events} />);

		events.forEach((event, index) => {
			expect(Card).toHaveBeenCalledWith(
				expect.objectContaining({
					event: event,
					index: index,
				}),
				expect.anything()
			);
		});
	});
});
