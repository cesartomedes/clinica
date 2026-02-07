import React from "react";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h1 className="font-semibold text-center text-lg">Panel de Control</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700">
          {user?.name} ({user?.role})
        </span>
        <img
          src={`https://ui-avatars.com/api/?name=${user?.name || "User"}`}
          alt="avatar"
          className="w-8 h-8 rounded-full border"
        />
      </div>
    </header>
  );
};

export default Navbar;
