const DB_KEY = 'ticketapp_database';

// Empty initial database structure
const initialDB = {
  tickets: [],
  users: []
};

export const databaseService = {
  // Initialize database if it doesn't exist
  init: () => {
    if (!localStorage.getItem(DB_KEY)) {
      localStorage.setItem(DB_KEY, JSON.stringify(initialDB));
    }
  },

  // Get entire database
  getDB: () => {
    const db = localStorage.getItem(DB_KEY);
    return db ? JSON.parse(db) : initialDB;
  },

  // Save entire database
  saveDB: (db) => {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  },

  // Get specific collection
  getCollection: (collectionName) => {
    const db = databaseService.getDB();
    return db[collectionName] || [];
  },

  // Save specific collection
  saveCollection: (collectionName, data) => {
    const db = databaseService.getDB();
    db[collectionName] = data;
    databaseService.saveDB(db);
  },

  // Get next ID for a collection
  getNextId: (collectionName) => {
    const collection = databaseService.getCollection(collectionName);
    if (collection.length === 0) return 1;
    return Math.max(...collection.map(item => item.id)) + 1;
  },

  // Get tickets for a specific user
  getUserTickets: (userId) => {
    const tickets = databaseService.getCollection('tickets');
    return tickets.filter(ticket => ticket.userId === userId);
  },

  // Get ticket statistics for a specific user
  getUserStats: (userId) => {
    const userTickets = databaseService.getUserTickets(userId);
    const total = userTickets.length;
    const open = userTickets.filter(t => t.status === 'open').length;
    const inProgress = userTickets.filter(t => t.status === 'in_progress').length;
    const closed = userTickets.filter(t => t.status === 'closed').length;

    return { total, open, inProgress, closed };
  }
};

// Initialize database on import
databaseService.init();