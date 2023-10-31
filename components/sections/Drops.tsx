import { CreateDrop } from '@components/dialogs/CreateDrop';
import { useDrops } from 'hooks/query/drops/useDrops';
import { DropList } from '@components/extra/DropList';
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
              Your Drops
            </h2>
            <p className='text-lg text-muted-foreground'>
              This will show you all the drops you have created using this
              platform.
            </p>
          </div>
          <div className='w-72 flex flex-col items-end justify-center gap-1 pr-4'>
            <CreateDrop open={open} setOpen={setOpen} refetch={refetch} />
          </div>
        </div>
        <DropList
          loading={isLoading}
          items={data?.drops}
          isEditable
          isDrop
          isDeletable
          hasLink
          refetch={refetch}
        />
      </section>
    </>
  );
};

export { Drops };
