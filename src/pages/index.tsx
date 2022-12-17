/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "styles/styles.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Board - Organizando seu dia</title>
      </Head>
      <main className={styles.container}>
        <picture>
          <img src="/images/board-user.svg" alt="Ferramenta Board" />
        </picture>

        <section className={styles.callToAction}>
          <h1>
            Uma ferramenta para seu dia a dia Escreva, planeje e organize-se...
          </h1>
          <p>
            <span>100% Gratuita</span> e Online
          </p>
        </section>

        <div className={styles.donaters}>
          <h3>Apoiadores:</h3>
          <div>
            <img
              src="http://sujeitoprogramador.com/steve.png"
              alt="Usuário 1"
            />
            <img
              src="http://sujeitoprogramador.com/steve.png"
              alt="Usuário 1"
            />
            <img
              src="http://sujeitoprogramador.com/steve.png"
              alt="Usuário 1"
            />
            <img
              src="http://sujeitoprogramador.com/steve.png"
              alt="Usuário 1"
            />
            <img
              src="http://sujeitoprogramador.com/steve.png"
              alt="Usuário 1"
            />
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
    revalidate: 60 * 60, // Atualiza a cada 60 minutos
  };
};
