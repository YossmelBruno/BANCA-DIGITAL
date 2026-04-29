import { useEffect, useState } from "react";
import { getHistorialAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Historial() {
  const [historial, setHistorial] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getHistorialAPI()
      .then((data) => {
        if (Array.isArray(data)) {
          setHistorial(data);
        } else {
          setError(data.msg || "No se pudo cargar el historial");
        }
      })
      .catch(() => setError("Error de conexión con el servidor"));
  }, []);

  return (
    <div style={{ maxWidth: 820, margin: "48px auto", padding: 24 }}>
      <h2 style={{ color: "#eef2ff", marginBottom: 14 }}>Historial de transacciones</h2>
      <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 22, padding: 24, border: "1px solid rgba(255,255,255,0.12)" }}>
        {error && <p style={{ color: "#fecaca", marginBottom: 20 }}>{error}</p>}

        {historial.length === 0 ? (
          <p style={{ color: "#cbd5e1" }}>Sin transacciones aún.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#1a73e8", color: "#fff" }}>
              <tr>
                <th style={{ padding: 14 }}>Tipo</th>
                <th style={{ padding: 14 }}>Monto</th>
                <th style={{ padding: 14 }}>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((t) => (
                <tr key={t.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
                  <td style={{ padding: 12, color: "#e2e8f0" }}>{t.tipo}</td>
                  <td style={{ padding: 12, color: "#fca5a5" }}>- S/ {t.monto}</td>
                  <td style={{ padding: 12, fontSize: 13, color: "#cbd5e1" }}>{new Date(t.fecha).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button
        onClick={() => navigate("/dashboard")}
        style={{ marginTop: 22, padding: "12px 20px", background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 14, cursor: "pointer" }}>
        ← Volver
      </button>
    </div>
  );
}