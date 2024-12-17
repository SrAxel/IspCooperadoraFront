"use client";

import { StudentFormActionHandler } from "@/server/actions/alumnos"; // Corregí el nombre aquí
import AlumnosFormComponente from "./AlumnosFormComponente";
import { useRouter } from "next/navigation";

function AgregarAlumno() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="m-4">
      {/* Encabezado */}
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-center text-4xl text-slate-700 font-extrabold my-4">
          Inscripción Alumno
        </h2>
        <button
          onClick={handleBack}
          aria-label="Volver a la página anterior"
          className="button-volver bg-gray-300 hover:bg-gray-400 text-slate-800 font-bold py-2 px-4 rounded"
        >
          Volver
        </button>
      </div>

      {/* Formulario */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <AlumnosFormComponente handler={StudentFormActionHandler} />
      </div>
    </div>
  );
}

export default AgregarAlumno;
