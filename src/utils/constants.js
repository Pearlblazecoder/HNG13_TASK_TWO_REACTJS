export const STATUS_OPTIONS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  CLOSED: 'closed'
};

export const STATUS_COLORS = {
  [STATUS_OPTIONS.OPEN]: '#10B981', // Green
  [STATUS_OPTIONS.IN_PROGRESS]: '#F59E0B', // Amber
  [STATUS_OPTIONS.CLOSED]: '#6B7280' // Gray
};

export const SESSION_KEY = 'ticketapp_session';