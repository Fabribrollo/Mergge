// Título Anton en mayúsculas, una línea por renglón y la última en contorno.
// `clase`: 'xl' (apertura) o 'gg' (confirmación) para los tamaños grandes.
export default function Titulo({ lineas, clase = '' }) {
  return (
    <h1 className={`fm-t1 ${clase}`}>
      {lineas.map((linea, i) => (
        <span key={linea} className={i === lineas.length - 1 && lineas.length > 1 ? 'c' : undefined}>
          {linea}
        </span>
      ))}
    </h1>
  )
}
