// ** Next, React And Locals Imports
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import "@/styles/globals.css";
import Layout from "@/components/Layout/Layout";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import createEmotionCache from "@/mui/createEmotionCache.js";
import theme from "@/mui/theme.js";

// ** MUI Imports
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";

// ** Redux store
import store from "@/redux/store";

// ** Apollo client
const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache(),
  credentials: "include",
});

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const router = useRouter();

  // Layout
  const [layout, setLayout] = useState(null);

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Layout Condition
  useEffect(() => {
    // Pages that don't need header & footer
    const pages = ["login", "404", "_error"];

    const currentPage = router.pathname.split("/")[1];

    if (pages.includes(currentPage)) {
      setLayout(false);
    } else {
      setLayout(true);
    }
  }, [router.asPath]);

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <Provider store={store}>
              <CssBaseline />
              {layout && (
                <Layout
                  page={<Component {...pageProps} />}
                  role={pageProps.role}
                  privileges={pageProps.privileges}
                />
              )}
              {layout === false && <Component {...pageProps} />}
            </Provider>
          </ApolloProvider>
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}
