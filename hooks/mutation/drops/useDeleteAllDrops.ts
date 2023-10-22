import { useMutation } from 'react-query';

const deleteDrop = async (id: string) => {
  const jwt = window.localStorage.getItem('jwt');
  try {
    const res = await fetch(`http://localhost:3001/drops/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
  } catch (err) {
    throw err;
  }
};

const useDeleteDrop = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  return useMutation({ mutationFn: deleteDrop, onSuccess, onError });
};

export { useDeleteDrop };
