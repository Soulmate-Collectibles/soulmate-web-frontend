import { UUID } from 'crypto';
import { useQuery } from 'react-query';

const fetchNonceByAddress = async (address: string) => {
  if (!address) return;
  try {
    const res = await fetch(`http://localhost:3001/users/${address}/nonce`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const json = await res.json();
    return json;
  } catch (err) {
    console.log('Error fetching drops', err);
  }
};

const useGetNonce = (address: string) => {
  return useQuery('drops', () => fetchNonceByAddress(address), {
    enabled: false,
  });
};

export { useGetNonce };
