import { createContext, useState } from "react";

const QuizContext = createContext({});

const TIME_CONTROL_DEFAULT = {
  limit: null,
  limitType: null,
};
const QUESTIONS_DEFAULT = [];

/**
 * Functional react component - provides store for quizContext
 * @param {Object} props - react props
 * @returns {JSX.Element}
 */
export const QuizContextProvider = ({ children }) => {
  const [questions, setQuestion] = useState(QUESTIONS_DEFAULT);
  const [timeControl, setTimeControl] = useState(TIME_CONTROL_DEFAULT);

  /**
   * Adds question to the quiz
   * @param {Object} questionObj - question object
   * @returns {undefined}
   */
  const handleAddQuestion = questionObj => {
    // initial validation
    if (typeof questionObj !== "object") {
      throw new Error(
        `Incorrect argument. Expected object instead got ${typeof questionObj}`
      );
    }

    const { answers, question, correct } = questionObj;

    // validate arguments
    if (
      typeof answers !== "object" ||
      typeof question !== "string" ||
      typeof correct !== "number"
    ) {
      throw new Error(
        "Incorrect argument. Check question object passed to the function."
      );
    }

    // add question
    setQuestion(prev => [...prev, questionObj]);
  };

  /**
   * Handles setting time control for quiz
   * @param {Number} limit - time limit - use ms only
   * @param {String} type - limit can be set for quiz or signle question
   * @returns {undefined}
   */
  const handleTimeControl = (limit, type) => {
    // if both arguments are null - remove time control
    if (limit === null && type === null) {
      setTimeControl(TIME_CONTROL_DEFAULT);
      return;
    }

    const formattedType = type.toLowerCase();

    // validate arguments
    if (typeof limit !== "number") {
      throw new Error(
        `Incorrect argument. Expected number instead got ${typeof limit}`
      );
    }

    if (formattedType !== "quiz" && formattedType !== "question") {
      throw new Error(
        `Incorrect argument. Expected 'quiz' or 'question'. Instead got ${type}`
      );
    }
    // enable time control
    setTimeControl({
      limit,
      type,
    });
  };

  /**
   * Set questions and time controll to default value
   * @returns {undefined}
   */
  const handleReset = () => {
    setQuestion(QUESTIONS_DEFAULT);
    setTimeControl(TIME_CONTROL_DEFAULT);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        timeControl,
        setTimeControl: handleTimeControl,
        addQuestion: handleAddQuestion,
        reset: handleReset,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
