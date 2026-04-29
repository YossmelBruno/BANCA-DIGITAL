# Banca Digital

Aplicación web de banca digital con frontend React/Vite y backend Node.js/Express/MySQL.

## 🚀 Despliegue

### Frontend (GitHub Pages)

1. El frontend ya está configurado para GitHub Pages.
2. Ejecuta `npm run build` para generar la carpeta `docs/`.
3. En GitHub, ve a Settings > Pages y selecciona la rama `main` y carpeta `docs/`.
4. Tu frontend estará disponible en: `https://yossmelbruno.github.io/BANCA-DIGITAL/`

### Backend (Render)

1. Crea una cuenta en [Render](https://render.com).
2. Conecta tu repositorio GitHub.
3. Crea un nuevo servicio tipo "Web Service".
4. Configura:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Agrega las variables de entorno:
   - `NODE_ENV=production`
   - `PORT=10000`
   - `DB_HOST=tu_host_mysql`
   - `DB_USER=tu_usuario_mysql`
   - `DB_PASSWORD=tu_password_mysql`
   - `DB_NAME=banca-digital`
   - `JWT_SECRET=tu_secreto_jwt`
6. Render te dará una URL como `https://banca-digital-backend.onrender.com`.

### Base de datos

Para producción, usa una base de datos MySQL en la nube:
- Railway (gratuito)
- PlanetScale
- AWS RDS
- O cualquier host MySQL

### Conectar frontend y backend

1. Una vez desplegado el backend, copia su URL.
2. Edita `.env.production` y cambia `VITE_API_URL` a tu URL de backend + `/api`.
3. Haz commit y push de los cambios.
4. GitHub Pages se actualizará automáticamente.

## 🛠️ Desarrollo local

### Requisitos
- Node.js
- MySQL (XAMPP o similar)

### Instalación
```bash
npm install
```

### Configuración
1. Crea una base de datos llamada `banca-digital`.
2. Crea las tablas:
```sql
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(50) UNIQUE,
  password VARCHAR(255),
  saldo DECIMAL(10,2),
  rol VARCHAR(20)
);

CREATE TABLE transacciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  tipo VARCHAR(20),
  monto DECIMAL(10,2),
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
```
3. Inserta un usuario de prueba:
```sql
INSERT INTO usuarios (usuario, password, saldo, rol) VALUES ('admin', '123', 5000.00, 'cliente');
```

### Ejecutar
```bash
# Backend
npm run backend

# Frontend (en otra terminal)
npm run dev
```

## 📁 Estructura del proyecto

```
src/
├── app/                    # Backend
│   ├── config/db.js        # Configuración MySQL
│   ├── controllers/        # Controladores
│   ├── middleware/         # Middleware de autenticación
│   ├── routes/             # Rutas API
│   └── server.js           # Servidor principal
├── components/             # Componentes React
├── pages/                  # Páginas React
├── services/api.js         # Cliente API
└── App.jsx                 # App principal
```

## 🔧 Variables de entorno

Copia `.env.example` a `.env` y configura las variables necesarias.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Backend deployment

This project now supports deployment-ready backend settings.

- The backend server is `src/app/server.js`.
- Use `npm start` or `npm run backend` to run it.
- Environment variables are configured in `.env.example`.
- The backend uses:
  - `PORT`
  - `DB_HOST`
  - `DB_USER`
  - `DB_PASSWORD`
  - `DB_NAME`
  - `JWT_SECRET`

For deployment to Render, Railway or Heroku, set these variables in the host panel and expose port `PORT`.
