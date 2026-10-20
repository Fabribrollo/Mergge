import Estrella from '../landing/ui/Estrella.jsx'

const MARCA = { width: 16, height: 16, display: 'block' }

// Un botón de opción. Tres formas, según `variante` (viene de pasos.js):
//   'pildora'  -> una opción corta (elegida: naranja)
//   'cuadrado' -> tarjeta para elegir varias: estrella en contorno que se llena al elegir
//   'circulo'  -> fila con círculo, para frases largas de opción única
export default function Opcion({ label, activo, onClick, variante = 'circulo' }) {
  const base = `fm-op ${activo ? 'on ' : ''}`

  if (variante === 'pildora') {
    return (
      <button type="button" className={`${base}fm-pl`} onClick={onClick} aria-pressed={activo}>
        {label}
      </button>
    )
  }

  if (variante === 'cuadrado') {
    return (
      <button type="button" className={`${base}fm-cd`} onClick={onClick} aria-pressed={activo}>
        <span className="no" style={{ opacity: 0.6 }} aria-hidden="true">
          <Estrella contorno color="currentColor" style={MARCA} />
        </span>
        <span className="si" aria-hidden="true">
          <Estrella color="currentColor" style={MARCA} />
        </span>
        <span>{label}</span>
      </button>
    )
  }

  return (
    <button type="button" className={`${base}fm-rd`} onClick={onClick} aria-pressed={activo}>
      <i aria-hidden="true" />
      <span>{label}</span>
    </button>
  )
}
