import { useEffect, useState } from 'react'
import { motion, MotionConfig } from 'motion/react'
import Estrella from '../landing/ui/Estrella.jsx'
import Orbita from '../landing/ui/Orbita.jsx'
import Boton from '../landing/ui/Boton.jsx'
import { TituloEnLineas } from '../landing/ui/Revelar.jsx'
import { dur, ease, stagger } from '../landing/ui/movimiento.js'

// Apertura de la página de un plan. Toma el color y los degradés de la tarjeta
// del plan en la home, así se reconoce el plan apenas entrás.
//
// Lleva id="inicio" como la apertura de la home: así usa la misma entrada con
// CSS en celular (ver landing.css), que no espera a React y no demora lo que
// Google mide como contenido principal (el título).
export default function AperturaPlan({ plan, contenido }) {
  const [listo, setListo] = useState(false)
  const [textoConMotion, setTextoConMotion] = useState(false)
  useEffect(() => {
    setTextoConMotion(!window.matchMedia('(max-width: 767px)').matches)
    setListo(true)
  }, [])
  const entraTexto = listo && textoConMotion

  const claro = plan.claro
  const tinta = claro ? '#310D00' : '#F1EEE4'
  const botones = {
    estatica: ['marron', 'contorno-marron'],
    profesional: ['naranja', 'contorno'],
    'a-medida': ['crema', 'contorno'],
  }[plan.id]

  const entrada = (retraso) => ({
    initial: { opacity: 0, y: 24 },
    animate: entraTexto ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: dur.media, ease: ease.marca, delay: retraso },
  })

  return (
    <MotionConfig reducedMotion="user">
      <section id="inicio" data-tono={plan.tono} className={`mg-seccion flex min-h-svh flex-col justify-center ${plan.texto}`} style={{ background: plan.fondoSeccion }}>
        <div className="mg-recorte" aria-hidden="true">
          <motion.div
            className="absolute left-[44%] top-[40%] w-[85vw] md:left-[70%] md:top-[8%] md:w-[min(50vw,720px)]"
            initial={{ opacity: 0 }}
            animate={listo ? { opacity: claro ? 0.16 : 0.32 } : undefined}
            transition={{ duration: 1.2, ease: ease.marca, delay: 0.2 }}
          >
            <Estrella contorno color={tinta} className="h-auto w-full" />
          </motion.div>
        </div>

        <div className="mg-contenido w-full px-[22px] pb-20 pt-[104px] md:px-[50px] md:pb-[110px] md:pt-[142px]">
          <div className="relative inline-block md:pr-[4%]">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <Orbita
                activa={listo}
                retraso={0.3}
                rotacion={-8}
                grosor={3}
                estrella={{ angulo: -40, tamano: 40, sombra: 'drop-shadow(0 8px 16px rgba(20,18,140,0.4))' }}
                className="absolute left-[-6%] top-[30%] h-[74%] w-[112%] md:hidden"
              />
              <Orbita
                activa={listo}
                retraso={0.3}
                rotacion={-6}
                grosor={5}
                estrella={{ angulo: -24, tamano: (w) => Math.min(88, w * 0.08), sombra: 'drop-shadow(0 12px 24px rgba(20,18,140,0.45))' }}
                className="absolute left-[-3%] top-[30%] hidden h-[74%] w-[108%] md:block"
              />
            </div>
            <TituloEnLineas
              as="h1"
              activo={entraTexto}
              className={`relative font-titulo text-[17vw] uppercase leading-[0.88] tracking-[-0.01em] md:text-[clamp(72px,10.4vw,150px)] md:leading-[0.86] [--trazo:1.8px] md:[--trazo:2.5px] ${claro ? '[--contorno:#310D00]' : ''}`}
              lineas={contenido.titulo}
              antetitulo={contenido.antetitulo}
              claseAntetitulo="mb-5 font-texto text-[15px] font-semibold normal-case leading-snug tracking-[0.01em] opacity-80 md:mb-8 md:text-xl"
            />
          </div>

          <motion.p className="mg-anim mt-8 max-w-[640px] text-[17px] leading-[1.55] opacity-90 md:mt-10 md:text-[21px]" {...entrada(0.6)}>
            {contenido.bajada}
          </motion.p>

          <div className="mt-8 flex flex-col gap-3 md:mt-9 md:flex-row md:gap-3.5">
            <motion.div className="mg-anim" style={{ '--d': '0.62s' }} {...entrada(0.6 + stagger.items)}>
              <Boton href="#contacto" variante={botones[0]} className="w-full md:w-[210px]">
                Hablemos
              </Boton>
            </motion.div>
            <motion.div className="mg-anim" style={{ '--d': '0.68s' }} {...entrada(0.6 + stagger.items * 2)}>
              <Boton href="#precio" variante={botones[1]} className="w-full md:w-[210px]">
                Ver precio
              </Boton>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}
