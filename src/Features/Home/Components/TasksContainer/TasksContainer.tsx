import type { JSX } from "react";
import Loader from "../../../../Components/AnimatedComponents/Loader/Loader";
import { ArrowIcon } from "../../../../Constants/Icons/arrow_icon";
import { DeleteIcon } from "../../../../Constants/Icons/delete_icon";
import { useAppDispatch, useAppSelector } from "../../../../Redux/Hooks";
import {
  readTasks,
  updateTask,
  deleteTask,
} from "../../../Home/Redux/HomeReducer";
import "./TasksContainer.css";

export default function TasksContainer() {
  const dispatch = useAppDispatch();
  const { updateLoading, deleteLoading, tasks } = useAppSelector(
    (state) => state.home,
  );

  const handleTaskUpdate = async (
    e: React.FormEvent,
    id: number,
    newDescription: string,
  ) => {
    e.preventDefault();

    const result = await dispatch(
      updateTask({
        id: id,
        title: "",
        description: newDescription,
        date: "",
      }),
    );

    if (updateTask.fulfilled.match(result)) {
      dispatch(readTasks());
    }
  };

  const handleTaskDelete = async (e: React.FormEvent, id: number) => {
    e.preventDefault();

    const result = await dispatch(
      deleteTask({
        id: id,
        title: "",
        description: "",
        date: "",
      }),
    );

    if (deleteTask.fulfilled.match(result)) {
      dispatch(readTasks());
    }
  };

  return (
    <div className="tasks-container">
      {tasks.map((task) => (
        <div className="task-container" key={task.id}>
          <div className="task-title">
            <p className="task-date">{new Date(task.date).toLocaleString()}</p>
            <ActionButton
              className="note-update-button"
              loading={updateLoading === task.id}
              icon={ArrowIcon({ color: "#000", size: 16, direction: "up" })}
              onClick={(e) => {
                const updatedText =
                  document.getElementById(`task-${task.id}`)?.innerText ?? "";
                handleTaskUpdate(e, task.id, updatedText ?? "");
              }}
            />
            <ActionButton
              className="note-delete-button"
              loading={deleteLoading === task.id}
              icon={DeleteIcon({ color: "#f00", size: 16 })}
              onClick={(e) => handleTaskDelete(e, task.id)}
            />
          </div>
          <div
            contentEditable
            className="task-description"
            id={`task-${task.id}`}
          >
            {task.description}
          </div>
        </div>
      ))}
    </div>
  );
}

function ActionButton({
  className,
  loading,
  icon,
  onClick,
}: {
  className: string;
  loading: boolean;
  icon: JSX.Element;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button className={className} disabled={loading} onClick={onClick}>
      {loading ? <Loader large={false} /> : icon}
    </button>
  );
}
