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
    const json = await res.json();
    return json;
  } catch (err) {
    console.log('Error editing drop', err);
  }
};

const useCreateDrop = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({ mutationFn: createDrop, onSuccess });
};

export { useCreateDrop };
