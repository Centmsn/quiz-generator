import { useState, createContext } from "react";

const SettingsContext = createContext();

export const SettingsContextProvider = ({ children }) => {
  const [darkmode, setDarkmode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  // TODO add JSDOC
  const handleFontSize = value => {
    if (![1, 2, 3].includes(value)) {
      console.error(
        `Incorrect arugment. Expected 1 | 2 | 3 but got ${value}. Default value is used.`
      );

      setFontSize(16);
    }

    let size = 16;
    if (value === 1) size = 12;
    if (value === 3) size = 20;

    setFontSize(size);

    document.querySelector(":root").style.fontSize = `${size}px`;
  };

  // TODO add JSDOC
  const handleDarkmode = () => {
    setDarkmode(prev => !prev);
  };

  return (
    <SettingsContext.Provider
      value={{
        darkmode,
        fontSize,
        setDarkmode: handleDarkmode,
        setFontSize: handleFontSize,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
