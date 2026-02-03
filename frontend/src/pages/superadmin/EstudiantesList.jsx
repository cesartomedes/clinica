import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";

export default function EstudiantesList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      console.log("📦 Respuesta completa de /students:", res);
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setStudents(data || []);
    } catch (err) {
      console.error("❌ Error al cargar estudiantes:", err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEdit = (id) => {
    navigate(`/dashboard/superadmin/estudiantes/editar/${id}`);
  };

  const handleView = (id) => {
    navigate(`/dashboard/superadmin/estudiantes/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este alumno?")) return;
    try {
      await api.delete(`/students/${id}`);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("❌ Error al eliminar:", err);
    }
  };

  if (loading)
    return <p className="p-6 text-center">Cargando estudiantes...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">
        Listado de Estudiantes
      </h1>

      {students.length === 0 ? (
        <p>No hay estudiantes registrados.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Sexo</th>
                <th className="px-4 py-2 text-left">Edad</th>
                <th className="px-4 py-2 text-left">Sección</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{s.name}</td>
                  <td className="px-4 py-2">{s.sexo}</td>
                  <td className="px-4 py-2">{s.edad}</td>
                  <td className="px-4 py-2">{s.section_name}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleView(s.id)}
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      title="Ver detalles"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleEdit(s.id)}
                      className="p-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                      title="Editar"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
