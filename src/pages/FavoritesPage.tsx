import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { TrackList } from '../components/TrackList';

export const FavoritesPage = () => {
	const { favorites } = useFavorites();

	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>
				Your Favorites
			</h1>
			{favorites.length === 0 ? (
				<p>You have no favorite tracks yet.</p>
			) : (
				<TrackList tracks={favorites} />
			)}
		</div>
	);
};
