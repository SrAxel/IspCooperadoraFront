"use client";

import { formatDate } from "@/utils/format-helpers";
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";

export default function EditarPagoForm({ params, handler, pagos }) {
  const { id, pagoId } = params; // ID del alumno y pago
  const [alumno, setAlumno] = useState(null);
  const [pago, setPago] = useState(null);
  const [loading, setLoading] = useState(false); // Indicador de carga

  const formRef = useRef(null);

  useEffect(() => {
    const fetchAlumnoYPago = async () => {
      try {
        const [alumnoResponse, pagoResponse] = await Promise.all([
          fetch(`http://localhost:3000/api/alumnos/${id}`),
          fetch(`http://localhost:3000/api/pagos/${pagoId}`),
        ]);

        if (!alumnoResponse.ok || !pagoResponse.ok)
          throw new Error("Error en la solicitud");

        const alumnoData = await alumnoResponse.json();
        const pagoData = await pagoResponse.json();

        setAlumno(alumnoData);
        setPago(pagoData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAlumnoYPago();
  }, [id, pagoId]);

  const efectuarPago = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/pagos/${pagoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pagado: true }),
      });

      if (!response.ok) throw new Error("Error al efectuar el pago");

      setPago({ ...pago, pagado: true });
      Swal.fire({
        title: "Pago actualizado",
        text: "El pago ha sido marcado como pagado con éxito.",
        icon: "success",
        confirmButtonColor: "#d33",
        confirmButtonText: "VOLVER",
      }).then(() => {
        window.location.href = `/alumnos/${id}`;
      });
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al actualizar el pago.", "error");
    } finally {
      setLoading(false);
    }
  };

  const formAction = async (formData) => {
    try {
      const response = await handler(formData, alumno, pago);
      if (response && response._id) {
        Swal.fire({
          title: "Pago actualizado",
          text: `El pago ha sido actualizado con éxito.`,
          icon: "success",
          confirmButtonColor: "#d33",
          confirmButtonText: "VOLVER",
        }).then(() => {
          window.location.href = `/alumnos/${alumno._id}`;
        });
      }
    } catch (error) {
      alert("Hubo un error. Intente nuevamente.");
    }
  };

  function OnCancelHandler() {
    window.history.back();
  }

  return alumno && pago ? (
    <div className="contenedor-selector">
      <form
        ref={formRef}
        action={formAction}
        className="max-w-xl mt-4 bg-[--tropical-indigo] mx-auto p-8 rounded-lg border-2 border-violet-400 shadow-lg"
      >
        <h2 className="text-white font-bold text-xl mb-4">Editar Pago</h2>
        <div className="mb-4">
          <label className="block text-white font-bold">Alumno</label>
          <div className="bg-gray-200 shadow border rounded w-full py-2 px-3 text-gray-700">
            {`${alumno.nombre} ${alumno.apellido}`}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-white font-bold">Cobro</label>
          <div className="bg-gray-200 shadow border rounded w-full py-2 px-3 text-gray-700">
            {pago.cobro_id.titulo}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-white font-bold">Fecha</label>
          <div className="bg-gray-200 shadow border rounded w-full py-2 px-3 text-gray-700">
            {formatDate(pago.fechaCreacion)}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={efectuarPago}
            disabled={pago.pagado || loading}
            className={`mt-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              pago.pagado || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
          >
            {loading ? "Procesando..." : pago.pagado ? "Pagado" : "Abonar"}
          </button>
          <button
            type="button"
            onClick={OnCancelHandler}
            className="bg-green-600 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  ) : (
    <p className="text-center text-white font-bold">Cargando...</p>
  );
}
