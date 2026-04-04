import Login from "../Features/Auth/Login";
import Signup from "../Features/Auth/Signup";
import Home from "../Features/Home/Home";
import ProtectedRoute from "./ProtectedRoute";

export const ROUTES = {
  HOME: {
    path: "/",
    element: (
      <ProtectedRoute>
        <Signup />
        {/* <Home /> */}
      </ProtectedRoute>
    ),
  },
  LOGIN: { path: "/login", element: <Login /> },
  SIGNUP: { path: "/signup", element: <Signup /> },
};
