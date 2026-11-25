import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '2rem' }}>
      <button 
        disabled={currentPage === 1} 
        onClick={() => onPageChange(currentPage - 1)}
        style={{ padding: '0.5rem 1rem', borderRadius: '0.375rem', border: 'none', backgroundColor: currentPage === 1 ? '#334155' : '#0284c7', color: 'white', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
      >
        Prev
      </button>

      <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
        Page {currentPage} of {totalPages}
      </span>

      <button 
        disabled={currentPage === totalPages} 
        onClick={() => onPageChange(currentPage + 1)}
        style={{ padding: '0.5rem 1rem', borderRadius: '0.375rem', border: 'none', backgroundColor: currentPage === totalPages ? '#334155' : '#0284c7', color: 'white', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
      >
        Next
      </button>
    </div>
  );
}