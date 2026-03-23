import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { swalConfirm, swalToast, swalLoading } from "../utils/alerts";
import {
  Menu,
  X,
  Home,
  Users,
  Book,
  Settings,
  PencilLine,
  BarChart3,
} from "lucide-react";
import useAuth from "../hooks/useAuth";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    const result = await swalConfirm({
      title: "¿Cerrar sesión?",
      text: "Tu sesión actual se cerrará",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    swalLoading("Cerrando sesión...");

    setTimeout(() => {
      logout();
      Swal.close();

      navigate("/login");

      swalToast({
        icon: "success",
        title: "Sesión cerrada correctamente",
      });
    }, 1200);
  };

  // 🔹 Configuración de menú por rol
  let menuItems = [];

  if (user?.role === "superadmin") {
    menuItems = [
      {
        name: "Escuelas",
        icon: <Home size={20} />,
        path: "/dashboard/superadmin",
      },
      {
        name: "Registro de Estudiantes",
        icon: <Users size={20} />,
        path: "/dashboard/superadmin/estudiantes",
      },
      {
        name: "Estudiantes Registrados",
        icon: <PencilLine size={20} />,
        path: "/dashboard/superadmin/EstudiantesList",
      },
      {
        name: "Estadísticas",
        icon: <BarChart3 size={20} />,
        path: "/dashboard/superadmin/estadisticas",
      },
      {
        name: "Usuarios",
        icon: <Book size={20} />,
        path: "/dashboard/superadmin/usuarios",
      },
      {
        name: "Seguridad y respaldo",
        icon: <Settings size={20} />,
        path: "/dashboard/superadmin/sistema",
      },
    ];
  }

  if (user?.role === "admin") {
    menuItems = [
      {
        name: "Escuelas",
        icon: <Home size={20} />,
        path: "/dashboard/superadmin",
      },
      {
        name: "Estudiantes",
        icon: <Users size={20} />,
        path: "/dashboard/superadmin/estudiantes",
      },
      {
        name: "Estadísticas",
        icon: <BarChart3 size={20} />,
        path: "/dashboard/superadmin/estadisticas",
      },
      {
        name: "Usuarios",
        icon: <Book size={20} />,
        path: "/dashboard/superadmin/usuarios",
      },
    ];
  }

  if (user?.role === "profesor") {
    menuItems = [
      {
        name: "Registrar Vacuna",
        icon: <Book size={20} />,
        path: "/dashboard/profesor/vacunas/registrar",
      },
      {
        name: "Vacunas",
        icon: <Book size={20} />,
        path: "/dashboard/profesor/vacunas/listado",
      },
    ];
  }

  return (
    <aside
      className={`
      ${isOpen ? "w-64" : "w-20"}
      bg-blue-700 text-white min-h-screen
      transition-all duration-300 ease-in-out
      flex flex-col fixed md:static top-0 left-0 z-50
    `}
    >
      {/* Header con logo */}
      <div className="flex flex-col items-center p-4 border-b border-blue-500 relative">

        {/* Logo */}
        <img
          src="/img/logo.png"
          alt="Logo"
          className={`${isOpen ? "w-12 h-12" : "w-8 h-8"} rounded-full object-cover mb-2 border-2 border-white shadow-md`}
        />

        {/* Nombre institución */}
        {isOpen && (
          <span className="font-semibold text-xs text-center leading-tight">
            U.E.N Dr. Jacinto Convit García
          </span>
        )}

        {/* Botón abrir/cerrar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-3 top-3 p-1 rounded hover:bg-blue-600 transition-colors"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

      </div>

      {/* Navegación */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.length > 0 ? (
          menuItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-blue-600" : "hover:bg-blue-600"
                }`
              }
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </NavLink>
          ))
        ) : (
          <div className="text-sm text-blue-200 px-3">
            No tienes secciones disponibles
          </div>
        )}
      </nav>
    </aside>
  );
}