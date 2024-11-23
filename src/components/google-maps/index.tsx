import React from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Library } from './interface';

const libraries: Library[]= ['places'];

const center = {
  lat: -31.41311, // default latitude
  lng: -64.16764, // default longitude
};

interface MarkerProps {
  id: string;
  lat: number;
  long: number;
  name: string;
}

interface GoogleMapsProps {
	styles: Record<string, string>;
  markers: MarkerProps[];
}

const GoogleMaps: React.FC<GoogleMapsProps> = ({ styles, markers}) =>  {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.googleMapsApiKey as string,
    libraries,
  });

	if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }


  return (
		<GoogleMap
			mapContainerStyle={styles}
			zoom={12}
			center={center}
		>
			 {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.long }}
          title={marker.name}
        />
      ))}
		</GoogleMap>
	)
}

export default GoogleMaps;
