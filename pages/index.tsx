'use client';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMount } from 'hooks/useMount';
import { Drops } from '@components/sections/Drops';
import { Poaps } from '@components/sections/Poaps';
import Head from 'next/head';
import { useAuthContext } from '@context/auth/AuthContext';
import { useLocalStorage } from 'hooks/storage/useLocalStorage';

const Home: NextPage = () => {
  const router = useRouter();
  const { address } = useAuthContext();
  const { jwt } = useAuthContext();
  const { mounted } = useMount(() => router.replace(router.asPath));

  if (!mounted.current) return null;

  if (!jwt) {
    router.push('/login');
  }

  return (
    <>
      <Head>
        <title>Home | Soulmate Collectibles</title>
      </Head>
      <div className='flex h-[calc(100vh-1rem)] overflow-y-hidden'>
        <Drops />
        <Poaps />
      </div>
    </>
  );
};

export default Home;
