import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const ProfesorDashboard = () => {
  const activeClass =
    "px-4 py-2 rounded-md font-medium bg-blue-600 text-white";
  const inactiveClass =
    "px-4 py-2 rounded-md font-medium bg-gray-100 text-gray-700 hover:bg-gray-200";

  return (
    <div className="p-6">
      {/* Título principal */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Panel del Profesor 👨‍🏫
      </h1>

      {/* Menú de navegación interno simplificado */}
      <nav className="flex flex-wrap gap-4 mb-8">
        <NavLink
          to="/dashboard/profesor/vacunas/registrar"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Registrar Vacuna 💉
        </NavLink>

        <NavLink
          to="/dashboard/profesor/vacunas/listado"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Ver Vacunas 📋
        </NavLink>
      </nav>

      {/* Contenedor para renderizar subpáginas */}
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfesorDashboard;
