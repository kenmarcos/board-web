import type { AppProps } from "next/app";
import { Header } from "components/Header";
import { SessionProvider } from "next-auth/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import "styles/global.scss";

const initialOptions = {
  "client-id":
    "Adv6YFZcPD3TNAyc7dEmLGd0zZQ5mKlbsrhnAQObjoyK0B9mUB_Sj4MALnVMFvVCM4HIbiKfQ1xqfCHS",
  currency: "BRL",
  intent: "capture",
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <PayPalScriptProvider options={initialOptions}>
        <Header />
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </SessionProvider>
  );
}
