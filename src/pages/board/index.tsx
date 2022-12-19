import { SupportButton } from "components/SuppotButton";
import { TaskCard } from "components/TaskCard";
import { GetServerSideProps } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import Head from "next/head";
import { authOptions } from "pages/api/auth/[...nextauth]";
import styles from "pages/board/styles.module.scss";
import { FiClock, FiPlus } from "react-icons/fi";
import { useForm } from "react-hook-form";
import firebase from "services/firebaseConnection";
import { format } from "date-fns";
import { useState } from "react";

interface TaskCreateForm {
  task: string;
}

interface Task {
  id: string;
  task: string;
  user: { id: string; user: string };
  createdAt: string | Date;
  formattedCreatedAt?: string;
}

interface BoardProps {
  user: { id: string; user: string };
  tasksData: string;
}

const Board = (props: BoardProps) => {
  const [tasks, setTasks] = useState<Task[]>(JSON.parse(props.tasksData));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskCreateForm>();

  const onSubmitFunction = async (data: TaskCreateForm) => {
    await firebase
      .firestore()
      .collection("tasks")
      .add({
        task: data.task,
        user: props.user,
        createdAt: new Date(),
      })
      .then((doc) => {
        console.log("CADASTRO FEITO COM SUCESSO!");

        let tasksData = {
          id: doc.id,
          task: data.task,
          user: props.user,
          createdAt: new Date(),
          formattedCreatedAt: format(new Date(), "dd MMMM yyyy"),
        };

        setTasks([...tasks, tasksData]);
      })
      .catch((error) => {
        console.log("ERRO DE CADASTRO: ", error);
      });
  };

  return (
    <>
      <Head>Board - Minhas tarefas</Head>
      <main className={styles.container}>
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <input
            type="text"
            placeholder="Digite sua tarefa..."
            {...register("task", { required: "*Campo obrigatório" })}
          />
          <button type="submit">
            <FiPlus color="#17181F" size={25} />
          </button>
        </form>
        {errors.task && <small>{errors.task?.message}</small>}

        <section className={styles.taskList}>
          <h2>
            Você tem {tasks.length} {tasks.length > 1 ? "tarefas" : "tarefa"}!
          </h2>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <TaskCard task={task} />
              </li>
            ))}
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

  const tasks = await firebase
    .firestore()
    .collection("tasks")
    .where("user.id", "==", session.id)
    .orderBy("createdAt", "asc")
    .get();

  const tasksData = JSON.stringify(
    tasks.docs.map((item) => {
      return {
        id: item.id,
        formattedCreatedAt: format(
          item.data().createdAt.toDate(),
          "dd MMMM yyyy"
        ),
        ...item.data(),
      };
    })
  );

  const user = {
    id: session.id,
    name: session.user?.name,
  };

  return {
    props: {
      user,
      tasksData,
    },
  };
};

export default Board;
