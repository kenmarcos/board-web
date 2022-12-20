/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "styles/styles.module.scss";
import firebase from "services/firebaseConnection";
import { useState } from "react";
import boardUser from "../../public/images/board-user.svg";
import Image from "next/image";

interface Donater {
  id: string;
  donate: boolean;
  lastDonate: Date;
  image: string;
}
interface HomeProps {
  donatersData: string;
}

export default function Home(props: HomeProps) {
  const [donaters, setDonaters] = useState<Donater[]>(
    JSON.parse(props.donatersData)
  );

  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas</title>
      </Head>
      <main className={styles.container}>
        <Image src={boardUser} alt="Ferramenta Board" />

        <section className={styles.callToAction}>
          <h1>
            Uma ferramenta para seu dia a dia Escreva, planeje e organize-se...
          </h1>
          <p>
            <span>100% Gratuita</span> e Online
          </p>
        </section>

        {!!donaters.length && (
          <div className={styles.donaters}>
            <h3>Apoiadores:</h3>
            <div>
              {donaters.map((donater) => (
                <Image
                  key={donater.id}
                  width={45}
                  height={45}
                  src={donater.image}
                  alt="Foto de apoiador"
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const donaters = await firebase.firestore().collection("users").get();

  const donatersData = JSON.stringify(
    donaters.docs.map((item) => {
      return {
        id: item.id,
        ...item.data(),
      };
    })
  );

  return {
    props: {
      donatersData,
    },
    revalidate: 60 * 60, // Atualiza a cada 60 minutos
  };
};
