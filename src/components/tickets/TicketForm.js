import React, { useState, useEffect } from 'react';
import { STATUS_OPTIONS } from '../../utils/constants';

const TicketForm = ({ ticket, onSubmit, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: STATUS_OPTIONS.OPEN,
    priority: 'medium'
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (ticket) {
      setFormData({
        title: ticket.title || '',
        description: ticket.description || '',
        status: ticket.status || STATUS_OPTIONS.OPEN,
        priority: ticket.priority || 'medium'
      });
    }
  }, [ticket]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.status) {
      newErrors.status = 'Status is required';
    } else if (!Object.values(STATUS_OPTIONS).includes(formData.status)) {
      newErrors.status = 'Invalid status value';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    try {
      await onSubmit(formData);
      // If onSuccess callback is provided, call it
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="ticket-form-overlay">
      <div className="ticket-form-container card">
        <h2>{ticket ? 'Edit Ticket' : 'Create New Ticket'}</h2>
        
        <form onSubmit={handleSubmit} className="ticket-form">
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-input ${errors.title ? 'error' : ''}`}
              placeholder="Enter ticket title"
              disabled={submitting}
            />
            {errors.title && <div className="error-message">{errors.title}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input"
              rows="4"
              placeholder="Enter ticket description"
              disabled={submitting}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`form-input ${errors.status ? 'error' : ''}`}
                disabled={submitting}
              >
                <option value={STATUS_OPTIONS.OPEN}>Open</option>
                <option value={STATUS_OPTIONS.IN_PROGRESS}>In Progress</option>
                <option value={STATUS_OPTIONS.CLOSED}>Closed</option>
              </select>
              {errors.status && <div className="error-message">{errors.status}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="form-input"
                disabled={submitting}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={onCancel} 
              className="btn btn-secondary"
              disabled={submitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : (ticket ? 'Update Ticket' : 'Create Ticket')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;