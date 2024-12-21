import "@/styles/globals.css";
import { GifProvider } from '@/context/GifContext';

export default function App({ Component, pageProps }) {
  return (
    <GifProvider>
      <Component {...pageProps} />
    </GifProvider>
  );
}