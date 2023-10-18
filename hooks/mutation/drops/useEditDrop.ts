import { useMutation } from 'react-query';

const editDrop = async (drop: any) => {
  try {
    const res = await fetch(`http://localhost:3001/drops/${drop.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(drop),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
  } catch (err) {
    throw err;
  }
};

const useEditDrop = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  return useMutation({ mutationFn: editDrop, onSuccess, onError });
};

export { useEditDrop };
