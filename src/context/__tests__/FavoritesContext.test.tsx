import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FavoritesProvider, useFavorites } from '../FavoritesContext';
import { Track } from '../../types';

const TestComponent = () => {
	const { favorites, toggleFavorite } = useFavorites();
	const sampleTrack: Track = {
		id: '1',
		name: 'Sample Track',
		artists: ['Sample Artist'],
		album: 'Sample Album',
		artworkUrl: 'https://via.placeholder.com/150',
		previewUrl: 'https://sample.com/preview.mp3',
	};

	return (
		<div>
			<button onClick={() => toggleFavorite(sampleTrack)}>
				Toggle Favorite
			</button>
			<ul>
				{favorites.map((track) => (
					<li key={track.id}>{track.name}</li>
				))}
			</ul>
		</div>
	);
};

describe('FavoritesContext', () => {
	it('adds and removes favorites correctly', () => {
		render(
			<FavoritesProvider>
				<TestComponent />
			</FavoritesProvider>
		);

		const button = screen.getByText(/toggle favorite/i);
		fireEvent.click(button);

		expect(screen.getByText('Sample Track')).toBeInTheDocument();

		fireEvent.click(button);

		expect(
			screen.queryByText('Sample Track')
		).not.toBeInTheDocument();
	});
});
