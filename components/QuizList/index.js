import styles from "./index.module.scss";

import QuizListItem from "./QuizListItem";
import Spinner from "../Spinner";
import { useHttpRequest } from "../../hooks/useHttpRequest";

const QuizList = ({ list }) => {
  const { loading, sendRequest } = useHttpRequest();

  const handleQuizDelete = async id => {
    await sendRequest(`/api/deletequiz/${id}`, "DELETE");
  };

  const renderList = () => {
    const quizList = [];

    list.forEach((listItem, key) => {
      quizList.push(
        <QuizListItem {...listItem} deleteQuiz={handleQuizDelete} key={key} />
      );
    });

    if (!quizList.length) {
      return <h3 className={styles.tooltip}>Nothing to display :(</h3>;
    }

    return quizList;
  };

  return (
    <div className={styles.container}>
      {loading && <Spinner overlay />}

      <div className={styles.title}>
        <h1>Created quizes</h1>
      </div>

      <div className={styles.quizList}>{renderList()}</div>
    </div>
  );
};

export default QuizList;
