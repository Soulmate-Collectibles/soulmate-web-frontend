import { useQuery } from 'react-query';

const fetchDrops = async () => {
  try {
    const res = await fetch(
      'http://localhost:3001/users/0xf5aBFa16a9B44Bb2a1ece4B08dd85Ab68f5a282f'
    );
    const json = await res.json();
    return json;
  } catch (err) {
    console.log('Error fetching drops', err);
  }
};

const useDrops = () => {
  return useQuery('drops', fetchDrops);
};

export { useDrops };
