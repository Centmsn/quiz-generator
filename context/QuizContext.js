import { createContext, useState } from "react";

const QuizContext = createContext({});

export const QuizContextProvider = ({ children }) => {
  const [questions, setQuestion] = useState([]);

  const handleAddQuestion = question => {
    setQuestion(prev => [...prev, question]);
  };

  const handleReset = () => {
    setQuestion([]);
  };

  return (
    <QuizContext.Provider
      value={{ questions, addQuestion: handleAddQuestion, reset: handleReset }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
