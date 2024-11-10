/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY, 
    beUrl: process.env.NEXT_PUBLIC_BE_URL, 
  }
};

export default nextConfig;
