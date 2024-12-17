"use client";

import { signIn } from "next-auth/react"; // Importación correcta en NextAuth v4
import { useState } from "react";
import "./login.css"; // Asegúrate de que la ruta sea correcta

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Utiliza la función signIn de NextAuth
    const result = await signIn("credentials", {
      redirect: false, // No redirige automáticamente al login exitoso
      email,
      password,
    });

    if (result?.error) {
      setError(result.error); // Mostrar el error en caso de que falle el login
    } else {
      window.location.href = "/"; // Redirige si el login es exitoso
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleLogin}>
          <div className="container-input">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
            />
          </div>
          <div className="container-input">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>} {/* Mejor presentación del error */}
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
