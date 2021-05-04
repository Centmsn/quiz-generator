import { useState, createContext } from "react";

const SettingsContext = createContext();

export const SettingsContextProvider = ({ children }) => {
  const [darkmode, setDarkmode] = useState(false);

  const handleDarkmode = () => {
    setDarkmode(prev => !prev);
  };

  return (
    <SettingsContext.Provider
      value={{
        darkmode,
        setDarkmode: handleDarkmode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
