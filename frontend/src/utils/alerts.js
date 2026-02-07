import Swal from "sweetalert2";

// Detecta modo oscuro del sistema
const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

export const swalConfirm = (options) => {
  return Swal.fire({
    icon: "warning",
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#6b7280",
    background: isDarkMode ? "#1f2937" : "#ffffff",
    color: isDarkMode ? "#f9fafb" : "#111827",
    ...options,
  });
};

export const swalToast = (options) => {
  return Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    background: isDarkMode ? "#1f2937" : "#ffffff",
    color: isDarkMode ? "#f9fafb" : "#111827",
    iconColor: "#22c55e",
    ...options,
  });
};

export const swalLoading = (title = "Cerrando sesión...") => {
  return Swal.fire({
    title,
    allowOutsideClick: false,
    allowEscapeKey: false,
    background: isDarkMode ? "#1f2937" : "#ffffff",
    color: isDarkMode ? "#f9fafb" : "#111827",
    didOpen: () => {
      Swal.showLoading();
    },
  });
};
