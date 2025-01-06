// src/api/spotifyApi.ts
import { Track } from '../types';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

let accessToken: string | null = null;
let tokenExpiresAt: number = 0;

async function getAccessToken(): Promise<string> {
	if (accessToken && Date.now() < tokenExpiresAt) {
		return accessToken;
	}

	const response = await fetch(
		'https://accounts.spotify.com/api/token',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization:
					'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
			},
			body: 'grant_type=client_credentials',
		}
	);

	if (!response.ok) {
		throw new Error('Failed to retrieve Spotify access token.');
	}

	const data = await response.json();
	accessToken = data.access_token;
	console.log('Access token:', accessToken);
	tokenExpiresAt = Date.now() + data.expires_in * 1000;
	return accessToken;
}

export async function searchTracks(query: string): Promise<Track[]> {
	try {
		const token = await getAccessToken();
		const response = await fetch(
			`https://api.spotify.com/v1/search?q=${encodeURIComponent(
				query
			)}&type=track&limit=25`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error('Failed to fetch tracks from Spotify.');
		}

		const data = await response.json();
		return data.tracks.items.map((item: any) => ({
			id: item.id,
			name: item.name,
			artists: item.artists.map((artist: any) => artist.name),
			album: item.album.name,
			artworkUrl: item.album.images[0]?.url || '',
			previewUrl: item.preview_url || '',
		}));
	} catch (error) {
		console.error('Error in searchTracks:', error);
		throw error;
	}
}

export async function getTrack(id: string): Promise<Track | null> {
	try {
		const token = await getAccessToken();
		const response = await fetch(
			`https://api.spotify.com/v1/tracks/${id}?market=US`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!response.ok) {
			console.error(
				'Failed to fetch track:',
				response.statusText
			);
			return null;
		}

		const data = await response.json();
		return {
			id: data.id,
			name: data.name,
			artists: data.artists.map((artist: any) => artist.name),
			album: data.album.name,
			artworkUrl: data.album.images[0]?.url || '',
			previewUrl: data.preview_url || '',
		};
	} catch (error) {
		console.error('Error in getTrack:', error);
		return null;
	}
}
