export default function Stats({ stat }) {
  // Validación de que stat está presente y tiene las propiedades necesarias
  if (!stat || !stat.titulo || stat.contador === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contenedor-stat">
      <div className="contenedor-interior">
        <h2 className="titulo-stat">{stat.titulo}:</h2>
        <span className="contador-stat">{stat.contador}</span>
      </div>
    </div>
  );
}