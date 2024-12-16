"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/client";

const RootMenu = () => {
  const pathname = usePathname();
  return (
    <div className="layout-menu">
      <h1 className="menu-titulo">Cooperadora ISP N20 </h1>
      <ul className="mt-3">
        <li className={`item-menu ${pathname === "/" ? "active" : ""}`}>
          <Link href="/">Inicio </Link>
        </li>
        <li className={`item-menu ${pathname === "/alumnos" ? "active" : ""}`}>
          <Link href="/alumnos">Alumnos</Link>
        </li>
        <li className={`item-menu ${pathname === "/cobros" ? "active" : ""}`}>
          <Link href="/cobros">Cobros</Link>
        </li>
        <li
          className={`item-menu ${pathname === "/informacion" ? "active" : ""}`}
        >
          <Link href="/informacion">Información</Link>
        </li>
        <li>
          <button
            className="logout-button"
            onClick={() => signOut({ callbackUrl: "/iniciar-sesion" })}
          >
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

export default RootMenu;
