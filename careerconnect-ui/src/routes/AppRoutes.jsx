import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { StudentDashboard } from '../pages/student/StudentDashboard';
import { RecruiterDashboard } from '../pages/recruiter/RecruiterDashboard';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { NotFound } from '../pages/NotFound';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Student Portal */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute requiredRole="STUDENT">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Recruiter Portal */}
      <Route
        path="/recruiter/dashboard"
        element={
          <ProtectedRoute requiredRole="RECRUITER">
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Admin Console */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* 404 Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
