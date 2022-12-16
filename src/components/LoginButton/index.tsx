import styles from "components/LoginButton/styles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

export const LoginButton = () => {
  const isLoggedIn = false;

  return (
    <button type="button" className={styles.loginButton} onClick={console.log}>
      {isLoggedIn ? (
        <picture>
          <img
            src="http://sujeitoprogramador.com/steve.png"
            alt="Foto do usuário"
          />
        </picture>
      ) : (
        <FaGithub color="#FFB800" />
      )}
      Entrar com GitHub
      {!!isLoggedIn && <FiX color="#737380" />}
    </button>
  );
};
