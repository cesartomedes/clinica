import { useState } from "react";
import axios from "axios";

export default function RegisterSchool({ onRegistered }) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    municipio: "",
    parroquia: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/schools", form);
      setForm({ name: "", code: "", municipio: "", parroquia: "" });
      setMessage("✅ Escuela registrada correctamente");

      if (onRegistered) onRegistered(); // <--- Esto refresca la lista automáticamente
    } catch (error) {
      console.error(error);
      setMessage("❌ Error al registrar la escuela");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-xl">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" placeholder="Nombre de la escuela" value={form.name} onChange={handleChange} className="border p-2 w-full rounded" required />
        <input name="code" placeholder="Código" value={form.code} onChange={handleChange} className="border p-2 w-full rounded" />
        <input name="municipio" placeholder="Municipio" value={form.municipio} onChange={handleChange} className="border p-2 w-full rounded" />
        <input name="parroquia" placeholder="Parroquia" value={form.parroquia} onChange={handleChange} className="border p-2 w-full rounded" />
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition">Registrar</button>
      </form>
      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
}
