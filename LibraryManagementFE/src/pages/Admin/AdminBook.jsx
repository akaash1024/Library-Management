import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../AuthContextStore";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const AdminBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState([]);

  const initialBookForm = {
    title: "",
    ISBN: "",
    summary: "",
    author: "",
    publicationDate: "",
    genres: "",
  };
  const [book, setBook] = useState(initialBookForm);
  const { authorizationToken, api } = useAuth();

  const getAllBooksData = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/api/admin/books`, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      console.log(data);

      setBooks(data.books);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    try {
      const response = await api.delete(`/api/admin/book/${id}`, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.status === 200) {
        toast.success("Book deleted successfully");
        getAllBooksData();
      } else {
        toast.error("Deletion failed");
      }
    } catch (error) {
      console.log("Error deleting book:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Format genres as array
      const bookData = {
        ...book,
        genres: book.genres.split(",").map((genre) => genre.trim()),
      };

      const { data } = await api.post("api/admin/book", bookData, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (data.success) {
        setBook(initialBookForm);
        toast.success("Book added successfully");
        getAllBooksData();
      }
    } catch (error) {
      console.error("Failed to add book:", error);
      toast.error(
        error.response?.data?.message || "Failed to add book. Please try again."
      );
    }
  };

  const getAllAuthorsData = async () => {
    try {
      const { data } = await api.get(`/api/admin/author`, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      console.log(data);

      setAuthors(data.author);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAllAuthorsData();
  }, []);
  useEffect(() => {
    if (authorizationToken) {
      getAllBooksData();
    }
  }, [authorizationToken]);

  if (loading) {
    return (
      <section className="container">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Summary</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td>
                    <Skeleton width={20} />
                  </td>
                  <td>
                    <Skeleton width={150} />
                  </td>
                  <td>
                    <Skeleton width={100} />
                  </td>
                  <td>
                    <Skeleton width={100} />
                  </td>
                  <td>
                    <Skeleton width={200} />
                  </td>
                  <td>
                    <Skeleton width={50} />
                  </td>
                  <td>
                    <Skeleton width={50} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  return (
    <section className="container">
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>

              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book, index) => (
                <tr key={book._id}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.authorDetails?.name || "Unknown"}</td>

                  <td>
                    <Link
                      to={`/admin/book/update/${book._id}`}
                      className="edit-btn"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteBook(book._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No books found.
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
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={book.title}
              onChange={handleInputChange}
              placeholder="Enter Book Title"
              required
            />
          </div>

          <div>
            <label htmlFor="author">Author</label>
            <select
              name="author"
              id="author"
              value={book.author}
              onChange={handleInputChange}
              required
            >
              <option value="">Select an Author</option>
              {authors.map((author) => (
                <option key={author._id} value={author._id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>

          

          <div className="flex">
            <div>
              <label htmlFor="publicationDate">Publication </label>
              <input
                type="text"
                name="publicationDate"
                id="publicationDate"
                value={book.publicationDate}
                onChange={handleInputChange}
                placeholder="e.g., March 15, 2023"
              />
            </div>
            <div>
              <label htmlFor="ISBN">ISBN</label>
              <input
                type="text"
                name="ISBN"
                id="ISBN"
                value={book.ISBN}
                onChange={handleInputChange}
                placeholder="Enter ISBN"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="genres">Genres</label>
            <input
              type="text"
              name="genres"
              id="genres"
              value={book.genres}
              onChange={handleInputChange}
              placeholder="Fiction, Mystery, etc. (comma separated)"
            />
          </div>
          <div>
            <label htmlFor="summary">Summary</label>
            <textarea
              name="summary"
              id="summary"
              value={book.summary}
              onChange={handleInputChange}
              placeholder="Enter Book Summary"
              rows="2"
            ></textarea>
          </div>

          <button type="submit">Add Book</button>
        </form>
      </div>
    </section>
  );
};
