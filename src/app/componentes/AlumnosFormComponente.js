"use client";

import { useRef } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function AlumnoFormComponente({ handler }) {
  const formRef = useRef(null);

  const formAction = async (formData) => {
    try {
      const response = await handler(formData);
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
      ref={formRef}
      action={formAction}
      className="max-w-xl mt-4 bg-[--tropical-indigo] mx-auto p-8 rounded-lg border-2 border-violet-400 shadow-lg"
    >
      {/** Campos de entrada */}
      {[
        { name: "nombre", type: "text", placeholder: "Rodrigo", label: "Nombre" },
        { name: "apellido", type: "text", placeholder: "Rodriguez", label: "Apellido" },
        { name: "dni", type: "text", placeholder: "40350266", label: "DNI" },
        { name: "direccion", type: "text", placeholder: "Av Iriondo 2550", label: "Dirección" },
        { name: "telefono", type: "text", placeholder: "03498-455466", label: "Teléfono" },
        { name: "email", type: "email", placeholder: "direccion@email.com", label: "Email" },
        { name: "fechaNacimiento", type: "date", placeholder: "dd/mm/aaaa", label: "Fecha de nacimiento" },
        { name: "fechaIngreso", type: "date", placeholder: "dd/mm/aaaa", label: "Fecha de ingreso" },
      ].map(({ name, type, placeholder, label }) => (
        <div key={name} className="mb-4">
          <label htmlFor={name} className="block text-white font-bold">
            {label}:
          </label>
          <input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            className="shadow appearance-none border rounded w-full hover:border-blue-800 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      ))}

      {/** Botones */}
      <div className="flex">
        <button
          type="submit"
          className="bg-blue-500 mt-4 mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Guardar
        </button>
        <Link href="/alumnos">
          <button
            type="button"
            className="bg-green-600 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
        </Link>
      </div>
    </form>
  );
}
