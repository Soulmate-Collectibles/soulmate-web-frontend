import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { ScrollArea } from '@components/ui/scroll-area';
import { Textarea } from '@components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillEdit } from 'react-icons/ai';

const ItemList = ({
  items,
  isEditable = false,
  hasLink = false,
}: {
  items: any[];
  isEditable?: boolean;
  hasLink?: boolean;
}) => {
  return (
    <div className='flex flex-col max-h-full h-[calc(100%-32px)]'>
      <ScrollArea className='w-full h-[calc(100%-3rem)] rounded-md'>
        {items.map((item) => (
          <Card key={item.id} className='px-2 mb-4 mr-4'>
            <CardHeader>
              <CardTitle className='flex justify-between'>
                <p>{item.name}</p>
                {isEditable ? (
                  <Dialog>
                    <DialogTrigger>
                      <button>
                        <AiFillEdit />
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit your drop</DialogTitle>
                      </DialogHeader>
                      <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                          <Label htmlFor='name' className='text-right'>
                            Name
                          </Label>
                          <Input
                            id='name'
                            autoComplete='off'
                            defaultValue={item.name}
                            className='col-span-3'
                          />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                          <Label htmlFor='description' className='text-right'>
                            Description
                          </Label>
                          <Textarea
                            id='description'
                            autoComplete='off'
                            className='col-span-3'
                            defaultValue={item.description}
                          />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                          <Label htmlFor='image' className='text-right'>
                            Image
                          </Label>
                          <Input
                            id='image'
                            type='file'
                            className='col-span-3'
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogTrigger>
                          <Button
                            type='submit'
                            /* onClick={() => window.location.reload()} */
                          >
                            Save changes
                          </Button>
                        </DialogTrigger>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ) : null}
              </CardTitle>
            </CardHeader>
            <CardContent className='flex'>
              {item.image ? (
                <>
                  <div className='shrink-0'>
                    <Image
                      src={item.image}
                      alt={item.name}
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
        ))}
      </ScrollArea>
    </div>
  );
};

export default ItemList;
