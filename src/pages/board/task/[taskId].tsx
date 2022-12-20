import { format } from "date-fns";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import firebase from "services/firebaseConnection";
import styles from "pages/board/task/styles.module.scss";
import Head from "next/head";
import { FiCalendar } from "react-icons/fi";

interface Task {
  id: string;
  task: string;
  user: { id: string; user: string };
  createdAt: string | Date;
  formattedCreatedAt?: string;
}

interface TaskDetailsProps {
  taskData: string;
}

const TaskDetails = (props: TaskDetailsProps) => {
  const task = JSON.parse(props.taskData) as Task;

  return (
    <>
      <Head>
        <title>Board - Detalhes da tarefa</title>
      </Head>

      <h1 className={styles.title}>Detalhes da tarefa</h1>

      <main className={styles.container}>
        <div className={styles.actions}>
          <FiCalendar size={30} color="#fff" />
          <span>Tarefa criada em: </span>
          <time>{task.formattedCreatedAt}</time>
        </div>
        <p>{task.task}</p>
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

  if (!session?.isVip) {
    return {
      redirect: {
        destination: "/board",
        permanent: false,
      },
    };
  }

  const taskData = await firebase
    .firestore()
    .collection("tasks")
    .doc(context.params?.taskId as string)
    .get()
    .then((snapshot) => {
      const taskData = {
        id: snapshot.id,
        task: snapshot.data()?.task,
        user: snapshot.data()?.user,
        createdAt: snapshot.data()?.createdAt,
        formattedCreatedAt: format(
          snapshot.data()?.createdAt.toDate(),
          "dd MMMM yyyy"
        ),
      };

      return JSON.stringify(taskData);
    })
    .catch(() => {
      return {};
    });

  if (!Object.keys(taskData).length) {
    return {
      redirect: {
        destination: "/board",
        permanent: false,
      },
    };
  }

  return {
    props: {
      taskData,
    },
  };
};

export default TaskDetails;
