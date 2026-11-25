import React, { useState, useEffect } from 'react';
import { WifiOff, RefreshCw, Database } from 'lucide-react';
import { isServingCachedData } from '../services/api';

export default function PWAStatusBanner({ updateAvailable, onUpdateApp }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Уведомление об обновлении приложения */}
      {updateAvailable && (
        <div style={{ backgroundColor: '#0284c7', color: 'white', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', fontSize: '0.9rem' }}>
          <span>A new version of Movie Explorer is available!</span>
          <button
            onClick={onUpdateApp}
            style={{ backgroundColor: 'white', color: '#0284c7', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <RefreshCw size={14} /> Update Now
          </button>
        </div>
      )}

      {/* Индикатор офлайн-режима и кэшированных данных */}
      {(!isOnline || isServingCachedData) && (
        <div style={{ backgroundColor: !isOnline ? '#991b1b' : '#854d0e', color: 'white', padding: '0.5rem 1rem', textAlign: 'center', fontSize: '0.85rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
          {!isOnline ? (
            <><WifiOff size={16} /> Offline Mode — Showing cached content</>
          ) : (
            <><Database size={16} /> Viewing cached API data</>
          )}
        </div>
      )}
    </div>
  );
}