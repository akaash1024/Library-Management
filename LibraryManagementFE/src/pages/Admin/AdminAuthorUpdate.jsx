import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../AuthContextStore";

export const AdminAuthorUpdate = () => {
  const [authorData, setAuthorData] = useState({
    name: "",
    biography: "",
    dateOfBirth: "",
    nationality: ""
  }); 
  const { id } = useParams();
  const { authorizationToken, api } = useAuth();

  const getSingleAuthorData = async () => {
    try {
      const { data } = await api.get(`/api/admin/author/${id}`, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      
      if (data.success && data.author) {
        // Extract only the editable fields from the response
        const { name, biography, dateOfBirth, nationality } = data.author;
        setAuthorData({
          name,
          biography,
          dateOfBirth,
          nationality
        });
      }
    } catch (error) {
      console.log("Error fetching author data:", error);
      toast.error("Failed to load author data");
    }
  };

  useEffect(() => {
    getSingleAuthorData();
  }, [id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setAuthorData({
      ...authorData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.patch(`/api/admin/author/${id}`, authorData, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.status === 200) {
        toast.success("Author updated successfully");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.log("Error updating author data:", error);
      toast.error("Error updating author");
    }
  };

  return (
    <section className="admin-table">
      <div className="contact-content container">
        <h1 className="main-heading">Update Author</h1>
      </div>
      <div className="container grid grid-two-cols">
        <section className="section-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                value={authorData.name || ""}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="biography">Biography</label>
              <textarea
                name="biography"
                id="biography"
                autoComplete="off"
                value={authorData.biography || ""}
                onChange={handleInput}
                rows="4"
              />
            </div>

            <div>
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="text"
                name="dateOfBirth"
                id="dateOfBirth"
                autoComplete="off"
                value={authorData.dateOfBirth || ""}
                onChange={handleInput}
              />
            </div>

            <div>
              <label htmlFor="nationality">Nationality</label>
              <input
                type="text"
                name="nationality"
                id="nationality"
                autoComplete="off"
                value={authorData.nationality || ""}
                onChange={handleInput}
              />
            </div>

            <div>
              <button type="submit">Update Author</button>
            </div>
          </form>
        </section>

        {/* Display books associated with this author */}
        {/* Need to work on this part later on as have deadline of this project */}
        {/* <section className="author-books">
          <h2>Author's Books</h2>
          <div className="books-list">
            {authorData.writtenBooks && authorData.writtenBooks.length > 0 ? (
              <ul>
                {authorData.writtenBooks.map((book) => (
                  <li key={book._id}>
                    <h3>{book.title}</h3>
                    <p><strong>ISBN:</strong> {book.ISBN}</p>
                    <p><strong>Published:</strong> {book.publicationDate}</p>
                    <p><strong>Genres:</strong> {book.genres.join(", ")}</p>
                    <p><strong>Copies Available:</strong> {book.copiesAvailable}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No books found for this author.</p>
            )}
          </div>
        </section> */}
      </div>
    </section>
  );
};