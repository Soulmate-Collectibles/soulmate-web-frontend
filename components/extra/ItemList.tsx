import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { ScrollArea } from '@components/ui/scroll-area';
import { Skeleton } from '@components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import { EditDrop } from '@components/dialogs/EditDrop';
import { useState } from 'react';
import { AiFillDelete, AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { AppTooltip } from '@components/tootlip/AppTooltip';
import { AppAlert } from '@components/alert/AppAlert';
import { useDeleteDrop } from 'hooks/mutation/drops/useDeleteAllDrops';
import { MAX_FILE_SIZE } from '@constants/file-validation';

export const EditDropSchema = z.object({
  title: z.string().min(4).max(30).optional(),
  description: z.string().max(300).optional(),
  image: z
    .any()
    .optional()
    .refine(
      (file) => {
        if (file) return file?.size <= MAX_FILE_SIZE;
        return true;
      },
      {
        message: 'File size should be less than 4MB',
        path: ['file'],
      }
    ),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  totalAmount: z.string().optional(),
});

const ItemList = ({
  items,
  isEditable = false,
  hasLink = false,
  loading = false,
  refetch,
  isDeletable,
}: {
  items: any[];
  loading: boolean;
  isEditable?: boolean;
  hasLink?: boolean;
  refetch?: () => Promise<any>;
  isDeletable?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>({});
  const [dropId, setDropId] = useState<string>('');

  const mutation = useDeleteDrop({
    onSuccess: async () => {
      await refetch?.();
      setAlertOpen(false);
    },
    onError: async () => {
      setAlertOpen(false);
      console.log('AAAAAAAAAAAAAAA');
    },
  });

  const form = useForm<z.infer<typeof EditDropSchema>>({
    resolver: zodResolver(EditDropSchema),
  });

  return (
    <>
      <div className='flex flex-col max-h-full h-[calc(100%-64px)]'>
        <ScrollArea className='w-full h-[calc(100%-3rem)] rounded-md'>
          {!loading ? (
            items?.map((item) => (
              <Card key={item.id} className='px-2 mb-4 mr-4'>
                <CardHeader>
                  <CardTitle className='flex justify-between'>
                    <p>{item.title}</p>
                    <div className='flex gap-2'>
                      {isEditable ? (
                        <button
                          onClick={() => {
                            setEditItem(item);
                            form.setValue('title', item.title);
                            form.setValue('description', item.description);
                            form.setValue(
                              'startDate',
                              new Date(item.startDate)
                            );
                            form.setValue('endDate', new Date(item.endDate));
                            form.setValue('totalAmount', `${item.totalAmount}`);
                            form.setValue('image', '');
                            setOpen(true);
                          }}
                        >
                          <AiFillEdit />
                        </button>
                      ) : null}
                      {isDeletable ? (
                        <div
                          className='cursor-pointer'
                          onClick={() => {
                            setDropId(item.id);
                            setAlertOpen(true);
                          }}
                        >
                          <AiOutlineDelete />
                        </div>
                      ) : null}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className='flex'>
                  {item.image ? (
                    <>
                      <div className='shrink-0'>
                        <Image
                          src={
                            (item.image as string).startsWith('ipfs://')
                              ? (item.image as string).replace(
                                  'ipfs://',
                                  'https://ipfs.io/ipfs/'
                                )
                              : '/images/Logo.png'
                          }
                          alt={item.title}
                          width={100}
                          height={100}
                        />
                      </div>
                    </>
                  ) : null}
                  <div className='flex flex-col gap-2 ml-[20px]'>
                    <p className='text-sm m-0'>{item.description}</p>
                    {hasLink ? (
                      <Link
                        href={`/mint/${item.mintlinks[0].id}`}
                        className='text-sm color-[#0000FF] underline'
                      >
                        Access mintlink
                      </Link>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className='flex items-center space-x-4'>
              <Skeleton className='h-12 w-12 rounded-full' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-[250px]' />
                <Skeleton className='h-4 w-[200px]' />
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
      <EditDrop
        form={form}
        item={editItem}
        open={open}
        setOpen={setOpen}
        refetch={refetch}
      />
      <AppAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        title='Are you sure you want to delete this drop?'
        description='This action cannot be undone.'
        onAccept={() => {
          mutation.mutate(dropId);
        }}
        loading={mutation.isLoading}
      />
    </>
  );
};

export default ItemList;
