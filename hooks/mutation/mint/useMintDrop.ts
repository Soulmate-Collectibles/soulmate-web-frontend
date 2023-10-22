import { useMutation } from 'react-query';

const mintDrop = async (mint: any) => {
  const jwt = window.localStorage.getItem('jwt');
  try {
    const res = await fetch(`http://localhost:3001/mintlinks/${mint.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(mint),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
  } catch (err) {
    throw err;
  }
};

const useMintDrop = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  return useMutation({ mutationFn: mintDrop, onSuccess, onError });
};

export { useMintDrop };
