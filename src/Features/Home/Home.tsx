import "./Components/Home.css";
import botImage from "../../assets/images/bot.png";
import githubLogo from "../../assets/images/github-logo.png";
import { ArrowIcon } from "../../Constants/Icons/arrow_icon";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { useState, useEffect } from "react";
import {
  writeTask,
  setError,
  readTasks,
  updateTask,
  deleteTask,
} from "../Home/Redux/HomeReducer";
import ErrorDialog from "../../Components/Dialogs/error_dialog";
import { DeleteIcon } from "../../Constants/Icons/delete_icon";
import Loader from "../../Components/AnimatedComponents/Loader/Loader";
import ShimmerLoader from "./Components/ShimmerLoader/ShimmerLoader";

export default function Home() {
  const dispatch = useAppDispatch();
  const {
    writeLoading,
    readLoading,
    updateLoading,
    deleteLoading,
    error,
    tasks,
  } = useAppSelector((state) => state.home);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTaskWrite = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(
      writeTask({ id: 0, title, description, date: "" }),
    );

    if (writeTask.fulfilled.match(result)) {
      dispatch(readTasks());
      setDescription("");
    }
  };

  const handleTaskUpdate = async (
    e: React.FormEvent,
    id: number,
    newDescription: string,
  ) => {
    e.preventDefault();

    const result = await dispatch(
      updateTask({
        id: id,
        title: title,
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
          <div className="div1 animated-border">
            <img src={botImage} alt="" />
            <h4>
              Hello, what is on your <br />
              mind today?
            </h4>
            <div className="note-form">
              <input
                type="text"
                className="description-field"
                placeholder="Type something..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button className="note-submit-button" onClick={handleTaskWrite}>
                {/* <h2>{false ? "Loading..." : "Continue"}</h2> */}
                {writeLoading ? (
                  <Loader large={true} />
                ) : (
                  ArrowIcon({ color: "#fff", size: 32 })
                )}
              </button>
            </div>
          </div>
          {!readLoading ? (
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
                      {/* <h2>{false ? "Loading..." : "Continue"}</h2> */}
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
                      {/* <h2>{false ? "Loading..." : "Continue"}</h2> */}
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
          <a href="https://github.com/Barez01" target="_blank" className="div3">
            <h1>Follow me</h1>
            <p>
              If you find this project useful, <br />
              you can follow me
            </p>
            <div className="image-container">
              <img src={githubLogo} alt="" />
            </div>
          </a>
        </div>
      </div>
      {error && <ErrorDialog message={error} />}
    </section>
  );
}
