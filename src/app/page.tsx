'use client';

import axios from 'axios';
import { ProductCard } from './components/ProductCard';
import { useState, useCallback } from 'react';
import { Form } from './components/Form';
import { CardLoader } from './components/CardLoader';
import { Product } from './types/types';

export default function Home() {
	// Product State
	const [products, setProducts] = useState<Product[] | null>(null);

	// Search Query State
	const [searchQuery, setSearchQuery] = useState('');

	// Loading State
	const [isLoading, setIsLoading] = useState(false);

	// Function to fetch products from Target API
	const fetchProducts = useCallback((query: string): any => {
		setIsLoading(true);
		axios
			.get(`/api/products?search_term=${query}`)
			.then((response) => {
				setProducts(response.data);
				setIsLoading(false);
			})
			.catch((error) => {
				setProducts([]);
				setIsLoading(false);
				alert(error.message);
			});
	}, []);

	return (
		<main className='p-8 md:p-16 lg:p-32 h-full w-full flex flex-col gap-8 items-center'>
			{/* Search Form */}
			<Form
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				setProducts={setProducts}
				fetchProducts={fetchProducts}
				disabled={isLoading}
			/>

			{/* Shown when loading */}
			{isLoading && <CardLoader />}

			{/* Shown when no results are found */}
			{products && products.length === 0 && !isLoading && <h2 className='text-xl'>No results.</h2>}

			{/* Shown when results are found */}
			{products && products.length > 0 && (
				<div className='grid grid-cols-1 gap-4 w-full lg:grid-cols-3 md:grid-cols-2'>
					{products.slice(0, 9).map((product: any) => (
						<ProductCard
							key={product.product.tcin}
							title={product.product.title}
							imageSrc={product.product.main_image}
							imageAlt={product.product.title}
							link={product.product.link}
						/>
					))}
				</div>
			)}
		</main>
	);
}
