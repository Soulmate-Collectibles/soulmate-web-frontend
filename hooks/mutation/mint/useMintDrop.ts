import { useMutation } from 'react-query';

const mintDrop = async (mint: any) => {
  const jwt = window.localStorage.getItem('jwt');
  try {
    const res = await fetch(`http://localhost:3001/mintlinks/${mint.id}/mint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        address: mint.address,
      }),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const json = await res.json();
    return json;
  } catch (err) {
    throw err;
  }
};

const useMintDrop = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any) => void;
  onError?: () => void;
}) => {
  return useMutation({ mutationFn: mintDrop, onSuccess, onError });
};

export { useMintDrop };
