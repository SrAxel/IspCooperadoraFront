import { useEffect, useState } from "react";
import "./showPagosInicio.css";

export default function ShowPagos({ selectedAlumno }) {
  const [pagos, setPagos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        console.log("Fetching pagos");
        // Si se selecciona un alumno, filtrar pagos de ese alumno
        const url = selectedAlumno
          ? `/api/pagos?alumno_id=${selectedAlumno._id}`
          : "/api/pagos";

        const response = await fetch(url);
        const data = await response.json();

        if (Array.isArray(data.pagos)) {
          const lastTwoPagos = data.pagos.slice(0, 2);
          setPagos(lastTwoPagos);
        } else {
          console.error("La respuesta de la API no es un array:", data);
          setError("No se pudieron obtener los pagos.");
        }
      } catch (error) {
        console.error("Error al obtener los pagos:", error);
        setError("Hubo un error al obtener los pagos.");
      }
    };

    if (selectedAlumno) {
      fetchPagos();
    }
  }, [selectedAlumno]);

  return (
    <div className="contenedor-ultimos-pagos">
      <h1>Últimos Pagos Realizados</h1>
      {error && <p className="error-message">{error}</p>}
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
