import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import { ticketService } from '../services/tickets';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const tickets = await ticketService.getTickets();
      const total = tickets.length;
      const open = tickets.filter(t => t.status === 'open').length;
      const inProgress = tickets.filter(t => t.status === 'in_progress').length;
      const closed = tickets.filter(t => t.status === 'closed').length;
      
      setStats({ total, open, inProgress, closed });
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </header>

        <div className="stats-grid">
          <div className="stat-card card">
            <h3>Total Tickets</h3>
            <div className="stat-number">{stats.total}</div>
          </div>
          
          <div className="stat-card card">
            <h3>Open</h3>
            <div className="stat-number" style={{ color: '#10B981' }}>
              {stats.open}
            </div>
          </div>
          
          <div className="stat-card card">
            <h3>In Progress</h3>
            <div className="stat-number" style={{ color: '#F59E0B' }}>
              {stats.inProgress}
            </div>
          </div>
          
          <div className="stat-card card">
            <h3>Closed</h3>
            <div className="stat-number" style={{ color: '#6B7280' }}>
              {stats.closed}
            </div>
          </div>
        </div>

        <div className="dashboard-actions">
          <Link to="/tickets" className="btn btn-primary">
            Manage Tickets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;