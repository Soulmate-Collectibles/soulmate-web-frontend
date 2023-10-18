import { useMutation } from 'react-query';

const createUser = async (drop: any) => {
  try {
    const res = await fetch(`http://localhost:3001/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(drop),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const json = await res.json();
    return json;
  } catch (err) {
    throw err;
  }
};

const useCreateUser = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
} = {}) => {
  return useMutation({ mutationFn: createUser, onSuccess, onError });
};

export { useCreateUser };
