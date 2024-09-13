import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="app-container">
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {!token ? (
              <>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/properties">View Properties</Link>
                </li>
                <li>
                  <Link to="/add-property">List Property</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <main>
        {/* Conditionally render description on home page */}
        {location.pathname === '/' && (
          <section className="home-section">
            <h1>Welcome to Urban Residential Properties</h1>
            <p>
              Our platform connects property owners and renters in a seamless and efficient way.
              Whether you want to rent a home or list your property for rent, our user-friendly 
              interface and AI-driven property recommendations make it easier for you to find the 
              perfect match. Join us today to experience hassle-free property management and renting.
            </p>
            <div className="home-buttons">
              {!token ? (
                <>
                  <Link to="/signup" className="button">Sign Up Now</Link>
                  <Link to="/login" className="button">Login</Link>
                </>
              ) : (
                <Link to="/properties" className="button">Browse Properties</Link>
              )}
            </div>
          </section>
        )}

        <Outlet />
      </main>

      <footer>
        <p>Urban Residential Properties © 2024</p>
      </footer>
    </div>
  );
};

export default App;
