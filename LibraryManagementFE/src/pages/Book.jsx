// Book.jsx
import { NavLink } from "react-router-dom";
import { useAuth } from "../../AuthContextStore";

export const Book = () => {
  const { books } = useAuth();

  return (
    <section className="section-services">
      <div className="container"></div>

      <div className="book-grid">
        {books.map((curElem, index) => {
          const {
            _id,
            ISBN,
            author,
            copiesAvailable,
            genres,
            publicationDate,
            title,
            summary,
          } = curElem;

          return (
            <div className="card" key={ISBN || index}>
              <div className="card-img">
                <img src="../../public/book.jpg" alt={`Cover of ${title}`} />
              </div>

              <div className="card-details">
                <h2 className="book-title">
                  {title} <span className="book-author">by {author}</span>
                </h2>
                <p className="book-summary">{summary}</p>
                <NavLink to={`/book/${_id}`}>
                  <button className="ticket__buy-btn">Read more..</button>
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
