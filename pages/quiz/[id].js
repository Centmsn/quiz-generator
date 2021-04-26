import { useRouter } from "next/router";

const Quiz = ({ quiz }) => {
  const router = useRouter();

  return <div>{router.params.id}</div>;
};

export const getServerSideProps = async context => {
  return {
    props: {
      quiz: {},
    },
  };
};

export default Quiz;
