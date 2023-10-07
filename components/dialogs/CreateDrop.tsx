import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { AiFillPlusCircle } from 'react-icons/ai';
import { AppDialog } from './AppDialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { DialogFooter } from '@components/ui/dialog';
import { useCreateDrop } from 'hooks/mutation/drops/useCreateDrop';

const CreateDropSchema = z.object({
  title: z.string().min(4).max(30),
  description: z.string().max(300),
  image: z.string(),
});

const CreateDrop = ({
  open = false,
  setOpen,
  refetch,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch?: () => Promise<any>;
}) => {
  const form = useForm<z.infer<typeof CreateDropSchema>>({
    resolver: zodResolver(CreateDropSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
    },
  });

  const mutation = useCreateDrop({
    onSuccess: async () => {
      form.reset();
      await refetch?.();
      setOpen(false);
    },
    onError: async () => {
      console.log('AAAAAAAAAAAAAAA');
    },
  });

  function onSubmit(data: z.infer<typeof CreateDropSchema>) {
    mutation.mutate({
      ...data,
      totalAmount: '10',
      creatorAddress: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    });
  }

  return (
    <AppDialog
      open={open}
      setOpen={setOpen}
      dialogTitle='Create your drop'
      dialogTrigger={
        <button className='flex items-center justify-center gap-1 pr-4 hover:underline'>
          <AiFillPlusCircle /> Create new drop
        </button>
      }
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
                      autoComplete='off'
                      className='col-span-3'
                      {...field}
                    />
                  </FormControl>
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
                      autoComplete='off'
                      className='col-span-3'
                      {...field}
                    />
                  </FormControl>
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
                      /* type='file' */ autoComplete='off'
                      className='col-span-3'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className='flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-5'>
              <Button type='submit'>Save drop</Button>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </AppDialog>
  );
};

export { CreateDrop };
