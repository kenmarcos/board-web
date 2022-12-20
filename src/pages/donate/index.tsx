/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import Head from "next/head";
import { authOptions } from "pages/api/auth/[...nextauth]";
import styles from "pages/donate/styles.module.scss";

interface DonateProps {
  user: {
    id: string;
    name: string;
    image: string;
  };
}

const Donate = (props: DonateProps) => {
  return (
    <>
      <Head>
        <title>Board - Apoie o projeto</title>
      </Head>

      <main className={styles.container}>
        <img src="/images/rocket.svg" alt="Ilustração de foguete" />

        <div className={styles.vip}>
          <img src={props.user?.image} alt="Foto do usuário apoiador" />
          <span>Parabéns, você é um novo apoiador!</span>
        </div>

        <section className={styles.callToAction}>
          <h1>Seja um apoiador deste projeto! 🏆</h1>
          <p>
            <span>Contribua com apenas</span> R$ 1,00
          </p>
          <strong>
            Apareça na nossa home e tenha funcionalidades exclusivas
          </strong>
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = {
    id: session.id,
    name: session.user?.name,
    image: session.user?.image,
  };

  return {
    props: {
      user,
    },
  };
};

export default Donate;
