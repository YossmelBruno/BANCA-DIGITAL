    import { useAuth } from "../context/AuthContext";

    export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav style={{ background: "#1a73e8", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff" }}>
        <h2 style={{ margin: 0 }}>Banca Digital</h2>
        {user && (
            <div>
            <span style={{ marginRight: 16 }}>Usuario{user.usuario} | {user.rol}</span>
            <button onClick={logout} style={{ padding: "6px 14px", background: "#fff", color: "#1a73e8", border: "none", borderRadius: 6, cursor: "pointer" }}>
                Cerrar sesión
            </button>
            </div>
        )}
        </nav>
    );
    }