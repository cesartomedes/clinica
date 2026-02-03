import React, { useEffect, useState } from "react";

const VaccineList = () => {
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulación de datos; luego puedes reemplazar con fetch/axios desde tu API
  useEffect(() => {
    // Aquí normalmente llamarías a tu API:
    // fetch("/api/vaccines").then(...)

    // Datos de ejemplo
    const data = [
      { id: 1, name: "COVID-19", manufacturer: "Pfizer", dose: "1ra", date: "2025-10-31" },
      { id: 2, name: "Influenza", manufacturer: "GSK", dose: "2da", date: "2025-10-25" },
      { id: 3, name: "Hepatitis B", manufacturer: "Sanofi", dose: "1ra", date: "2025-09-15" },
    ];

    setTimeout(() => {
      setVaccines(data);
      setLoading(false);
    }, 500); // Simula un pequeño retraso
  }, []);

  if (loading) return <p>Cargando vacunas...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Listado de Vacunas 💉</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Fabricante</th>
              <th className="py-2 px-4 border-b">Dosis</th>
              <th className="py-2 px-4 border-b">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {vaccines.map((vaccine) => (
              <tr key={vaccine.id} className="text-center hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{vaccine.id}</td>
                <td className="py-2 px-4 border-b">{vaccine.name}</td>
                <td className="py-2 px-4 border-b">{vaccine.manufacturer}</td>
                <td className="py-2 px-4 border-b">{vaccine.dose}</td>
                <td className="py-2 px-4 border-b">{vaccine.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VaccineList;
