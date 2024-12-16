// esta función CobrosFormActionHandler se utiliza para enviar datos de un formulario
// de estudiante a una API en un servidor Next.js, esperar la respuesta del servidor y
// devolverla.

"use server";

export const CobrosFormActionHandler = async (formData) => {
  // Aquí, se están recopilando los datos del formulario
  // ( utilizando el método formData.get()) y se almacenan en un objeto data.
  const data = {
    titulo: formData.get("titulo"),
    descripcion: formData.get("descripcion"),
    monto: formData.get("monto"),
  };

  console.log("Datos del formulario:", data);

  const response = await fetch("http://localhost:3000/api/cobros", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const res = await response.json();

  return res;
};
