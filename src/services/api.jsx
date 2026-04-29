    const BASE = "http://localhost:3001/api";

    const getToken = () => localStorage.getItem("token");

    export const loginAPI = (usuario, password) =>
    fetch(`${BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password })
    }).then(r => r.json());

    export const getSaldoAPI = () =>
    fetch(`${BASE}/saldo`, {
        headers: { Authorization: getToken() }
    }).then(r => r.json());

    export const transferirAPI = (monto) =>
    fetch(`${BASE}/transferir`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: getToken() },
        body: JSON.stringify({ monto })
    }).then(r => r.json());

    export const getHistorialAPI = () =>
    fetch(`${BASE}/historial`, {
        headers: { Authorization: getToken() }
    }).then(r => r.json());