import Link from "next/link";
import React from "react";

const informacion = () => {
  return (
    <div className="contenedor-nosotros">
      <h1>Cooperadora ISP N20</h1>

      <div className="contenedor-texto">
        <img
          src="/logo-isp.png"
          alt="Imagen del Instituto"
          className="imagen-instituto"
        />
        <p>
          <a
            href="https://isp20.edu.ar/nuevo/#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visita la página del Instituto N20
          </a>
        </p>
      </div>
    </div>
  );
};

export default informacion;
