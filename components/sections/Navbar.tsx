import { Button } from '@components/ui/button';
import { routes } from '@constants/routes';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useLocalStorage } from 'hooks/storage/useLocalStorage';
import { Logo } from 'logos/Logo';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavBar = () => {
  const router = useRouter();

  const [, , removeJwt] = useLocalStorage('jwt');

  const handleLogout = () => {
    removeJwt();
    router.push('/login');
  };

  return (
    <div className='h-[3.5rem] z-[1000] top-0 bg-[#c6b8ff] p-4 flex justify-between items-center relative'>
      <div className='flex flex-1'>
        <Logo />
      </div>
      <div className='flex flex-2 justify-center gap-4'>
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={`text-white ${
              router.pathname === route.path ? 'font-bold' : 'hover:underline'
            } my-0 mx-4 no-underline`}
          >
            {route.name}
          </Link>
        ))}
      </div>
      <div className='flex flex-1 justify-end'>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};

export { NavBar };
