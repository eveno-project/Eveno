import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '@components/filter/filter';
import '@testing-library/jest-dom';


global.fetch = jest.fn((url: string) => {
    if (typeof url === 'string' && url.includes('/api/tag')) {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                data: [
                    { id: 1, name: 'Tag1' },
                    { id: 2, name: 'Tag2' },
                ]
            }),
            status: 200,
            statusText: 'OK',
            headers: new Headers(),
            url,
        } as Response);
    } else {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                data: [
                    {
                        id: 1,
                        title: 'Event 1',
                        startDate: new Date(),
                        endDate: new Date(),
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        publishedAt: null,
                        published: false,
                        description: 'Description for event 1',
                        image: null,
                        linkTicketing: null,
                        adult: false,
                        isValid: true,
                        comments: [],
                        eventTags: [{ tag: { id: 1, name: 'Tag1' } }],
                        eventNetworks: [],
                        eventLocalizations: [],
                        eventSubscribes: [],
                        eventNotes: [],
                    },
                    {
                        id: 2,
                        title: 'Event 2',
                        startDate: new Date(),
                        endDate: new Date(),
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        publishedAt: null,
                        published: false,
                        description: 'Description for event 2',
                        image: null,
                        linkTicketing: null,
                        adult: false,
                        isValid: false,
                        comments: [],
                        eventTags: [{ tag: { id: 2, name: 'Tag2' } }],
                        eventNetworks: [],
                        eventLocalizations: [],
                        eventSubscribes: [],
                        eventNotes: [],
                    }
                ]
            }),
            status: 200,
            statusText: 'OK',
            headers: new Headers(),
            url,
        } as Response);
    }
}) as jest.Mock<Promise<Response>>;

describe('Filter component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly with all events', async () => {
        render(<Filter apiUrl="/api/events" showValidationFilter={false} />);

        expect(await screen.findByText('Event 1')).toBeInTheDocument();
        expect(await screen.findByText('Event 2')).toBeInTheDocument();
    });

    it('filters events by text', async () => {
        render(<Filter apiUrl="/api/events" showValidationFilter={false} />);

        await screen.findByText('Event 1');

        fireEvent.change(screen.getByPlaceholderText('Filter Events'), { target: { value: 'Event 1' } });

        expect(screen.getByText('Event 1')).toBeInTheDocument();
        expect(screen.queryByText('Event 2')).not.toBeInTheDocument();
    });

    it('filters events by tags', async () => {
        render(<Filter apiUrl="/api/events" showValidationFilter={false} />);

        await screen.findByText('Event 1');

        fireEvent.change(screen.getByRole('button', { name: /select tags/i }), { target: { value: ['Tag1'] } });

        expect(screen.getByText('Event 1')).toBeInTheDocument();
        expect(screen.queryByText('Event 2')).not.toBeInTheDocument();
    });

    it('filters events by validation status', async () => {
        render(<Filter apiUrl="/api/events" showValidationFilter={true} />);

        await screen.findByText('Event 1');

        fireEvent.click(screen.getByText('Validated'));

        expect(screen.getByText('Event 1')).toBeInTheDocument();
        expect(screen.queryByText('Event 2')).not.toBeInTheDocument();

        fireEvent.click(screen.getByText('Not Validated'));

        expect(screen.queryByText('Event 1')).not.toBeInTheDocument();
        expect(screen.getByText('Event 2')).toBeInTheDocument();
    });

    it('renders correctly without validation filter', async () => {
        render(<Filter apiUrl="/api/events" showValidationFilter={false} />);

        await screen.findByText('Event 1');

        expect(screen.queryByText('Validated')).not.toBeInTheDocument();
        expect(screen.queryByText('Not Validated')).not.toBeInTheDocument();
    });
});
