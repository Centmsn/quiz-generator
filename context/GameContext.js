import { createContext, useState } from "react";

const GameContext = createContext({});

export const GameContextProvider = ({ children }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [summary, setSummary] = useState([]);

  const handleCorrectAnswers = () => {
    setCorrectAnswers(prev => prev + 1);
  };

  const handleSummary = (correctAnswer, userAnswer, question, isCorrect) => {
    setSummary(prev => [
      ...prev,
      { correctAnswer, userAnswer, question, isCorrect },
    ]);

    console.log(summary);
  };

  return (
    <GameContext.Provider
      value={{
        correctAnswers,
        summary,
        setSummary: handleSummary,
        addScore: handleCorrectAnswers,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
