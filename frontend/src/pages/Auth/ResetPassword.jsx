import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token");
  const email = params.get("email");

  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Estado para contador de redirección
  const [countdown, setCountdown] = useState(10);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const resp = await axios.post("/reset-password", {
        token,
        email,
        password,
        password_confirmation,
      });

      // Mostrar mensaje de éxito
      setMessage(resp.data.message);

      // Iniciar contador
      setCountdown(10);
    } catch (err) {
      setError(err.response?.data?.message || "Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  // Efecto para manejar el countdown y redirección
  useEffect(() => {
    if (message) {
      const timer =
        countdown > 0 &&
        setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);

      // Redirigir cuando llegue a 0
      if (countdown === 0) {
        navigate("/login");
      }

      return () => clearInterval(timer);
    }
  }, [countdown, message, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/img/img11.png')" }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Restablecer Contraseña
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Ingresa tu nueva contraseña
          </p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nueva contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar contraseña
              </label>
              <input
                type="password"
                value={password_confirmation}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}
            {message && (
              <p className="text-green-600 text-sm text-center mb-2">
                {message} <br />
                Redirigiendo a login en {countdown} segundos...
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-60"
            >
              {loading ? "Restableciendo..." : "Restablecer Contraseña"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
