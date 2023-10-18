import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  base,
  zora,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { NavBar } from '@components/sections/Navbar';
import { Toaster } from '@components/ui/toaster';
import { AuthContextProvider } from '@context/auth/AuthContext';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  if (router.pathname === '/login') {
    return (
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={wagmiConfig}>
          <AuthContextProvider>
            <Component {...pageProps} />
            <Toaster />
          </AuthContextProvider>
        </WagmiConfig>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <AuthContextProvider>
          <NavBar />
          <Component {...pageProps} />
          <Toaster />
        </AuthContextProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default MyApp;
