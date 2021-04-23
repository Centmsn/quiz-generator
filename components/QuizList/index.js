import styles from "./index.module.scss";

import QuizListItem from "./QuizListItem";

const QuizList = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Created quizes</h1>
      </div>

      <div className={styles.quizList}>
        <QuizListItem />
        <QuizListItem />
        <QuizListItem />
        <QuizListItem />
        <QuizListItem />
        <QuizListItem />
        <QuizListItem />
        <QuizListItem />
        <QuizListItem />
      </div>
    </div>
  );
};

// export const getServerSideProps = async () => {
//   return {
//     props: {

//     }
//   }
// }

export default QuizList;
