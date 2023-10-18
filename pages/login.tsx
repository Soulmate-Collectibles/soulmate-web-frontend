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

const Login = () => {
  const router = useRouter();
  const { mounted } = useMount(() => router.replace(router.asPath));
  const [address, setAddress] = useState('');
  const [signedMessage, setSignedMessage] = useState('');
  const [message, setMessage] = useState('');

  const { isConnecting } = useAccount({
    onConnect: () => {
      router.push({
        pathname: '/',
      });
    },
  });

  const getAccountInfo = async () => {
    // Ensure MetaMask or other web3 provider is installed
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const address = await signer.getAddress();

      const nonce = 'asdasd'; // Assuming you have the getNonce function defined elsewhere

      const message = `This nonce is signed using metamask ${nonce}`;
      const signedMessage = await signer.signMessage(message);

      console.log(address, signedMessage, message);

      setAddress(address);
      setMessage(message);
      setSignedMessage(signedMessage);
    } else {
      console.log('MetaMask (or another web3 provider) is not installed');
    }
  };

  const getAddres = async () => {
    if (window.ethereum !== undefined) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log(accounts);
    }
  };

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
          <Button onClick={getAccountInfo}>Iniciar sesión</Button>
        </div>
      </div>
    </>
  );
};
export default Login;
