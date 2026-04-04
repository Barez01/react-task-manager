import Login from "../Features/Auth/Login";
import Home from "../Features/Home/Home";
import ProtectedRoute from "./ProtectedRoute";

export const ROUTES = {
  LOGIN: { path: "/login", element: <Login /> },
  HOME: {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
};
