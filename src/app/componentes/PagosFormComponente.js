"use client";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";

function PagosFormComponente({ params, handler }) {
  const { id } = params;
  const [alumno, setAlumno] = useState(null);
  const [cobros, setCobros] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchAlumno = async () => {
      try {
        const response = await fetch(`/api/alumnos/${id}`);
        if (!response.ok) throw new Error("No se pudo obtener el alumno");
        const data = await response.json();
        setAlumno(data);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al cargar los datos del alumno.",
          icon: "error",
        });
      }
    };

    const fetchCobros = async () => {
      try {
        const response = await fetch(`/api/cobros`);
        if (!response.ok) throw new Error("No se pudo obtener los cobros");
        const data = await response.json();
        setCobros(data);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al cargar los cobros.",
          icon: "error",
        });
      }
    };

    fetchAlumno();
    fetchCobros();
  }, [id]);

  const formAction = async (event) => {
    event.preventDefault();  // Previene el comportamiento por defecto del formulario

    const formData = new FormData(formRef.current);
    const cobroId = formData.get("cobro_id");
    const cobro = cobros.find((c) => c._id === cobroId);

    try {
      const response = await handler(formData, alumno, cobro);
      if (response && response._id) {
        Swal.fire({
          title: "Pago creado",
          text: `Se ha guardado el pago de ${alumno.nombre} ${alumno.apellido}, para el cobro ${cobro ? cobro.titulo : "(ninguno)"} con éxito`,
          icon: "success",
          confirmButtonColor: "#d33",
          confirmButtonText: "VOLVER",
        }).then(() => {
          window.location.href = "/alumnos";
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al procesar el pago. Intente nuevamente.",
        icon: "error",
      });
    }
  };

  const OnCancelHandler = () => {
    window.history.back();
  };

  return (
    <div className="contenedor-selector">
      <div>
        <form
          ref={formRef}
          onSubmit={formAction}  // Usamos onSubmit en lugar de 'action'
          className="max-w-xl mt-4 bg-[--tropical-indigo] mx-auto p-8 rounded-lg border-2 border-violet-400 shadow-lg"
        >
          <div className="mb-4">
            <label htmlFor="alumno" className="block text-white font-bold">
              Alumno
            </label>
            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200">
              {alumno ? `${alumno.nombre} ${alumno.apellido}` : ""}
            </div>
            <input type="hidden" name="alumno_id" value={alumno ? alumno._id : ""} />
          </div>
          <div className="mb-4">
            <label htmlFor="cobro" className="block text-white font-bold">
              Cobro:
            </label>
            <select
              name="cobro_id"
              className="selectorCobro shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option className="selectorCobro">(ninguno)</option>
              {cobros.map((cobro) => (
                <option key={cobro._id} value={cobro._id} data-titulo={cobro.titulo}>
                  {cobro.titulo}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="fecha" className="block text-white font-bold">
              Fecha
            </label>
            <input
              type="date"
              name="fecha"
              className="shadow appearance-none border rounded w-full hover:border-blue-800 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pagado" className="block text-white font-bold">
              Pagado
            </label>
            <input
              type="checkbox"
              name="pagado"
              className="shadow appearance-auto border rounded h-6 w-6 hover:border-blue-800 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex">
            <div className="flex items-center justify-center mr-8">
              <button
                type="submit"
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Guardar
              </button>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={OnCancelHandler}
                className="bg-green-600 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PagosFormComponente;
