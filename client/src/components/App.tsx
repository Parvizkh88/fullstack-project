import { BrowserRouter } from "react-router-dom";

import Navbar from "components/layout/Navbar";
import "../App.css";
import RoutesMap from "routes";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <RoutesMap />
    </BrowserRouter>
  );
};
export default App;
