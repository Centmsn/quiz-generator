import styles from "./index.module.scss";

import Radio from "components/Radio";

const QuizTimeForm = () => {
  return (
    <div>
      <p>type</p>
      <Radio label="Quiz" />
      <Radio label="Question" />
    </div>
  );
};

export default QuizTimeForm;
