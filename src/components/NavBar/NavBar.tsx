import "./NavBar.css";

import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="NavBar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/users">Users</NavLink>
      <div className="nav-right">
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
