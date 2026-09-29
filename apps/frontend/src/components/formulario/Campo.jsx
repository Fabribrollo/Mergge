import Opcion from './Opcion.jsx'

// Renderiza UN campo del formulario según su `tipo`. No sabe nada de "paso 3"
// ni de Turnstile — solo sabe leer `campo` (viene de pasos.js), mostrar el
// valor actual y avisar cuando cambia, vía `onChange(name, nuevoValor)`.
export default function Campo({ campo, valor, onChange, error }) {
  const { tipo, name, label, ayuda, requerido } = campo

  const claseInput = `w-full rounded-sm border-2 bg-white px-4 py-3.5 font-texto text-base text-mg-marron placeholder:text-[#a2947f] focus:outline-none focus:ring-3 ${
    error
      ? 'border-mg-naranja focus:border-mg-naranja focus:ring-mg-naranja/16'
      : 'border-mg-linea focus:border-mg-azul focus:ring-mg-azul/16'
  }`

  if (tipo === 'input' || tipo === 'textarea') {
    return (
      <div className="flex flex-col gap-2.5">
        <label htmlFor={name} className="font-texto text-[15px] font-semibold text-mg-marron">
          {label} {requerido && <span className="text-mg-naranja">*</span>}
          {ayuda && !requerido && <span className="font-normal text-mg-marron-tenue"> — {ayuda}</span>}
        </label>
        {tipo === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            className={claseInput}
            rows={campo.filas || 3}
            placeholder={campo.placeholder}
            value={valor ?? ''}
            onChange={(e) => onChange(name, e.target.value)}
            aria-invalid={!!error}
          />
        ) : (
          <input
            id={name}
            name={name}
            className={claseInput}
            type={campo.inputType || 'text'}
            placeholder={campo.placeholder}
            value={valor ?? ''}
            onChange={(e) => onChange(name, e.target.value)}
            aria-invalid={!!error}
          />
        )}
      </div>
    )
  }

  if (tipo === 'opciones') {
    const { opciones, modo, variante, max } = campo
    const seleccion = valor

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

    const claseContenedor =
      variante === 'pildora'
        ? 'flex flex-wrap gap-2'
        : variante === 'cuadrado'
          ? 'grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-2'
          : 'flex flex-col gap-2'

    const listaOpciones = (
      <div className={claseContenedor}>
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

    if (campo.destacado) {
      return (
        <div className="flex flex-col gap-3 rounded-sm border-2 border-mg-naranja bg-mg-naranja-fondo px-5.5 py-5">
          <div>
            <label className="font-texto text-[15px] font-semibold text-mg-marron">{label}</label>
            {ayuda && <div className="text-[13px] leading-[1.45] text-mg-naranja-texto">{ayuda}</div>}
          </div>
          {listaOpciones}
        </div>
      )
    }

    return (
      <div className="flex flex-col gap-2.5">
        <label className="font-texto text-[15px] font-semibold text-mg-marron">
          {label}
          {ayuda && <span className="font-normal text-mg-marron-tenue"> — {ayuda}</span>}
        </label>
        {listaOpciones}
      </div>
    )
  }

  return null
}
