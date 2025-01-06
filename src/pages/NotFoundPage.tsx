import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
	<div className='p-6'>
		<h1 className='text-3xl font-bold mb-4'>
			404 - Page Not Found
		</h1>
		<Link to='/' className='text-blue-500'>
			Go back to Home
		</Link>
	</div>
);
