import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../AuthContextStore";
import { toast } from "react-toastify";

export const AdminUser = () => {
  const [users, setUsers] = useState([]);
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

  // Delete user
  const deleteUser = async (id) => {
    try {
      const response = await api.delete(`/api/admin/user/${id}`, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      console.log("Deleted user:", response.data);

      if (response.status === 200) {
        toast.success("Deleted successfully");
        getAllUsersData();
      } else {
        toast.error("Deletion failed Failed ");
      }
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  useEffect(() => {
    if (authorizationToken) {
      getAllUsersData();
    }
  }, [authorizationToken]);

  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin Users Data</h1>
          <button style={{ backgroundColor: "green" }}>
            <Link to={"/admin/user/add"}>Add User</Link>
          </button>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {users.map((curUser, index) => (
                <tr key={index}>
                  <td>{curUser.name}</td>
                  <td>{curUser.email}</td>
                  <td>
                    <Link
                      to={`/admin/user/update/${curUser._id}`}
                      className="edit-btn"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(curUser._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
