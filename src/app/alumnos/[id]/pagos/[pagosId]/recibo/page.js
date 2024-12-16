"use client";

import PdfRecibo from "@/app/componentes/Pdf/PdfRecibo";
import { PagosFormActionHandler } from "@/server/actions/pagos";
import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

export default function ReciboAlumnoPage({ params }) {
  const { id, pagosId } = params; // id del alumno y el pago

  console.log("ID del alumno recibido en los parámetros:", id); // Verifica que se reciba el ID del alumno
  console.log("ID del pago recibido en los parámetros:", pagosId); // Verifica que se reciba el ID del pago

  const [alumno, setAlumno] = useState(null);
  const [pago, setPago] = useState(null);
  const [loading, setLoading] = useState(true); // Para manejar la carga
  const [error, setError] = useState(null); // Para manejar errores

  useEffect(() => {
    const fetchAlumnoYPago = async () => {
      try {
        // Verificar que los params llegan correctamente
        if (!id || !pagosId) {
          throw new Error(
            `ID del alumno o pago no proporcionado. id: ${id}, pagosId: ${pagosId}`
          );
        }

        console.log("ID del alumno recibido:", id); // Verificar el ID del alumno
        console.log("ID del pago recibido:", pagosId); // Verificar el ID del pago

        // Obtener datos del alumno
        const alumnoResponse = await fetch(
          `http://localhost:3000/api/alumnos/${id}`
        );

        if (!alumnoResponse.ok) {
          throw new Error(`Alumno request failed: ${alumnoResponse.status}`);
        }

        const alumnoData = await alumnoResponse.json();
        console.log("Datos del alumno recibidos:", alumnoData); // Verificar los datos del alumno
        setAlumno(alumnoData);

        // Obtener el pago correspondiente al alumno
        const pagoResponse = await fetch(
          `http://localhost:3000/api/pagos/${pagosId}`
        );

        if (!pagoResponse.ok) {
          throw new Error(`Pago request failed: ${pagoResponse.status}`);
        }

        const pagoData = await pagoResponse.json();
        console.log("Datos del pago recibidos:", pagoData); // Verificar los datos del pago
        setPago(pagoData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
      } finally {
        setLoading(false); // Dejar de cargar una vez que todo se obtenga
      }
    };

    fetchAlumnoYPago();
  }, [id, pagosId]);

  // Muestra un mensaje de carga mientras se obtienen los datos
  if (loading) {
    return <p>Cargando datos del recibo...</p>;
  }

  // Mostrar un mensaje de error si algo salió mal
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Verificar si se obtuvo correctamente el alumno y el pago
  if (!alumno || !pago) {
    console.log("Alumno o Pago no encontrados. Alumno:", alumno, "Pago:", pago);
    return <p>Error al cargar los datos del recibo.</p>;
  }

  return (
    <div className="reportContainer">
      <PDFViewer width="100%" height="300">
        <PdfRecibo
          alumno={alumno}
          pago={pago}
          handler={PagosFormActionHandler}
        />
      </PDFViewer>
    </div>
  );
}
