import ItemList from '@components/extra/ItemList';

const Poaps = () => {
  const poaps = [
    { id: 1, title: 'POAP 1', description: 'Description for POAP 1' },
    { id: 2, title: 'POAP 2', description: 'Description for POAP 2' },
  ];

  return (
    <section className='flex-1 p-4'>
      <div className='mb-2'>
        <h2 className='scroll-m-20 text-4xl font-bold tracking-tight'>
          My POAPs
        </h2>
        <p className='text-lg text-muted-foreground font-sans'>
          All the POAPs you&apos;re linked to
        </p>
      </div>
      <ItemList loading={false} items={poaps} />
    </section>
  );
};

export { Poaps };
