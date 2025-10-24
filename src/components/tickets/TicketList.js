import React from 'react';

const TicketList = ({ tickets, onEdit, onDelete }) => {
  if (tickets.length === 0) {
    return (
      <div className="empty-state card">
        <h3>No tickets found</h3>
        <p>Create your first ticket to get started!</p>
      </div>
    );
  }

  return (
    <div className="ticket-list">
      {tickets.map(ticket => (
        <div key={ticket.id} className="ticket-card card">
          <div className="ticket-header">
            <h3 className="ticket-title">{ticket.title}</h3>
            <div className="ticket-actions">
              <button 
                onClick={() => onEdit(ticket)}
                className="btn-action edit"
                aria-label="Edit ticket"
              >
                ✏️
              </button>
              <button 
                onClick={() => onDelete(ticket.id)}
                className="btn-action delete"
                aria-label="Delete ticket"
              >
                🗑️
              </button>
            </div>
          </div>
          
          {ticket.description && (
            <p className="ticket-description">{ticket.description}</p>
          )}
          
          <div className="ticket-meta">
            <span className={`status-badge status-${ticket.status}`}>
              {ticket.status.replace('_', ' ')}
            </span>
            <span className="ticket-priority">Priority: {ticket.priority}</span>
            <span className="ticket-date">
              Created: {new Date(ticket.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketList;