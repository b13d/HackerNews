import { Route, Routes } from "react-router-dom";
import Main from "./Main";
import CurrentPage from "./pages/CurrentPage";
import ErrorPage from "./ErrorPage";

export default () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/pages/*" element={<CurrentPage />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);
