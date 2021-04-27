import "../styles/globals.css";
import { Provider } from "next-auth/client";

import { QuizContextProvider } from "../context/QuizContext";
import { GameContextProvider } from "../context/GameContext";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <QuizContextProvider>
        <GameContextProvider>
          <Component {...pageProps} />
        </GameContextProvider>
      </QuizContextProvider>
    </Provider>
  );
}

export default MyApp;
