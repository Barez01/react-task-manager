import { useNavigate } from "react-router-dom";
import "./Components/Login.css";
import { useState, useEffect } from "react";
import { loginUser, setError } from "../Auth/Redux/AuthReducer";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { ROUTES } from "../../Router/Routes";
import { ArrowIcon } from "../../Constants/Icons/arrow_icon";
import { CheckIcon } from "../../Constants/Icons/check_icon";
import ErrorDialog from "../../Components/Dialogs/error_dialog";
import AuthLeftComponent from "./Components/AuthLeftComponent/AuthLeftComponent";
import ContinueButton, {
  OtherButton,
} from "./Components/ContinueButton/ContinueButton";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
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
      <div className="blur-component animated-border">
        <AuthLeftComponent />

        <div className="right-component">
          <h4>Login to your account</h4>
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

          <ContinueButton loading={loading} onClick={handleLogin} />

          <div className="divider"></div>

          <OtherButton route={ROUTES.SIGNUP.path} />
        </div>
      </div>
      {error && <ErrorDialog message={error} />}
    </section>
  );
}
