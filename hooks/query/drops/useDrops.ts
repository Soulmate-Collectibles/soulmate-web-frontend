import { useQuery } from 'react-query';

const fetchDrops = async (address: string) => {
  const jwt = window.localStorage.getItem('jwt');
  console.log(`got address [${address}]`);

  try {
    const res = await fetch(`http://localhost:3001/users/${address}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.log('Error fetching drops', err);
  }
};

const useDrops = (address: string) => {
  return useQuery(['drops'], () => fetchDrops(address));
};

export { useDrops };
