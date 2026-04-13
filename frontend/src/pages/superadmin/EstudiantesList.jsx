import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Eye, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import Swal from "sweetalert2";
import { swalConfirm, swalToast, swalLoading } from "../../utils/alerts";

export default function EstudiantesList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
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

  // 🔥 ===============================
  // 📊 ESTADÍSTICAS (NUEVO)
  // 🔥 ===============================
  const total = students.length;

  const vacunados = students.filter(
    (s) => s.medical_record?.vacunado
  ).length;

  const noVacunados = total - vacunados;

  const porcentaje =
    total > 0 ? ((vacunados / total) * 100).toFixed(1) : 0;

  // 🔥 ===============================

  const handleEdit = (id) => {
    navigate(`/dashboard/superadmin/estudiantes/editar/${id}`);
  };

  const handleView = (id) => {
    navigate(`/dashboard/superadmin/estudiantes/${id}`);
  };

  const handleDelete = async (id) => {
    const result = await swalConfirm({
      title: "¿Eliminar estudiante?",
      text: "Esta acción no se puede deshacer.",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      swalLoading("Elimando estudiante...");

      await api.delete(`/students/${id}`);

      setStudents((prev) => prev.filter((s) => s.id !== id));

      Swal.close();

      swalToast({
        icon: "success",
        title: "Estudiante eliminado correctamente",
      });
    } catch (err) {
      console.error("❌ Error al eliminar:", err);

      Swal.close();

      swalToast({
        icon: "error",
        title: "No se pudo eliminar el estudiante",
      });
    }
  };

  const handleDownloadPDF = async (id) => {
    try {
      const response = await api.get(`/students/${id}/pdf`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `reporte_estudiante_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("❌ Error al descargar el PDF:", error);
      alert("No se pudo generar el reporte");
    }
  };

  if (loading)
    return <p className="p-6 text-center">Cargando estudiantes...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">
        Listado de Estudiantes
      </h1>

      {/* 🔥 =============================== */}
      {/* 📊 CARDS DE ESTADÍSTICAS */}
      {/* 🔥 =============================== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-white shadow-md rounded-xl p-4">
          <p className="text-sm text-gray-500">Total alumnos</p>
          <h2 className="text-2xl font-bold">{total}</h2>
        </div>

        <div className="bg-green-100 rounded-xl p-4">
          <p className="text-sm text-green-700">Vacunados</p>
          <h2 className="text-2xl font-bold text-green-700">
            {vacunados}
          </h2>
        </div>

        <div className="bg-red-100 rounded-xl p-4">
          <p className="text-sm text-red-700">No vacunados</p>
          <h2 className="text-2xl font-bold text-red-700">
            {noVacunados}
          </h2>
        </div>

        <div className="bg-blue-100 rounded-xl p-4">
          <p className="text-sm text-blue-700">% Vacunados</p>
          <h2 className="text-2xl font-bold text-blue-700">
            {porcentaje}%
          </h2>
        </div>

      </div>

      {/* 🔥 =============================== */}
      {/* 📋 TABLA */}
      {/* 🔥 =============================== */}

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
                <th className="px-4 py-2 text-left">Vacunación</th> {/* 🔥 NUEVO */}
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

                  {/* 🔥 ESTADO VACUNADO */}
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        s.medical_record?.vacunado
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {s.medical_record?.vacunado
                        ? "Vacunado"
                        : "No vacunado"}
                    </span>
                  </td>

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
                      onClick={() => handleDownloadPDF(s.id)}
                      className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
                      title="Generar reporte PDF"
                    >
                      <FileText size={16} />
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