import { useRouter } from "next/router";

const Quiz = ({ quiz }) => {
  const router = useRouter();
  console.log(router);
  return <div>{router.query.id}</div>;
};

export const getServerSideProps = async context => {
  return {
    props: {
      quiz: {},
    },
  };
};

export default Quiz;
