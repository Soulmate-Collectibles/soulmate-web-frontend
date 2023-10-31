import { useQuery } from 'react-query';

const fetchNfts = async () => {
  const jwt = window.localStorage.getItem('jwt');
  try {
    const res = await fetch(`http://localhost:3001/nft-gateway`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const json = await res.json();
    return json;
  } catch (err) {
    console.log('Error fetching drops', err);
  }
};

const useGetNfts = () => {
  return useQuery(
    'nfts',
    fetchNfts /* , {
    staleTime: Infinity,
    cacheTime: Infinity,
  } */
  );
};

export { useGetNfts };
