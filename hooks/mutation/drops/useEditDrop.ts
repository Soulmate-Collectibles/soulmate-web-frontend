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
    return json;
  } catch (err) {
    console.log('Error editing drop', err);
  }
};

const useEditDrop = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({ mutationFn: editDrop, onSuccess });
};

export { useEditDrop };
