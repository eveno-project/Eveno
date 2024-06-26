import withFonts from 'next-fonts';

/** @type {import('next').NextConfig} */
const nextConfig = withFonts({
	webpack(config, options) {
		return config;
	}
});

export default nextConfig;
