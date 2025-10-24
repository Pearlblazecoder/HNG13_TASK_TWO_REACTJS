import { SESSION_KEY } from '../utils/constants';
import { databaseService } from './database';

const getCurrentUserId = () => {
  const token = localStorage.getItem(SESSION_KEY);
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token));
    return payload.id;
  } catch {
    return null;
  }
};

export const ticketService = {
  // Get all tickets for current user
  getTickets: async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userId = getCurrentUserId();
        if (!userId) {
          reject(new Error('Unauthorized'));
          return;
        }

        const userTickets = databaseService.getUserTickets(userId);
        resolve([...userTickets]);
      }, 500);
    });
  },

  // Get ticket by ID for current user
  getTicket: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userId = getCurrentUserId();
        if (!userId) {
          reject(new Error('Unauthorized'));
          return;
        }

        const userTickets = databaseService.getUserTickets(userId);
        const ticket = userTickets.find(t => t.id === parseInt(id));
        
        if (ticket) {
          resolve(ticket);
        } else {
          reject(new Error('Ticket not found'));
        }
      }, 300);
    });
  },

  // Create new ticket for current user
  createTicket: async (ticketData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userId = getCurrentUserId();
        if (!userId) {
          reject(new Error('Unauthorized'));
          return;
        }

        const tickets = databaseService.getCollection('tickets');
        const newTicket = {
          id: databaseService.getNextId('tickets'),
          ...ticketData,
          userId: userId, // Associate ticket with current user
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        // Save ticket to database
        const updatedTickets = [...tickets, newTicket];
        databaseService.saveCollection('tickets', updatedTickets);
        
        resolve(newTicket);
      }, 500);
    });
  },

  // Update ticket (only if it belongs to current user)
  updateTicket: async (id, ticketData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userId = getCurrentUserId();
        if (!userId) {
          reject(new Error('Unauthorized'));
          return;
        }

        const tickets = databaseService.getCollection('tickets');
        const index = tickets.findIndex(t => t.id === parseInt(id) && t.userId === userId);
        
        if (index !== -1) {
          const updatedTicket = {
            ...tickets[index],
            ...ticketData,
            updatedAt: new Date().toISOString()
          };

          // Update ticket in database
          const updatedTickets = [...tickets];
          updatedTickets[index] = updatedTicket;
          databaseService.saveCollection('tickets', updatedTickets);
          
          resolve(updatedTicket);
        } else {
          reject(new Error('Ticket not found or access denied'));
        }
      }, 500);
    });
  },

  // Delete ticket (only if it belongs to current user)
  deleteTicket: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userId = getCurrentUserId();
        if (!userId) {
          reject(new Error('Unauthorized'));
          return;
        }

        const tickets = databaseService.getCollection('tickets');
        const index = tickets.findIndex(t => t.id === parseInt(id) && t.userId === userId);
        
        if (index !== -1) {
          // Remove ticket from database
          const updatedTickets = tickets.filter(t => t.id !== parseInt(id));
          databaseService.saveCollection('tickets', updatedTickets);
          
          resolve(true);
        } else {
          reject(new Error('Ticket not found or access denied'));
        }
      }, 500);
    });
  },

  // Get ticket statistics for current user
  getStats: async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userId = getCurrentUserId();
        if (!userId) {
          reject(new Error('Unauthorized'));
          return;
        }

        const stats = databaseService.getUserStats(userId);
        resolve(stats);
      }, 300);
    });
  }
};