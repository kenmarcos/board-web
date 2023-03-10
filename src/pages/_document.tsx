import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="./favicon.ico" type="image/x-icon" />
          <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon" />
        </Head>

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}
