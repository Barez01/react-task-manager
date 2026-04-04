import { useNavigate } from "react-router-dom";
import checkIcon from "../../assets/icons/checked.png";
import rightArrowIcon from "../../assets/icons/right-arrow.png";
import "./Components/Login.css";
import { useState, useEffect } from "react";
import { loginUser } from "../Auth/Redux/AuthReducer";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { ROUTES } from "../../Router/Routes";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  useEffect(() => {
    if (user !== null) {
      navigate(ROUTES.HOME.path);
    }
  }, [user !== null, navigate]);

  return (
    <section className="login">
      <div className="blur-component">
        <div className="left-component">
          <h2>
            Save your daily notes <br />
            with Notefy app
          </h2>
          <p>
            The most trust worthy collaborator to save your <br /> daily notes,
            and make memroies.
          </p>
          <div className="motos">
            <div className="moto-1">
              <img src={checkIcon} alt="Check Icon" />
              <h6>Safe & Secure</h6>
            </div>
            <div className="moto-2">
              <img src={checkIcon} alt="Check Icon" />
              <h6>Fast & Reliable</h6>
            </div>
            <div className="moto-3">
              <img src={checkIcon} alt="Check Icon" />
              <h6>Comprehensive Data</h6>
            </div>
          </div>
        </div>

        <div className="right-component">
          <h4>Create your account</h4>
          <input
            type="text"
            className="name-field"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="username-field"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="password-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="continue-button" onClick={handleSignup}>
            <h2>{loading ? "Loading..." : "Continue"}</h2>
            <img src={rightArrowIcon} alt="Arrow" />
          </button>

          <div className="divider"></div>

          <button className="other-button" onClick={() => navigate(ROUTES.SIGNUP.path)}>
            <h2>Login</h2>
            <img src={rightArrowIcon} alt="Arrow" />
          </button>
        </div>
      </div>
      {error && <p>{error}</p>}
      {user && <p>Welcome {user.username}</p>}
    </section>
  );
}
