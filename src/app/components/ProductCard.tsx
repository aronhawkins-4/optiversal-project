import Image from 'next/image';

interface ProductCardProps {
	imageSrc: string;
	imageAlt: string;
	title: string;
	link: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, imageAlt, title, link }) => {
	return (
		<div>
			<div className='relative w-full h-0 pb-[56.25%]'>
				<Image
					src={imageSrc}
					fill
					alt={imageAlt}
				/>
			</div>
		</div>
	);
};
