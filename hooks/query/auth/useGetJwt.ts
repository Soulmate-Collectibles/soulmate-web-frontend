import { useQuery } from 'react-query';

interface FetchJWTProps {
  address: string;
  nonce: string;
  signedMessage: string;
}

const fetchJwt = async ({ address, nonce, signedMessage }: FetchJWTProps) => {
  if (!address || !nonce || !signedMessage) return;
  try {
    const res = await fetch(`http://localhost:3001/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address, message: nonce, signedMessage }),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const json = await res.json();
    return json;
  } catch (err) {
    console.log('Error fetching access token', err);
  }
};

const useGetJwt = ({ address, nonce, signedMessage }: FetchJWTProps) => {
  return useQuery('drops', () => fetchJwt({ address, nonce, signedMessage }), {
    enabled: false,
  });
};

export { useGetJwt };
