import { useMutation } from 'react-query';

const editDrop = async (drop: FormData) => {
  const jwt = window.localStorage.getItem('jwt');
  try {
    const res = await fetch(`http://localhost:3001/drops/${drop.get('id')}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: drop,
    });
    if (!res.ok) {
      const response = await res.json();
      throw new Error(response.message);
    }
  } catch (err: any) {
    throw err;
  }
};

const useEditDrop = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (e?: any) => void;
}) => {
  return useMutation({ mutationFn: editDrop, onSuccess, onError });
};

export { useEditDrop };
