"use client";

import Link from "next/link";
import { useRef } from "react";
import Swal from "sweetalert2";

export default function CobrosFormComponente({ handler }) {
  const formRef = useRef(null);

  const formAction = async (formData) => {
    try {
      const response = await handler(formData);
      console.log("Respuesta del servidor:", response);
      if (response && response._id) {
        Swal.fire({
          title: "Cobro creado",
          text: `Se ha guardado el cobro ${response.titulo} con éxito`,
          icon: "success",
          confirmButtonColor: "#d33",
          confirmButtonText: "VOLVER",
        }).then(() => {
          window.location.href = "/cobros";
        });
      }
    } catch (error) {
      alert("Hubo un error. Intente nuevamente");
    }
  };

  // Configuración de los campos del formulario
  const formFields = [
    { name: "titulo", type: "text", placeholder: "título de cobro", label: "Título" },
    { name: "descripcion", type: "text", placeholder: "descripción del cobro", label: "Descripción" },
    { name: "monto", type: "text", placeholder: "100000", label: "Monto" },
  ];

  return (
    <form
      ref={formRef}
      action={formAction}
      className="max-w-xl mt-4 bg-[--tropical-indigo] mx-auto p-8 rounded-lg border-2 border-violet-400 shadow-lg"
    >
      {/** Renderizado dinámico de los campos del formulario */}
      {formFields.map(({ name, type, placeholder, label }) => (
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
        <Link href="/cobros">
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
