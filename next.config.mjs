import nextPWA from "@ducanh2912/next-pwa";
import withPlugins from 'next-compose-plugins';
import withFonts from 'next-fonts';

const withPWA = nextPWA({
	dest: "public",
	cacheOnFrontEndNav: true,
	aggressiveFrontEndNavCaching: true,
	reloadOnOnline: true,
	swcMinify: true,
	workboxOptions: {
		disableDevLogs: true,
	},
});

/** @type {import('next').NextConfig} */
const nextConfig = withFonts({
	webpack(config, options) {
		return config;
	}
});

const combinedConfig = withPlugins(
	[
		withPWA,
		withFonts
	],
	nextConfig
);

export default combinedConfig;
