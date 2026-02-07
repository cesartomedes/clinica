import Swal from "sweetalert2";
import api from "../../api/axiosInstance";

export default function Sistema() {
  const handleBackup = async () => {
    const confirm = await Swal.fire({
      title: "Crear respaldo",
      text: "Se generará una copia completa de la base de datos",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, respaldar",
    });

    if (!confirm.isConfirmed) return;

    try {
      Swal.showLoading();
      await api.post("/superadmin/backup");
      Swal.fire("Éxito", "Respaldo creado correctamente", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudo crear el respaldo", "error");
    }
  };

  const handleRestore = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const confirm = await Swal.fire({
      title: "Restaurar base de datos",
      text: "⚠️ Esto sobrescribirá todos los datos actuales",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Sí, restaurar",
    });

    if (!confirm.isConfirmed) return;

    const formData = new FormData();
    formData.append("backup", file);

    try {
      Swal.showLoading();
      await api.post("/superadmin/restore", formData);
      Swal.fire("Restaurado", "Base de datos restaurada", "success");
    } catch (error) {
      Swal.fire("Error", "Falló la restauración", "error");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Seguridad y respaldo</h1>

      <div className="bg-white p-4 rounded shadow space-y-4">
        <button
          onClick={handleBackup}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Crear respaldo de la base de datos
        </button>

        <div>
          <label className="block font-semibold mb-2">
            Restaurar desde respaldo
          </label>
          <input type="file" onChange={handleRestore} />
        </div>
      </div>
    </div>
  );
}
