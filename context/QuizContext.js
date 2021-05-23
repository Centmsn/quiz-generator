import { createContext, useState } from "react";

const QuizContext = createContext({});

const TIME_LIMIT_DEFAULT = {
  limit: null,
  limitType: null,
};
const QUESTIONS_DEFAULT = [];
const CURRENT_QUESTION_DEFAULT = 0;
const IS_PUBLIC_DEFAULT = false;

/**
 * Functional react component - provides store for quizContext
 * @param {Object} props - react props
 * @returns {JSX.Element}
 */
export const QuizContextProvider = ({ children }) => {
  const [questions, setQuestion] = useState(QUESTIONS_DEFAULT);
  const [currentQuestion, setCurrentQuestion] = useState(
    CURRENT_QUESTION_DEFAULT
  );
  const [timeLimit, setTimeLimit] = useState(TIME_LIMIT_DEFAULT);
  const [isPublic, setIsPublic] = useState(IS_PUBLIC_DEFAULT);

  //! add JSDOC
  const handleCurrentQuestion = index => {
    if (typeof index !== "number") {
      throw new Error(
        `Incorrect argument. Expected number, instead got ${typeof index}`
      );
    }

    setCurrentQuestion(index);
  };

  //! add JSDOC
  const handleSetPublic = () => {
    setIsPublic(prev => !prev);
  };

  const handleStoreValue = ({ isPublic, questions, timeLimit }) => {
    //! if editing
    setQuestion(questions);
    setTimeLimit(timeLimit);
    setIsPublic(isPublic);
  };

  /**
   * Add / edit question
   * @param {Object} questionObj - question object
   * @param {Number} index - function will overwrite question located under provided index, instead of creating new one.
   * @returns {undefined}
   */
  const handleQuestionObject = (questionObj, index = null) => {
    // initial validation
    if (typeof questionObj !== "object") {
      throw new Error(
        `Incorrect argument. Expected object, instead got ${typeof questionObj}`
      );
    }

    if (index < 0 || index > questions.length) {
      throw new Error(
        `Incorrect argument. Index cannot be smaller than 0 or greater than current quiz length`
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

    // edit existing question
    if (index !== null) {
      setQuestion(prev => {
        const newState = [...prev];
        newState[index] = questionObj;

        return newState;
      });
      return;
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
  const handleTimeLimit = (limit, type) => {
    // if both arguments are null - remove time control
    if (limit === null && type === null) {
      setTimeLimit(TIME_LIMIT_DEFAULT);
      return;
    }

    // validate arguments
    if (typeof type !== "string") {
      throw new Error(
        `Incorrect argument. Expected string, instead got ${typeof type}`
      );
    }

    const formattedType = type.toLowerCase();

    if (typeof limit !== "number") {
      throw new Error(
        `Incorrect argument. Expected (number | null), instead got ${typeof limit}`
      );
    }

    if (formattedType !== "quiz" && formattedType !== "question") {
      throw new Error(
        `Incorrect argument. Expected ('quiz' | 'question' | null), Instead got ${type}`
      );
    }
    // enable time control
    setTimeLimit({
      limit,
      limitType: type,
    });
  };

  /**
   * Set questions and time controll to default value
   * @returns {undefined}
   */
  const handleReset = () => {
    setQuestion(QUESTIONS_DEFAULT);
    setTimeLimit(TIME_LIMIT_DEFAULT);
    setCurrentQuestion(CURRENT_QUESTION_DEFAULT);
    setIsPublic(IS_PUBLIC_DEFAULT);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        timeLimit,
        current: currentQuestion,
        isPublic,
        toggleIsPublic: handleSetPublic,
        setTimeLimit: handleTimeLimit,
        setCurrentQuestion: handleCurrentQuestion,
        manageQuestion: handleQuestionObject,
        reset: handleReset,
        setStoreValue: handleStoreValue,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
