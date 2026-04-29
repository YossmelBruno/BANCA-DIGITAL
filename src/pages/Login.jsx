    import { useState } from "react";
    import { useAuth } from "../context/AuthContext";
    import { loginAPI } from "../services/api";
    import { useNavigate } from "react-router-dom";

    export default function Login() {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const data = await loginAPI(usuario, password);
        if (data.token) {
        login(data.user, data.token);
        navigate("/dashboard");
        } else {
        setError(data.msg);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "100px auto", padding: 32, border: "1px solid #ddd", borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", color: "#1a73e8" }}>Banca Digital</h2>
        <input placeholder="Usuario" value={usuario} onChange={e => setUsuario(e.target.value)}
            style={{ display: "block", width: "100%", marginBottom: 12, padding: 10, borderRadius: 6, border: "1px solid #ccc", boxSizing: "border-box" }} />
        <input placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)}
            style={{ display: "block", width: "100%", marginBottom: 12, padding: 10, borderRadius: 6, border: "1px solid #ccc", boxSizing: "border-box" }} />
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <button onClick={handleLogin}
            style={{ width: "100%", padding: 12, background: "#1a73e8", color: "#fff", border: "none", borderRadius: 6, fontSize: 16, cursor: "pointer" }}>
            Ingresar
        </button>
        </div>
    );
    }