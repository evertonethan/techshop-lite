import React from 'react';

const Loading = () => {
    return (
        <div className="loading-container" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            width: '100%'
        }}>
            <div className="loading-spinner" style={{
                border: '4px solid rgba(0, 0, 0, 0.1)',
                borderLeftColor: 'var(--primary-color)',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                animation: 'spin 1s linear infinite',
                marginRight: '10px'
            }}></div>
            <span>Carregando...</span>

            <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default Loading;