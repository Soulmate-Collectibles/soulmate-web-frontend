import { CreateDrop } from '@components/dialogs/CreateDrop';
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
import { useDrops } from 'hooks/query/useDrops';
import ItemList from 'personal/ItemList';
import { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';

const Drops = () => {
  const [open, setOpen] = useState(false);
  const { isLoading, data } = useDrops();
  console.log(data);

  /* useEffect(() => {
    if (mounted) {
      setLoading(true);
      // fetch user from localhost:3000/api/user
      fetch(
        'http://localhost:3001/users/0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2'
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          setUser(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [mounted]); */

  const drops = [
    {
      id: 1,
      title: 'Nombre drop de prueba',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image: '/images/Logo.png',
    },
    {
      id: 2,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 3,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 4,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 5,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 6,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 7,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 8,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 9,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 10,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 11,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 12,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 13,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 14,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 15,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 16,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 17,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 18,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 19,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 20,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 21,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 22,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 23,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 24,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
    {
      id: 25,
      title: 'Drop 2',
      description: 'Description for Drop 2',
      image: '/images/Logo.png',
    },
  ];
  return (
    <section className='flex-1 p-4 pb-0'>
      <div className='flex justify-between items-start'>
        <h2 className='font-bold mb-2'>My Drops</h2>
        <button className='flex items-center justify-center gap-1 pr-4'>
          <CreateDrop open={open} setOpen={setOpen} />
        </button>
      </div>
      <ItemList loading={isLoading} items={data?.drops} isEditable hasLink />
    </section>
  );
};

export { Drops };
