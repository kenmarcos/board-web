import styles from "components/LoginButton/styles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export const LoginButton = () => {
  const { data: session } = useSession();

  const handleSession = () => {
    if (session) {
      signOut();
    } else {
      signIn("github");
    }
  };

  return (
    <button
      type="button"
      className={styles.loginButton}
      onClick={handleSession}
    >
      {session ? (
        <Image
          width={35}
          height={35}
          src={session.user?.image as string}
          alt="Foto do usuário"
        />
      ) : (
        <FaGithub color="#FFB800" />
      )}
      {!!session ? `Olá, ${session.user?.name}` : "Entrar com GitHub"}
      {!!session && <FiX color="#737380" />}
    </button>
  );
};
