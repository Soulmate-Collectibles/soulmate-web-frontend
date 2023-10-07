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
    const json = await res.json();
    if (json.statusCode === 409) {
      throw new Error(json.message);
    }
    return json;
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
