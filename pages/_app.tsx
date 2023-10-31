import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { NavBar } from '@components/sections/Navbar';
import { Toaster } from '@components/ui/toaster';
import { AuthContextProvider } from '@context/auth/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  if (router.pathname === '/login') {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Component {...pageProps} />
          <Toaster />
        </AuthContextProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <NavBar />
        <Component {...pageProps} />
        <Toaster />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
