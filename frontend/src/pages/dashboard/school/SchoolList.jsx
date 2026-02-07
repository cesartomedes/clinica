
import axios from "axios";

export default function SchoolList({ schools, setSchools, loading, message, setMessage }) {
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta escuela?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/schools/${id}`);
      setSchools(schools.filter((s) => s.id !== id));
      setMessage("✅ Escuela eliminada correctamente.");
    } catch (error) {
      console.error(error);
      setMessage("❌ No se pudo eliminar la escuela.");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Cargando escuelas...</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      {message && <p className="mb-4 text-center text-gray-700">{message}</p>}
      {schools.length === 0 ? (
        <p className="text-center text-gray-500">No hay escuelas registradas aún.</p>
      ) : (
        <table className="min-w-full border border-gray-200 rounded-lg text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Código</th>
              <th className="px-4 py-2 text-left">Municipio</th>
              <th className="px-4 py-2 text-left">Parroquia</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school, index) => (
              <tr key={school.id} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 font-medium text-gray-800">{school.name}</td>
                <td className="px-4 py-2">{school.code || "-"}</td>
                <td className="px-4 py-2">{school.municipio || "-"}</td>
                <td className="px-4 py-2">{school.parroquia || "-"}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  {/* <button onClick={() => alert(JSON.stringify(school, null, 2))} className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600">Ver</button> */}
                  <button onClick={() => handleDelete(school.id)} className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
