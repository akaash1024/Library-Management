import { useParams } from "react-router-dom";
import { useAuth } from "../../AuthContextStore";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const BookDetails = () => {
  const { id } = useParams();
  const { api } = useAuth();
  const [bookData, setBookData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await api.get(`/api/books/${id}`);
        setBookData(data.book);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, api]);

  if (loading) {
    return (
      <div className="bookCardContainer">
        <div className="bookCard">
          <div className="book-img">
            <Skeleton height={200} />
          </div>
          <div className="book-details">
            <h2 className="book-title">
              <Skeleton width={250} />
              <span className="book-author">
                <Skeleton width={150} />
              </span>
            </h2>
            <p className="book-summary">
              <Skeleton count={3} />
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="error-message">
        ⚠️ Error: {error}
        <button onClick={() => window.location.reload()} className="retry-btn">
          Retry
        </button>
      </p>
    );
  }

  const { authorDetails, summary, title, _id, publicationDate, genres, copiesAvailable } = bookData;

  return (
    <div className="bookCardContainer">
      <div className="bookCard" key={_id}>
        <div className="book-img">
          <img src="/book.jpg" alt={`Cover of ${title}`} />
        </div>
        <div className="book-details">
          <h2 className="book-title">
            {title}{" "}
            <span className="book-author">by {authorDetails?.name}</span>
          </h2>
          <p className="book-summary">{summary}</p>
          <p><strong>Publication Date:</strong> {publicationDate || "N/A"}</p>
          <p><strong>Genres:</strong> {genres?.join(", ") || "N/A"}</p>
          <p><strong>Copies Available:</strong> {copiesAvailable ?? "N/A"}</p>
        </div>
      </div>
    </div>
  );
};
