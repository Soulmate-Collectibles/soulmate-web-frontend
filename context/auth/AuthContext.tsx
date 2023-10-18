import { useLocalStorage } from 'hooks/storage/useLocalStorage';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface AuthContextProps {
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
  nonce: string;
  setNonce: Dispatch<SetStateAction<string>>;
  jwt: string;
  setJwt: (value: any) => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [address, setAddress] = useState('');
  const [nonce, setNonce] = useState('');
  const [jwt, setJwt] = useLocalStorage('jwt', '');

  return (
    <AuthContext.Provider
      value={{
        address,
        setAddress,
        nonce,
        setNonce,
        jwt,
        setJwt,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
