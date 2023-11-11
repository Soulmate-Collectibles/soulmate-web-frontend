'use client';

import { Button } from '@components/ui/button';
import { useAuthContext } from '@context/auth/AuthContext';
import { UUID } from 'crypto';
import { useMintDrop } from 'hooks/mutation/mint/useMintDrop';
import { useGetMintDrop } from 'hooks/query/mint/useGetMintDrop';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useToast } from '@components/ui/use-toast';
import { BiLinkExternal } from 'react-icons/bi';
import Link from 'next/link';
const MintPage = () => {
  const router = useRouter();

  const { data, isLoading, refetch } = useGetMintDrop(router.query.id as UUID);
  const { address } = useAuthContext();
  const mutation = useMintDrop({
    onSuccess: async (data) => {
      const { txHash } = data;
      await refetch?.();
      toast({
        title: 'NFT Minted!',
        description: (
          <Link
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target='_blank'
            className='flex gap-2 text-primary items-center'
          >
            <BiLinkExternal /> Check on Ethercan
          </Link>
        ),
      });
    },
    onError: async () => {
      console.log('AAAAAAAAAAAAAAA');
    },
  });

  useEffect(() => {
    if (router.query.id) {
      refetch();
    }
  }, [router.query.id, refetch]);
  const { toast } = useToast();

  const mintDrop = async () => {
    if (!router.query.id || !address) {
      return;
    }
    const { data: txData } = await mutation.mutateAsync({
      id: router.query.id,
      address,
    });
    /* console.log(mutation.data, txData);

    if (mutation.data) {
      const { data: tx } = mutation;
      toast({
        title: 'NFT Minted!',
        description: (
          <Link
            href={`https://sepolia.etherscan.io/tx/${tx.txHash}`}
            target='_blank'
            className='flex gap-2 text-primary items-center'
          >
            <BiLinkExternal /> Check on Ethercan
          </Link>
        ),
      });
    } */
  };

  return (
    <>
      <Head>
        <title>Minting | Soulmate Collectibles</title>
      </Head>
      <div className='h-full'>
        <div className='flex justify-center items-center h-[calc(100vh-4rem)]'>
          <div className='flex'>
            <div className='w-[400px] h-[400px] p-5 bg-white m-2.5 flex flex-col items-center justify-center border border-black'>
              <h1 className='scroll-m-20 text-4xl font-bold tracking-tight mb-5'>
                Mint your drop
              </h1>
              <Button
                disabled={mutation.isLoading || data?.remainingUses <= 0}
                variant='outline'
                onClick={mintDrop}
              >
                {mutation.isLoading ? 'Minting...' : 'Mint drop'}
              </Button>
            </div>
            <div
              className={`relative w-[400px] h-[400px] p-5 bg-white m-2.5 flex flex-col items-center justify-center border border-black bg-[rgba(255,255,255,0.5)] bg-blend-multiply`}
            >
              {isLoading ? (
                <p>Cargando...</p>
              ) : (
                <>
                  {data?.drop?.image ? (
                    <div className='absolute inset-0 z-0 blur-md'>
                      <Image
                        src={(data?.drop?.image as string).replace(
                          'ipfs://',
                          'https://ipfs.io/ipfs/'
                        )}
                        layout='fill'
                        objectFit='cover'
                        alt='Fondo'
                      />
                    </div>
                  ) : null}
                  <div className='z-40 text-center'>
                    <h1 className='scroll-m-20 text-4xl font-bold tracking-tight mb-5 '>
                      {data?.drop?.title}
                    </h1>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MintPage;
