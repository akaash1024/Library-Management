import { useState } from "react";
import { useAuth } from "../../../AuthContextStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Register = () => {
  const navigate = useNavigate();
  const initialUserForm = { name: "", email: "", password: "" };
  const [user, setUser] = useState(initialUserForm);
  const { api, storeTokenInLS } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("api/auth/register", user);
      console.log("Response from server:", data);

      if (data.newUserDetails?.token) {
        storeTokenInLS(data.newUserDetails.token);
        setUser(initialUserForm);
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Register error Akash testing:", error);
      toast.error(
        "Failed to register. Please try again." || error.response?.data?.message
      );
    }
  };

  return (
    <div className="container" id="register">
      <div className="register-grid">
        <div className="register-left-img">
          <img src="/register.png" alt="Registration image"  height={500} width={400}/>
        </div>

        <div className="register-right-form">
          <h1>Sign up</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={user.name}
              onChange={handleInputChange}
            />
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
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};
