import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import axios from "axios";
import { useAuth } from "../../../AuthContextStore";

export const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken, API, api } = useAuth();

  const getContactsData = async () => {
    try {
      const { data } = await api.get(`/api/admin/contacts`, {
        headers: { Authorization: authorizationToken },
      });

      setContactData(data);
    } catch (error) {
      console.log("Error fetching contact data:", error);
    }
  };

  const deleteContactById = async (id) => {
    try {
      const response = await axios.delete(
        `${API}/api/admin/contacts/delete/${id}`,
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.status === 200) {
        getContactsData();
        toast.success("Deleted successfully");
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      console.log("Error deleting contact:", error);
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <>
      <section className="admin-contacts-section">
        <h1>Admin Contact Data</h1>

        <div className="container admin-users">
          {contactData.map((curContactData, index) => {
            const { username, email, message, _id } = curContactData;

            return (
              <div key={index}>
                <p>{username}</p>
                <p>{email}</p>
                <p>{message}</p>
                <button className="btn" onClick={() => deleteContactById(_id)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
