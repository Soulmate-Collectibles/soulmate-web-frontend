import { CreateDrop } from '@components/dialogs/CreateDrop';
import { useDrops } from 'hooks/query/drops/useDrops';
import ItemList from '@components/extra/ItemList';
import { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useDeleteAllDrops } from 'hooks/mutation/drops/useDeleteAllDrops';
import { AppAlert } from '@components/alert/AppAlert';

const Drops = () => {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const { isLoading, data, refetch } = useDrops();
  const mutation = useDeleteAllDrops({
    onSuccess: async () => {
      await refetch?.();
    },
    onError: async () => {
      setOpen(false);
      console.log('AAAAAAAAAAAAAAA');
    },
  });

  return (
    <>
      <section className='flex-1 p-4 pb-0'>
        <div className='flex justify-between items-start'>
          <div className='mb-2'>
            <h2 className='scroll-m-20 text-4xl font-bold tracking-tight'>
              My Drops
            </h2>
            <p className='text-lg text-muted-foreground'>
              All the drops you&apos;ve created
            </p>
          </div>
          <div className='flex flex-col items-end justify-center gap-1 pr-4'>
            <button
              className='flex justify-center items-center gap-1 pr-4 hover:underline'
              onClick={() => setAlertOpen(true)}
            >
              <AiFillDelete /> Delete all
            </button>
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
      <AppAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        title='Are you sure you want to delete all drops?'
        description='This action cannot be undone.'
        onAccept={() => {
          mutation.mutate('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4');
        }}
        loading={mutation.isLoading}
      />
    </>
  );
};

export { Drops };
