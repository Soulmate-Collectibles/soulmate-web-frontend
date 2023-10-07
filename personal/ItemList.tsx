import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { ScrollArea } from '@components/ui/scroll-area';
import { Skeleton } from '@components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import { EditDrop } from '@components/dialogs/EditDrop';
import { useState } from 'react';

const ItemList = ({
  items,
  isEditable = false,
  hasLink = false,
  loading = false,
  refetch,
}: {
  items: any[];
  loading: boolean;
  isEditable?: boolean;
  hasLink?: boolean;
  refetch?: () => Promise<any>;
}) => {
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState<{}>({});
  return (
    <div className='flex flex-col max-h-full h-[calc(100%-32px)]'>
      <ScrollArea className='w-full h-[calc(100%-3rem)] rounded-md'>
        {!loading ? (
          items?.map((item) => (
            <Card key={item.id} className='px-2 mb-4 mr-4'>
              <CardHeader>
                <CardTitle className='flex justify-between'>
                  <p>{item.title}</p>
                  {isEditable ? (
                    <EditDrop
                      key={item.id}
                      item={item}
                      open={open}
                      setOpen={setOpen}
                      refetch={refetch}
                    />
                  ) : null}
                </CardTitle>
              </CardHeader>
              <CardContent className='flex'>
                {item.image ? (
                  <>
                    <div className='shrink-0'>
                      <Image
                        src={'/images/Logo.png'}
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
                      href='https://www.google.com'
                      className='text-sm color-[#0000FF] underline'
                      target='_blank'
                    >
                      Access mintlink
                    </Link>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Skeleton className='px-2 mb-4 mr-4' />
        )}
      </ScrollArea>
    </div>
  );
};

export default ItemList;
