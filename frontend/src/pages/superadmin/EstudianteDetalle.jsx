import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";

export default function EstudianteDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get(`/students/${id}`);
        setStudent(res.data);
      } catch (err) {
        console.error("Error al cargar detalles:", err);
      }
    };
    fetchStudent();
  }, [id]);

  if (!student) return <p className="p-6">Cargando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">
        Información del Estudiante
      </h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p>
          <strong>Nombre:</strong> {student.name}
        </p>
        <p>
          <strong>Sexo:</strong> {student.sexo}
        </p>
        <p>
          <strong>Edad:</strong> {student.edad}
        </p>
        <p>
          <strong>Sección:</strong> {student.section_name}
        </p>
        <p>
          <strong>Fecha de nacimiento:</strong> {student.fecha_nacimiento}
        </p>
        <p>
          <strong>Peso:</strong> {student.peso} kg
        </p>
        <p>
          <strong>Talla:</strong> {student.talla} cm
        </p>
        <p>
          <strong>Circunferencia braquial:</strong>{" "}
          {student.circunferencia_braquial} cm
        </p>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Volver
        </button>
      </div>
    </div>
  );
}
