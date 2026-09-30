import { Fragment, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { alAparecer, dur, ease, stagger, subida } from './movimiento.js'

// Entrada estándar: aparece subiendo un poco cuando llega a la pantalla.
// La usa casi todo (párrafos, botones, tarjetas).
export function Revelar({ as = 'div', retraso = 0, className = '', children, ...resto }) {
  const Etiqueta = motion[as]
  return (
    <Etiqueta
      className={`mg-anim ${className}`}
      initial={{ opacity: 0, y: subida }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={alAparecer}
      transition={{ duration: dur.media, ease: ease.marca, delay: retraso }}
      {...resto}
    >
      {children}
    </Etiqueta>
  )
}

// Título en líneas: cada línea sube desde abajo, "enmascarada" por su contenedor
// (overflow hidden), una detrás de otra.
// Ojo: Anton con interlineado menor a 1 dibuja las letras (y los acentos) por
// fuera de su caja. Por eso la máscara tiene un poco de aire arriba y abajo
// (padding) que se compensa con margen negativo: la letra entra entera y el
// interlineado del título no cambia.
// `lineas` es un array de { texto, contorno? }.
// Con `activo` controlás cuándo arranca; si no lo pasás, arranca al aparecer.
// Las líneas en contorno toman grosor y color de las variables CSS --trazo y
// --contorno del título (por defecto, 2px crema).
export function TituloEnLineas({ lineas, as = 'h2', className = '', claseLinea = '', activo, retraso = 0, antetitulo, claseAntetitulo = '' }) {
  const Etiqueta = as
  // Ojo: el disparo "al aparecer" se mide sobre el título entero y no sobre cada
  // línea, porque las líneas arrancan escondidas debajo de su máscara y el
  // navegador las considera invisibles (nunca "entrarían" en pantalla).
  const ref = useRef(null)
  const visto = useInView(ref, alAparecer)
  const arranca = activo !== undefined ? activo : visto
  return (
    <Etiqueta ref={ref} className={className}>
      {/* Antetítulo opcional: una línea chica arriba, dentro del mismo título
          (así Google lee "Estudio de diseño y desarrollo web · Tu web pensada…"). */}
      {antetitulo && (
        <>
          <motion.span
            className={`mg-anim mg-antetitulo block ${claseAntetitulo}`}
            initial={{ opacity: 0, y: 12 }}
            animate={arranca ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: dur.media, ease: ease.marca, delay: retraso }}
          >
            {antetitulo}
          </motion.span>{' '}
        </>
      )}
      {lineas.map((linea, i) => (
        <Fragment key={i}>
        {/* Espacio entre líneas: no se ve (son bloques), pero sin él Google lee
            "Tu webpensadadesde cero" todo pegado. */}
        {i > 0 && ' '}
        <span className="-mb-[0.1em] -mt-[0.18em] block overflow-hidden pb-[0.1em] pt-[0.18em]">
          <motion.span
            className={`mg-anim mg-linea block ${claseLinea}`}
            style={{
              ...(linea.contorno ? { color: 'transparent', WebkitTextStroke: 'var(--trazo, 2px) var(--contorno, #F1EEE4)' } : {}),
              '--i': i, // orden de la línea (lo usa la entrada con CSS de la apertura en celular)
            }}
            initial={{ y: '130%' }}
            animate={arranca ? { y: '0%' } : undefined}
            transition={{ duration: dur.lenta, ease: ease.marca, delay: retraso + i * stagger.lineas }}
          >
            {linea.texto}
          </motion.span>
        </span>
        </Fragment>
      ))}
    </Etiqueta>
  )
}
