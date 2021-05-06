import { createContext, useState } from "react";

const GameContext = createContext({});

const DEFAULT_USER_NAME = null;

/**
 * Functional react component - provides store for GameContext
 * @param {object} props - react props
 * @returns {JSX.Element}
 */
export const GameContextProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState(DEFAULT_USER_NAME);
  const [summary, setSummary] = useState([]);

  /**
   * Adds 1 to the score value
   * @returns {undefined}
   */
  const handleAddScore = () => {
    setScore(prev => prev + 1);
  };

  /**
   * Set username, summary and score to default value
   * @returns {undefined}
   */
  const handleResetStore = () => {
    setSummary([]);
    setScore(0);
    setUsername(DEFAULT_USER_NAME);
  };

  /**
   * Sets the username to the provided value
   * @param {string} value - username
   * @returns {undefined}
   */
  const handleSetUsername = value => {
    if (typeof value !== "string") {
      throw new Error(
        `Incorrect argument. Expected string instead got ${typeof value}`
      );
    }

    if (!value.length) {
      throw new Error("Incorrect argument. Username must have atleast 1 char");
    }

    setUsername(value);
  };

  // TODO add JSDoc
  const handleSummary = (correctAnswer, userAnswer, question, isCorrect) => {
    setSummary(prev => [
      ...prev,
      { correctAnswer, userAnswer, question, isCorrect },
    ]);
  };

  return (
    <GameContext.Provider
      value={{
        correctAnswers: score,
        summary,
        setSummary: handleSummary,
        addScore: handleAddScore,
        resetStore: handleResetStore,
        setUsername: handleSetUsername,
        username,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
