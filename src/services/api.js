const BASE = "http://localhost:3006/api";

// 📌 TOKEN
export const getToken = () => localStorage.getItem("token");

// 📌 FUNCIÓN BASE PARA FETCH (evita repetir código)
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


// 🔐 LOGIN (tabla: usuarios)
export const loginAPI = (usuario, password) =>
  request("/login", {
    method: "POST",
    body: JSON.stringify({ usuario, password })
  });


// 💰 SALDO (usuario logueado)
export const getSaldoAPI = () =>
  request("/saldo");


// 💸 TRANSFERENCIA (tabla: transacciones)
export const transferirAPI = (monto) =>
  request("/transferir", {
    method: "POST",
    body: JSON.stringify({ monto })
  });


// 📊 HISTORIAL (tabla: transacciones)
export const getHistorialAPI = () =>
  request("/historial");