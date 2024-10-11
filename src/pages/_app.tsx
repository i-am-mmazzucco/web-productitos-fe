import './globals.css'
import { ProductsProvider } from '@/components/context';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div style={{ backgroundColor: 'rgba(555, 555, 555, 0.063)'}}>
      <Head>
        <link rel="icon" href="../static/productitos-favicon-color.png"/>
      </Head>
      <ProductsProvider>
        <Header/>
        <Component {...pageProps} />
        <Footer />
      </ProductsProvider>
    </ div>
  );
}

export default MyApp;