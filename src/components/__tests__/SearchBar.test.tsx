import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
	it('renders the search input', () => {
		render(<SearchBar onSearch={() => {}} />);
		const inputElement = screen.getByPlaceholderText(
			/search for tracks or artists/i
		);
		expect(inputElement).toBeInTheDocument();
	});

	it('calls onSearch when input value changes', () => {
		const handleSearch = vi.fn();
		render(<SearchBar onSearch={handleSearch} />);
		const inputElement = screen.getByPlaceholderText(
			/search for tracks or artists/i
		);
		fireEvent.change(inputElement, {
			target: { value: 'Beatles' },
		});
		expect(handleSearch).toHaveBeenCalledWith('Beatles');
	});
});
