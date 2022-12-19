import styles from "components/TaskCard/styles.module.scss";
import { FiCalendar, FiCheckCircle, FiEdit2, FiTrash } from "react-icons/fi";

interface Task {
  id: string;
  task: string;
  user: { id: string; user: string };
  createdAt: string | Date;
  formattedCreatedAt?: string;
}
interface TaskCardProps {
  task: Task;
}

export const TaskCard = (props: TaskCardProps) => {
  return (
    <div className={styles.container}>
      <p>{props.task?.task}</p>

      <div className={styles.actions}>
        <div className={styles.actionsBox}>
          <div>
            <FiCalendar size={20} color="#FFB800" />
            <time>{props.task?.formattedCreatedAt}</time>
          </div>

          <button>
            <FiEdit2 size={20} color="#FFF" />
            <span>Editar</span>
          </button>
        </div>

        <button>
          <FiTrash size={20} color="#FF3636" />
          <span>Excluir</span>
        </button>
      </div>
    </div>
  );
};
