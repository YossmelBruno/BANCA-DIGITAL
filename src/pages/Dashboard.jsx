import { useEffect, useState } from "react";
import { getSaldoAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [saldo, setSaldo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getSaldoAPI()
      .then((data) => {
        if (data?.saldo !== undefined) {
          const parsed = Number(data.saldo);
          setSaldo(Number.isNaN(parsed) ? data.saldo : parsed);
          setError("");
        } else {
          setError(data.msg || "No se pudo cargar el saldo");
        }
      })
      .catch(() => {
        setError("Error de conexión con el servidor");
      })
      .finally(() => setLoading(false));
  }, []);

  const formattedSaldo = saldo !== null ? Math.abs(Number(saldo)).toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) : null;

  return (
    <div style={{ maxWidth: 820, margin: "56px auto", padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ color: "#eef2ff", margin: 0, fontSize: 34 }}>Mi cuenta</h2>
        <p style={{ color: "#cbd5e1", marginTop: 8 }}>Revisa tu saldo actual y accede rápidamente a transferencias e historial.</p>
      </div>

      <div style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 24,
        padding: 32,
        textAlign: "center",
        boxShadow: "0 30px 80px rgba(0, 0, 0, 0.16)",
      }}>
        <p style={{ fontSize: 15, color: "#cbd5e1", marginBottom: 18 }}>Saldo disponible</p>
        <h1 style={{ color: "#8ab4f8", fontSize: 58, margin: 0 }}>
          S/ {loading ? "Cargando..." : formattedSaldo ?? "..."}
        </h1>
        {error && <p style={{ color: "#fecaca", marginTop: 18 }}>{error}</p>}
      </div>

      <div style={{ display: "flex", gap: 16, marginTop: 30, flexWrap: "wrap" }}>
        <button
          onClick={() => navigate("/transferencia")}
          style={{
            flex: 1,
            minWidth: 180,
            padding: 16,
            background: "#1a73e8",
            color: "#fff",
            border: "none",
            borderRadius: 16,
            fontSize: 16,
            cursor: "pointer",
          }}>
          Transferir
        </button>
        <button
          onClick={() => navigate("/historial")}
          style={{
            flex: 1,
            minWidth: 180,
            padding: 16,
            background: "#34a853",
            color: "#fff",
            border: "none",
            borderRadius: 16,
            fontSize: 16,
            cursor: "pointer",
          }}>
          Historial
        </button>
      </div>
    </div>
  );
}