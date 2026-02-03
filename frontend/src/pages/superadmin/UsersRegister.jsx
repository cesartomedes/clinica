import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import Swal from "sweetalert2";

export default function UsersRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  // 🔹 Cargar usuarios al inicio
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.log("Error cargando usuarios", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post("/auth/register", form);
      setMessage("Usuario creado correctamente ✔️");

      setForm({
        name: "",
        email: "",
        password: "",
        role: "admin",
      });

      fetchUsers();
    } catch (error) {
      setMessage(error.response?.data?.message || "Error al registrar usuario ❌");
    }
  };

  // 🔴 ELIMINAR USUARIO
  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar usuario?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`/admin/users/${id}`);
      fetchUsers();
      Swal.fire("Eliminado", "El usuario fue eliminado.", "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
    }
  };

  // 🟡 EDITAR USUARIO
  const editUser = async (user) => {
    const { value: formValues } = await Swal.fire({
      title: "Editar usuario",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Nombre" value="${user.name}">
        <input id="swal-email" class="swal2-input" placeholder="Email" value="${user.email}">
        <select id="swal-role" class="swal2-input">
          <option value="admin" ${user.role === "admin" ? "selected" : ""}>Administrador</option>
          <option value="profesor" ${user.role === "profesor" ? "selected" : ""}>Profesor</option>
          <option value="superadmin" ${user.role === "superadmin" ? "selected" : ""}>Superadmin</option>
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        return {
          name: document.getElementById("swal-name").value,
          email: document.getElementById("swal-email").value,
          role: document.getElementById("swal-role").value,
        };
      },
    });

    if (!formValues) return;

    try {
      await axios.put(`/admin/users/${user.id}`, formValues);
      Swal.fire("Actualizado", "Usuario actualizado correctamente.", "success");
      fetchUsers();
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "No se pudo actualizar el usuario.", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow space-y-6">
      <h2 className="text-xl font-semibold">Registrar Usuario</h2>

      {message && (
        <div className="p-3 mb-3 rounded bg-blue-100 text-blue-700">
          {message}
        </div>
      )}

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="admin">Administrador</option>
          <option value="profesor">Profesor</option>
          <option value="superadmin">Superadmin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Registrar
        </button>
      </form>

      {/* LISTADO DE USUARIOS */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Usuarios registrados</h3>

        <table className="w-full border-collapse border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Rol</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="border p-2">{u.name}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">{u.role}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded"
                    onClick={() => editUser(u)}
                  >
                    Editar
                  </button>

                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => deleteUser(u.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-3 text-gray-600">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
