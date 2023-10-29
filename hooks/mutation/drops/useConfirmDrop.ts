import { useMutation } from 'react-query';

const confirmDrop = async (id: string) => {
  const jwt = window.localStorage.getItem('jwt');
  try {
    const res = await fetch(`http://localhost:3001/drops/${id}/confirm`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      const response = await res.json();
      throw new Error(response.message);
    }
  } catch (err: any) {
    throw err;
  }
};

const useConfirmDrop = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (e?: any) => void;
}) => {
  return useMutation({ mutationFn: confirmDrop, onSuccess, onError });
};

export { useConfirmDrop };
