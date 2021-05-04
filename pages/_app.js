import "../styles/globals.css";
import { Provider } from "next-auth/client";

import { QuizContextProvider } from "context/QuizContext";
import { GameContextProvider } from "context/GameContext";
import { SettingsContextProvider } from "context/SettingsContext";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <QuizContextProvider>
        <SettingsContextProvider>
          <GameContextProvider>
            <Component {...pageProps} />
          </GameContextProvider>
        </SettingsContextProvider>
      </QuizContextProvider>
    </Provider>
  );
}

export default MyApp;
