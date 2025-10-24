import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      {/* Hero Section with Wave Background */}
      <section className="hero">
        <div className="hero-background">
          <div className="wave"></div>
          <div className="circle circle-1"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Streamline Your Support with FlexiTicket
            </h1>
            <p className="hero-description">
              The ultimate ticket management solution for teams of all sizes. 
              Track, prioritize, and resolve issues efficiently with our intuitive platform.
            </p>
            <div className="hero-actions">
              <Link to="/auth/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/auth/signup" className="btn btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card card">
              <div className="feature-icon">🚀</div>
              <h3>Fast & Efficient</h3>
              <p>Manage tickets with lightning speed and intuitive workflows.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">👥</div>
              <h3>Team Collaboration</h3>
              <p>Work together seamlessly with your team on complex issues.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">📊</div>
              <h3>Advanced Analytics</h3>
              <p>Gain insights with comprehensive reporting and dashboards.</p>
            </div>
          </div>
        </div>
        <div className="circle circle-2"></div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2025 FlexiTicket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;