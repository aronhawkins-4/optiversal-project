/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'target.scene7.com',
			},
		],
	},
};

module.exports = nextConfig;
