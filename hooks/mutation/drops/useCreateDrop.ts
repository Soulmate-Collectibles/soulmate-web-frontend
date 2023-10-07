import { useMutation } from 'react-query';

const createDrop = async (drop: any) => {
  try {
    const res = await fetch(`http://localhost:3001/drops`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(drop),
    });
    if (!res.ok) {
      const json = await res.json();
      console.log(json);
      throw new Error(res.statusText);
    }
    const json = await res.json();
    return json;
  } catch (err) {
    throw err;
  }
};

const useCreateDrop = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  return useMutation({ mutationFn: createDrop, onSuccess, onError });
};

export { useCreateDrop };
