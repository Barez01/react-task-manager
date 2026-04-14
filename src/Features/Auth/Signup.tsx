import { useNavigate } from "react-router-dom";
import "./Components/Login.css";
import { useState, useEffect } from "react";
import { signupUser, clearError } from "../Auth/Redux/AuthReducer";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { ROUTES } from "../../Router/Routes";
import ErrorDialog from "../../Components/Dialogs/error_dialog";
import AuthLeftComponent from "./Components/AuthLeftComponent/AuthLeftComponent";
import ContinueButton, { OtherButton } from "./Components/ContinueButton/ContinueButton";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signupUser({ name, username, password }));
  };

  useEffect(() => {
    dispatch(clearError());
    if (user !== null) {
      navigate(ROUTES.HOME.path);
    }
  }, [user !== null, navigate]);

  return (
    <section className="login">
      <div className="blur-component animated-border">
        <AuthLeftComponent/>

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
          <ContinueButton loading={loading} onClick={handleSignup} />

          <div className="divider"></div>

          <OtherButton label="Log in to your account" route={ROUTES.LOGIN.path} />
        </div>
      </div>
      {error && <ErrorDialog message={error} />}
    </section>
  );
}
