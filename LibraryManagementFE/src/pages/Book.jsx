import { NavLink } from "react-router-dom";
import { useAuth } from "../../AuthContextStore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";

export const Book = () => {
  const { books } = useAuth();

  const [searchData, setSearchData] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  
  useEffect(() => {
    if (!books || books.length === 0) return;

    if (!searchData) {
      setFilteredBooks(books);
      return;
    }

    const filtered = books.filter((book) => {
      console.log(book);

      switch (filterType) {
        case "genre":
          return (
            book.genre &&
            book.genre.toLowerCase().includes(searchData.toLowerCase())
          );
        case "year":
          return book.year && book.year.toString().includes(searchData);
        case "author":
          return (
            book.authorDetails &&
            book.authorDetails.name
              .toLowerCase()
              .includes(searchData.toLowerCase())
          );
        default: // Default is title search
          return book.title.toLowerCase().includes(searchData.toLowerCase());
      }
    });

    setFilteredBooks(filtered);
  }, [books, searchData, filterType]);

  // Clear search when filter type changes
  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setSearchData("");
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchData(e.target.value);
  };

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
    <>
      <div className="container filter-books flex">
        <div className="filter-box">
          <select value={filterType} onChange={handleFilterTypeChange}>
            <option value="">Filter by Title</option>
            <option value="genre">Filter by Genre</option>
            <option value="year">Filter by Year</option>
            <option value="author">Filter by Author</option>
          </select>
        </div>

        <div className="search-box flex">
          <label htmlFor="book-search">Search</label>
          <input
            type="text"
            id="book-search"
            placeholder={`Looking for ${filterType || "title"}...`}
            value={searchData}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <section className="section-services">
        {filteredBooks.length === 0 && searchData ? (
          <div className="no-results">
            <p>No books found matching your search criteria.</p>
          </div>
        ) : (
          <div className="book-grid">
            {filteredBooks.map((curElem, index) => {
              const {
                _id,
                ISBN,
                authorDetails: { name: AuthorName },
                title,
                summary,
                genre,
                year,
              } = curElem;

              return (
                <div className="card" key={ISBN || index}>
                  <div className="card-img">
                    <img src="/book.jpg" alt={`Cover of ${title}`} />
                  </div>
                  <div className="card-details">
                    <h2 className="book-title">{title}</h2>
                    <p className="book-author">by {AuthorName}</p>
                    {genre && <p className="book-genre">Genre: {genre}</p>}
                    {year && <p className="book-year">Year: {year}</p>}
                    <p className="book-summary">{summary}</p>
                    <NavLink to={`/book/${_id}`}>
                      <button className="ticket__buy-btn">Read more...</button>
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};
