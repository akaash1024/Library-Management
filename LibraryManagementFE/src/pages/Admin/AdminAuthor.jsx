import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../AuthContextStore";
import { toast } from "react-toastify";

export const AdminAuthor = () => {
  const [authors, setAuthors] = useState([]);

  const initialAuthorForm = {
    name: "",
    email: "",
    books: "",
    biography: "",
    dateOfBirth: "",
  };
  const [author, setAuthor] = useState(initialAuthorForm);
  const { authorizationToken, api } = useAuth();

  const getAllAuthorsData = async () => {
    try {
      const { data } = await api.get(`/api/admin/author`, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      setAuthors(data.author);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const deleteAuthor = async (id) => {
    try {
      const response = await api.delete(`/api/admin/author/${id}`, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.status === 200) {
        toast.success("Author deleted successfully");
        getAllAuthorsData();
      } else {
        toast.error("Deletion failed");
      }
    } catch (error) {
      console.log("Error deleting author:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuthor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("api/admin/author", author, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (data.success) {
        setAuthor(initialAuthorForm);
        toast.success("Author added successfully");
        getAllAuthorsData();
      }
    } catch (error) {
      console.error("Failed to add author:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to add author. Please try again."
      );
    }
  };

  useEffect(() => {
    if (authorizationToken) {
      getAllAuthorsData();
    }
  }, [authorizationToken]);

  return (
    <section className="container">
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {authors.length > 0 ? (
              authors.map((authorItem, index) => (
                <tr key={authorItem._id}>
                  <td>{index + 1}</td>
                  <td>{authorItem.name}</td>

                  <td>{authorItem.dateOfBirth}</td>
                  <td>
                    <Link
                      to={`/admin/author/update/${authorItem._id}`}
                      className="edit-btn"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteAuthor(authorItem._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">
                  No authors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Right side form */}
      <div className="adming-common--form">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={author.name}
              onChange={handleInputChange}
              placeholder="Enter Author Name"
            />
          </div>
          
          
          <div>
            <label htmlFor="biography">Biography</label>
            <input
              name="biography"
              value={author.biography}
              onChange={handleInputChange}
              placeholder="Enter Author Biography"
            />
          </div>
          <div>
            <label htmlFor="nationality">Nationality</label>
            <input
              name="nationality"
              value={author.nationality}
              onChange={handleInputChange}
              placeholder="Enter Author Nationality"
            />
          </div>
          <div>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={author.dateOfBirth}
              onChange={handleInputChange}
            />
          </div>

          <button>Add Author</button>
        </form>
      </div>
    </section>
  );
};
