import React, { useEffect, useState } from 'react';
import { searchTracks } from '../api';
import { Track } from '../types';
import { SearchBar } from '../components/SearchBar';
import { TrackList } from '../components/TrackList';

export const HomePage = () => {
	const [query, setQuery] = useState('');
	const [tracks, setTracks] = useState<Track[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const delayDebounce = setTimeout(async () => {
			if (query.trim() === '') {
				setTracks([]);
				return;
			}
			setLoading(true);
			try {
				const results = await searchTracks(query);
				setTracks(results);
			} catch (error) {
				console.error('Error fetching tracks:', error);
			} finally {
				setLoading(false);
			}
		}, 500);

		return () => clearTimeout(delayDebounce);
	}, [query]);

	return (
		<div className='p-6'>
			<SearchBar onSearch={setQuery} />
			{loading ? (
				<p className='mt-4'>Loading...</p>
			) : (
				<TrackList tracks={tracks} />
			)}
		</div>
	);
};
