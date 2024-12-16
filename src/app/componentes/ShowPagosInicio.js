import { useEffect, useState } from "react";
import "./showPagosInicio.css";
export default function ShowPagos({ selectedAlumno }) {
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        console.log("Fetching the last 2 pagos");
        // Obtener todos los pagos realizados
        const response = await fetch(`/api/pagos`);
        const data = await response.json();

        console.log("Response data:", data);

        // Verificar si la respuesta es un array
        if (Array.isArray(data.pagos)) {
          // Limitar a los dos últimos pagos
          const lastTwoPagos = data.pagos.slice(0, 2);
          setPagos(lastTwoPagos);
        } else {
          console.error("La respuesta de la API no es un array:", data);
        }
      } catch (error) {
        console.error("Error al obtener los pagos:", error);
      }
    };

    fetchPagos();
  }, []);

  return (
    <div className="contenedor-ultimos-pagos">
      <h1>Últimos Pagos Realizados</h1>
      <ul>
        {pagos.map((pago) => (
          <li key={pago._id}>
            <p>Importe: {pago.cobro_id.monto}</p>
            <p>Fecha: {new Date(pago.fechaCreacion).toLocaleDateString()}</p>
            <p>
              Alumno: {pago.alumno_id.nombre} {pago.alumno_id.apellido}
            </p>
            <p>Concepto: {pago.cobro_id.titulo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
