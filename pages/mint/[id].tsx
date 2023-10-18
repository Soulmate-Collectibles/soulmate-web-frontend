import { Button } from '@components/ui/button';
import { UUID } from 'crypto';
import { useMintDrop } from 'hooks/mutation/mint/useMintDrop';
import { useGetMintDrop } from 'hooks/query/mint/useGetMintDrop';
import { useMount } from 'hooks/useMount';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

const contractConfig = {
  address: '0x86fbbb1254c39602a7b067d5ae7e5c2bdfd61a30',
  /* abi, */
} as const;

const MintPage = () => {
  const router = useRouter();
  const { isConnected } = useAccount();

  const { data, isLoading, refetch } = useGetMintDrop(router.query.id as UUID);
  const mutation = useMintDrop({
    onSuccess: async () => {
      await refetch?.();
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

  const { mounted } = useMount();

  const { config: contractWriteConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'mint',
  });

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(contractWriteConfig);

  const {
    data: txData,
    isSuccess: isMinted,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  const mintDrop = () => {
    if (!router.query.id) {
      return;
    }
    mutation.mutate({
      id: router.query.id,
      remainingUses: `${data?.remainingUses - 1}`,
    });
  };

  return (
    <>
      <Head>
        <title>Minting | Soulmate Collectibles</title>
      </Head>
      <div className='h-full'>
        <div style={styles.container}>
          <div style={styles.squaresContainer}>
            <div style={styles.square}>
              <h1 className='scroll-m-20 text-4xl font-bold tracking-tight mb-5'>
                Mint your drop
              </h1>
              <Button
                disabled={mutation.isLoading}
                variant='outline'
                onClick={mintDrop}
              >
                {mutation.isLoading ? 'Minting...' : 'Mint drop'}
              </Button>
            </div>
            <div style={styles.square}>
              {isLoading ? (
                <p>Cargando...</p>
              ) : (
                <>
                  <h1 className='scroll-m-20 text-4xl font-bold tracking-tight mb-5'>
                    {data?.drop?.title}
                  </h1>
                  <p>
                    {mutation.isLoading
                      ? null
                      : `Remaining uses: ${data?.remainingUses}`}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 4rem)',
  },
  squaresContainer: {
    display: 'flex',
  },
  square: {
    width: '400px',
    height: '400px',
    padding: '20px',
    backgroundColor: '#ffffff',
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #000000',
  },
  button: {
    marginTop: '10px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
};

export default MintPage;
