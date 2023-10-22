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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { cn } from '@utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@components/ui/calendar';
import { useToast } from '@components/ui/use-toast';

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
  const { toast } = useToast();
  const mutation = useEditDrop({
    onSuccess: async () => {
      await refetch?.();
      setOpen(false);
    },
    onError: async (e) => {
      toast({
        title: "Houston, we've got a problem!",
        description: `${e.message}`,
      });
    },
  });

  function onSubmit(data: z.infer<typeof EditDropSchema>) {
    type Keys = keyof typeof data;
    const formData = new FormData();

    if (data.image && data.image.size > 0) {
      formData.append('image', data.image);
    }

    for (let key in data) {
      if (key !== 'image') {
        if (['startDate', 'endDate'].includes(key)) {
          formData.append(key, data[key as Keys].toISOString());
        } else {
          formData.append(key, data[key as Keys]);
        }
      }
    }
    formData.append('id', item.id);
    mutation.mutate(formData);
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
                            onChange(e.target.files[0]);
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
            <FormField
              control={form.control}
              name='totalAmount'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center gap-4'>
                  <FormLabel>Amount of uses</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      autoComplete='off'
                      className='col-span-3'
                      {...field}
                    />
                  </FormControl>
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
