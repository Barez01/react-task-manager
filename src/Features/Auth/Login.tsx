import checkIcon from "../../assets/icons/checked.png";
import "./Components/Login.css";

export default function Login() {
  return (
    <section className="login">
      <div className="blur-component">
        <div className="left-component">
          <h2>
            Save your daily notes <br />
            with Notefy app
          </h2>
          <p>
            The most trus worthy collaborator to save your <br /> daily notes,
            and make memroies.
          </p>
          <div className="motos">
            <div className="moto-1">
              <img src={checkIcon} alt="Check Icon" />
              <h6>Safe & Secure</h6>
            </div>
            <div className="moto-2">
              <img src={checkIcon} alt="Check Icon" />
              <h6>Safe & Secure</h6>
            </div>
            <div className="moto-3">
              <img src={checkIcon} alt="Check Icon" />
              <h6>Safe & Secure</h6>
            </div>
          </div>
        </div>

        <div className="right-component">
          <h6>Welcome back!</h6>
          <h4>Login to your account</h4>
          <input type="text" className="username-field" />
          <input type="password" className="password-field" />
          <button className="continue-button">Continue</button>
        </div>
      </div>
    </section>
  );
}
