import Image from 'next/image';
import logo from '@images/Logo.png';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { useMount } from 'hooks/useMount';

const Login = () => {
  const router = useRouter();
  const { mounted } = useMount(() => router.replace(router.asPath));

  const { isConnecting } = useAccount({
    onConnect: () => {
      router.push({
        pathname: '/',
      });
    },
  });

  if (!mounted.current) return null;

  return (
    <div className='flex h-screen'>
      <div className='bg-[#f4f4f4] flex justify-center items-center flex-1'>
        <Image src={logo} alt='Logo' width={70} height={44} />
      </div>
      <div className='bg-white flex flex-col justify-center items-center flex-1 gap-10'>
        <h1 className='text-2xl font-bold'>Iniciar sesión con Metamask</h1>
        <ConnectButton
          label={isConnecting ? 'Conectando...' : 'Inicia sesión'}
        />
      </div>
    </div>
  );
};
export default Login;
