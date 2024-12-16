"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function CobrosPage() {
  const [cobros, setCobros] = useState([]);
  const [cobrosInit, setCobrosInit] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cobros") // ejecutamos FETCH
      .then((respuesta) => respuesta.json()) // Devuelve promesa, y retornamos .json()
      .then((respuestaCobros) => {
        // Devuelve promesa y actualizamos cobros
        setCobros(respuestaCobros);
        setCobrosInit(respuestaCobros);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const buscarCobros = (e) => {
    const filtro = e.target.value;
    const cobrosFiltrados =
      cobrosInit.filter((cobro) =>
        cobro.titulo.toLowerCase().includes(filtro.toLowerCase())
      ) ||
      cobrosInit.filter((cobro) =>
        cobro.descripcion.tolowerCase().includes(filtro.tolowerCase())
      );
    setCobros(cobrosFiltrados);
  };

  const deleteCobroHandler = (id, cobro) => {
    // Confirmación antes de eliminar
    Swal.fire({
      title: `¿Estás seguro/a de que deseas eliminar  "${cobro.titulo}" ?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:3000/api/cobros", {
          method: "DELETE",
          body: id,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // Actualizar la tabla después de la eliminación
            setCobros((prevCobros) =>
              prevCobros.filter((cobro) => cobro._id !== id)
            ); //==
            //const usuariosFiltrados = users.filter(user => user._id != response._id)
            //const usuariosFiltradosInit = usersInit.filter(user => user._id != response._id)
            //setUsers(usuariosFiltrados)
            //setUsersInit(usuariosFiltradosInit)

            Swal.fire({
              title: "Cobro eliminado",
              text: "El cobro fue eliminado correctamente",
              icon: "success",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  return (
    <div className="h-auto">
      <div className="data-controls">
        <form className="">
          <input
            onKeyUp={buscarCobros}
            type="text"
            placeholder="Buscar cobro"
            className=""
          />
        </form>
        <Link href={"/cobros/crear"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2  rounded">
            Nuevo cobro
          </button>
        </Link>
      </div>
      <div className="">
        <table className="min-w-full divide-y divide-gray-200  ">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-4 py-1  text-lg font-semibold text-gray-500 w-auto "
              >
                ID
              </th>
              <th
                scope="col"
                className="px-4 py-1  text-lg font-semibold text-gray-500"
              >
                TÍTULO
              </th>
              <th
                scope="col"
                className="px-4 py-1  text-lg font-semibold text-gray-500 "
              >
                DESCRIPCIÓN
              </th>
              <th
                scope="col"
                className="px-4 py-1  text-lg font-semibold text-gray-500 "
              >
                MONTO
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td>Cargando ...</td>
              </tr>
            )}
            {!loading &&
              cobros.map((cobro, index) => (
                <tr className="bg-white hover:bg-slate-300" key={index}>
                  <td className="   text-xl border-b-2   whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="  text-xl border-b-2  whitespace-nowrap">
                    {cobro.titulo}
                  </td>
                  <td className=" text-xl border-b-2  whitespace-nowrap">
                    {cobro.descripcion}
                  </td>
                  <td className="text-xl border-b-2  whitespace-nowrap">
                    {cobro.monto}
                  </td>
                  <td className=" text-xl border-b-2  whitespace-nowrap"></td>
                  <td className=" text-xl border-b-2  whitespace-nowrap">
                    <button className="bg-[--jungle-green] hover:bg-[--jungle-greenHover] text-white font-bold py-1 px-2   rounded">
                      Editar
                    </button>
                  </td>
                  <td className=" text-sm lg:text-xl border-b-2  whitespace-nowrap"></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
