import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { ProductsContext } from "@/components/context";
import GoogleMaps from "@/components/google-maps";
import { getHaversine } from "@/helpers/getters";
import Image from "next/image";

const Product = () => {
	const router = useRouter();
	const { id } = router.query;

	const { products } = React.useContext(ProductsContext);
	
	const product = products.find(prod => prod._id === id);
	
	const [userLocation, setUserLocation] = useState<{ lat: number; long: number } | null>(null);
	const [distances, setDistances] = useState<{ [storeId: string]: number }>({});
	const [markers, setMarkers] = useState<
		{ id: string; lat: number; long: number; name: string }[]
	>([]);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setUserLocation({
						lat: position.coords.latitude,
						long: position.coords.longitude,
					});
				},
				(error) => {
					console.error("Error: ", error);
				}
			);
		}
	}, []);

	useEffect(() => {
		if (userLocation && product?.stores) {
			const calculatedDistances = product.stores.reduce((acc, store) => {
				return {
					...acc,
					[store._id]: getHaversine(
						userLocation.lat,
						userLocation.long,
						store.lat,
						store.long
					),
				};
			}, {})
			const storeMarkers = product.stores.map((store) => ({
				id: store._id,
				lat: store.lat,
				long: store.long,
				name: store.name,
			}));

			setMarkers(storeMarkers);
			setDistances(calculatedDistances);
		}
	}, [userLocation, product?.stores]);

	return (
		<>
			<Head>
        <title style={{ fontWeight: 'bold' }}>{product?.name}</title>
      </Head>
			<div style={{
				display: 'flex',
				maxWidth: '1200px', 
				margin: '4% auto', 
				padding: '20px',
				height: '100vh',
			}}>
				<div style={{
					flex: '2',
					marginRight: '20px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					width: '70%',
					height: '90%',
				}}>
					<GoogleMaps 
						styles={{
							width: '100%',
							height: '100%',
							borderRadius: '18px',
						}} 
						markers={markers} 
					/>
				</div>
				<div style={{
					flex: '1',
					display: 'flex',
					flexDirection: 'column',
					width: '30%',
					height: '90%',
					borderRadius: '18px',
					boxShadow: '2px 4px 12px #00000014',
					transition: 'all .3s cubic-bezier(0,0,.5,1)',
				}}>
					<div style={{
						padding: '10px',
						marginBottom: '30px',
					}}>
						<h2 style={{ margin: '0 0 10px 0', width: '100%', display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>{product?.name}</h2>
						<div style={{
							height: '100%',
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							fontSize: '18px',
						}}>
							<Image
								src={product?.imageUrl!} 
								alt="Product" 
								style={{ 
									width: '100%', 
									height: '250px',
									objectFit: 'contain',
									objectPosition: 'center'
								}} 
								width={100}
								height={100}
							/>
						</div>
					</div>
					<div style={{
						padding: '10px',
					}}>
						<h3 style={{ margin: '0 0 10px 0', width: '100%', display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>TIENDAS</h3>
						<ul style={{
							listStyle: 'none',
							padding: '0',
							margin: '0',
						}}>
							{product?.prices.sort((a, b) => a.amount - b.amount).map((price) => {
								const store = product.stores.find(store => store._id === price.store);
								const distance = distances[store?._id!];

								return (
									<div
										key={price._id}
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											width: '100%',
											marginBottom: '10px', // Espacio entre cada fila
											padding: '5px 0',
											borderBottom: '1px solid #e0e0e0', // Línea separadora entre filas
										}}
									>
										<li
											style={{
												padding: '5px 0',
												color: '#1d1d1f',
												fontWeight: 'bold',
												width: '42%',
												display: 'flex',
												justifyContent: 'flex-start',
												alignItems: 'center',
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap', // Mantiene el texto en una línea
											}}
											title={store?.name} // Muestra el nombre completo al pasar el mouse
										>
											{store?.name.toUpperCase()}
										</li>
										<li
											style={{
												padding: '5px 0',
												color: '#1d1d1f',
												fontWeight: 'bold',
												width: '29%',
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
											}}
										>
											📍 {distance ? `${distance.toFixed(2)} km` : '... km'}
										</li>
										<li
											style={{
												padding: '5px 0',
												color: '#1d1d1f',
												fontWeight: 'bold',
												width: '29%',
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
											}}
										>
											💲 {price.amount}
										</li>
									</div>
								)
							})}
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

export default Product;