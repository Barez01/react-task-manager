import "./Components/Home.css";
import botImage from "../../assets/images/bot.png";
import githubLogo from "../../assets/images/github-logo.png";
import { ArrowIcon } from "../../Constants/Icons/arrow_icon";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { useState, useEffect } from "react";
import { writeTask, setError } from "../Home/Redux/HomeReducer";

export default function Home() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.home);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) {
      dispatch(setError("No description is specified!"));
      return;
    }
    dispatch(writeTask({ title, description }));
  };

  // useEffect(() => {
  //   if (user !== null) {
  //     navigate(ROUTES.HOME.path);
  //   }
  // }, [user !== null, navigate]);

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
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
              />
              <button className="note-submit-button">
                {/* <h2>{false ? "Loading..." : "Continue"}</h2> */}
                {loading ? (
                  <div className="loader"></div>
                ) : (
                  ArrowIcon({ color: "#fff", size: 32 })
                )}
              </button>
            </div>
          </div>
          <div className="div2"></div>
          <div className="div3">
            <h1>Follow me</h1>
            <p>If you find this project usefull, <br/>you can follow me</p>
            <div className="image-container">
              <img src={githubLogo} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
