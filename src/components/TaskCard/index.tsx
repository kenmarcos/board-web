import styles from "components/TaskCard/styles.module.scss";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { FiCalendar, FiCheckCircle, FiEdit2, FiTrash } from "react-icons/fi";
import firebase from "services/firebaseConnection";

interface Task {
  id: string;
  task: string;
  user: { id: string; user: string };
  createdAt: string | Date;
  formattedCreatedAt?: string;
}
interface TaskCardProps {
  task: Task;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  setTaskToEdit: Dispatch<SetStateAction<Task | null>>;
  isVip: boolean;
}

export const TaskCard = (props: TaskCardProps) => {
  const handleEdit = async (task: Task) => {
    props.setTaskToEdit(task);
  };

  const handleDelete = async (taskId: string) => {
    await firebase
      .firestore()
      .collection("tasks")
      .doc(taskId)
      .delete()
      .then(() => {
        console.log("TAREFA EXCLUÍDA COM SUCESSO!");

        let updatedTasks = props.tasks.filter((task) => task.id !== taskId);

        props.setTasks(updatedTasks);
      })
      .catch((error) => {
        console.log("ERRO: ", error);
      });
  };

  return (
    <div className={styles.container}>
      <Link href={`/board/task/${props.task.id}`}>
        <p>{props.task?.task}</p>
      </Link>

      <div className={styles.actions}>
        <div className={styles.actionsBox}>
          <div>
            <FiCalendar size={20} color="#FFB800" />
            <time>{props.task?.formattedCreatedAt}</time>
          </div>

          {!!props.isVip && (
            <button onClick={() => handleEdit(props.task)}>
              <FiEdit2 size={20} color="#FFF" />
              <span>Editar</span>
            </button>
          )}
        </div>

        <button onClick={() => handleDelete(props.task.id)}>
          <FiTrash size={20} color="#FF3636" />
          <span>Excluir</span>
        </button>
      </div>
    </div>
  );
};
