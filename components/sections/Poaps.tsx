import ItemList from 'personal/ItemList';

const Poaps = () => {
  const poaps = [
    { id: 1, title: 'POAP 1', description: 'Description for POAP 1' },
    { id: 2, title: 'POAP 2', description: 'Description for POAP 2' },
  ];

  return (
    <section className='flex-1 p-4'>
      <h2 className='font-bold mb-2'>My POAPs</h2>
      <ItemList loading={false} items={poaps} />
    </section>
  );
};

export { Poaps };
