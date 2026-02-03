import React, { useState, useEffect } from "react";

const VaccineForm = () => {
  const [students, setStudents] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [form, setForm] = useState({
    student_id: "",
    vaccine_id: "",
    application_date: "",
    dose_number: "",
    observations: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [studentsRes, vaccinesRes] = await Promise.all([
          fetch("http://localhost:8000/api/students", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:8000/api/vaccines", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const studentsData = await studentsRes.json();
        const vaccinesData = await vaccinesRes.json();

        setStudents(studentsData);
        setVaccines(vaccinesData);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Vacunación registrada correctamente");
        setForm({
          student_id: "",
          vaccine_id: "",
          application_date: "",
          dose_number: "",
          observations: "",
        });
      } else {
        alert(`⚠️ Error: ${data.message || "No se pudo registrar"}`);
      }
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Registrar Aplicación de Vacuna 💉</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
      >
        {/* Seleccionar estudiante */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Estudiante</label>
          <select
            value={form.student_id}
            onChange={(e) => setForm({ ...form, student_id: e.target.value })}
            className="w-full border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Seleccionar...</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        {/* Seleccionar vacuna */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Vacuna</label>
          <select
            value={form.vaccine_id}
            onChange={(e) => setForm({ ...form, vaccine_id: e.target.value })}
            className="w-full border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Seleccionar...</option>
            {vaccines.map((vaccine) => (
              <option key={vaccine.id} value={vaccine.id}>
                {vaccine.name}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha de aplicación */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Fecha de aplicación</label>
          <input
            type="date"
            value={form.application_date}
            onChange={(e) =>
              setForm({ ...form, application_date: e.target.value })
            }
            className="w-full border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Dosis */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Número de dosis</label>
          <input
            type="number"
            min="1"
            value={form.dose_number}
            onChange={(e) => setForm({ ...form, dose_number: e.target.value })}
            className="w-full border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Observaciones */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Observaciones</label>
          <textarea
            value={form.observations}
            onChange={(e) =>
              setForm({ ...form, observations: e.target.value })
            }
            className="w-full border-gray-300 rounded-md p-2"
            rows="3"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Registrar Vacuna
        </button>
      </form>
    </div>
  );
};

export default VaccineForm;
