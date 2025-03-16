import { useParams } from "react-router-dom";
import { useAuth } from "../../AuthContextStore";
import { useEffect, useState } from "react";

export const BookDetails = () => {
  const { id } = useParams();
  const { api } = useAuth();
  const [bookData, setBookData] = useState
  (null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await api.get(`/api/books/${id}`);
        setBookData(data.book);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBook();
  }, [id, api]);

  if (error) return <p>Error: {error}</p>;
  if (!bookData) return <p>Loading...</p>;

  const {
    authorDetails,
    summary,
    title,
    _id,
  } = bookData;

  return (
    <>
      {bookData ? (
        <div className="bookCardContainer"> 
          <div className="bookCard" key={_id}>
            <div className="book-img">
              <img src="../../public/book.jpg" alt={`Cover of ${title}`} />
            </div>

            <div className="book-details">
              <h2 className="book-title">
                {title}{" "}
                <span className="book-author">by {authorDetails?.name}</span>
              </h2>
              <p className="book-summary">{summary}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>No book data available.</p>
      )}
    </>
  );
};
