import { useState } from "react";
import styles from "./index.module.scss";

import { validateString } from "utils/validateString";

const QuestionForm = ({ value, index, setQuestion }) => {
  const [error, setError] = useState(null);

  const handleSetQuestion = e => {
    const value = e.target.value;

    setQuestion(e.target.value);

    if (validateString(value, { trim: true, maxLength: 4 })) {
      setError("Question must have atleast 5 chars.");
    }

    if (validateString(value, { trim: true, minLength: 5 }) && error) {
      setError(null);
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.index}>{index}</span>

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
