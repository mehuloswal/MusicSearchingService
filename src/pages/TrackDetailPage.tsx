import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTrack } from '../api';
import { Track } from '../types';

export const TrackDetailPage = () => {
	const { id } = useParams<{ id: string }>();
	const [track, setTrack] = useState<Track | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTrack = async () => {
			if (!id) return;
			setLoading(true);
			setError(null);
			try {
				const foundTrack = await getTrack(id);
				if (foundTrack) {
					setTrack(foundTrack);
				} else {
					setError('Track not found.');
				}
			} catch (error) {
				console.error('Error fetching track details:', error);
				setError('Failed to load track details.');
			} finally {
				setLoading(false);
			}
		};

		fetchTrack();
	}, [id]);

	if (loading) return <div className='p-6'>Loading...</div>;
	if (error) return <div className='p-6 text-red-500'>{error}</div>;
	if (!track)
		return <div className='p-6'>No track data available.</div>;

	return (
		<div className='p-6'>
			<h1 className='text-3xl font-bold mb-4'>{track.name}</h1>
			<p className='text-lg mb-2'>
				Artist(s): {track.artists.join(', ')}
			</p>
			<p className='text-lg mb-4'>Album: {track.album}</p>
			{track.artworkUrl && (
				<img
					src={track.artworkUrl}
					alt={track.album}
					className='w-64 h-64 mb-4 rounded'
				/>
			)}
			{track.previewUrl ? (
				<audio controls className='w-full mt-4'>
					<source
						src={track.previewUrl}
						type='audio/mpeg'
					/>
				</audio>
			) : (
				<p className='mt-4 text-gray-300'>
					No preview available.
				</p>
			)}
		</div>
	);
};
