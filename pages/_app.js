import { useState } from "react";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: async (...args) => {
          const response = await fetch(...args);
          if (!response.ok) {
            throw new Error("Ein Fehler ist aufgetreten.");
          }
          return await response.json();
        },
      }}
    >
      {/* <Component articles={state} addArticle={addArticle} {...pageProps} /> */}
      <Component {...pageProps} />
    </SWRConfig>
  );
}
