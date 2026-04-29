    import { useState } from "react";
    import { transferirAPI } from "../services/api";
    import { useNavigate } from "react-router-dom";

    export default function Transferencia() {
    const [monto, setMonto] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleTransferir = async () => {
        const data = await transferirAPI(parseFloat(monto));
        if (data.msg === "Transferencia exitosa") {
        setMsg(data.msg);
        setError("");
        } else {
        setError(data.msg);
        }
    };

    return (
        <div style={{ maxWidth: 500, margin: "40px auto", padding: 24 }}>
        <h2>Transferencia</h2>
        <input type="number" placeholder="Monto (S/)" value={monto} onChange={e => setMonto(e.target.value)}
            style={{ display: "block", width: "100%", padding: 12, marginBottom: 12, borderRadius: 6, border: "1px solid #ccc", boxSizing: "border-box", fontSize: 16 }} />
        {msg && <p style={{ color: "green" }}>✓{msg}</p>}
        {error && <p style={{ color: "red" }}>X{error}</p>}
        <button onClick={handleTransferir}
            style={{ width: "100%", padding: 12, background: "#1a73e8", color: "#fff", border: "none", borderRadius: 6, fontSize: 16, cursor: "pointer", marginBottom: 8 }}>
            Confirmar transferencia
        </button>
        <button onClick={() => navigate("/dashboard")}
            style={{ width: "100%", padding: 12, background: "#eee", border: "none", borderRadius: 6, fontSize: 16, cursor: "pointer" }}>
            ← Volver
        </button>
        </div>
    );
    }