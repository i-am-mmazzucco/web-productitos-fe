import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { ProductsContext } from "@/components/context";
import GoogleMaps from "@/components/google-maps";

const Product = () => {
	const router = useRouter();
	const { id } = router.query;

	const { products } = React.useContext(ProductsContext);
	
	const product = products.find(prod => JSON.stringify(prod.id) === id);

	return (
		<>
			<Head>
        <title>Product name</title>
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
					zIndex: '1000'
				}}>
					<GoogleMaps styles={{
						width: '100%',
						height: '100%',
						borderRadius: '18px'
					}} />
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
						<h2 style={{ margin: '0 0 10px 0', width: '100%', display: 'flex', justifyContent: 'center' }}>COCA COLA</h2>
						<div style={{
							height: '100%',
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							fontSize: '18px',
						}}>
							<img src={product?.imageUrl} alt="Product" style={{ width: '100%', height: '100%', borderRadius: '18px' }} />
						</div>
					</div>
					<div style={{
						padding: '10px',
					}}>
						<h3 style={{ margin: '0 0 10px 0', width: '100%', display: 'flex', justifyContent: 'center' }}>TIENDAS</h3>
						<ul style={{
							listStyle: 'none',
							padding: '0',
							margin: '0',
						}}>
							{[...Array(7)].map((_, index) => (
								<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
									<li key={index} style={{
										padding: '5px 0',
										color: '#1d1d1f', 
										fontWeight: 'bold',
										width: '42%',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										alignContent: 'center'
									}}>
										PUNTO CERO
									</li>
									<li key={index} style={{
										padding: '5px 0',
										color: '#1d1d1f', 
										fontWeight: 'bold',
										width: '29%',
									}}>
										📍 3km's
									</li>
									<li key={index} style={{
										padding: '5px 0',
										color: '#1d1d1f', 
										fontWeight: 'bold',
										width: '29%'
									}}>
										💲 {(Math.random() * 100).toFixed(2)}
									</li>
								</div>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

export default Product;