    import { useEffect, useState } from "react";
    import { getHistorialAPI } from "../services/api";
    import { useNavigate } from "react-router-dom";

    export default function Historial() {
    const [historial, setHistorial] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getHistorialAPI().then(data => setHistorial(data));
    }, []);

    return (
        <div style={{ maxWidth: 600, margin: "40px auto", padding: 24 }}>
        <h2>Historial de transacciones</h2>
        {historial.length === 0
            ? <p style={{ color: "#888" }}>Sin transacciones aún.</p>
            : <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ background: "#1a73e8", color: "#fff" }}>
                <tr>
                    <th style={{ padding: 10 }}>Tipo</th>
                    <th style={{ padding: 10 }}>Monto</th>
                    <th style={{ padding: 10 }}>Fecha</th>
                </tr>
                </thead>
                <tbody>
                {historial.map(t => (
                    <tr key={t.id} style={{ borderBottom: "1px solid #ddd", textAlign: "center" }}>
                    <td style={{ padding: 10 }}>{t.tipo}</td>
                    <td style={{ padding: 10, color: "#e53935" }}>- S/ {t.monto}</td>
                    <td style={{ padding: 10, fontSize: 13 }}>{new Date(t.fecha).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        }
        <button onClick={() => navigate("/dashboard")}
            style={{ marginTop: 16, padding: "10px 20px", background: "#eee", border: "none", borderRadius: 6, cursor: "pointer" }}>
            ← Volver
        </button>
        </div>
    );
    }