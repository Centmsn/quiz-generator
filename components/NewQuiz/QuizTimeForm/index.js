import styles from "./index.module.scss";

import { useState, useContext, useEffect } from "react";

import Radio from "components/Radio";
import Slider from "components/Slider";
import QuizContext from "context/QuizContext";

const QuizTimeForm = () => {
  const [type, setType] = useState("quiz");
  const { setTimeLimit, timeLimit } = useContext(QuizContext);

  const handleTimeLimit = value => {
    const { limitType } = timeLimit;

    setTimeLimit(value, limitType);
  };

  const handleLimitType = type => {
    const { limit } = timeLimit;

    setTimeLimit(limit, type);
    setType(type);
  };

  useEffect(() => {
    setTimeLimit(1, "quiz");

    return () => {
      setTimeLimit(null, null);
    };
  }, []);

  return (
    <>
      <section className={[styles.section, styles.sectionFlex].join(" ")}>
        <p>Apply time limit to:</p>
        <Radio
          label="Quiz"
          value="quiz"
          onClick={handleLimitType}
          active={type === "quiz"}
        />
        <Radio
          label="Question"
          value="question"
          onClick={handleLimitType}
          active={type === "question"}
        />
      </section>

      <section className={styles.section}>
        <p>Adjust limit (minutes)</p>
        <Slider
          min={1}
          max={60}
          onChange={handleTimeLimit}
          initial={timeLimit.limit}
        />
      </section>
    </>
  );
};

export default QuizTimeForm;
