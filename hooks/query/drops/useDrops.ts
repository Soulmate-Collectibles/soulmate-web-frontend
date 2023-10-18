import { useQuery } from 'react-query';

const fetchDrops = async (address: string) => {
  const jwt = window.localStorage.getItem('jwt');
  try {
    const res = await fetch(
      `http://localhost:3001/users/0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    const json = await res.json();
    return json;
  } catch (err) {
    console.log('Error fetching drops', err);
  }
};

const useDrops = (address: string) => {
  return useQuery('drops', () => fetchDrops(address));
};

export { useDrops };
