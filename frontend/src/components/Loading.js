import React from 'react';

const Loading = ({ message = 'Carregando...' }) => {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-message">{message}</p>

            <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          width: 100%;
          min-height: 200px;
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          margin-bottom: 1rem;
          border: 4px solid rgba(59, 130, 246, 0.1);
          border-left-color: var(--primary-color, #3b82f6);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        .loading-message {
          color: var(--text-light, #64748b);
          font-size: 1rem;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default Loading;