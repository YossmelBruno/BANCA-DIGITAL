import { useState } from "react";
import { transferirAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Transferencia() {
  const [monto, setMonto] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTransferir = async () => {
    setMsg("");
    setError("");

    const value = parseFloat(monto);
    if (!value || value <= 0) {
      setError("Ingresa un monto válido mayor a 0");
      return;
    }

    setLoading(true);
    const data = await transferirAPI(value);
    setLoading(false);

    if (data.msg) {
      if (data.msg.toLowerCase().includes("transferencia")) {
        setMsg(data.msg);
        setError("");
      } else {
        setError(data.msg);
      }
    } else {
      setError("No se pudo procesar la transferencia");
    }
  };

  return (
    <div style={{ maxWidth: 540, margin: "48px auto", padding: 24 }}>
      <h2 style={{ color: "#eef2ff", marginBottom: 16 }}>Transferir fondos</h2>
      <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 18, padding: 24, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.14)" }}>
        <input
          type="number"
          placeholder="Monto (S/)"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            padding: 16,
            marginBottom: 16,
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(255,255,255,0.08)",
            color: "#fff",
            fontSize: 16,
          }}
        />

        {msg && <p style={{ color: "#7dd3fc", marginBottom: 16 }}>✓ {msg}</p>}
        {error && <p style={{ color: "#fecaca", marginBottom: 16 }}>X {error}</p>}

        <button
          onClick={handleTransferir}
          disabled={loading}
          style={{
            width: "100%",
            padding: 16,
            background: "#1a73e8",
            color: "#fff",
            border: "none",
            borderRadius: 14,
            fontSize: 16,
            cursor: "pointer",
            opacity: loading ? 0.8 : 1,
            marginBottom: 12,
          }}>
          {loading ? "Procesando..." : "Confirmar transferencia"}
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            width: "100%",
            padding: 14,
            background: "rgba(255,255,255,0.08)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.16)",
            borderRadius: 14,
            fontSize: 16,
            cursor: "pointer",
          }}>
          ← Volver al dashboard
        </button>
      </div>
    </div>
  );
}