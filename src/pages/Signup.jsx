import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Failed to create an account');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', backgroundColor: '#1e293b', borderRadius: '1rem', border: '1px solid #334155' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#38bdf8' }}>Sign Up</h2>
      {error && <div style={{ color: '#f87171', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Email</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #475569', backgroundColor: '#0f172a', color: 'white' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Password</label>
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #475569', backgroundColor: '#0f172a', color: 'white' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Confirm Password</label>
          <input required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #475569', backgroundColor: '#0f172a', color: 'white' }} />
        </div>

        <button disabled={loading} type="submit" style={{ backgroundColor: '#0284c7', color: 'white', padding: '0.75rem', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold' }}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <button disabled={loading} onClick={handleGoogleSignIn} style={{ width: '100%', marginTop: '1rem', backgroundColor: '#475569', color: 'white', padding: '0.75rem', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold' }}>
        Sign In with Google
      </button>

      <div style={{ textAlign: 'center', marginTop: '1.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
        Already have an account? <Link to="/login" style={{ color: '#38bdf8' }}>Login</Link>
      </div>
    </div>
  );
}