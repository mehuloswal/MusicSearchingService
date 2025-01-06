import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react';
import { Track } from '../types';

interface FavoritesContextValue {
	favorites: Track[];
	toggleFavorite: (track: Track) => void;
}

const FavoritesContext = createContext<
	FavoritesContextValue | undefined
>(undefined);

export const FavoritesProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [favorites, setFavorites] = useState<Track[]>(() => {
		try {
			const saved = localStorage.getItem('favorites');
			if (saved) {
				const parsed = JSON.parse(saved);
				return Array.isArray(parsed) ? parsed : [];
			}
		} catch (error) {
			console.error(
				'Failed to load favorites from localStorage:',
				error
			);
		}
		return [];
	});

	useEffect(() => {
		try {
			const saved = localStorage.getItem('favorites');
			if (saved) {
				const parsed = JSON.parse(saved);
				if (Array.isArray(parsed)) {
					setFavorites(parsed);
				}
			}
		} catch (error) {
			console.error(
				'Failed to load favorites from localStorage:',
				error
			);
			
			localStorage.removeItem('favorites');
		}
	}, []);

	useEffect(() => {
		try {
			localStorage.setItem(
				'favorites',
				JSON.stringify(favorites)
			);
		} catch (error) {
			console.error(
				'Failed to save favorites to localStorage:',
				error
			);
		}
	}, [favorites]);

	const toggleFavorite = (track: Track) => {
		setFavorites((prev) => {
			const isFav = prev.find((t) => t.id === track.id);
			if (isFav) return prev.filter((t) => t.id !== track.id);
			return [...prev, track];
		});
	};

	return (
		<FavoritesContext.Provider
			value={{ favorites, toggleFavorite }}
		>
			{children}
		</FavoritesContext.Provider>
	);
};

export const useFavorites = (): FavoritesContextValue => {
	const context = useContext(FavoritesContext);
	if (!context)
		throw new Error(
			'useFavorites must be used within FavoritesProvider'
		);
	return context;
};
