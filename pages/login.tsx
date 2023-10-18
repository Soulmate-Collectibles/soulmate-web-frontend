import Image from 'next/image';
import logo from '@images/Logo.png';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { useMount } from 'hooks/useMount';
import Head from 'next/head';
import { Button } from '@components/ui/button';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useGetNonce } from 'hooks/query/user/useGetNonce';
import { useCreateUser } from 'hooks/mutation/user/useCreateUser';
import { useToast } from '@components/ui/use-toast';
import { useAuthContext } from '@context/auth/AuthContext';
import { useGetJwt } from 'hooks/query/auth/useGetJwt';

const Login = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { mounted } = useMount(() => router.replace(router.asPath));
  const { address, nonce, setAddress, setNonce, setJwt } = useAuthContext();
  const [txSigner, setTxSigner] = useState<ethers.Signer>();
  const [signedMessage, setSignedMessage] = useState<string>('');

  const { isLoading: isNonceLoading, refetch: getNonce } = useGetNonce(address);
  const { isLoading: isUserLoading, ...mutation } = useCreateUser();
  const { isLoading: isJwtLoading, refetch: getJwt } = useGetJwt({
    address,
    nonce,
    signedMessage,
  });

  const { isConnecting } = useAccount({
    onConnect: () => {
      router.push({
        pathname: '/',
      });
    },
  });

  const getAccountInfo = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(
        window.ethereum as ethers.Eip1193Provider
      );
      const signer = await provider.getSigner();
      setTxSigner(signer);

      const signerAddress = await signer.getAddress();
      setAddress(signerAddress);
    } else {
      toast({
        title: 'Houston, tenemos un problema',
        description: `No se ha detectado Metamask en tu navegador`,
      });
    }
  };

  useEffect(() => {
    const getAccount = async () => {
      if (address) {
        const { data: response } = await getNonce();
        if (response && response.nonce) {
          setNonce(response.nonce);
        } else {
          await mutation.mutateAsync({ address });
          setNonce(mutation.data?.nonce);
        }

        try {
          const signed = await txSigner?.signMessage(response.nonce);
          if (signed) {
            setSignedMessage(signed);
          }
        } catch (e) {
          toast({
            title: 'Houston, tenemos un problema',
            description: 'Se ha rechazado la firma del mensaje',
          });
        }
      }
    };
    getAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    const getAccessToken = async () => {
      if (signedMessage) {
        const { data: jwtResponse } = await getJwt();
        if (jwtResponse && jwtResponse.access_token) {
          setJwt(jwtResponse.access_token);
          router.push('/');
        }
      }
    };

    getAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signedMessage]);

  if (!mounted.current) return null;

  return (
    <>
      <Head>
        <title>Login | Soulmate Collectibles</title>
      </Head>
      <div className='flex h-screen'>
        <div className='bg-[#f4f4f4] flex justify-center items-center flex-1'>
          <Image src={logo} alt='Logo' width={70} height={44} />
        </div>
        <div className='bg-white flex flex-col justify-center items-center flex-1 gap-10'>
          <h1 className='text-2xl font-bold'>Iniciar sesión con Metamask</h1>
          {/* <ConnectButton
            label={isConnecting ? 'Conectando...' : 'Inicia sesión'}
          /> */}
          <Button
            onClick={getAccountInfo}
            disabled={isNonceLoading || isUserLoading || isJwtLoading}
          >
            Iniciar sesión
          </Button>
        </div>
      </div>
    </>
  );
};
export default Login;
