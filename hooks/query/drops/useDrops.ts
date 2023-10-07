import { useQuery } from 'react-query';

const fetchDrops = async () => {
  try {
    const res = await fetch(
      'http://localhost:3001/users/0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'
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
