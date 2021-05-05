import { useState } from "react";
import styles from "./index.module.scss";

const QuestionForm = ({ value, setQuestion }) => {
  const [error, setError] = useState(null);

  const handleSetQuestion = e => {
    const value = e.target.value;

    setQuestion(e.target.value);

    if (value.length < 5) {
      setError("Question must have atleast 5 chars.");
    }

    if (value.length >= 5 && error) {
      setError(null);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Question</h3>
      <textarea
        className={styles.question}
        value={value}
        onChange={handleSetQuestion}
      ></textarea>

      {error && <span className={styles.tooltip}>{error}</span>}
    </div>
  );
};

export default QuestionForm;
