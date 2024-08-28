import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Filter from '@components/filter/filter';
import '@testing-library/jest-dom';
import { useRouter } from "next/navigation";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

global.fetch = jest.fn((url: string) => {
    if (url.includes('/api/tag')) {
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
        } as Response);
    } else if (url.includes('/api/events')) {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                data: {
                    events: [
                        {
                            id: 1,
                            title: 'Event 1',
                            startDate: new Date().toISOString(),
                            endDate: new Date().toISOString(),
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                            publishedAt: null,
                            published: false,
                            description: 'Description for event 1',
                            image: null,
                            linkTicketing: null,
                            adult: false,
                            isValid: true,
                            tags: [{ name: 'Tag1' }],  // Assurez-vous que chaque événement a un tableau `tags`
                            eventTags: [{ tag: { id: 1, name: 'Tag1' } }],
                            eventNetworks: [],
                            eventLocalizations: [],
                            eventSubscribes: [],
                            eventNotes: [],
                        },
                        {
                            id: 2,
                            title: 'Event 2',
                            startDate: new Date().toISOString(),
                            endDate: new Date().toISOString(),
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                            publishedAt: null,
                            published: false,
                            description: 'Description for event 2',
                            image: null,
                            linkTicketing: null,
                            adult: false,
                            isValid: false,
                            tags: [{ name: 'Tag2' }],  // Assurez-vous que chaque événement a un tableau `tags`
                            eventTags: [{ tag: { id: 2, name: 'Tag2' } }],
                            eventNetworks: [],
                            eventLocalizations: [],
                            eventSubscribes: [],
                            eventNotes: [],
                        }
                    ]
                }
            }),
            status: 200,
            statusText: 'OK',
            headers: new Headers(),
        } as Response);
    }
}) as jest.Mock<Promise<Response>>;


describe('Composant Filter', () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
            query: {},
            pathname: '',
            asPath: '',
            route: '/'
        });
        jest.clearAllMocks();
    });

    it('rendre correctement avec tous les événements', async () => {
        render(<Filter apiUrl="/api/events" showValidationFilter={true} />);

        await waitFor(() => expect(screen.getByText('Event 1')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('Event 2')).toBeInTheDocument());
    });

    it('filtre les événements par texte', async () => {
        render(<Filter apiUrl="/api/events" showValidationFilter={true} />);

        await screen.findByText('Event 1');

        fireEvent.change(screen.getByPlaceholderText('Filter Events'), { target: { value: 'Event 1' } });

        await waitFor(() => expect(screen.getByText('Event 1')).toBeInTheDocument());
        expect(screen.queryByText('Event 2')).not.toBeInTheDocument();
    });

    it('filtre les événements par tags', async () => {
        render(<Filter apiUrl="/api/events" showValidationFilter={true} />);

        await screen.findByText('Event 1');

        // Trouvez le champ de sélection des tags et sélectionnez la valeur
        const select = screen.getByRole('combobox', { name: /tags/i });
        fireEvent.mouseDown(select); // Simule un clic pour ouvrir la liste des options

        // Trouvez et cliquez sur l'option Tag1
        const tagOption = screen.getByRole('option', { name: 'Tag1' });
        fireEvent.click(tagOption);

        await waitFor(() => expect(screen.getByText('Event 1')).toBeInTheDocument());
        expect(screen.queryByText('Event 2')).not.toBeInTheDocument();
    });


    it('filtre les événements par statut de validation', async () => {
        render(<Filter apiUrl="/api/events" showValidationFilter={true} />);

        await screen.findByText('Event 1');

        fireEvent.click(screen.getByText('Validé'));

        await waitFor(() => expect(screen.getByText('Event 1')).toBeInTheDocument());
        expect(screen.queryByText('Event 2')).not.toBeInTheDocument();

        fireEvent.click(screen.getByText(/À validé/i)); // Ajustez le texte si nécessaire

        await waitFor(() => expect(screen.queryByText('Event 1')).not.toBeInTheDocument());
        expect(screen.getByText('Event 2')).toBeInTheDocument();
    });


    it('rendra correctement sans filtre de validation', async () => {
        render(<Filter apiUrl="/api/events" showValidationFilter={false} />);

        // Attendez que les événements soient affichés
        await screen.findByText('Event 1');

        // Les événements avec isValid: false ne doivent pas être affichés
        await waitFor(() => expect(screen.queryByText('Event 2')).not.toBeInTheDocument());

        // Les filtres de validation ne sont pas affichés
        expect(screen.queryByText('Validé')).not.toBeInTheDocument();
        expect(screen.queryByText('À valider')).not.toBeInTheDocument();

        // Assurez-vous que l'événement valide est affiché
        expect(screen.getByText('Event 1')).toBeInTheDocument();
    });
});
