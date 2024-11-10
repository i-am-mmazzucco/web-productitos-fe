import React, { useState, useCallback, useRef, HtmlHTMLAttributes } from 'react';
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { ProductsContext } from '../../components/context';

interface FormPriceProps {
  buttonName: string;
}

const containerStyle = {
  width: '100%',
  height: '300px',
};

const center = {
  lat: -31.41952906061211,
  lng: -64.18830497028797,
};

const googleMapsApiKey = process.env.googleMapsApiKey as string;
const url = process.env.BE_URL as string;

const cordobaBounds = {
  north: -31.2,
  south: -31.6,
  east: -64.0,
  west: -64.5,
};

export const FormPrice: React.FC<FormPriceProps> = ({ buttonName }) => {
  const [mapPosition, setMapPosition] = useState<{lat: number, lng: number}>(center);
  const [storeName, setStoreName] = useState<string>('');
  const [product, setProduct] = useState<string>('');

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
    libraries: ['places'],
  });

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const geocoder = useRef<google.maps.Geocoder | null>(null);

  const onLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  }, []);

  const onPlaceChanged = useCallback(() => {
    const place = autocompleteRef.current?.getPlace();
    
    if (place?.types && (place.types.includes("store") || place.types.includes("shopping_mall"))) {
      if (place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setMapPosition({ lat, lng });
        setStoreName(place.name || '');
      }
    } else {
      alert("Por favor selecciona una tienda válida.");
    }
  }, []);

  const onMapClick = useCallback((e: any) => {
    const newLat = e.latLng.lat();
    const newLng = e.latLng.lng();
    setMapPosition({ lat: newLat, lng: newLng });

    if (!geocoder.current) {
      geocoder.current = new google.maps.Geocoder();
    }
    geocoder.current.geocode({ location: { lat: newLat, lng: newLng } }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        setStoreName(results[0].formatted_address);
      }
    });
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    console.log(mapPosition)
    console.log(storeName)
    console.log(product)

    e.preventDefault();
    // try {
    //   const response = await fetch(`${url}/results`, {
    //     method: 'POST',
    //     headers:{
    //        'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(this.state)
    //   });
    //   const data = await response.json();

    //   if (data.statusCode) {
    //     throw new Error(`Was an error posting data. ${JSON.stringify(data)}`)
    //   }

    //   this.props.history.push('/thank-you');
    
    //  } catch (error) {
    //     console.log(error);
    //  }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
  }

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProduct = e.target.value;
    setProduct(selectedProduct);
  };

  const { products } = React.useContext(ProductsContext);

  return (
    <div>
      {isLoaded && (
        <form onSubmit={handleFormSubmit} className="p-4 md:p-5">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nombre de la tienda
              </label>
              <Autocomplete 
                onLoad={onLoad} 
                onPlaceChanged={onPlaceChanged} 
                options={{
                  types:["establishment"],
                  bounds: cordobaBounds,
                  strictBounds: true,
                }}
              >
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Nombre de la tienda"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                />
              </Autocomplete>
            </div>
            <div className="col-span-2">
              <label htmlFor="product" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Producto
              </label>
              <select
                id="product"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                value={product}
                onChange={handleProductChange}
              >
                <option value="">Seleccionar un producto</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Precio producto ($ARS)
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="2999"
                onChange={handlePriceChange}
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Ubicación de la tienda
              </label>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapPosition}
                zoom={15}
                onClick={onMapClick}
              >
                <Marker position={mapPosition} />
              </GoogleMap>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Latitud: {mapPosition.lat}, Longitud: {mapPosition.lng}
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="justify-center align-content: center text-white inline-flex text-center hover:text-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="me-1 -ms-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            {buttonName}
          </button>
        </form>
      )}
    </div>
  );
};
