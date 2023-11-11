import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { ScrollArea } from '@components/ui/scroll-area';
import { Skeleton } from '@components/ui/skeleton';
import { BiLinkExternal } from 'react-icons/bi';
import Image from 'next/image';
import Link from 'next/link';

const NftList = ({
  items,
  hasLink = false,
  loading = false,
}: {
  items: any[];
  loading: boolean;
  hasLink?: boolean;
}) => {
  return (
    <>
      <div className='flex flex-col max-h-full h-[calc(100%-64px)]'>
        <ScrollArea className='w-full h-[calc(100%-3rem)] rounded-md'>
          {!loading ? (
            items?.map((item) => {
              const { token_id, token_uri, metadata } = item;
              const parsedMetadata = JSON.parse(metadata);
              const { name, description, image } = parsedMetadata;
              return (
                <Card key={token_id} className='px-2 mb-4 mr-4'>
                  <CardHeader>
                    <CardTitle className='flex justify-between'>
                      <p>{name}</p>
                      <div className='flex gap-2'></div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='flex items-center'>
                    {image ? (
                      <>
                        <div className='shrink-0'>
                          <Image
                            src={
                              (image as string).startsWith('ipfs://')
                                ? (image as string).replace(
                                    'ipfs://',
                                    'https://ipfs.io/ipfs/'
                                  )
                                : '/images/Logo.png'
                            }
                            alt={name}
                            width={100}
                            height={100}
                          />
                        </div>
                      </>
                    ) : null}
                    <div className='w-full flex flex-col gap-2 ml-[20px]'>
                      {hasLink ? (
                        <Link
                          href={`${(token_uri as string).replace(
                            'https://ipfs.moralis.io:2053/',
                            'https://red-occasional-rabbit-276.mypinata.cloud/'
                          )}`}
                          target='_blank'
                          className='text-sm flex items-center gap-2 hover:text-primary'
                        >
                          <BiLinkExternal /> Check metadata on Moralis
                        </Link>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className='flex items-center space-x-4'>
              <Skeleton className='h-12 w-12 rounded-full' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-[250px]' />
                <Skeleton className='h-4 w-[200px]' />
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
    </>
  );
};

export { NftList };
