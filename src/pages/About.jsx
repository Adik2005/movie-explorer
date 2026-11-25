import React from 'react';

export default function About() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#38bdf8' }}>About Movie Explorer</h2>
      <p style={{ marginBottom: '1rem', color: '#cbd5e1' }}>
        Movie Explorer is a modern React Single Page Application utilizing TVMaze API to bring comprehensive show metrics, genre filtering, and rating sorting.
      </p>
      <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8' }}>
        <li>React Router 6 (Nested Routes & URL SearchParams)</li>
        <li>Dynamic Lazy Loading & Suspense</li>
        <li>Interactive Analytics Dashboard</li>
      </ul>
    </div>
  );
}