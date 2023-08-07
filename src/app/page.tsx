import { ProductCard } from './components/ProductCard';

export default function Home() {
	return (
		<main>
			<div className='grid grid-cols-3'>
				<ProductCard
					imageSrc=''
					imageAlt=''
					title='title'
					link=''
				/>
				<ProductCard
					imageSrc=''
					imageAlt=''
					title='title'
					link=''
				/>
				<ProductCard
					imageSrc=''
					imageAlt=''
					title='title'
					link=''
				/>
			</div>
		</main>
	);
}
