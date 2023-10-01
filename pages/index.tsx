import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { Logo } from '../logos/Logo';
import { useRouter } from 'next/router';
import { useMount } from 'hooks/useMount';
import Image from 'next/image';
import { Connecting } from '../personal/Connecting';
import ItemList from '../personal/ItemList';
import { routes } from '@constants/routes';

const Home: NextPage = () => {
  const { push, query, ...router } = useRouter();
  const { status } = useAccount({
    onDisconnect: () => {
      push({
        pathname: '/login',
      });
    },
  });
  console.log(status);
  const { mounted } = useMount(() => router.replace(router.asPath));

  const drops = [
    {
      id: 1,
      name: 'Nombre drop de prueba',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image: '/images/Logo.png',
    },
    {
      id: 2,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 3,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 4,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 5,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 6,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 7,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 8,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 9,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 10,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 11,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 12,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 13,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 14,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 15,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 16,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 17,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 18,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 19,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 20,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 21,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 22,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 23,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 24,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 25,
      name: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
  ];

  const poaps = [
    { id: 1, name: 'POAP 1', description: 'Description for POAP 1' },
    { id: 2, name: 'POAP 2', description: 'Description for POAP 2' },
  ];

  if (!mounted.current) return null;

  if (status === 'disconnected') {
    push('/login');
    return null;
  }

  if (status !== 'connected') {
    return <Connecting />;
  }

  return (
    <div>
      {/* Navbar */}
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
          {/* <ConnectButton
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
          /> */}
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              mounted,
            }) => {
              return (
                <div
                  {...(!mounted && {
                    'aria-hidden': true,
                    style: {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!mounted || !account || !chain) {
                      return (
                        <button onClick={openConnectModal} type='button'>
                          Connect Wallet
                        </button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <button onClick={openChainModal} type='button'>
                          Wrong network
                        </button>
                      );
                    }

                    return (
                      <div style={{ display: 'flex', gap: 12 }}>
                        <button
                          onClick={openChainModal}
                          style={{ display: 'flex', alignItems: 'center' }}
                          type='button'
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 12,
                                height: 12,
                                borderRadius: 999,
                                overflow: 'hidden',
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <Image
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  width={12}
                                  height={12}
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </button>

                        <button onClick={openAccountModal} type='button'>
                          {account.displayName}
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ''}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </div>
      <div className='flex max-h-[calc(100vh-1rem)] overflow-y-hidden'>
        <section className='flex-1 p-4 pb-0'>
          <h2 className='font-bold mb-2'>My Drops</h2>
          <ItemList items={drops} isEditable hasLink />
        </section>

        <section className='flex-1 p-4'>
          <h2 className='font-bold mb-2'>My POAPs</h2>
          <ItemList items={poaps} />
        </section>
      </div>
    </div>
  );
};

export default Home;
