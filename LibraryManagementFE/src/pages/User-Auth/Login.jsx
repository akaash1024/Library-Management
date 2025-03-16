import { useState } from "react";
import { useAuth } from "../../../AuthContextStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const initialUserForm = { email: "", password: "" };
  const [user, setUser] = useState(initialUserForm);
  const { api, storeTokenInLS } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("api/auth/login", user);
      console.log("Response from server:", data);

      if (data.success && data.data.token) {
        storeTokenInLS(data.data.token);

        setUser(initialUserForm);

        toast.success(data.message); // ! now getting from backend

        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="container" id="login">
      <div className="login-grid">
        <div className="login-left-img">
          <img src="/login.png" alt="Login image" width={400} />
        </div>

        <div className="login-right-form" >
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleInputChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleInputChange}
            />
            <button type="submit">login</button>
          </form>
        </div>
      </div>
    </div>
  );
};
