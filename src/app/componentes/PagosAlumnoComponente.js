import { useEffect, useState } from "react";
import { formatNumberToCurrency } from "@/utils/format-helpers";
import Swal from "sweetalert2";
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";

export default function PagosAlumnoComponente({ pagos, params }) {
  const { id: alumnoId } = params;
  const [alumno, setAlumno] = useState(null);
  const [pagosState, setPagosState] = useState(pagos);

  useEffect(() => {
    const fetchAlumno = async () => {
      try {
        const response = await fetch(`/api/alumnos/${alumnoId}`);
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
    fetchAlumno();
    setPagosState(pagos);
  }, [alumnoId, pagos]);

  const efectuarPago = async (pagoId) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro/a?",
        text: `Estas por abonar el pago. ¿Desea continuar?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirmar pago",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const response = await fetch("http://localhost:3000/api/pagos", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: pagoId }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error("Error al procesar el pago");

        const pagosModificados = pagosState.map((pago) => {
          if (pago._id === data._id) {
            pago.pagado = true;
          }
          return pago;
        });

        setPagosState(pagosModificados);
        Swal.fire({
          title: "¡Pago realizado con éxito!",
          text: "El pago se ha realizado con éxito.",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al realizar el pago. Intenta nuevamente.",
        icon: "error",
      });
    }
  };

  const eliminarPago = async (pagoId) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro/a?",
        text: "Estás a punto de eliminar este pago pendiente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const response = await fetch(`/api/pagos/${pagoId}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Error al eliminar el pago");

        const pagosFiltrados = pagosState.filter(
          (pago) => pago._id !== pagoId
        );
        setPagosState(pagosFiltrados);
        Swal.fire({
          title: "Pago eliminado",
          text: "El pago pendiente ha sido eliminado correctamente.",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al eliminar el pago. Intenta nuevamente.",
        icon: "error",
      });
    }
  };

  return (
    <>
      {pagosState.length === 0 ? (
        <div className="text-center my-4">
          <h2 className="text-xl font-bold text-red-500">
            El alumno no tiene ningún cobro
          </h2>
          <Link href={`/alumnos/${alumnoId}/crear_cobro`}>
            <button className="bg-[--jungle-green] hover:bg-[--jungle-greenHover] text-white font-bold py-1 px-2 rounded mt-4">
              CREAR OTRO COBRO
            </button>
          </Link>
        </div>
      ) : (
        <table className="menuTabla">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-800 text-white rounded-tl-xl">
                COBROS REALIZADOS
              </th>
              <th className="py-2 px-4 bg-gray-800 text-center text-white">
                IMPORTE
              </th>
              <th className="py-2 px-4 bg-gray-800 text-center text-white rounded-tr-xl">
                PAGADO / NO PAGADO
              </th>
            </tr>
          </thead>
          <tbody>
            {pagosState.map((pago) => (
              <tr key={pago._id}>
                <td className="border text-slate-700 px-4 py-2">
                  {pago.cobro_id.titulo}
                </td>
                <td className="border text-center text-slate-700 px-4 py-2">
                  {formatNumberToCurrency(pago.cobro_id.monto)}
                </td>
                <td className="border px-4 py-2 text-center">
                  {pago.pagado ? (
                    <div className="flex justify-around">
                      <span className="text-green-500 font-extrabold">
                        ABONADO
                      </span>
                      <Link href={`/alumnos/${alumnoId}/pagos/${pago._id}/recibo`}>
                        <button className="bg-blue-500 text-white px-2 py-1 ml-6 rounded-md hover:bg-green-600 transition duration-150 ease-in-out">
                          RECIBO
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex justify-around items-center gap-10">
                      <span className="text-red-500 font-extrabold">
                        PENDIENTE
                      </span>
                      <button
                        disabled={pago.pagado}
                        className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition duration-150 ease-in-out"
                        onClick={() => efectuarPago(pago._id)}
                      >
                        ABONAR
                      </button>
                      <FaTrashAlt
                        onClick={() => eliminarPago(pago._id)}
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        style={{ fontSize: "1.5rem" }}
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
