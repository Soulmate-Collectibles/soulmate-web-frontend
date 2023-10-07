import { useMutation } from 'react-query';

const deleteAllDrops = async (address: string) => {
  try {
    const res = await fetch(`http://localhost:3001/drops/${address}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      const json = await res.json();
      console.log(json);
      throw new Error(res.statusText);
    }
  } catch (err) {
    throw err;
  }
};

const useDeleteAllDrops = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  return useMutation({ mutationFn: deleteAllDrops, onSuccess, onError });
};

export { useDeleteAllDrops };
