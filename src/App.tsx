import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { TrackDetailPage } from './pages/TrackDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { FavoritesPage } from './pages/FavoritesPage'; // Import the FavoritesPage
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
	return (
		<FavoritesProvider>
			<BrowserRouter>
				<header className='flex justify-between items-center p-4 bg-gray-800 text-white'>
					<Link to='/' className='text-xl font-bold'>
						Music Searching Service
					</Link>
					<nav>
						<Link
							to='/favorites'
							className='ml-4 text-lg hover:text-gray-300'
						>
							Favorites
						</Link>
					</nav>
				</header>
				<main>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route
							path='/track/:id'
							element={<TrackDetailPage />}
						/>
						<Route
							path='/favorites'
							element={<FavoritesPage />}
						/>
						<Route path='*' element={<NotFoundPage />} />
					</Routes>
				</main>
			</BrowserRouter>
		</FavoritesProvider>
	);
}

export default App;
