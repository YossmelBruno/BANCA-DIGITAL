import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{
      background: "#173c86",
      padding: "18px 28px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#fff",
      boxShadow: "0 10px 30px rgba(0,0,0,0.16)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "#fff", display: "grid", placeItems: "center", color: "#173c86", fontWeight: 700 }}>
          BD
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: 20 }}>Banco Digital</h2>
          <p style={{ margin: 0, fontSize: 13, color: "#dbeafe" }}>Tu banca en línea</p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {user ? (
          <>
            <span style={{ color: "#dbeafe" }}>Usuario {user.usuario} | {user.rol}</span>
            <button
              onClick={handleLogout}
              style={{
                padding: "10px 16px",
                background: "#fff",
                color: "#173c86",
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                fontWeight: 600,
              }}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "10px 16px",
              background: "rgba(255,255,255,0.16)",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
            }}>
            Iniciar sesión
          </button>
        )}
      </div>
    </nav>
  );
}