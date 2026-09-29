// Un botón de opción reutilizable. `variante` decide cómo se ve la "marca"
// de selección: círculo (radio), cuadrado (checkbox) o píldora (sin marca,
// el fondo azul alcanza para mostrar que está elegida).
export default function Opcion({ label, activo, onClick, variante = 'circulo' }) {
  const esPildora = variante === 'pildora'

  const clases = [
    'flex min-h-12 cursor-pointer items-center gap-3 rounded-sm border-2 px-4 text-left font-texto text-sm font-medium text-mg-marron',
    activo ? 'border-mg-azul bg-mg-seleccion-fondo' : 'border-mg-linea bg-white hover:border-[#a2947f]',
    esPildora ? 'w-fit justify-center rounded-full' : '',
  ]

  const claseMarca = [
    'h-[17px] w-[17px] flex-none border-2',
    variante === 'cuadrado' ? 'rounded-[3px]' : 'rounded-full shadow-[inset_0_0_0_3px_#ffffff]',
    activo ? 'border-mg-azul bg-mg-azul' : 'border-[#b8ae99] bg-white',
  ].join(' ')

  return (
    <button type="button" className={clases.join(' ')} onClick={onClick} aria-pressed={activo}>
      {!esPildora && <span className={claseMarca} aria-hidden="true" />}
      <span>{label}</span>
    </button>
  )
}
