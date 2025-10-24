import React, { useState, useEffect } from 'react';
import { ticketService } from '../services/tickets';
import TicketForm from '../components/tickets/TicketForm';
import TicketList from '../components/tickets/TicketList';
import Toast from '../components/common/Toast';
import './Tickets.css';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const ticketData = await ticketService.getTickets();
      setTickets(ticketData);
    } catch (error) {
      setToast({ message: 'Failed to load tickets', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (ticketData) => {
    try {
      await ticketService.createTicket(ticketData);
      setToast({ message: 'Ticket created successfully!', type: 'success' });
      setShowForm(false);
      loadTickets();
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    }
  };

  const handleUpdateTicket = async (ticketData) => {
    try {
      await ticketService.updateTicket(editingTicket.id, ticketData);
      setToast({ message: 'Ticket updated successfully!', type: 'success' });
      setShowForm(false); // Add this line to close the modal
      setEditingTicket(null); // Add this line to clear editing state
      loadTickets();
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    if (!window.confirm('Are you sure you want to delete this ticket?')) {
      return;
    }

    try {
      await ticketService.deleteTicket(ticketId);
      setToast({ message: 'Ticket deleted successfully!', type: 'success' });
      loadTickets();
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    }
  };

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTicket(null);
  };

  if (loading) {
    return <div className="loading">Loading tickets...</div>;
  }

  return (
    <div className="tickets-page">
      <div className="container">
        <header className="tickets-header">
          <h1>Ticket Management</h1>
          <button 
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            Create Ticket
          </button>
        </header>

        {showForm && (
          <TicketForm
            ticket={editingTicket}
            onSubmit={editingTicket ? handleUpdateTicket : handleCreateTicket}
            onCancel={handleCancelForm}
            onSuccess={() => {
              setShowForm(false);
              setEditingTicket(null);
            }}
          />
        )}

        <TicketList
          tickets={tickets}
          onEdit={handleEditTicket}
          onDelete={handleDeleteTicket}
        />
      </div>

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Tickets;