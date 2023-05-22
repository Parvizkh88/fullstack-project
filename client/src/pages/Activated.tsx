import React from "react";
import { Link } from "react-router-dom";

const Activated: React.FC = () => {
  return (
    <div>
      <h1>Activated Account</h1>
      <p>Tab on the link to login</p>
      <Link to="/login">login</Link>
    </div>
  );
};

export default Activated;
