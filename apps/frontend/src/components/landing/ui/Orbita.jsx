import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import Estrella from './Estrella.jsx'
import { dur, ease, resorte } from './movimiento.js'

// La órbita que abraza los títulos. Se "dibuja" animando pathLength de 0 a 1.
//
// Por qué medimos el tamaño: si estiráramos un SVG fijo con
// preserveAspectRatio="none", el trazo se deformaría (más grueso a los costados)
// y para evitarlo habría que usar vector-effect, que rompe el dibujado con
// pathLength en algunos navegadores (la órbita quedaba cortada). Midiendo la caja
// real, el SVG siempre tiene proporción 1:1 con la pantalla y el trazo es parejo.
//
// `estrella` (opcional) pone una estrella SOBRE la elipse, calculando el punto
// exacto con trigonometría: así queda pegada a la órbita en cualquier tamaño de pantalla.
//   { angulo: grados sobre la elipse (0 = derecha, 90 = abajo),
//     tamano: px, o una función (ancho, alto) => px para que escale con la órbita,
//     color, giro, sombra }
//
// `activa` decide cuándo arranca (ej.: cuando termina la pantalla de carga).
// Si no se pasa, se dibuja al aparecer en pantalla.
export default function Orbita({
  color = '#FF4500',
  grosor = 5,
  rotacion = -10,
  activa,
  retraso = 0,
  estrella,
  className = '',
  style,
}) {
  const ref = useRef(null)
  const [caja, setCaja] = useState({ w: 1000, h: 400 })
  const [visto, setVisto] = useState(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const medir = () => {
      const r = el.getBoundingClientRect()
      if (r.width > 0 && r.height > 0) setCaja({ w: r.width, h: r.height })
    }
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { w, h } = caja
  const cx = w / 2
  const cy = h / 2
  const rx = w / 2 - grosor
  const ry = h / 2 - grosor
  const encendida = activa !== undefined ? activa : visto

  // Punto de la estrella sobre la elipse ya rotada.
  let punto = null
  let tam = 0
  if (estrella) {
    tam = typeof estrella.tamano === 'function' ? estrella.tamano(w, h) : estrella.tamano
    const t = (estrella.angulo * Math.PI) / 180
    const r = (rotacion * Math.PI) / 180
    const ex = rx * Math.cos(t)
    const ey = ry * Math.sin(t)
    punto = { x: cx + ex * Math.cos(r) - ey * Math.sin(r), y: cy + ex * Math.sin(r) + ey * Math.cos(r) }
  }

  return (
    <div ref={ref} className={className} style={style} aria-hidden="true">
      <svg viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 h-full w-full" style={{ overflow: 'visible' }}>
        <motion.ellipse
          cx={cx}
          cy={cy}
          rx={rx}
          ry={ry}
          fill="none"
          stroke={color}
          strokeWidth={grosor}
          strokeLinecap="round"
          transform={`rotate(${rotacion} ${cx} ${cy})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={encendida ? { pathLength: 1, opacity: 1 } : undefined}
          onViewportEnter={() => setVisto(true)}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            pathLength: { duration: dur.dibujo, ease: ease.marca, delay: retraso },
            opacity: { duration: 0.15, delay: retraso },
          }}
        />
      </svg>

      {/* La estrella cae cuando la órbita está casi terminada de dibujarse. */}
      {punto && (
        <motion.div
          className="absolute"
          style={{
            left: punto.x,
            top: punto.y,
            width: tam,
            height: tam,
            marginLeft: -tam / 2,
            marginTop: -tam / 2,
            filter: estrella.sombra,
          }}
          initial={{ scale: 0, rotate: -90 }}
          animate={encendida ? { scale: 1, rotate: estrella.giro ?? 14 } : undefined}
          transition={{ ...resorte, delay: retraso + dur.dibujo * 0.75 }}
        >
          <Estrella color={estrella.color ?? color} className="h-full w-full" />
        </motion.div>
      )}
    </div>
  )
}
