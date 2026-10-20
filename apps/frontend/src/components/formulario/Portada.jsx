import Banda from './Banda.jsx'
import Titulo from './Titulo.jsx'
import OrbitaTitulo from './OrbitaTitulo.jsx'
import Navegacion from './Navegacion.jsx'
import Estrella from '../landing/ui/Estrella.jsx'
import { PASOS } from './pasos.js'

// Apertura: título grande con órbita, de qué se trata, cuánto tarda y los
// cinco capítulos (la lista solo en compu).
export default function Portada({ onEmpezar }) {
  return (
    <Banda tono="azul" estrella="hero">
      <div className="fm-wrap">
        <div className="fm-tw">
          <OrbitaTitulo variante="hero" />
          <Titulo lineas={['Contanos', 'de tu', 'proyecto']} clase="xl" />
        </div>
        <div className="fm-hero-pie">
          <div className="fm-acc">
            <p className="fm-lead">
              Antes de charlar queremos entender qué necesitás, así llegamos a la reunión con ideas concretas y no te
              hacemos repetir&nbsp;todo.
            </p>
            <div className="fm-meta">
              <Estrella color="#FF4500" style={{ width: 12, height: 12, display: 'block' }} />
              Tarda 3 minutos
            </div>
            <Navegacion texto="Empezar" onSiguiente={onEmpezar} />
          </div>
          <ol className="fm-caps">
            {PASOS.map((p) => (
              <li key={p.titulo}>
                <Estrella color="#FF4500" style={{ width: 16, height: 16, display: 'block' }} />
                {p.tituloCorto}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Banda>
  )
}
