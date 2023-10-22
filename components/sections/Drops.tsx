import { CreateDrop } from '@components/dialogs/CreateDrop';
import { useDrops } from 'hooks/query/drops/useDrops';
import ItemList from '@components/extra/ItemList';
import { useState } from 'react';
import { useAuthContext } from '@context/auth/AuthContext';

const Drops = () => {
  const [open, setOpen] = useState(false);
  const { address } = useAuthContext();
  const { isLoading, data, refetch } = useDrops(address);

  return (
    <>
      <section className='flex-1 p-4 pb-0'>
        <div className='flex justify-between items-start'>
          <div className='mb-2'>
            <h2 className='scroll-m-20 text-4xl font-bold tracking-tight'>
              My Drops
            </h2>
            <p className='text-lg text-muted-foreground'>
              All the drops you&apos;ve createdasdasd
            </p>
          </div>
          <div className='flex flex-col items-end justify-center gap-1 pr-4'>
            <CreateDrop open={open} setOpen={setOpen} refetch={refetch} />
          </div>
        </div>
        <ItemList
          loading={isLoading}
          items={data?.drops}
          isEditable
          isDeletable
          hasLink
          refetch={refetch}
        />
      </section>
    </>
  );
};

export { Drops };
