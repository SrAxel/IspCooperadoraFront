import { useEffect, useState } from "react";
import "./showAlumnosInicio.css";

export default function ShowAlumno() {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [error, setError] = useState(null); // Para manejar errores

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        // Obtener los últimos 2 alumnos creados
        const response = await fetch("/api/alumnos?limit=2");
        const data = await response.json();
        setAlumnos(data);
      } catch (error) {
        console.error("Error al obtener los alumnos:", error);
        setError("No se pudieron cargar los alumnos.");
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchAlumnos();
  }, []);

  return (
    <div className="contenedor-alumnos-ultimos">
      <h1>Últimos Alumnos Creados</h1>
      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      <ul>
        {alumnos.map((alumno) => (
          <li key={alumno._id}>
            <p>Nombre: {alumno.nombre}</p>
            <p>Apellido: {alumno.apellido}</p>
            <p>DNI: {alumno.dni}</p>
            <p>Email: {alumno.email}</p>
          </li>
        ))}
      </ul>
      {alumnos.length === 0 && !loading && <p>No se encontraron alumnos.</p>}
    </div>
  );
}
