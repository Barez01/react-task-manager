import "./Components/Home.css";
import botImage from "../../assets/images/bot.png";
import githubLogo from "../../assets/images/github-logo.png";
import { ArrowIcon } from "../../Constants/Icons/arrow_icon";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { useState, useEffect } from "react";
import { writeTask, setError, readTasks } from "../Home/Redux/HomeReducer";
import ErrorDialog from "../../Components/Dialogs/error_dialog";

export default function Home() {
  const dispatch = useAppDispatch();
  const { loading, error, tasks } = useAppSelector((state) => state.home);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTaskWrite = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(writeTask({ id: 0, title, description, date: "", }));

    if (writeTask.fulfilled.match(result)) {
      dispatch(readTasks());
      setDescription("");
    } else {
      console.log(
        `did not match: ${writeTask.fulfilled.match(result)}, ${writeTask.fulfilled}, `,
      );
    }
  };

  // useEffect(() => {
  //   if (user !== null) {
  //     navigate(ROUTES.HOME.path);
  //   }
  // }, [user !== null, navigate]);

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
              {/* <input
            type="text"
            className="title-field"
            placeholder="Title here..."
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
          /> */}
              <input
                type="text"
                className="description-field"
                placeholder="Type something..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button className="note-submit-button" onClick={handleTaskWrite}>
                {/* <h2>{false ? "Loading..." : "Continue"}</h2> */}
                {loading ? (
                  <div className="loader"></div>
                ) : (
                  ArrowIcon({ color: "#fff", size: 32 })
                )}
              </button>
            </div>
          </div>
          <div className="div2">
            {tasks.map((task) => (
              <div className="" key={task.id}>
                <div className="task-title">
                  {task.date}
                </div>
                <p className="task-description">
                  {task.description}
                </p>
              </div>
            ))}
          </div>
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
