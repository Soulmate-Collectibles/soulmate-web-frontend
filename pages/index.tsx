import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { Logo } from '../logos/Logo';
import { useRouter } from 'next/router';
import { useMount } from 'hooks/useMount';
import { Connecting } from '@components/extra/Connecting';
import { useState } from 'react';
import { NavBar } from '@components/sections/Navbar';
import { Drops } from '@components/sections/Drops';
import { Poaps } from '@components/sections/Poaps';

const Home: NextPage = () => {
  const { push, query, ...router } = useRouter();
  const [user, setUser] = useState<{ address: string; drops: any[] }>(
    {} as any
  );
  const [loading, setLoading] = useState(false);
  const { status } = useAccount({
    onDisconnect: () => {
      push('/login');
    },
  });
  const { mounted } = useMount(() => router.replace(router.asPath));

  if (!mounted.current) return null;

  if (status === 'disconnected') {
    push('/login');
    return null;
  }

  if (status !== 'connected') {
    return <Connecting />;
  }

  return (
    <>
      <NavBar />
      <div className='flex h-[calc(100vh-1rem)] overflow-y-hidden'>
        <Drops />
        <Poaps />
      </div>
    </>
  );
};

export default Home;
