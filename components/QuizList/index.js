import styles from "./index.module.scss";

import QuizListItem from "./QuizListItem";
import Spinner from "components/Spinner";
import { useHttpRequest } from "hooks/useHttpRequest";
import { useState, useEffect } from "react";

const QuizList = ({ list }) => {
  const { loading, sendRequest } = useHttpRequest();
  const [localQuizList, setLocalQuizList] = useState([]);

  useEffect(() => {
    setLocalQuizList(list);
  }, []);

  const handleQuizDelete = async id => {
    await sendRequest(`/api/deletequiz/${id}`, "DELETE");

    // update local quiz list to avoid fetching data again
    const newList = localQuizList.filter(el => el._id !== id);
    setLocalQuizList(newList);
  };

  const renderList = () => {
    const quizList = [];

    localQuizList.forEach((listItem, key) => {
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
