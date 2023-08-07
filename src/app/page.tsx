'use client';

import axios from 'axios';
import { ProductCard } from './components/ProductCard';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';

interface IFormInput {
	query: string;
}

export default function Home() {
	// const apiKey = process.env.NEXT_PUBLIC_RED_CIRCLE_API_KEY;
	// const apiUrl = 'https://api.redcircleapi.com/request';
	const [products, setProducts] = useState();

	const [searchQuery, setSearchQuery] = useState('');
	const { register, handleSubmit } = useForm<IFormInput>();
	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		setSearchQuery('');
		// const params = {
		// 	api_key: process.env.NEXT_PUBLIC_RED_CIRCLE_API_KEY,
		// 	type: 'search',
		// 	search_term: data.query,
		// 	sort_by: 'best_seller',
		// };
		// axios
		// 	.get(apiUrl, { params })
		// 	.then((response) => {
		// 		console.log(JSON.stringify(response.data.search_results));
		// 	})
		// 	.catch((error) => {
		// 		// catch and print the error
		// 		console.log(error);
		// 	});
		axios
			.get(`/api/products/${data.query}`)
			.then((response) => {
				console.log(response.data.search_results);
				setProducts(response.data.search_results);
			})
			.catch((error) => {
				// catch and print the error
				console.log(error);
			});
	};
	return (
		<main>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register('query', {
						onChange: (e) => {
							setSearchQuery(e.target.value);
						},
					})}
					value={searchQuery}
					placeholder='Search...'
					className='text-gray-900'
				/>
				<input type='submit' />
			</form>
			<div className='grid grid-cols-3'></div>
		</main>
	);
}
