import React, { FC } from 'react';
import { Track } from '../types';
import { TrackItem } from './TrackItem';

interface TrackListProps {
	tracks: Track[];
}

export const TrackList: FC<TrackListProps> = ({ tracks }) => {
	return (
		<div className='max-h-[60vh] overflow-auto mt-4 scrollbar-thumb-gray-500 scrollbar-track-gray-700 scrollbar-thin'>
			{tracks.map((track) => (
				<TrackItem key={track.id} track={track} />
			))}
		</div>
	);
};
