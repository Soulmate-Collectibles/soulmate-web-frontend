import { useRouter } from 'next/router';

const MintPage = () => {
  const router = useRouter();
  return <p>Mintlink: {router.query.id}</p>;
};

export default MintPage;
