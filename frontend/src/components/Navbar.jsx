import React from "react";
import useAuth from "../hooks/useAuth";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { swalConfirm, swalToast, swalLoading } from "../utils/alerts";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await swalConfirm({
      title: "¿Cerrar sesión?",
      text: "Tu sesión actual se cerrará",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    swalLoading("Cerrando sesion...");

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

  return (
    <header className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      {/* Título */}
      <h1 className="font-semibold text-lg text-gray-800">Panel de Control</h1>

      {/* Usuario */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-700">{user?.name}</p>
          <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
        </div>

        <img
          src={`https://ui-avatars.com/api/?name=${
            user?.name || "User"
          }&background=2563eb&color=fff`}
          alt="avatar"
          className="w-9 h-9 rounded-full border"
        />

        {/* Botón logout */}
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition"
          title="Cerrar sesión"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
