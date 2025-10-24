import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.includes('/auth');

  if (isAuthPage) return null;

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="nav-brand">
            <Link to="/" className="brand-link">
              <h2>FlexiTicket</h2>
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/tickets" className="nav-link">Tickets</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;