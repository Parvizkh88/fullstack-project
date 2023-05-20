import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Register from "pages/Register";
import Activate from "pages/Activate";
import Login from "pages/Login";
import Navbar from "layout/Navbar";
import "../App.css";
import ConfirmEmail from "pages/ConfirmEmail";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirmEmail" element={<ConfirmEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activate" element={<Activate />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
