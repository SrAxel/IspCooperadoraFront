"use client";
import PagosAlumnoComponente from "@/app/componentes/PagosAlumnoComponente";
import { formatNumberToCurrency, formatDate } from "@/utils/format-helpers";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function DetalleAlumnoPage({ params }) {
  const [alumno, setAlumno] = useState();

  useEffect(() => {
    fetch(`http://localhost:3000/api/alumnos/${params.id}`)
      .then((resp) => resp.json())
      .then((data) => setAlumno(data));
  }, []);
  return alumno ? (
    <div>
      <h2 className="subTitulo">Detalle de cobros</h2>
      <h3 className="subH3">Alumno/a:</h3>
      <h1 className="font-extrabold from-neutral-500 text-slate-500 text-4xl border-b-4 border-slate-600 mb-6">
        {alumno.nombre} {alumno.apellido}
      </h1>
      <div className="contenedor-datos">
        <ul className="ul-datos-detalle">
          <li className="li-datos-detalle">
            <strong>DNI</strong>: {alumno.dni}
          </li>
          <li className="li-datos-detalle">
            <strong>DIRECCIÓN</strong>: {alumno.direccion}
          </li>
          <li className="li-datos-detalle">
            <strong>TELÉFONO</strong>: {alumno.telefono}
          </li>
          <li className="li-datos-detalle">
            <strong>EMAIL</strong>: {alumno.email}
          </li>
          <li className="li-datos-detalle">
            <strong>FECHA DE NACIMIENTO</strong>:
            {formatDate(alumno.fecha_nacimiento)}
          </li>
          <div className="contenedor-cobros-detalle">
            {/* Verificamos si el alumno tiene pagos */}
            {alumno.pagos && alumno.pagos.length > 0 ? (
              <>
                <PagosAlumnoComponente
                  pagos={alumno.pagos}
                  alumno={alumno._id}
                  params={params}
                />

                <div className="flex justify-center my-4">
                  <Link href={`/alumnos/${alumno._id}/crear_cobro`}>
                    <button className="bg-[--jungle-green] hover:bg-[--jungle-greenHover] text-white font-bold py-1 px-2 rounded">
                      CREAR OTRO COBRO
                    </button>
                  </Link>
                </div>

                <div className="resumenPagos">
                  <h3 className="font-extrabold border-b-2 border-black text-center text-slate-600 text-2xl">
                    RESUMEN DE PAGOS:
                  </h3>
                  <ul>
                    <li>
                      TOTAL:
                      <strong>
                        {formatNumberToCurrency(alumno.totalPagos)}
                      </strong>
                    </li>
                    <li>
                      ABONADOS:
                      <strong>
                        {formatNumberToCurrency(alumno.pagosAbonados)}
                      </strong>
                    </li>
                    <li>
                      SALDOS:
                      <strong className="text-red-700">
                        {formatNumberToCurrency(alumno.pagosPendientes)}
                      </strong>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="text-center my-4">
                <h2 className="text-xl font-bold text-red-500">
                  El alumno no tiene ningún pago
                </h2>
                <Link href={`/alumnos/${alumno._id}/crear_cobro`}>
                  <button className="bg-[--jungle-green] hover:bg-[--jungle-greenHover] text-white font-bold py-1 px-2 rounded mt-4">
                    CREAR COBRO
                  </button>
                </Link>
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  ) : (
    <p>Cargando datos de alumno...</p>
  );
}
