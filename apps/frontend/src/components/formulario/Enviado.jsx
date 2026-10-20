import Banda from './Banda.jsx'
import Titulo from './Titulo.jsx'
import OrbitaTitulo from './OrbitaTitulo.jsx'
import Navegacion from './Navegacion.jsx'

// Pantalla de confirmación, una vez que el backend confirmó que guardó el lead.
export default function Enviado({ onVolver }) {
  return (
    <Banda tono="azul" estrella="fin">
      <div className="fm-wrap">
        <div className="fm-tw">
          <OrbitaTitulo variante="fin" />
          <Titulo lineas={['Listo,', 'gracias']} clase="gg" />
        </div>
        <div className="fm-acc" style={{ marginTop: 'clamp(36px, 6vw, 56px)' }}>
          <p className="fm-lead" style={{ maxWidth: 600 }}>
            Ya tenemos todo lo que necesitábamos. En menos de 24 horas te escribimos para coordinar la reunión, y
            vamos a llegar con las primeras ideas para tu&nbsp;proyecto.
          </p>
          <Navegacion texto="Volver al inicio" onSiguiente={onVolver} />
        </div>
      </div>
    </Banda>
  )
}
