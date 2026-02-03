import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet /> {/* Aquí se renderizan las páginas hijas */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
