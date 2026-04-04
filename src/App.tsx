import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./Router/Routes";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN.path} element={ROUTES.LOGIN.element}></Route>
        <Route path={ROUTES.HOME.path} element={ROUTES.HOME.element}></Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
