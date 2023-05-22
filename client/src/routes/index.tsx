import Activated from "pages/Activated";
import ConfirmEmail from "pages/ConfirmEmail";
import Home from "pages/Home";
import LoginForm from "pages/Login";
import RegistrationForm from "pages/Register";
import { Route, Routes } from "react-router";

const RoutesMap = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/confirmEmail" element={<ConfirmEmail />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/activate" element={<Activated />} />
      {/* <Route path="/activate" element={<Profile />} /> */}
    </Routes>
  );
};

export default RoutesMap;
