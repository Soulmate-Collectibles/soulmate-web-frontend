import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Textarea } from '@components/ui/textarea';
import { AiFillEdit } from 'react-icons/ai';

const EditDrop = ({ item }: { item: any }) => {
  return (
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
              defaultValue={item.title}
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
            <Input id='image' type='file' className='col-span-3' />
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
  );
};

export { EditDrop };
