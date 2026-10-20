const FLECHA = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
const FLECHA_IZQ = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
)

// Botón principal (naranja, con flecha) y, si hay `onAtras`, el "Atrás" de texto.
// En celular el principal ocupa todo el ancho y "Atrás" queda abajo.
export default function Navegacion({ texto, onSiguiente, onAtras, deshabilitado = false }) {
  return (
    <div className="fm-nav">
      {onAtras && (
        <button type="button" className="fm-atras" onClick={onAtras}>
          {FLECHA_IZQ}
          Atrás
        </button>
      )}
      <button type="button" className="fm-btn" onClick={onSiguiente} disabled={deshabilitado}>
        {texto}
        {FLECHA}
      </button>
    </div>
  )
}
