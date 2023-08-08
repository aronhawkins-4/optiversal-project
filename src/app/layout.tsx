import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Optiversal Project',
	description: 'Test project for Optiversal interview',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang='en'
			className='min-w-screen min-h-screen'
		>
			<body className='w-full h-full overflow-scroll bg-gradient-to-r from-gray-700 via-gray-900 to-black'>{children}</body>
		</html>
	);
}
