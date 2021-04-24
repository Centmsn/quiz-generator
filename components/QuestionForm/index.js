import styles from "./index.module.scss";

const QuestionForm = ({ value, setQuestion }) => {
  const handleSetQuestion = e => {
    setQuestion(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Question</h3>
      <textarea
        className={styles.question}
        value={value}
        onChange={handleSetQuestion}
      ></textarea>
    </div>
  );
};

export default QuestionForm;
