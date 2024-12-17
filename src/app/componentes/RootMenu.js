"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/client";

const RootMenu = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: "/", label: "Inicio" },
    { href: "/alumnos", label: "Alumnos" },
    { href: "/cobros", label: "Cobros" },
    { href: "/informacion", label: "Información" },
  ];

  return (
    <div className="layout-menu">
      <h1 className="menu-titulo">Cooperadora ISP N20</h1>
      <ul className="mt-3">
        {menuItems.map(({ href, label }) => (
          <li
            key={href}
            className={`item-menu ${pathname === href ? "active" : ""}`}
          >
            <Link href={href} aria-current={pathname === href ? "page" : undefined}>
              {label}
            </Link>
          </li>
        ))}
        <li>
          <button
            className="logout-button"
            onClick={() => signOut({ callbackUrl: "/iniciar-sesion" })}
            aria-label="Cerrar sesión"
          >
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

export default RootMenu;
