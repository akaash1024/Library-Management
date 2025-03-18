import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import { FaUser, FaHome, FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../../AuthContextStore";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const AdminLayout = () => {
  const { user, isLoading, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please log in first!");
      navigate("/login", { replace: true });
    } else if (user && !user.isAdmin) {
      toast.error("Access denied!!");
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, user, navigate]);

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/users">
                  <FaUser /> Users
                </NavLink>
              </li>

              <li>
                <NavLink to="/admin/authors">
                  <FaHome /> Authors
                </NavLink>
              </li>

              <li>
                <NavLink to="/admin/books">
                  <FaRegListAlt /> Books
                </NavLink>
              </li>

              {/* 
              <li>
                <NavLink to="/admin/borrow-book">
                  <FaMessage /> Borrowed Book
                </NavLink>
              </li>
              */}

              <li>
                <NavLink to="/admin/contacts">
                  <FaMessage /> Contact
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};
