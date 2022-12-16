import styles from "components/Header/styles.module.scss";
import { LoginButton } from "components/LoginButton";
import Link from "next/link";

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <picture>
            <img src="/images/logo.svg" alt="Logo Board" />
          </picture>
        </Link>

        <nav>
          <Link href="/">Home</Link>
          <Link href="board">Meu Board</Link>
        </nav>

        <LoginButton />
      </div>
    </header>
  );
};
