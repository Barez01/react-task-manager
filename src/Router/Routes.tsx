import Login from "../Features/Auth/Login"
import Home from "../Features/Home/Home"

export const ROUTES = {
    LOGIN: { path: "/", element: <Login/>},
    HOME: { path: "/home", element: <Home/>},
}