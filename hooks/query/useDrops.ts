import { useQuery } from 'react-query';

const fetchDrops = async () => {
  try {
    const res = await fetch(
      'http://localhost:3001/users/0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2'
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
