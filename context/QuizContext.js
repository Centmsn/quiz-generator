import { createContext, useState } from "react";

const QuizContext = createContext({});

export const QuizContextProvider = ({ children }) => {
  const [a, b] = useState();

  return (
    <QuizContext.Provider value={{ test: a }}>{children}</QuizContext.Provider>
  );
};

export default QuizContext;
