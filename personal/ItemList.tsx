import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { ScrollArea } from '@components/ui/scroll-area';
import { Separator } from '@radix-ui/react-separator';
import Image from 'next/image';
import Link from 'next/link';

const ItemList = ({ items }: { items: any[] }) => {
  return (
    <div className='flex flex-col max-h-full h-[calc(100%-32px)]'>
      <ScrollArea className='w-full h-[calc(100%-3rem)] rounded-md'>
        {items.map((item) => (
          <Card key={item.id} className='px-2 mb-4 mr-4'>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
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
                  <Separator orientation='vertical' />
                </>
              ) : null}
              <div className='flex flex-col gap-2 ml-[20px]'>
                <p className='text-sm m-0'>{item.description}</p>
                {true /* usar mintlink */ ? (
                  <Link
                    href='www.google.com'
                    className='text-sm color-[#0000FF] underline'
                  >
                    Acceder al mintlink
                  </Link>
                ) : null}
              </div>
            </CardContent>
          </Card>
          /*  <div key={item.id} className='flex items-center mb-[20px]'>
            
              {item.image ? (
                
              
            </div>
            <div className='ml-[20px]'>
              <h3 className='text-2xl m-0'>{item.name}</h3>
              <p className='text-sm m-0'>{item.description}</p>
            </div>
          </div> */
        ))}
      </ScrollArea>
    </div>
  );
};

export default ItemList;
