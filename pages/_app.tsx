import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";
import Layout from "../components/Layout";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Provider session={pageProps.session}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
