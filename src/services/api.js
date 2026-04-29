const BASE = import.meta.env.VITE_API_URL || "https://banca-digital-backend-production.up.railway.app/api";

//token
export const getToken = () => localStorage.getItem("token");

//Un fetch para evitar que se repita el código
const request = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${BASE}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(getToken() && { Authorization: `Bearer ${getToken()}` })
      }
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("API ERROR:", error);
    return { msg: "Error de conexión con el servidor" };
  }
};


// usuarios
export const loginAPI = (usuario, password) =>
  request("/login", {
    method: "POST",
    body: JSON.stringify({ usuario, password })
  });


//usuario logueado
export const getSaldoAPI = () =>
  request("/saldo");


//transacciones
export const transferirAPI = (monto) =>
  request("/transferir", {
    method: "POST",
    body: JSON.stringify({ monto })
  });


//HISTORIAL - transacciones
export const getHistorialAPI = () =>
  request("/historial");