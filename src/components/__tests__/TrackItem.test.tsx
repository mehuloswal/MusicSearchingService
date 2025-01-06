// src/components/__tests__/TrackItem.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TrackItem } from '../TrackItem';
import { Track } from '../../types';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from '../../context/FavoritesContext';

const sampleTrack: Track = {
	id: '1',
	name: 'Sample Track',
	artists: ['Sample Artist'],
	album: 'Sample Album',
	artworkUrl: 'https://via.placeholder.com/150',
	previewUrl: 'https://sample.com/preview.mp3',
};

describe('TrackItem', () => {
	it('renders track information', () => {
		render(
			<FavoritesProvider>
				<BrowserRouter>
					<TrackItem track={sampleTrack} />
				</BrowserRouter>
			</FavoritesProvider>
		);

		expect(screen.getByText('Sample Track')).toBeInTheDocument();
		expect(screen.getByText('Sample Artist')).toBeInTheDocument();
		expect(screen.getByText('Sample Album')).toBeInTheDocument();
		expect(screen.getByRole('img')).toHaveAttribute(
			'src',
			sampleTrack.artworkUrl
		);
		expect(screen.getByText('Favorite')).toBeInTheDocument();
	});

	it('toggles favorite status on button click', () => {
		render(
			<FavoritesProvider>
				<BrowserRouter>
					<TrackItem track={sampleTrack} />
				</BrowserRouter>
			</FavoritesProvider>
		);

		const button = screen.getByText('Favorite');
		fireEvent.click(button);

		expect(screen.getByText('Unfavorite')).toBeInTheDocument();

		fireEvent.click(button);

		expect(screen.getByText('Favorite')).toBeInTheDocument();
	});
});
