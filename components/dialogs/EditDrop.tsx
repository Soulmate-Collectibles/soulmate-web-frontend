'use client';

import { AppDialog } from '@components/dialogs/AppDialog';
import { Button } from '@components/ui/button';
import { DialogFooter, DialogTrigger } from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import * as z from 'zod';
import { useEditDrop } from 'hooks/mutation/drops/useEditDrop';
import { EditDropSchema } from '@components/extra/ItemList';

const EditDrop = ({
  item,
  open = false,
  setOpen,
  refetch,
  form,
}: {
  item: any;
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch?: () => Promise<any>;
  form: any;
}) => {
  const mutation = useEditDrop({
    onSuccess: async () => {
      await refetch?.();
      setOpen(false);
    },
    onError: async () => {
      console.log('AAAAAAAAAAAAAAA');
    },
  });

  function onSubmit(data: z.infer<typeof EditDropSchema>) {
    mutation.mutate({ ...data, id: item.id });
  }

  return (
    <AppDialog dialogTitle='Edit your drop' open={open} setOpen={setOpen}>
      <div className='grid gap-4 py-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center gap-4'>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      id='name'
                      autoComplete='off'
                      className='col-span-3'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center gap-4'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      id='description'
                      autoComplete='off'
                      className='col-span-3'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center gap-4'>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      id='image'
                      /* type='file' */ autoComplete='off'
                      className='col-span-3'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className='flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-5'>
              <Button type='submit'>Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </AppDialog>
  );
};

export { EditDrop };
