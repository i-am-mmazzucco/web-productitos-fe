// haversine is a formula for determine the distance between two points on a sphere given their longitudes and latitudes.

export const getHaversine = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
	const toRad = (angle: number) => (angle * Math.PI) / 180;
	const R = 6371; // This is the radius of the earth

	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return R * c;
};