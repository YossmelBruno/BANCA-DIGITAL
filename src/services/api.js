const BASE =
  import.meta.env.VITE_API_URL ||
  "https://banca-digital-backend-production.up.railway.app/api";

// 🔥 token seguro
export const getToken = () => {
  const token = localStorage.getItem("token");
  return token && token !== "undefined" && token !== "null" ? token : null;
};

// 🔥 fetch centralizado
const request = async (endpoint, options = {}) => {
  try {
    const token = getToken();

    const res = await fetch(`${BASE}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("API ERROR:", error);
    return { msg: "Error de conexión con el servidor" };
  }
};

// -------------------- USUARIOS --------------------
export const loginAPI = (usuario, password) =>
  request("/login", {
    method: "POST",
    body: JSON.stringify({ usuario, password })
  });

// -------------------- SALDO --------------------
export const getSaldoAPI = () => request("/saldo");

// -------------------- TRANSFERENCIA --------------------
export const transferirAPI = (monto) =>
  request("/transferir", {
    method: "POST",
    body: JSON.stringify({ monto })
  });

// -------------------- HISTORIAL --------------------
export const getHistorialAPI = () => request("/historial");