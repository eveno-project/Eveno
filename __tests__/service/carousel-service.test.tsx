import React from 'react';
import { render, act } from '@testing-library/react';
import { EmblaCarouselType } from 'embla-carousel';
import { useDotButton } from '@services/carousel';

type MockEmblaCarouselType = Partial<EmblaCarouselType> & {
	on: jest.Mock;
	triggerSelectEvent?: () => void;
	triggerReInitEvent?: () => void;
};

// Test component to use the hook
const TestComponent = ({ emblaApi, onButtonClick }: { emblaApi: MockEmblaCarouselType, onButtonClick?: (emblaApi: EmblaCarouselType) => void }) => {
	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi as EmblaCarouselType, onButtonClick);

	return (
		<div>
			<button data-testid="dot-button" onClick={() => onDotButtonClick(1)}>Dot Button</button>
			<div data-testid="selected-index">{selectedIndex}</div>
			<div data-testid="scroll-snaps">{JSON.stringify(scrollSnaps)}</div>
		</div>
	);
};

describe('useDotButton', () => {
	let mockEmblaApi: MockEmblaCarouselType;

	beforeEach(() => {
		mockEmblaApi = {
			scrollTo: jest.fn(),
			scrollSnapList: jest.fn().mockReturnValue([0, 1, 2]),
			selectedScrollSnap: jest.fn().mockReturnValue(0),
			on: jest.fn().mockImplementation((event, handler) => {
				if (event === 'select') {
					mockEmblaApi.triggerSelectEvent = () => handler(mockEmblaApi as EmblaCarouselType);
				}
				if (event === 'reInit') {
					mockEmblaApi.triggerReInitEvent = () => handler(mockEmblaApi as EmblaCarouselType);
				}
				return mockEmblaApi as EmblaCarouselType;
			}),
		};
	});

	it('should initialize scroll snaps and selected index on mount', () => {
		const { getByTestId } = render(<TestComponent emblaApi={mockEmblaApi} />);

		expect(getByTestId('scroll-snaps').textContent).toBe(JSON.stringify([0, 1, 2]));
		expect(getByTestId('selected-index').textContent).toBe('0');
	});

	it('should handle dot button click correctly', () => {
		const { getByTestId } = render(<TestComponent emblaApi={mockEmblaApi} />);

		act(() => {
			getByTestId('dot-button').click();
		});

		expect(mockEmblaApi.scrollTo).toHaveBeenCalledWith(1);
	});

	it('should call onButtonClick callback if provided', () => {
		const onButtonClick = jest.fn();
		const { getByTestId } = render(<TestComponent emblaApi={mockEmblaApi} onButtonClick={onButtonClick} />);

		act(() => {
			getByTestId('dot-button').click();
		});

		expect(mockEmblaApi.scrollTo).toHaveBeenCalledWith(1);
		expect(onButtonClick).toHaveBeenCalledWith(mockEmblaApi);
	});

	it('should update selected index when emblaApi triggers "select" event', () => {
		const { getByTestId } = render(<TestComponent emblaApi={mockEmblaApi} />);

		act(() => {
			// Mock the return value for selectedScrollSnap to reflect the expected state
			(mockEmblaApi.selectedScrollSnap as jest.Mock).mockReturnValue(1);

			// Simulate the select event
			if (mockEmblaApi.triggerSelectEvent) {
				mockEmblaApi.triggerSelectEvent();
			}
		});

		// Allow state to update
		expect(getByTestId('selected-index').textContent).toBe('1');
	});

	it('should update scroll snaps when emblaApi triggers "reInit" event', () => {
		const { getByTestId } = render(<TestComponent emblaApi={mockEmblaApi} />);

		act(() => {
			// Update the mock return value for scrollSnapList
			(mockEmblaApi.scrollSnapList as jest.Mock).mockReturnValue([0, 1, 2]);

			// Simulate the reInit event
			if (mockEmblaApi.triggerReInitEvent) {
				mockEmblaApi.triggerReInitEvent();
			}
		});

		// Allow state to update
		expect(getByTestId('scroll-snaps').textContent).toBe(JSON.stringify([0, 1, 2]));
	});
});
