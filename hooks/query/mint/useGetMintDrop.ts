import { UUID } from 'crypto';
import { useQuery } from 'react-query';

const fetchDropByMintlink = async (id: UUID) => {
  if (!id) return;
  try {
    const url = `http://localhost:3001/mintlinks/${id}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const json = await res.json();
    return json;
  } catch (err) {
    console.log('Error fetching drops', err);
  }
};

const useGetMintDrop = (id: UUID) => {
  return useQuery('drops', () => fetchDropByMintlink(id));
};

export { useGetMintDrop };
