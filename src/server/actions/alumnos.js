// esta función StudientFormActionHandler se utiliza para enviar datos de un formulario
// de estudiante a una API en un servidor Next.js, esperar la respuesta del servidor y
// devolverla.

"use server";

export const StudientFormActionHandler = async (formData) => {
  const data = {
    nombre: formData.get("nombre"),
    apellido: formData.get("apellido"),
    dni: formData.get("dni"),
    direccion: formData.get("direccion"),
    telefono: formData.get("telefono"),
    email: formData.get("email"),
    fechaNacimiento: formData.get("fechaNacimiento"),
    fechaIngreso: formData.get("fechaIngreso"),
  };

  const response = await fetch("http://localhost:3000/api/alumnos", {
    method: "POST",
    body: JSON.stringify(data), // mandamos los datos del formulario
  });

  const result = await response.json();
  return result;
};
