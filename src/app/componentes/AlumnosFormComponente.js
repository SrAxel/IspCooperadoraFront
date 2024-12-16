"use client";

import { useRef } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function AlumnoFormComponente({ handler }) {
  const formRef = useRef(null); // Crear una referencia para el formulario

  const formAction = async (formData) => {
    try {
      const response = await handler(formData);
      console.log(response);
      if (response && response._id) {
        Swal.fire({
          text: `Se ha guardado el alumno/a ${response.nombre} ${response.apellido} con éxito`,
          icon: "success",
          confirmButtonColor: "#d33",
          confirmButtonText: "VOLVER",
        }).then(() => {
          window.location.href = "/alumnos";
        });
      }
    } catch (error) {
      alert("Hubo un error. Intente nuevamente");
    }
  };

  return (
    <form
      ref={formRef} // Asociar la referencia al formulario
      action={formAction}
      className=" max-w-xl mt-4 bg-[--tropical-indigo] mx-auto  p-8  rounded-lg border-2 border-violet-400 shadow-lg "
    >
      <div className="mb-4 ">
        <label htmlFor="nombre" className="block text-white font-bold ">
          Nombre:
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Rodrigo"
          className="shadow appearance-none border rounded w-full  hover:border-blue-800  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="apellido" className="block text-white font-bold ">
          Apellido:
        </label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          placeholder="Rodriguez"
          className="shadow appearance-none border rounded w-full  hover:border-blue-800  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="telefono" className="block text-white font-bold ">
          DNI:
        </label>
        <input
          type="text"
          id="dni"
          name="dni"
          placeholder="40350266"
          className="shadow appearance-none border rounded w-full  hover:border-blue-800  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="direccion" className="block text-white font-bold ">
          Dirección:
        </label>
        <input
          type="text"
          id="direccion"
          name="direccion"
          placeholder="Av Iriondo 2550"
          className="shadow appearance-none border rounded w-full  hover:border-blue-800  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="telefono" className="block text-white font-bold ">
          Teléfono:
        </label>
        <input
          type="text"
          id="telefono"
          name="telefono"
          placeholder="03498-455466"
          className="shadow appearance-none border rounded w-full  hover:border-blue-800  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="telefono" className="block text-white font-bold ">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="direccion@email.com"
          className="shadow appearance-none border rounded w-full  hover:border-blue-800  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="fechaNacimiento"
          className="block text-white font-bold "
        >
          Fecha de nacimiento:
        </label>
        <input
          type="date"
          id="fechaNacimiento"
          name="fechaNacimiento"
          placeholder="dd/mm/aaaa"
          className="shadow appearance-none border rounded w-full  hover:border-blue-800  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="fechaIngreso" className="block text-white font-bold ">
          Fecha de ingreso:
        </label>
        <input
          type="date"
          id="fechaIngreso"
          name="fechaIngreso"
          placeholder="dd/mm/aaaa"
          className="shadow appearance-none border rounded w-full  hover:border-blue-800  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex ">
        <div className="flex items-center justify-center  mr-8">
          <button
            type="submit"
            className="bg-blue-500 mt-4   hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar
          </button>
        </div>
        <div className="flex items-center justify-center">
          <Link href="/alumnos">
            <button
              type="submit"
              className="bg-green-600 mt-4   hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
}
