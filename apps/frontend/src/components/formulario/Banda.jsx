import Estrella from '../landing/ui/Estrella.jsx'

// Una pantalla del formulario: fondo (azul en apertura y cierre, marrón con
// degradé desde el azul en los cinco capítulos), luces de color y la estrella
// grande en contorno. El contenido va adentro, en `.fm-wrap`.
//   tono: 'azul' | 'marron' · estrella: 'cap' | 'hero' | 'fin'
export default function Banda({ tono = 'marron', estrella = 'cap', clase = '', children }) {
  return (
    <section className={`fm-banda t-${tono} ${estrella === 'cap' ? '' : estrella} ${clase}`}>
      <div className="fm-lu" aria-hidden="true">
        <div className={`fm-luz ${tono}-1`} />
        <div className={`fm-luz ${tono}-2`} />
        <div className={`fm-estrella-fondo ${estrella}`}>
          <Estrella contorno color="currentColor" grosor={1} className="block h-auto w-full" />
        </div>
      </div>
      {children}
    </section>
  )
}
