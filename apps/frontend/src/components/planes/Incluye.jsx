import { useEffect, useRef, useState } from 'react'
import { motion, MotionConfig } from 'motion/react'
import { Revelar, TituloEnLineas } from '../landing/ui/Revelar.jsx'
import { alAparecer, dur, ease, stagger } from '../landing/ui/movimiento.js'
import { FLUIDOS, VISUALES } from './Visuales.jsx'

// Las pieles de las tarjetas: fondo, color del título y del texto, sombra.
const SOMBRA_CREMA = '0 30px 60px -30px rgba(49,13,0,0.5)'
const SOMBRA_OSCURA = '0 40px 80px -30px rgba(49,13,0,0.75)'
const PIELES = {
  crema: ['radial-gradient(60% 50% at 100% 0%, rgba(255,69,0,0.22) 0%, rgba(255,69,0,0) 70%), #F1EEE4', 'text-mg-marron', 'text-mg-marron/70', SOMBRA_CREMA],
  cremaAzul: ['radial-gradient(60% 50% at 0% 100%, rgba(49,48,227,0.14) 0%, rgba(49,48,227,0) 70%), #F1EEE4', 'text-mg-marron', 'text-mg-marron/70', SOMBRA_CREMA],
  azul: [
    'radial-gradient(70% 60% at 0% 100%, #1C1A9A 0%, rgba(28,26,154,0) 72%), radial-gradient(45% 35% at 15% 10%, rgba(140,138,255,0.55) 0%, rgba(140,138,255,0) 70%), #3130E3',
    'text-mg-crema',
    'text-mg-crema/80',
    SOMBRA_OSCURA,
  ],
  azulNaranja: [
    'radial-gradient(60% 40% at 100% 0%, rgba(255,69,0,0.6) 0%, rgba(255,69,0,0) 70%), radial-gradient(70% 50% at 0% 100%, #1C1A9A 0%, rgba(28,26,154,0) 72%), #3130E3',
    'text-mg-crema',
    'text-mg-crema/80',
    SOMBRA_OSCURA,
  ],
  marron: [
    'radial-gradient(70% 40% at 100% 0%, rgba(255,69,0,0.55) 0%, rgba(255,69,0,0) 72%), conic-gradient(from 30deg at 55% 55%, #310D00, #451300, #250900, #310D00)',
    'text-mg-crema',
    'text-mg-crema/75',
    SOMBRA_OSCURA,
  ],
}

// Columnas que ocupa cada tarjeta en pantallas grandes (grilla de 12). Cada fila suma 12
// y lleva al menos dos tarjetas: nunca queda una sola a todo el ancho.
const COLUMNAS = { 3: 'min-[1360px]:col-span-3', 4: 'min-[1360px]:col-span-4', 5: 'min-[1360px]:col-span-5', 6: 'min-[1360px]:col-span-6', 7: 'min-[1360px]:col-span-7', 8: 'min-[1360px]:col-span-8' }

// Escala el dibujo de la tarjeta para que entre completo en el espacio que le
// toca, centrado. Si hay más de una composición, usa la que quede más grande.
// Hasta que se mide queda invisible (así no se ve un salto de tamaño).
const AIRE = 12
const ESCALA_MAX = 1.4
function Ajuste({ composiciones, chat, fluido }) {
  const caja = useRef(null)
  const [medida, setMedida] = useState(null)
  useEffect(() => {
    const el = caja.current
    const medir = () => {
      const { width, height } = el.getBoundingClientRect()
      let mejor = { k: 0, i: 0 }
      composiciones.forEach((c, i) => {
        const k = Math.min(ESCALA_MAX, (width - AIRE * 2) / c.ancho, (height - AIRE * 2) / c.alto)
        if (k > mejor.k) mejor = { k, i }
      })
      setMedida(mejor)
    }
    if (fluido) return
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    return () => ro.disconnect()
  }, [composiciones, fluido])
  const c = composiciones[medida?.i ?? 0]
  const { Dibujo } = c
  if (fluido)
    return (
      <div className="absolute inset-0 flex items-start">
        <Dibujo chat={chat} />
      </div>
    )
  return (
    <div ref={caja} className="absolute inset-0 flex items-center justify-center">
      <div
        className="relative shrink-0"
        style={{ width: c.ancho, height: c.alto, transform: `scale(${medida?.k ?? 1})`, opacity: medida ? 1 : 0 }}
      >
        <Dibujo chat={chat} />
      </div>
    </div>
  )
}

const Tilde = () => (
  <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] shrink-0" fill="none" stroke="#FF4500" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

// "Qué incluye": el bento de tarjetas con dibujos. En los planes más grandes,
// arriba va lo que ya trae el plan anterior ("Ya viene incluido") y las
// tarjetas muestran solo lo que suma este plan.
// `arriba`: el color de la sección anterior, para el degradé de entrada.
export default function Incluye({ contenido, arriba, abajo = 'azul' }) {
  const salida = abajo === 'marron' ? '#310D00' : '#3130E3'
  const entrada = arriba === 'crema' ? '#F1EEE4 0, #F6CBB2 60px, #FF4500 150px' : '#310D00 0, #8A2600 70px, #FF4500 150px'
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="incluye"
        data-tono="255,69,0"
        className="mg-seccion text-mg-marron"
        style={{ background: `linear-gradient(180deg, ${entrada}, #FF4500 calc(100% - 150px), ${salida} 100%)` }}
      >
        <div className="mg-recorte" aria-hidden="true">
          <div
            className="absolute right-[-200px] top-[-40px] h-[400px] w-[400px] md:right-[-320px] md:h-[640px] md:w-[640px]"
            style={{ background: 'radial-gradient(circle, rgba(255,160,120,0.5) 0%, rgba(255,160,120,0) 70%)' }}
          />
        </div>
        {/* Luz azul que cruza hacia "Cuánto cuesta" */}
        <div
          className="mg-luz bottom-[-420px] left-[-420px] h-[840px] w-[840px] md:bottom-[-560px] md:left-[-560px] md:h-[1120px] md:w-[1120px]"
          style={{ background: 'radial-gradient(circle, rgba(49,48,227,0.85) 0%, rgba(49,48,227,0.45) 35%, rgba(49,48,227,0) 72%)' }}
          aria-hidden="true"
        />

        <div className="mg-contenido px-[22px] pb-28 pt-[170px] md:px-[50px] md:pb-[150px] md:pt-[230px]">
          <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-x-12">
            <TituloEnLineas
              className="font-titulo text-[15vw] uppercase leading-[0.86] tracking-[-0.01em] md:text-[min(8vw,120px)] [--contorno:#310D00] [--trazo:1.8px] md:[--trazo:2.2px]"
              lineas={contenido.titulo}
            />
            <Revelar as="p" className="max-w-[440px] text-[17px] leading-[1.5] md:text-xl">
              {contenido.intro}
            </Revelar>
          </div>

          {contenido.yaIncluido && (
            <Revelar as="div" className="mt-12 flex flex-col gap-4 rounded-[28px] bg-mg-crema/[0.14] px-6 py-[22px] shadow-[inset_0_0_0_1.5px_rgba(49,13,0,0.22)] md:mt-14">
              <p className="font-titulo text-2xl uppercase leading-none">Ya viene incluido</p>
              <ul className="flex flex-wrap gap-2">
                {contenido.yaIncluido.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full bg-mg-crema px-4 py-[9px] text-[15px] font-semibold shadow-[0_10px_22px_-16px_rgba(49,13,0,0.6)]"
                  >
                    <Tilde />
                    {item}
                  </li>
                ))}
              </ul>
            </Revelar>
          )}

          <ul className={`grid gap-5 md:max-[1359px]:grid-cols-2 min-[1360px]:grid-cols-12 ${contenido.yaIncluido ? 'mt-5' : 'mt-14 md:mt-[72px]'}`}>
            {contenido.tarjetas.map((t, i, todas) => {
              // En tablet (2 columnas), si son impares la primera va ancha para que la última no quede sola.
              const impar = todas.length % 2 === 1
              const [fondo, titulo, suave, sombra] = PIELES[t.piel]
              const composiciones = VISUALES[t.visual]
              const fluido = FLUIDOS.has(t.visual)
              return (
                <motion.li
                  key={t.titulo}
                  className={`mg-anim @container relative h-[440px] min-[1360px]:h-[460px] overflow-hidden rounded-[32px] ${COLUMNAS[t.col]} ${impar && i === 0 ? 'md:max-[1359px]:col-span-2' : ''} ${titulo}`}
                  style={{ background: fondo, boxShadow: sombra }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={alAparecer}
                  transition={{ duration: dur.lenta, ease: ease.marca, delay: (i % 3) * stagger.items * 2 }}
                  whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.35, ease: ease.marca } }}
                >
                  {/* Angosta: el dibujo arriba y el texto abajo. Ancha: texto a la izquierda y dibujo a la derecha. */}
                  <div className={`flex h-full flex-col gap-3 p-[30px] ${fluido ? '' : '@[640px]:flex-row @[640px]:gap-6'}`}>
                    <div className={`relative min-h-[130px] flex-1 ${fluido ? '' : '@[640px]:order-2 @[640px]:flex-[1.3]'}`} aria-hidden="true">
                      <Ajuste composiciones={composiciones} chat={t.chat} fluido={fluido} />
                    </div>
                    <div className={`flex flex-col justify-end gap-2.5 ${fluido ? '' : '@[640px]:order-1 @[640px]:w-[36%] @[640px]:shrink-0'}`}>
                      <h3 className="font-titulo text-[34px] uppercase leading-[0.95]">{t.titulo}</h3>
                      <p className={`text-[15.5px] leading-[1.5] ${suave}`}>{t.texto}</p>
                    </div>
                  </div>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </section>
    </MotionConfig>
  )
}
