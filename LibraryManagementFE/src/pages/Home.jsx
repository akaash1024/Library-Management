import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      {/* 3rd section  */}
      <section className="section-hero">
        <div className="container grid grid-two-cols">
          <div className="hero-content">
            <h2>Your Gateway to Knowledge</h2>
            <h1>Library Management System</h1>
            <br />
            <p>
              Discover our comprehensive library management solution designed to
              streamline operations and enhance the user experience for both
              librarians and patrons.
            </p>
            <br />
            <p>
              With over 50,000 books in our catalog spanning fiction,
              non-fiction, academic journals, and digital resources, we offer an
              extensive collection to meet all your reading and research needs.
            </p>
            <br />
            <p>
              For librarians, our system provides powerful tools for inventory
              management, patron records, acquisition tracking, and
              comprehensive reporting to optimize library operations.
            </p>
            <br />
            <p>
              Join thousands of satisfied users who have transformed their
              library experience with our state-of-the-art management system.
            </p>
            <br />
            <div className="btn-group">
              <Link to="/contact">
                <button className="btn primary-btn">Get Started</button>
              </Link> 
              <Link to="/services">
                <button className="btn secondary-btn">Explore Features</button>
              </Link>
            </div>
          </div>

          {/* hero images  */}
          <div className="hero-image">
            <img
              src="libraryManagement.png.jpg"
              alt="Library Management System"
              width="400"
              height="500"
            />
          </div>
        </div>
      </section>
    </>
  );
};
