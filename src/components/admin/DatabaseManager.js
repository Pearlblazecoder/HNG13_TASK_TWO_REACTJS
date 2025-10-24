import React, { useState } from 'react';
import { databaseService } from '../../services/database';

const DatabaseManager = () => {
  const [showManager, setShowManager] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleExport = () => {
    try {
      databaseService.exportToFile();
      setMessage('Database exported successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error exporting database: ' + error.message);
    }
  };

  const handleImport = async () => {
    if (!importFile) {
      setMessage('Please select a file to import');
      return;
    }

    try {
      await databaseService.importFromFile(importFile);
      setMessage('Database imported successfully! Page will reload...');
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      setMessage('Error importing database: ' + error.message);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the database? All data will be lost!')) {
      databaseService.reset();
      setMessage('Database reset successfully! Page will reload...');
      setTimeout(() => window.location.reload(), 2000);
    }
  };

  const handleFileChange = (e) => {
    setImportFile(e.target.files[0]);
  };

  if (!showManager) {
    return (
      <button 
        onClick={() => setShowManager(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        DB Manager
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'white',
      padding: '20px',
      border: '2px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      zIndex: 1001,
      minWidth: '300px'
    }}>
      <h3>Database Management</h3>
      
      {message && (
        <div style={{
          padding: '10px',
          margin: '10px 0',
          background: message.includes('Error') ? '#f8d7da' : '#d1edff',
          border: message.includes('Error') ? '1px solid #f5c6cb' : '1px solid #b8daff',
          borderRadius: '4px',
          color: message.includes('Error') ? '#721c24' : '#004085'
        }}>
          {message}
        </div>
      )}

      <div style={{ marginBottom: '15px' }}>
        <button onClick={handleExport} style={{ marginRight: '10px' }}>
          Export to JSON
        </button>
        <button onClick={handleReset} style={{ background: '#dc3545', color: 'white' }}>
          Reset Database
        </button>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <h4>Import from JSON</h4>
        <input 
          type="file" 
          accept=".json" 
          onChange={handleFileChange}
          style={{ marginBottom: '10px' }}
        />
        <button onClick={handleImport}>
          Import
        </button>
      </div>

      <button 
        onClick={() => setShowManager(false)}
        style={{ marginTop: '10px' }}
      >
        Close
      </button>
    </div>
  );
};

export default DatabaseManager;