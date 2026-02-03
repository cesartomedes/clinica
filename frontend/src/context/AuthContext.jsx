// src/context/AuthContext.jsx
import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadFromStorage = () => {
    const token = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const userStored = localStorage.getItem("user_data");

    if (token && userStored) {
      try {
        const decoded = jwtDecode(token);
        const parsedUser = JSON.parse(userStored);

        // Validar expiración
        if (decoded.exp * 1000 < Date.now()) {
          console.warn("Token expirado, cerrando sesión...");
          logout();
        } else {
          setUser(parsedUser);
        }
      } catch (err) {
        console.error("Error al cargar usuario del storage:", err);
        logout();
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    loadFromStorage();
  }, []);

  const login = async ({ email, password }) => {
    const resp = await api.post("/auth/login", { email, password });
    const { access_token, refresh_token, user: userData } = resp.data;

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("user_data", JSON.stringify(userData));

    setUser(userData);
    return resp;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout", {
        refresh_token: localStorage.getItem("refresh_token"),
      });
    } catch (e) {
      console.warn("Error en logout (ignorado):", e);
    }

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");
    setUser(null);
  };

  const refreshToken = async () => {
    const refresh_token = localStorage.getItem("refresh_token");
    if (!refresh_token) throw new Error("No hay refresh token");

    const resp = await api.post("/auth/refresh", { refresh_token });
    const { access_token } = resp.data;
    localStorage.setItem("access_token", access_token);

    try {
      const decoded = jwtDecode(access_token);
      setUser((prev) =>
        prev ? { ...prev, role: decoded.role ?? prev.role } : prev
      );
    } catch {}

    return access_token;
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, refreshToken, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
