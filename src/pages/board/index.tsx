import { SupportButton } from "components/SuppotButton";
import { TaskCard } from "components/TaskCard";
import { GetServerSideProps } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import Head from "next/head";
import { authOptions } from "pages/api/auth/[...nextauth]";
import styles from "pages/board/styles.module.scss";
import { FiClock, FiPlus } from "react-icons/fi";

interface BoardProps {
  session: Session;
}

const Board = (props: BoardProps) => {
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

  return {
    props: {
      session,
    },
  };
};

export default Board;
