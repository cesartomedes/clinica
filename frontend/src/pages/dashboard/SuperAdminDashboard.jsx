import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { Users, Activity, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SuperAdminDashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await api.get("/students");
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setStudents(data || []);
    } catch (error) {
      console.error("Error cargando dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 📊 STATS
  const total = students.length;
  const vacunados = students.filter(s => s.medical_record?.vacunado).length;
  const noVacunados = total - vacunados;
  const porcentaje = total > 0 ? ((vacunados / total) * 100).toFixed(1) : 0;

  if (loading) {
    return <p className="p-6 text-center">Cargando dashboard...</p>;
  }

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-bold text-gray-800">
        Dashboard General
      </h1>

      {/* 🔥 CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white shadow rounded-xl p-4 flex items-center gap-4">
          <Users className="text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Total Estudiantes</p>
            <h2 className="text-2xl font-bold">{total}</h2>
          </div>
        </div>

        <div className="bg-green-100 rounded-xl p-4 flex items-center gap-4">
          <CheckCircle className="text-green-600" />
          <div>
            <p className="text-sm text-green-700">Vacunados</p>
            <h2 className="text-2xl font-bold text-green-700">{vacunados}</h2>
          </div>
        </div>

        <div className="bg-red-100 rounded-xl p-4 flex items-center gap-4">
          <XCircle className="text-red-600" />
          <div>
            <p className="text-sm text-red-700">No vacunados</p>
            <h2 className="text-2xl font-bold text-red-700">{noVacunados}</h2>
          </div>
        </div>

        <div className="bg-blue-100 rounded-xl p-4 flex items-center gap-4">
          <Activity className="text-blue-600" />
          <div>
            <p className="text-sm text-blue-700">% Vacunación</p>
            <h2 className="text-2xl font-bold text-blue-700">
              {porcentaje}%
            </h2>
          </div>
        </div>

      </div>

      {/* 🔥 ACCESOS RÁPIDOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div
          onClick={() => navigate("/dashboard/superadmin/estudiantes")}
          className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold">Registrar Estudiante</h3>
          <p className="text-sm text-gray-500">
            Agregar nuevos alumnos al sistema
          </p>
        </div>

        <div
          onClick={() => navigate("/dashboard/superadmin/EstudiantesList")}
          className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold">Ver Estudiantes</h3>
          <p className="text-sm text-gray-500">
            Consultar y gestionar estudiantes registrados
          </p>
        </div>

      </div>

      {/* 🔥 LISTA RÁPIDA */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">
          Últimos Estudiantes
        </h2>

        {students.slice(0, 5).map((s) => (
          <div
            key={s.id}
            className="flex justify-between border-b py-2 text-sm"
          >
            <span>{s.name}</span>
            <span
              className={
                s.medical_record?.vacunado
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {s.medical_record?.vacunado
                ? "Vacunado"
                : "No vacunado"}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}