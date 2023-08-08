'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Product } from '../types/types';

// Component Props Interface
interface FormProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	setProducts: (products: Product[] | null) => void;
	fetchProducts: (searchQuery: string) => void;
	disabled: boolean;
}

// Form Input Interface
interface IFormInput {
	query: string;
}

export const Form: React.FC<FormProps> = ({ searchQuery, setSearchQuery, setProducts, fetchProducts, disabled }) => {
	// Used to determine if text input is empty
	const [isEmpty, setIsEmpty] = useState(true);

	// Handle form input and submission
	const { register, handleSubmit } = useForm<IFormInput>();

	// Form submission handler
	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		fetchProducts(data.query);
	};

	return (
		<form
			className={`w-full max-w-sm ${disabled && 'pointer-events-none opacity-75'}`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='flex items-center border-b border-gray-200 py-2 relative'>
				{/* Text Input */}
				<input
					{...register('query', {
						onChange: (e) => {
							setSearchQuery(e.target.value);
							if (e.target.value !== ' ' && e.target.value !== '' && e.target.value !== undefined) {
								setIsEmpty(false);
							} else {
								setIsEmpty(true);
							}
						},
					})}
					value={searchQuery}
					className={`peer appearance-none bg-transparent border-none w-full text-gray-100 mr-3 py-1 px-2 leading-tight focus:outline-none ${disabled && 'opacity-50'}`}
					disabled={disabled}
					type='text'
					aria-label='Full name'
					placeholder=' '
				/>

				{/* Label for Text Input */}
				<label className='absolute left-2 top-2 scale-50 translate-y-[-50%] pointer-events-none text-gray-300 origin-top-left transition-all peer-focus:scale-50 peer-focus:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-[50%]'>
					Search for Products
				</label>

				{/* Submit Button */}
				<button
					className={`flex-shrink-0 bg-gray-200 hover:bg-gray-800 border-gray-200 hover:border-gray-800 text-sm border-4 text-gray-900 hover:text-gray-200 py-1 px-2 rounded transition-all ${
						isEmpty && 'pointer-events-none opacity-50'
					}  ${disabled && 'pointer-events-none opacity-50'}`}
					type='submit'
					onClick={() => {
						// Reset Products Array
						setProducts([]);
					}}
					disabled={isEmpty}
				>
					Search
				</button>

				{/* Clear Button */}
				<button
					className={`flex-shrink-0 border-transparent border-4 text-gray-200 hover:text-gray-400 text-sm py-1 px-2 rounded transition-all ${
						disabled && 'pointer-events-none text-gray-400'
					}`}
					type='button'
					onClick={() => {
						// Reset Products Array
						setProducts(null);
						// Reset Input Text Box
						setSearchQuery('');
					}}
					disabled={disabled}
				>
					Clear
				</button>
			</div>
		</form>
	);
};
