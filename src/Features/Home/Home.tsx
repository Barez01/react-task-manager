import "./Components/Home.css";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { useEffect } from "react";
import { readTasks } from "../Home/Redux/HomeReducer";
import ErrorDialog from "../../Components/Dialogs/error_dialog";
import ShimmerLoader from "./Components/ShimmerLoader/ShimmerLoader";
import GithubContainer from "./Components/GithubContainer/GithubContainer";
import NewTaskContainer from "./Components/NewTaskContainer/NewTaskContainer";
import TasksContainer from "./Components/TasksContainer/TasksContainer";

export default function Home() {
  const dispatch = useAppDispatch();
  const {
    readLoading,
    error,
  } = useAppSelector((state) => state.home);

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
            <TasksContainer/>
          )}
          <GithubContainer />
        </div>
      </div>
      {error && <ErrorDialog message={error} />}
    </section>
  );
}
