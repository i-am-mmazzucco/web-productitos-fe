/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY, 
  }
};

export default nextConfig;
