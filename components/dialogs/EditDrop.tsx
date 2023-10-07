'use client';

import { AppDialog } from '@components/dialogs/AppDialog';
import { Button } from '@components/ui/button';
import { DialogFooter, DialogTrigger } from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Textarea } from '@components/ui/textarea';
import { AiFillEdit } from 'react-icons/ai';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useEditDrop } from 'hooks/mutation/drops/useEditDrop';

const EditDropSchema = z.object({
  title: z.string().min(4).max(30),
  description: z.string().max(300),
  image: z.string(),
});

const EditDrop = ({
  key,
  item,
  open = false,
  setOpen,
  refetch,
  onClick,
}: {
  key: string;
  item: any;
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch?: () => Promise<any>;
  onClick?: () => void;
}) => {
  const form = useForm<z.infer<typeof EditDropSchema>>({
    resolver: zodResolver(EditDropSchema),
    defaultValues: {
      title: item.title,
      description: item.description,
      image: item.image,
    },
  });

  const mutation = useEditDrop({
    onSuccess: async () => {
      console.log(mutation);
      await refetch?.();
      setOpen(false);
    },
  });

  function onSubmit(data: z.infer<typeof EditDropSchema>) {
    mutation.mutate({ ...data, id: item.id });
  }

  return (
    <AppDialog
      key={key}
      dialogTitle='Edit your drop'
      dialogTrigger={
        <button
          onClick={() => {
            console.log('hey', item);
            form.setValue('title', item.title);
            form.setValue('description', item.description);
            form.setValue('image', item.image);
          }}
        >
          <AiFillEdit />
        </button>
      }
      open={open}
      setOpen={setOpen}
    >
      <div className='grid gap-4 py-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center gap-4'>
                  <FormLabel>Name</FormLabel>
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
