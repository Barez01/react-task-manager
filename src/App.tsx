import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./Router/Routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN.path} element={ROUTES.LOGIN.element}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
