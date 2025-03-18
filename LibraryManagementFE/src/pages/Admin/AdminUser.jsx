import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../AuthContextStore";
import { toast } from "react-toastify";

export const AdminUser = () => {
  const [users, setUsers] = useState([]);

  const initialUserForm = { name: "", email: "", password: "" };
  const [user, setUser] = useState(initialUserForm);
  const { authorizationToken, api } = useAuth();

  const getAllUsersData = async () => {
    try {
      const { data } = await api.get(`/api/admin/users`, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      setUsers(data.users);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await api.delete(`/api/admin/user/${id}`, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.status === 200) {
        toast.success("User deleted successfully");
        getAllUsersData();
      } else {
        toast.error("Deletion failed");
      }
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

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
        setUser(initialUserForm);
        toast.success("User added");
      }
    } catch (error) {
      console.error("Failded to add user:", error);
      toast.error(
        error.response?.data?.message || "Failed to add user. Please try again."
      );
    }
  };
  useEffect(() => {
    if (authorizationToken) {
      getAllUsersData();
    }
  }, [authorizationToken, handleSubmit]);

  return (
    <section className="container">
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link
                      to={`/admin/user/update/${user._id}`}
                      className="edit-btn"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* !right side form */}
      <div className="adming-common--form">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              placeholder="Enter your Name"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              placeholder="Enter your Email"
            />
          </div>
          <div>
            <label htmlFor="email">Password</label>
            <input
              type="text"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              placeholder="Enter your Password"
            />
          </div>

          <button>Add User</button>
        </form>
      </div>
    </section>
  );
};
