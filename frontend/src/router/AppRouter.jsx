// src/router/AppRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import SuperAdminDashboard from "../pages/dashboard/SuperAdminDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import ProfesorDashboard from "../pages/dashboard/ProfesorDashboard";
import EstudianteDashboard from "../pages/dashboard/EstudianteDashboard";
import Login from "../pages/Auth/Login";
import VaccineForm from "../pages/dashboard/profesor/VaccineForm";
import VaccineList from "../pages/dashboard/profesor/VaccineList";
import RegisterStudent from "../pages/dashboard/school/RegisterStudent";
import EstudiantesList from "../pages/superadmin/EstudiantesList";
import EstudianteDetalle from "../pages/superadmin/EstudianteDetalle";
import UsersRegister from "../pages/superadmin/UsersRegister";

import ProtectedRoute from "./ProtectedRoute"; // 👈 IMPORTANTE

const AppRouter = () => {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* SUPERADMIN */}
      <Route
        path="/dashboard/superadmin"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<SuperAdminDashboard />} />
        <Route path="estudiantes" element={<RegisterStudent />} />
        <Route
          path="/dashboard/superadmin/EstudiantesList"
          element={<EstudiantesList />}
        />
        <Route
          path="/dashboard/superadmin/estudiantes/editar/:id"
          element={<RegisterStudent />}
        />
        <Route
          path="/dashboard/superadmin/estudiantes/:id"
          element={<EstudianteDetalle />}
        />
        <Route path="usuarios" element={<UsersRegister />} />
      </Route>

      {/* ADMIN */}
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
      </Route>

      {/* PROFESOR */}
      <Route
        path="/dashboard/profesor"
        element={
          <ProtectedRoute allowedRoles={["profesor", "admin", "superadmin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ProfesorDashboard />} />
        <Route path="vacunas/registrar" element={<VaccineForm />} />
        <Route path="vacunas/listado" element={<VaccineList />} />
      </Route>

      {/* ESTUDIANTE */}
      <Route
        path="/dashboard/estudiante"
        element={
          <ProtectedRoute allowedRoles={["estudiante", "admin", "superadmin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<EstudianteDashboard />} />
      </Route>

      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<div className="p-6">404 Not Found</div>} />
    </Routes>
  );
};

export default AppRouter;
