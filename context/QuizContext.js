import { createContext, useState } from "react";

const QuizContext = createContext({});

export const QuizContextProvider = ({ children }) => {
  const [questions, setQuestion] = useState([]);

  const handleAddQuestion = question => {
    setQuestion(prev => [...prev, question]);
  };

  return (
    <QuizContext.Provider value={{ questions, addQuestion: handleAddQuestion }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
