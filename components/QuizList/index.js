import styles from "./index.module.scss";

import QuizListItem from "./QuizListItem";

const QuizList = ({ list }) => {
  const handleQuizDelete = async id => {
    await fetch(`/api/deletequiz/${id}`, {
      method: "DELETE",
    });
  };

  const renderList = () => {
    const quizList = [];

    list.forEach(listItem => {
      quizList.push(
        <QuizListItem {...listItem} deleteQuiz={handleQuizDelete} />
      );
    });

    if (!quizList.length) {
      return <h3 className={styles.tooltip}>Nothing to display :(</h3>;
    }

    return quizList;
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Created quizes</h1>
      </div>

      <div className={styles.quizList}>{renderList()}</div>
    </div>
  );
};

export default QuizList;
