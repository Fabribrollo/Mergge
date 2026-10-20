import Orbita from '../landing/ui/Orbita.jsx'

// La órbita que abraza el título grande: larga, baja y apenas más ancha que el
// texto (receta de la web). Dos copias, una para celular y otra para compu,
// que el CSS alterna: así el HTML del servidor y el del cliente coinciden.
const SOMBRA = 'drop-shadow(0 12px 24px rgba(20,18,140,0.5))'

const VARIANTES = {
  hero: {
    m: { rotacion: -10, grosor: 3, angulo: 6, tamano: 34, top: '14%', alto: '74%' },
    d: { rotacion: -6, grosor: 5, angulo: 4, tamano: 56, top: '13%', alto: '74%' },
  },
  fin: {
    m: { rotacion: -10, grosor: 3, angulo: -22, tamano: 34, top: '14%', alto: '74%' },
    d: { rotacion: -6, grosor: 5, angulo: -18, tamano: 60, top: '12%', alto: '76%' },
  },
}

export default function OrbitaTitulo({ variante = 'hero' }) {
  const { m, d } = VARIANTES[variante]
  return (
    <>
      {[
        ['fm-orb fm-orb-m', m],
        ['fm-orb fm-orb-d', d],
      ].map(([clase, p]) => (
        <Orbita
          key={clase}
          className={clase}
          style={{ top: p.top, height: p.alto }}
          rotacion={p.rotacion}
          grosor={p.grosor}
          estrella={{ angulo: p.angulo, tamano: p.tamano, sombra: SOMBRA }}
        />
      ))}
    </>
  )
}
