/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import Head from "next/head";
import { authOptions } from "pages/api/auth/[...nextauth]";
import styles from "pages/donate/styles.module.scss";
import { PayPalButtons } from "@paypal/react-paypal-js";
import firebase from "services/firebaseConnection";
import { useState } from "react";
import Image from "next/image";
import rocketImg from "../../../public/images/rocket.svg";

interface DonateProps {
  user: {
    id: string;
    name: string;
    image: string;
  };
}

const Donate = (props: DonateProps) => {
  const [isVip, setIsVip] = useState(false);

  const handleSaveDonate = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(props.user.id)
      .set({
        donate: true,
        lastDonate: new Date(),
        image: props.user.image,
      })
      .then(() => {
        setIsVip(true);
      });
  };

  return (
    <>
      <Head>
        <title>Board - Apoie o projeto</title>
      </Head>

      <main className={styles.container}>
        <Image src={rocketImg} alt="Ilustração de foguete" />

        {!!isVip && (
          <div className={styles.vip}>
            <Image
              width={40}
              height={40}
              src={props.user?.image}
              alt="Foto do usuário apoiador"
            />
            <span>Parabéns, você é um novo apoiador!</span>
          </div>
        )}

        <section className={styles.callToAction}>
          <h1>Seja um apoiador deste projeto! 🏆</h1>
          <p>
            <span>Contribua com apenas</span> R$ 5,00
          </p>
          <strong>
            Apareça na nossa home e tenha funcionalidades exclusivas
          </strong>
          <div>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "5",
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order?.capture().then(function (details) {
                  console.log(
                    "Compra Aprovada: " + details.payer.name?.given_name
                  );

                  handleSaveDonate();
                }) as Promise<void>;
              }}
            />
          </div>
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
