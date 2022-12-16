import styles from "components/TaskCard/styles.module.scss";
import { FiCalendar, FiCheckCircle, FiEdit2, FiTrash } from "react-icons/fi";

export const TaskCard = () => {
  return (
    <div className={styles.container}>
      <p>Aprender a criar projetos NextJS e aplicando firebase como back</p>

      <div className={styles.actions}>
        <div className={styles.actionsBox}>
          <div>
            <FiCalendar size={20} color="#FFB800" />
            <time>16 Dezembro 2022</time>
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
