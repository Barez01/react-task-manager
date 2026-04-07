import "./Components/Home.css";
import botImage from "../../assets/images/bot.png";
import { ArrowIcon } from "../../Constants/Icons/arrow_icon";

export default function Home() {
  return (
    <section className="home">
      <div className="blur-component">
        <div className="parent">
          <div className="div1 animated-border">
            <img src={botImage} alt="" />
            <h4>Hello, what is on your <br/>mind today?</h4>
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
                      {false ? (
                        <div className="loader"></div>
                      ) : (
                        ArrowIcon({ color: "#fff", size: 32 })
                      )}
                    </button>
            </div>
          </div>
          <div className="div2"></div>
          <div className="div3"></div>
        </div>
      </div>
    </section>
  );
}
