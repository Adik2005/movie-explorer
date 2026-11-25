import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import PWAStatusBanner from './components/PWAStatusBanner';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Items = lazy(() => import('./pages/Items'));
const ItemDetail = lazy(() => import('./pages/ItemDetail'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Profile = lazy(() => import('./pages/Profile'));
const Offline = lazy(() => import('./pages/Offline'));
const NotFound = lazy(() => import('./pages/NotFound'));

function RootLayout({ updateAvailable, onUpdateApp }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PWAStatusBanner updateAvailable={updateAvailable} onUpdateApp={onUpdateApp} />
      <Navbar />
      <main style={{ padding: '2rem', flexGrow: 1, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '3rem', color: '#38bdf8' }}>Loading Page...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default function App({ updateAvailable, onUpdateApp }) {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout updateAvailable={updateAvailable} onUpdateApp={onUpdateApp} />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="items" element={<Items />} />
            <Route path="items/:id" element={<ItemDetail />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="offline" element={<Offline />} />
            <Route path="profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}