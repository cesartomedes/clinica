// src/router/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-4">Cargando...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Opcional: podra redirigir a un 403 o dashboard
    return <div className="p-4 text-red-600">No tienes permisos para ver esta página.</div>;
  }

  return children;
};

export default ProtectedRoute;
