import { useRef } from 'react'
import { motion, MotionConfig, useScroll, useTransform } from 'motion/react'
import Estrella from '../landing/ui/Estrella.jsx'
import { Revelar, TituloEnLineas } from '../landing/ui/Revelar.jsx'
import { alAparecer, dur, ease } from '../landing/ui/movimiento.js'
import { Tarjeta } from '../landing/Planes.jsx'
import { PLANES } from '../../datos/planes.js'

// "Cuánto cuesta": la tarjeta del plan (la misma de la home, a todo el alto),
// para quién es, y los otros dos planes por si buscás otra cosa.
export default function Precio({ plan, paraVos }) {
  const otros = PLANES.filter((p) => p.id !== plan.id)
  // La tarjeta de la tienda es azul: sobre un fondo azul no se distingue, así
  // que esta página usa el marrón de la marca. En las otras dos, azul.
  const sobreMarron = plan.id === 'a-medida'
  // La estrella grande en contorno, como la del pie: gira con el scroll (0° → 150°) mientras la sección cruza la pantalla.
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const giro = useTransform(scrollYProgress, [0, 1], [0, 150])
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="precio"
        ref={ref}
        data-tono={sobreMarron ? '49,13,0' : '49,48,227'}
        data-ancla="70"
        data-ancla-movil="0"
        className={`mg-seccion text-mg-crema ${sobreMarron ? 'bg-mg-marron' : 'bg-mg-azul'}`}
      >
        <div className="mg-recorte" aria-hidden="true">
          <div
            className="absolute right-[-400px] top-[-400px] h-[800px] w-[800px] md:right-[-640px] md:top-[-640px] md:h-[1280px] md:w-[1280px]"
            style={{ background: 'radial-gradient(circle, rgba(255,69,0,0.3) 0%, rgba(255,69,0,0) 70%)' }}
          />
          <motion.div
            className="absolute left-[40%] top-[48%] w-[420px] opacity-[0.28] md:left-auto md:right-[-170px] md:top-[150px] md:w-[640px]"
            style={{ rotate: giro }}
          >
            <Estrella contorno color="#F1EEE4" grosor={1.4} className="h-auto w-full" />
          </motion.div>
        </div>

        <div className="mg-contenido flex flex-col gap-14 px-[22px] py-24 lg:flex-row lg:items-stretch lg:gap-20 lg:px-[50px] lg:py-[170px] md:px-[50px] md:py-[130px]">
          {/* La tarjeta del plan: ocupa todo el alto de la columna de al lado */}
          <motion.div
            className="mg-anim flex md:max-w-[480px] lg:w-[440px] lg:max-w-none lg:shrink-0"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={alAparecer}
            transition={{ duration: dur.lenta, ease: ease.marca }}
          >
            <Tarjeta plan={plan} sinBajada sinLink className="w-full lg:py-[42px]" />
          </motion.div>

          <div className="min-w-0 flex-1">
            <TituloEnLineas
              className="font-titulo text-[17vw] uppercase leading-[0.86] tracking-[-0.01em] md:text-[min(7.2vw,104px)] [--trazo:1.6px] md:[--trazo:2px]"
              lineas={[{ texto: 'Cuánto' }, { texto: 'cuesta', contorno: true }]}
            />
            <Revelar as="p" className="mt-7 max-w-[560px] text-base leading-[1.55] text-mg-crema/90 md:text-lg">
              En dólares, según el alcance final: después de la charla te pasamos un presupuesto cerrado. Pagás 50&nbsp;% al empezar y 50&nbsp;% al entregar. Desde el
              segundo año, el dominio y el alojamiento se renuevan&nbsp;aparte.
            </Revelar>

            <Revelar as="div" className="mt-12">
              <h3 className="text-xl font-semibold">Es para vos si…</h3>
              <ul className="mt-3.5 max-w-[620px]">
                {paraVos.map((t) => (
                  <li key={t} className="flex items-start gap-3 border-t border-mg-crema/20 py-3.5 text-[17px] leading-normal text-mg-crema/90">
                    <Estrella color="#FF4500" className="mt-[5px] h-[15px] w-[15px] shrink-0" style={{ transform: 'rotate(10deg)' }} />
                    {t}
                  </li>
                ))}
              </ul>
            </Revelar>

            <Revelar as="div" className="mt-12">
              <h3 className="text-xl font-semibold">¿Buscás otra cosa?</h3>
              <div className="mt-4 flex flex-col gap-3.5 md:flex-row">
                {otros.map((p) => (
                  <motion.a
                    key={p.id}
                    href={p.ruta}
                    className="flex flex-1 items-center justify-between gap-4 rounded-[22px] bg-mg-crema/[0.08] px-[22px] py-[18px] shadow-[inset_0_0_0_1px_rgba(241,238,228,0.3)]"
                    whileHover={{ y: -4 }}
                    transition={{ duration: dur.rapida }}
                  >
                    <span className="flex flex-col gap-1">
                      <span className="text-[13px] font-semibold text-mg-crema/70">Plan {p.nombre}</span>
                      <span className="font-titulo text-[30px] uppercase leading-none">{p.producto}</span>
                      <span className="text-sm font-semibold">
                        {p.antes.replace('\n', ' ')} {p.precio}
                      </span>
                    </span>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mg-naranja text-lg text-mg-marron" aria-hidden="true">
                      →
                    </span>
                  </motion.a>
                ))}
              </div>
            </Revelar>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}
