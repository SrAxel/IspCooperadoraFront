import Link from "next/link";
import React from "react";
import "./page.css";

const Informacion = () => {
  return (
    <div className="contenedor-nosotros">
      <h1>Cooperadora ISP N20</h1>

      <div className="contenedor-texto">
        <img
          src="/logo-isp.png"
          alt="Logo del Instituto ISP N20"
          className="imagen-instituto"
        />
        <p>
          <a
            href="https://isp20.edu.ar/nuevo/#"
            target="_blank"
            rel="noopener noreferrer"
            className="link-instituto"
          >
            Visita la página del Instituto N20 <span className="nuevo-icon">🡆</span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Informacion;
