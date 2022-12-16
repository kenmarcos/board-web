import { SupportButton } from "components/SuppotButton";
import { TaskCard } from "components/TaskCard";
import Head from "next/head";
import styles from "pages/board/styles.module.scss";
import { FiClock, FiPlus } from "react-icons/fi";

const Board = () => {
  return (
    <>
      <Head>Board - Minhas tarefas</Head>
      <main className={styles.container}>
        <form>
          <input type="text" placeholder="Digite sua tarefa..." />
          <button>
            <FiPlus color="#17181F" size={25} />
          </button>
        </form>

        <section className={styles.taskList}>
          <h2>Você tem 10 tarefas!</h2>
          <ul>
            <li>
              <TaskCard />
            </li>
            <li>
              <TaskCard />
            </li>
            <li>
              <TaskCard />
            </li>
            <li>
              <TaskCard />
            </li>
            <li>
              <TaskCard />
            </li>
            <li>
              <TaskCard />
            </li>
          </ul>
        </section>
      </main>

      <div className={styles.vipContainer}>
        <h3>Obrigado por apoiar este projeto!</h3>

        <div>
          <FiClock size={20} color="#fff" />
          <time>Última doação há cerca de 2 horas</time>
        </div>
      </div>

      <SupportButton />
    </>
  );
};

export default Board;
