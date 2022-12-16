import Head from "next/head";
import styles from "styles/styles.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Board - Organizando seu dia</title>
      </Head>
      <h1 className={styles.title}>
        Trabalhando com <span>NextJS</span>
      </h1>
    </>
  );
}
