import "../styles/globals.css";
import { Provider } from "next-auth/client";

import { QuizContextProvider } from "../context/QuizContext";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <QuizContextProvider>
        <Component {...pageProps} />
      </QuizContextProvider>
    </Provider>
  );
}

export default MyApp;
