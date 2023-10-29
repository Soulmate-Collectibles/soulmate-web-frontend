import { ethers } from 'ethers';
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
  txSigner: ethers.Signer | undefined;
  setTxSigner: Dispatch<SetStateAction<ethers.Signer | undefined>>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [address, setAddress] = useLocalStorage('address', '');
  const [nonce, setNonce] = useState('');
  const [jwt, setJwt] = useLocalStorage('jwt', '');
  const [txSigner, setTxSigner] = useState<ethers.Signer | undefined>();

  return (
    <AuthContext.Provider
      value={{
        address,
        setAddress,
        nonce,
        setNonce,
        jwt,
        setJwt,
        txSigner,
        setTxSigner,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
