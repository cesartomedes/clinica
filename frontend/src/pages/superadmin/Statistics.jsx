// src/pages/dashboard/school/Statistics.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { swalToast } from "../../utils/alerts";

const COLORS = ["#22c55e", "#ef4444"]; // Verde = Sí, Rojo = No

export default function Statistics() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [schools, setSchools] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Sesión expirada.");

        const [schoolsRes, studentsRes] = await Promise.all([
          axios.get("http://localhost:8000/api/schools", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8000/api/students", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setSchools(schoolsRes.data.data || schoolsRes.data);
        setStudents(studentsRes.data.data || studentsRes.data);
      } catch (error) {
        console.error("❌ Error cargando estadísticas:", error);
        swalToast({ icon: "error", title: "Error cargando estadísticas" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // 🔹 Contar alumnos vacunados / no vacunados
  const vaccinationStats = () => {
    const vacYes = students.filter((s) => s.medical_record?.vacunado).length;
    const vacNo = students.length - vacYes;
    return [
      { name: "Vacunados", value: vacYes },
      { name: "No Vacunados", value: vacNo },
    ];
  };

  if (loading)
    return (
      <div className="text-center text-gray-600 mt-6">
        Cargando estadísticas...
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Estadísticas del Sistema
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 🔹 Total de escuelas */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">Escuelas Registradas</h2>
          <p className="text-3xl font-bold">{schools.length}</p>
        </div>

        {/* 🔹 Total de alumnos */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">Alumnos Registrados</h2>
          <p className="text-3xl font-bold">{students.length}</p>
        </div>
      </div>

      {/* 🔹 Gráfico de vacunación */}
      <div className="bg-white shadow-md rounded-xl p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">Estado de Vacunación</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={vaccinationStats()}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {vaccinationStats().map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
