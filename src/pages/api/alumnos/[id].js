export default async function handler(req, res) {
  const { id } = req.query;
  const { method } = req;

  if (method === "GET") {
    try {
      const response = await fetch(`http://localhost:1977/alumnos/${id}`);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los datos" });
    }
  }
}
