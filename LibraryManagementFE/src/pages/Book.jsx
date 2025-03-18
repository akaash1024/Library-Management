import { NavLink } from "react-router-dom";
import { useAuth } from "../../AuthContextStore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const Book = () => {
  
  const { books } = useAuth();

  
  if (!books || books.length === 0) {
    return (
      <section className="section-services">
        <div className="container"></div>
        <div className="book-grid">
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="card" key={index}>
              <div className="card-img">
                <Skeleton height={200} />
              </div>
              <div className="card-details">
                <h2 className="book-title">
                  <Skeleton width={200} />
                  <span className="book-author">
                    <Skeleton width={150} />
                  </span>
                </h2>
                <p className="book-summary">
                  <Skeleton count={3} />
                </p>
                <Skeleton width={100} height={30} />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="section-services">
      <div className="container"></div>
      <div className="book-grid">
        {books.map((curElem, index) => {
          const {
            _id,
            ISBN,
            authorDetails: { name: AuthorName },
            title,
            summary,
          } = curElem;

          return (
            <div className="card" key={ISBN || index}>
              <div className="card-img">
                <img src="/book.jpg" alt={`Cover of ${title}`} />
              </div>
              <div className="card-details">
                <h2 className="book-title">{title}</h2>
                <p className="book-author">by {AuthorName}</p>
                <p className="book-summary">{summary}</p>
                <NavLink to={`/book/${_id}`}>
                  <button className="ticket__buy-btn">Read more...</button>
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
