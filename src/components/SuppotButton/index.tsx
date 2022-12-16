import styles from "components/SuppotButton/styles.module.scss";
import Link from "next/link";

export const SupportButton = () => {
  return (
    <div className={styles.container}>
      <Link href="/donate">Apoiar</Link>
    </div>
  );
};
