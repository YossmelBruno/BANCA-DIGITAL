    import { useEffect, useState } from "react";
    import { getSaldoAPI } from "../services/api";
    import { useNavigate } from "react-router-dom";

    export default function Dashboard() {
    const [saldo, setSaldo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getSaldoAPI().then(data => setSaldo(data.saldo));
    }, []);

    return (
        <div style={{ maxWidth: 600, margin: "40px auto", padding: 24 }}>
        <h2>Mi cuenta</h2>
        <div style={{ background: "#e8f0fe", borderRadius: 12, padding: 24, textAlign: "center", marginBottom: 24 }}>
            <p style={{ fontSize: 14, color: "#555" }}>Saldo disponible</p>
            <h1 style={{ color: "#1a73e8", fontSize: 48 }}>S/ {saldo ?? "..."}</h1>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => navigate("/transferencia")}
            style={{ flex: 1, padding: 14, background: "#1a73e8", color: "#fff", border: "none", borderRadius: 8, fontSize: 16, cursor: "pointer" }}>
            Transferir
            </button>
            <button onClick={() => navigate("/historial")}
            style={{ flex: 1, padding: 14, background: "#34a853", color: "#fff", border: "none", borderRadius: 8, fontSize: 16, cursor: "pointer" }}>
            Historial
            </button>
        </div>
        </div>
    );
    }