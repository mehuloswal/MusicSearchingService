import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Track } from '../types';
import { useFavorites } from '../context/FavoritesContext';

interface TrackItemProps {
	track: Track;
}

export const TrackItem: FC<TrackItemProps> = ({ track }) => {
	const navigate = useNavigate();
	const { favorites, toggleFavorite } = useFavorites();

	const isFavorite = favorites.some((t) => t.id === track.id);

	const handleFavorite = (e: React.MouseEvent) => {
		e.stopPropagation();
		toggleFavorite(track);
	};

	return (
		<div
			className='flex flex-col md:flex-row items-center justify-between border p-4 mb-2 rounded-lg hover:bg-gray-900 cursor-pointer transition-colors duration-200'
			onClick={() => navigate(`/track/${track.id}`)}
		>
			<div className='flex items-center w-full md:w-auto'>
				<img
					src={track.artworkUrl}
					alt={track.album}
					className='w-16 h-16 mr-4 rounded'
				/>
				<div className='text-left'>
					<p className='font-semibold text-lg text-gray-600'>
						{track.name}
					</p>
					<p className='text-sm text-gray-300'>
						{track.artists.join(', ')}
					</p>
					<p className='text-sm text-gray-400'>
						{track.album}
					</p>
				</div>
			</div>
			<button
				onClick={handleFavorite}
				className={`mt-2 md:mt-0 px-4 py-2 rounded ${
					isFavorite
						? 'bg-red-500 hover:bg-red-600 text-white'
						: 'bg-green-500 hover:bg-green-600 text-white'
				} transition-colors duration-200`}
			>
				{isFavorite ? 'Unfavorite' : 'Favorite'}
			</button>
		</div>
	);
};
