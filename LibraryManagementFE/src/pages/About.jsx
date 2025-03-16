import { NavLink } from "react-router-dom";
import { useAuth } from "../../AuthContextStore";

export const About = () => {
  const { user } = useAuth();

  {
    console.log(user);
  }
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>
                {user ? `Welcome ${user.name} to our website` : `Alohaa Folks,`}
              </p>
              <h1>Why Choose Us? </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et
                repudiandae doloribus quasi provident quod beatae ipsa esse sit
                excepturi ex quos blanditiis.
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
                assumenda necessitatibus! Eius eveniet, consequatur nemo animi
                inventore fugit nostrum et tempore nesciunt.
              </p>
              <br />
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor
                reiciendis fuga natus tenetur perspiciatis illum minima nobis
                earum nesciunt fugiat laudantium?
              </p>
              <br />
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Molestias sunt exercitationem fuga iure consequatur sequi id.
                voluptatem minus! Iure, ut sunt.
              </p>
              <br />
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit
                nihil sed illum ipsa quidem consectetur quisquam veniam labore
                delectus at, culpa nemo harum.
              </p>
              <br />
              <div className="btn btn-group">
                <NavLink to="/contact">
                  <button className="btn"> Connect Now</button>
                </NavLink>
                <button className="btn secondary-btn">learn more</button>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="about.png"
                alt="Open Book Library "
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
