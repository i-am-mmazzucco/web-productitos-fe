/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY, 
    beUrl: process.env.NEXT_PUBLIC_BE_URL, 
  },
  images: {
    domains: ['http2.mlstatic.com'],
  },
};

export default nextConfig;
