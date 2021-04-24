import styles from "./index.module.scss";

const QuestionForm = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Question</h3>
      <textarea className={styles.question}></textarea>
    </div>
  );
};

export default QuestionForm;
