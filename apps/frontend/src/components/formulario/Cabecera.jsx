import Estrella from '../landing/ui/Estrella.jsx'

const TOTAL = 5

// Header transparente con el logo y el avance: una línea con cinco estrellas
// que se van encendiendo. Muestra dónde estás, no es un menú (no se toca).
//   hechos: cuántos capítulos ya pasaron · actual: índice (0 a 4) del capítulo
//   en curso, o -1 si no hay (apertura y confirmación).
export default function Cabecera({ hechos, actual, texto, sub }) {
  const paso = actual >= 0 ? actual + 1 : hechos
  const hasta = actual >= 0 ? actual : hechos - 1
  const lleno = hasta <= 0 ? 0 : `calc((100% - 14px) * ${hasta / (TOTAL - 1)})`

  return (
    <header className="fm-hdr">
      <div className="fm-hdr-in">
        <a href="/" aria-label="Mergge Studio — inicio" className="inline-flex">
          <img src="/marca/logo-crema.png" alt="Mergge Studio" width="147" height="22" />
        </a>
        <div className="fm-avance">
          <div className="fm-av-txt">
            {texto}
            {sub && <small>{sub}</small>}
          </div>
          <div
            className="fm-pista"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={TOTAL}
            aria-valuenow={paso}
            aria-label="Avance del formulario"
          >
            <i className="fm-lleno" style={{ width: lleno }} />
            {Array.from({ length: TOTAL }, (_, k) => {
              const tam = k < hechos ? 13 : k === actual ? 22 : 12
              const encendida = k < hechos || k === actual
              return (
                <span
                  key={k}
                  className={`fm-nodo${encendida ? '' : ' pend'}`}
                  style={{ left: `calc(7px + (100% - 14px) * ${k / (TOTAL - 1)})` }}
                >
                  <Estrella
                    color={encendida ? '#FFD307' : 'currentColor'}
                    contorno={!encendida}
                    style={{ width: tam, height: tam, display: 'block' }}
                  />
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </header>
  )
}
