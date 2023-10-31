import { NftList } from '@components/extra/NftList';
import { useGetNfts } from 'hooks/query/nfts/useGetNfts';

const Poaps = () => {
  const { isLoading, data, refetch } = useGetNfts();

  return (
    <section className='flex-1 p-4'>
      <div className='mb-2'>
        <h2 className='scroll-m-20 text-4xl font-bold tracking-tight'>
          My POAPs
        </h2>
        <p className='text-lg text-muted-foreground font-sans'>
          All the POAPs you&apos;re linked to
        </p>
      </div>
      <NftList loading={isLoading} items={data?.result} hasLink />
    </section>
  );
};

export { Poaps };
