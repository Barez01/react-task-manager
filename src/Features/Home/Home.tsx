import "./Components/Home.css";
import { ArrowIcon } from "../../Constants/Icons/arrow_icon";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { useEffect } from "react";
import {
  readTasks,
  updateTask,
  deleteTask,
} from "../Home/Redux/HomeReducer";
import ErrorDialog from "../../Components/Dialogs/error_dialog";
import { DeleteIcon } from "../../Constants/Icons/delete_icon";
import Loader from "../../Components/AnimatedComponents/Loader/Loader";
import ShimmerLoader from "./Components/ShimmerLoader/ShimmerLoader";
import GithubContainer from "./Components/GithubContainer/GithubContainer";
import NewTaskContainer from "./Components/NewTaskContainer/NewTaskContainer";

export default function Home() {
  const dispatch = useAppDispatch();
  const {
    readLoading,
    updateLoading,
    deleteLoading,
    error,
    tasks,
  } = useAppSelector((state) => state.home);

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

  useEffect(() => {
    dispatch(readTasks());
  }, [dispatch]);

  return (
    <section className="home">
      <div className="blur-component">
        <div className="parent">
          <NewTaskContainer />
          {readLoading ? (
            <ShimmerLoader />
          ) : (
            <div className="div2">
              {tasks.map((task) => (
                <div className="task-container" key={task.id}>
                  <div className="task-title">
                    <p className="task-date">
                      {new Date(task.date).toLocaleString()}
                    </p>
                    <button
                      className="note-update-button"
                      disabled={updateLoading === task.id}
                      onClick={(e) => {
                        const updatedText =
                          document.getElementById(`task-${task.id}`)
                            ?.innerText ?? "";
                        handleTaskUpdate(e, task.id, updatedText ?? "");
                      }}
                    >
                      {updateLoading === task.id ? (
                        <Loader large={false} />
                      ) : (
                        ArrowIcon({ color: "#000", size: 16, direction: "up" })
                      )}
                    </button>
                    <button
                      className="note-delete-button"
                      disabled={deleteLoading === task.id}
                      onClick={(e) => handleTaskDelete(e, task.id)}
                    >
                      {deleteLoading === task.id ? (
                        <Loader large={false} />
                      ) : (
                        DeleteIcon({ color: "#ff0000", size: 16 })
                      )}
                    </button>
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
          )}
          <GithubContainer />
        </div>
      </div>
      {error && <ErrorDialog message={error} />}
    </section>
  );
}
