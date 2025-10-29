import type { AppProps } from 'next/app'; 
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/app.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="main-container">
      <Header />
      <Component {...pageProps} />
      <Footer />

    </div>
  );
}

