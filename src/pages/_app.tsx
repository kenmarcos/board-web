import type { AppProps } from "next/app";
import { Header } from "components/Header";
import { SessionProvider } from "next-auth/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import "styles/global.scss";

const initialOptions = {
  "client-id":
    "AafqJKisJYqbQitovUjc1z5DNdb_O8o1KHOdnOHmPj-s8v-BNFz1IGh-ycYRlSPB2MEPervSThsnUZPr",
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
