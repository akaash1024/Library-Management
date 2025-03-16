import { NavLink } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../../AuthContextStore";

export const Header = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header className="container">
      <div className="logo-brand">
        <NavLink to="/" className={() => ""} aria-label="Go to Home">
          <h1>OpenLibrary</h1>
        </NavLink>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Admin
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/books"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Contact
            </NavLink>
          </li>

          {isLoggedIn ? (
            <li>
              <NavLink
                to="/logout"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Logout
              </NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
