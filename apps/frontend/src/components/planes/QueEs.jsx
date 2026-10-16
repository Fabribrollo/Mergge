import { motion, MotionConfig } from 'motion/react'
import Estrella from '../landing/ui/Estrella.jsx'
import Flecha from '../landing/ui/Flecha.jsx'
import { Revelar, TituloEnLineas } from '../landing/ui/Revelar.jsx'
import { alAparecer, dur, ease, stagger } from '../landing/ui/movimiento.js'
import { PLANES, RASGOS } from '../../datos/planes.js'

// "¿Qué es…?": la definición corta y el plan de esta página al lado de los
// otros dos, cada uno con el color de su tarjeta en la home. El plan actual
// va elevado, con borde naranja y la estrella; los otros, más apagados y con
// el link a su página.
export default function QueEs({ plan, contenido }) {
  const oscuro = contenido.fondo === 'marron'
  const tinta = oscuro ? 'text-mg-crema' : 'text-mg-marron'

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="que-es"
        data-tono={oscuro ? '49,13,0' : '241,238,228'}
        className={`mg-seccion ${oscuro ? 'bg-mg-marron' : 'bg-mg-crema'} ${tinta}`}
      >
        <div className="mg-recorte" aria-hidden="true">
          <div
            className="absolute left-[-460px] top-[-200px] h-[920px] w-[920px] md:left-[-700px] md:top-[-260px] md:h-[1400px] md:w-[1400px]"
            style={{ background: `radial-gradient(circle, rgba(49,48,227,${oscuro ? 0.5 : 0.16}) 0%, rgba(49,48,227,0) 70%)` }}
          />
          <div
            className="absolute bottom-[-500px] right-[-440px] h-[880px] w-[880px] md:bottom-[-720px] md:right-[-640px] md:h-[1280px] md:w-[1280px]"
            style={{ background: `radial-gradient(circle, rgba(255,69,0,${oscuro ? 0.45 : 0.32}) 0%, rgba(255,69,0,0) 70%)` }}
          />
        </div>

        <div className="mg-contenido px-[22px] pb-24 pt-24 md:px-[50px] md:pb-[150px] md:pt-[170px]">
          <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-x-16">
            <TituloEnLineas
              className={`font-titulo ${contenido.tituloLargo ? 'text-[10vw]' : 'text-[13.5vw]'} uppercase leading-[0.86] tracking-[-0.01em] md:text-[min(7.2vw,104px)] [--trazo:1.6px] md:[--trazo:2px] ${oscuro ? '' : '[--contorno:#310D00]'}`}
              lineas={contenido.titulo}
            />
            <Revelar as="p" className="max-w-[480px] text-[17px] leading-[1.5] md:text-xl">
              {contenido.definicion}
            </Revelar>
          </div>

          <ul className="mt-14 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-5">
            {PLANES.map((p, i) => {
              const actual = p.id === plan.id
              const rasgos = RASGOS[p.id]
              // Sobre el crema, la tarjeta crema necesita un borde para no perderse.
              const borde = !oscuro && p.id === 'estatica' ? ', inset 0 0 0 1.5px rgba(49,13,0,0.18)' : ''
              return (
                <motion.li
                  key={p.id}
                  className="mg-anim flex"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: actual ? 1 : 0.72, y: actual ? -18 : 0 }}
                  viewport={alAparecer}
                  transition={{ duration: dur.lenta, ease: ease.marca, delay: i * stagger.items * 2 }}
                  whileHover={actual ? undefined : { opacity: 1, y: -10, transition: { duration: 0.35, ease: ease.marca } }}
                >
                  <article
                    aria-current={actual ? 'true' : undefined}
                    className={`relative flex w-full flex-col gap-3 rounded-[34px] px-7 pb-[26px] pt-[30px] ${p.texto} ${actual ? 'outline outline-[3px] outline-offset-[6px] outline-mg-naranja' : ''}`}
                    style={{ background: p.fondo, boxShadow: `0 40px 80px -34px rgba(0,0,0,${oscuro ? 0.7 : 0.45})${borde}` }}
                  >
                    {actual && (
                      <motion.div
                        className="absolute right-[-18px] top-[-24px] h-14 w-14 drop-shadow-[0_10px_18px_rgba(49,13,0,0.45)]"
                        initial={{ scale: 0, rotate: -90 }}
                        whileInView={{ scale: 1, rotate: 14 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.5 }}
                        aria-hidden="true"
                      >
                        <Estrella color="#FF4500" className="h-full w-full" />
                      </motion.div>
                    )}
                    <p className={`text-[13px] font-semibold ${p.suave}`}>Plan {p.nombre}</p>
                    <h3 className="font-titulo text-[clamp(38px,3.4vw,50px)] uppercase leading-[0.95]">{rasgos.nombre}</h3>
                    <p className={`text-base leading-[1.45] ${p.suave}`}>{rasgos.frase}</p>
                    <ul className="mt-1">
                      {[...rasgos.items, p.plazoCorto.charAt(0).toUpperCase() + p.plazoCorto.slice(1)].map((r) => (
                        <li key={r} className={`flex items-center gap-2.5 border-t py-2.5 text-[15px] ${p.borde}`}>
                          <Estrella color={p.estrella} className="h-3 w-3 shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                    {!actual && (
                      <a href={p.ruta} className="mt-auto inline-flex items-center gap-2 self-start pt-2 text-[15px] font-semibold hover:opacity-70">
                        Ver el plan <Flecha />
                      </a>
                    )}
                  </article>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </section>
    </MotionConfig>
  )
}
