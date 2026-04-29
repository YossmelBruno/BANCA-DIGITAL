import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!usuario || !password) {
      setError("Completa todos los campos");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await loginAPI(usuario, password);

      if (data.token) {
        login(data.user, data.token);
        navigate("/dashboard");
      } else {
        setError(data.msg || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)", padding: "20px" }}>
      <div style={{ maxWidth: 420, margin: "0 auto", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: 32, boxShadow: "0 30px 80px rgba(0,0,0,0.35)" }}>
        <h2 style={{ color: "#eef2ff", marginBottom: 10, fontSize: 28, textAlign: "center" }}>Iniciar Sesión</h2>
        <p style={{ color: "#94a3b8", textAlign: "center", marginBottom: 24 }}>Accede a tu cuenta con tu usuario y contraseña.</p>

        <label style={{ display: "block", marginBottom: 14, color: "#cbd5e1", fontSize: 14 }}>
          Usuario
          <input
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="admin"
            style={{ width: "100%", marginTop: 8, padding: 14, borderRadius: 16, border: "1px solid rgba(148,163,184,0.4)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 15 }}
          />
        </label>

        <label style={{ display: "block", marginBottom: 20, color: "#cbd5e1", fontSize: 14 }}>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123"
            style={{ width: "100%", marginTop: 8, padding: 14, borderRadius: 16, border: "1px solid rgba(148,163,184,0.4)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 15 }}
          />
        </label>

        {error && <p style={{ color: "#fca5a5", textAlign: "center", marginBottom: 20 }}>{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ width: "100%", padding: 16, borderRadius: 18, border: "none", background: "#2563eb", color: "#fff", fontSize: 16, cursor: "pointer", opacity: loading ? 0.8 : 1 }}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </div>
    </div>
  );
}