import Opcion from './Opcion.jsx'
import Estrella from '../landing/ui/Estrella.jsx'

// Renderiza UN campo del formulario según su `tipo`. No sabe nada de "paso 3"
// ni de Turnstile — solo sabe leer `campo` (viene de pasos.js), mostrar el
// valor actual y avisar cuando cambia, vía `onChange(name, nuevoValor)`.
export default function Campo({ campo, valor, onChange, error }) {
  const { tipo, name, label, requerido } = campo
  const idError = `${name}-error`

  const mensaje = error && (
    <div className="fm-msg" id={idError} aria-live="polite">
      <Estrella color="#FF4500" style={{ width: 13, height: 13, display: 'block' }} />
      <span>{error}</span>
    </div>
  )

  if (tipo === 'input' || tipo === 'textarea') {
    const comunes = {
      id: name,
      name,
      className: `fm-inp${error ? ' error' : ''}`,
      placeholder: campo.placeholder,
      value: valor ?? '',
      required: !!requerido,
      'aria-required': requerido ? true : undefined,
      'aria-invalid': !!error,
      'aria-describedby': error ? idError : undefined,
      onChange: (e) => onChange(name, e.target.value),
    }

    return (
      <div className="fm-cp">
        <label className="fm-lb" htmlFor={name}>
          {label}
          {requerido && (
            <span className="fm-ast" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {tipo === 'textarea' ? (
          <textarea {...comunes} rows={campo.filas || 3} />
        ) : (
          <input {...comunes} type={campo.inputType || 'text'} />
        )}
        {mensaje}
      </div>
    )
  }

  if (tipo === 'opciones') {
    const { opciones, modo, variante, max } = campo
    const seleccion = valor
    const idEtiqueta = `${name}-etiqueta`

    function estaActiva(opcion) {
      return modo === 'multi' ? Array.isArray(seleccion) && seleccion.includes(opcion) : seleccion === opcion
    }

    function elegir(opcion) {
      if (modo === 'multi') {
        const actual = Array.isArray(seleccion) ? seleccion : []
        if (actual.includes(opcion)) {
          onChange(name, actual.filter((v) => v !== opcion))
        } else {
          if (max && actual.length >= max) return
          onChange(name, [...actual, opcion])
        }
      } else {
        onChange(name, opcion)
      }
    }

    const claseGrupo =
      variante === 'cuadrado' ? 'fm-grupo tarj' : variante === 'circulo' ? 'fm-grupo lista-r' : 'fm-grupo'

    const grupo = (
      <div className={claseGrupo} role="group" aria-labelledby={idEtiqueta}>
        {opciones.map((opcion) => (
          <Opcion
            key={opcion}
            label={opcion}
            activo={estaActiva(opcion)}
            onClick={() => elegir(opcion)}
            variante={variante}
          />
        ))}
      </div>
    )

    // Presupuesto: va en un recuadro aparte, con su aclaración (`nota`).
    if (campo.destacado) {
      return (
        <div className="fm-dest">
          <div className="fm-lb" id={idEtiqueta}>
            {label}
          </div>
          {campo.nota && <p>{campo.nota}</p>}
          {grupo}
        </div>
      )
    }

    return (
      <div className="fm-cp">
        <div className="fm-lb" id={idEtiqueta}>
          {label}
        </div>
        {grupo}
      </div>
    )
  }

  return null
}
