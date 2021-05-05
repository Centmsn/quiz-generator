import styles from "./index.module.scss";

import Radio from "components/Radio";
import Slider from "components/Slider";

const QuizTimeForm = () => {
  return (
    <div>
      <p>type</p>
      <Radio label="Quiz" />
      <Radio label="Question" />
      <Slider min={1} max={60} />
    </div>
  );
};

export default QuizTimeForm;
