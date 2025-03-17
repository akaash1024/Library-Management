import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../AuthContextStore";

export const AdminUserUpdate = () => {
  const [userData, setUserData] = useState({}); 
  const { id } = useParams();
  const { authorizationToken, api } = useAuth();

  const getSingleUserData = async () => {
    try {
      const { data } = await api.get(`/api/admin/user/${id}`, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      setUserData(data);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, [id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.patch(`/api/admin/user/${id}`, userData, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      //console.log(response);

      if (response.status === 200) {
        toast.success("Updated successfully");
      } else {
        toast.error("Updation Failed ");
      }
    } catch (error) {
      console.log("Error updating user data:", error);
      toast.error("Error updating user");
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Update User Data</h1>
        </div>
        <div className="container grid grid-two-cols">
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                value={userData?.name || ""}
                onChange={handleInput}
                required
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={userData?.email || ""}
                onChange={handleInput}
                required
              />

              <div>
                <button type="submit">Update</button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  );
};
