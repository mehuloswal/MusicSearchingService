import React, { ChangeEvent, FC } from 'react';

interface SearchBarProps {
	onSearch: (query: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onSearch(e.target.value);
	};

	return (
		<input
			type='text'
			placeholder='Search for tracks or artists...'
			onChange={handleChange}
			className='border p-2 w-full rounded-md bg-gray-700 text-white placeholder-gray-400'
		/>
	);
};
