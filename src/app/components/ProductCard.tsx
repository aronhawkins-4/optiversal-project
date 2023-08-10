import Image from 'next/image';
import Link from 'next/link';

// Component Props
interface ProductCardProps {
	imageSrc: string;
	imageAlt?: string;
	title?: string;
	link: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, imageAlt, title, link }) => {
	return (
		// Wrap the entire Component in a Link
		<Link
			href={`https://target.com${link}`}
			target='_blank'
			className='bg-gray-800 rounded-xl overflow-hidden group border-slate-400 border'
		>
			{/* Image wrapper to keep constant aspect-ratio */}
			<div className='relative w-full h-0 pb-[100%]'>
				{/* Featured Product Image */}
				<Image
					src={imageSrc}
					fill
					alt={imageAlt || 'Product Image'}
					className='group-hover:scale-110 transition-all duration-300 object-cover object-top'
					loading='lazy'
					sizes='any'
				/>
			</div>
			{/* Product Title */}
			<h3 className='text-gray-100 p-4 bg-gradient-to-br from-slate-800 to-slate-600 z-10 relative h-full'>
				{title?.replace('&#39;s', "'s").replace('&#8482;', '™').replace('&#38;', '&') || 'No Title'}
			</h3>
		</Link>
	);
};
