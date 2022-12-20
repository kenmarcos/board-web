import styles from "components/Header/styles.module.scss";
import { LoginButton } from "components/LoginButton";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/logo.svg";

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <Image src={logo} alt="Logo Board" />
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
