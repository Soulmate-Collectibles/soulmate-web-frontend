'use client';

import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { AiFillPlusCircle } from 'react-icons/ai';
import { AppDialog } from './AppDialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { DialogFooter } from '@components/ui/dialog';
import { useToast } from '@components/ui/use-toast';
import { useCreateDrop } from 'hooks/mutation/drops/useCreateDrop';
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from '@constants/file-validation';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { cn } from '@utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@components/ui/calendar';

const CreateDropSchema = z.object({
  title: z.string().min(4).max(30),
  description: z.string().max(300),
  image: z.any().refine((file) => file?.size <= MAX_FILE_SIZE, {
    message: 'File size should be less than 4MB',
    path: ['file'],
  }),
  startDate: z.date(),
  endDate: z.date(),
  totalAmount: z.number(),
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
      totalAmount: 10,
    },
  });
  const { toast } = useToast();

  const mutation = useCreateDrop({
    onSuccess: async () => {
      await refetch?.();
      toast({
        title: 'Drop created',
        description: `Drop '${form.getValues('title')}' created successfully!`,
      });
      form.reset();
      setOpen(false);
    },
    onError: async () => {
      console.log('AAAAAAAAAAAAAAA');
    },
  });

  function onSubmit(data: z.infer<typeof CreateDropSchema>) {
    const formData = new FormData();

    // Append the image to formData
    if (data.image && data.image.size > 0) {
      formData.append('image', data.image);
    }

    // Append other fields
    for (let key in data) {
      if (key !== 'image') {
        // Exclude the image since we already appended it
        if (['startDate', 'endDate'].includes(key)) {
          // format to ISO 8601 date string
          formData.append(key, data[key as keyof typeof data].toISOString());
        } else {
          formData.append(key, data[key as keyof typeof data]);
        }
      }
    }

    formData.set('totalAmount', `${data.totalAmount}`);

    mutation.mutate(formData);
  }

  return (
    <AppDialog
      open={open}
      setOpen={setOpen}
      dialogTitle='Create your drop'
      dialogTrigger={
        <div className='flex items-center justify-center gap-1 pr-4 hover:underline cursor-pointer'>
          <AiFillPlusCircle /> Create new drop
        </div>
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
              render={({ field }) => {
                const { onChange, value, ...otherFieldProps } = field;
                return (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type='file'
                        autoComplete='off'
                        accept='image/png, image/gif'
                        className='col-span-3'
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            onChange(e.target.files[0]); // Send the File object to react-hook-form
                          }
                        }}
                        {...otherFieldProps}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name='startDate'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center gap-4'>
                  <FormLabel>Start date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'col-span-3',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='endDate'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center gap-4'>
                  <FormLabel>End date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'col-span-3',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <DialogFooter className='flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-5'>
              <Button disabled={mutation.isLoading} type='submit'>
                Save drop
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </AppDialog>
  );
};

export { CreateDrop };
