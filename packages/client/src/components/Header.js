import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <div>
      <h1>RBAC App</h1>
      <div id="menu">
        <Link to="/login" className="nav-link">
          login
        </Link>
      </div>
    </div>
  );
}
