import { Button } from '@components/ui/button';
import { routes } from '@constants/routes';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Logo } from 'logos/Logo';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavBar = () => {
  const router = useRouter();
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
                      <Button onClick={openConnectModal} type='button'>
                        Connect Wallet
                      </Button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <Button onClick={openChainModal} type='button'>
                        Wrong network
                      </Button>
                    );
                  }

                  return (
                    <div style={{ display: 'flex', gap: 12 }}>
                      {/* <button
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
                      </button> */}

                      <Button onClick={openAccountModal} type='button'>
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ''}
                      </Button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  );
};

export { NavBar };
