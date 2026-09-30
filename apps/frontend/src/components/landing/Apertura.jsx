import { useEffect, useRef, useState } from 'react'
import { motion, MotionConfig, useScroll, useTransform } from 'motion/react'
import Estrella from './ui/Estrella.jsx'
import Orbita from './ui/Orbita.jsx'
import Boton from './ui/Boton.jsx'
import { TituloEnLineas } from './ui/Revelar.jsx'
import { alListo, dur, ease, stagger } from './ui/movimiento.js'
import useEsCompu from './ui/useEsCompu.js'

// 01 · Apertura. La secuencia arranca cuando termina la pantalla de carga:
// título que sube → órbita que se dibuja → estrella que cae sobre la órbita.
export default function Apertura() {
  const [listo, setListo] = useState(false)
  // En celular, el antetítulo, el título, el texto y el botón entran con una
  // animación de CSS (ver landing.css). Si además los animara Motion, se verían
  // entrar dos veces: por eso ahí Motion no los toca y solo anima la órbita.
  const [textoConMotion, setTextoConMotion] = useState(false)
  const esCompu = useEsCompu()
  const ref = useRef(null)

  useEffect(() => {
    setTextoConMotion(!window.matchMedia('(max-width: 767px)').matches)
    return alListo(() => setListo(true))
  }, [])
  const entraTexto = listo && textoConMotion

  // Al scrollear, la órbita gira apenas (solo en compu). Antes el título también
  // bajaba con un parallax, pero terminaba tapando la sección siguiente.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const orbitaGiro = useTransform(scrollYProgress, [0, 1], [0, esCompu ? 4 : 0])

  const entrada = (retraso) => ({
    initial: { opacity: 0, y: 24 },
    animate: entraTexto ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: dur.media, ease: ease.marca, delay: retraso },
  })

  return (
    <MotionConfig reducedMotion="user">
      <section id="inicio" ref={ref} data-tono="49,48,227" className="mg-seccion bg-mg-azul md:min-h-[max(100svh,760px)]">
        {/* Luces de la apertura: recortadas, no cruzan a la sección siguiente */}
        <div className="mg-recorte" aria-hidden="true">
          <div
            className="absolute left-[-360px] top-[-360px] h-[720px] w-[720px] md:left-[-680px] md:top-[-680px] md:h-[1360px] md:w-[1360px]"
            style={{ background: 'radial-gradient(circle, rgba(120,118,255,0.5) 0%, rgba(120,118,255,0) 70%)' }}
          />
          <div
            className="absolute left-[44%] top-[62%] h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 md:left-[38%] md:top-[64%] md:h-[840px] md:w-[840px]"
            style={{ background: 'radial-gradient(circle, rgba(20,18,140,0.55) 0%, rgba(20,18,140,0) 70%)' }}
          />
          {/* Estrella grande en contorno */}
          <motion.div
            className="absolute left-[44%] top-[44%] w-[85vw] md:left-[70%] md:top-[10%] md:w-[min(50vw,720px)]"
            initial={{ opacity: 0 }}
            animate={listo ? { opacity: 0.4 } : undefined}
            transition={{ duration: 1.2, ease: ease.marca, delay: 0.2 }}
          >
            <Estrella contorno color="#F1EEE4" className="h-auto w-full" />
          </motion.div>
        </div>

        <div className="mg-contenido px-[22px] pb-24 pt-[104px] md:px-[50px] md:pb-40 md:pt-[170px]">
          <div className="relative">
            {/* Órbita naranja con su estrella: una para celular y otra para compu
                (cambia la proporción). La estrella va calculada SOBRE la elipse. */}
            <motion.div className="pointer-events-none absolute inset-0" style={{ rotate: orbitaGiro }} aria-hidden="true">
              <Orbita
                activa={listo}
                retraso={0.3}
                rotacion={-12}
                grosor={3}
                estrella={{ angulo: -62, tamano: 44, sombra: 'drop-shadow(0 8px 16px rgba(20,18,140,0.5))' }}
                className="absolute left-[-8%] top-[15%] h-[76%] w-[118%] md:hidden"
              />
              <Orbita
                activa={listo}
                retraso={0.3}
                rotacion={-6}
                grosor={5}
                estrella={{ angulo: 16, tamano: (w) => Math.min(92, w * 0.064), sombra: 'drop-shadow(0 12px 24px rgba(20,18,140,0.5))' }}
                className="absolute left-[-2.5%] top-[12%] hidden h-[74%] w-[min(97vw,1400px)] md:block"
              />
            </motion.div>

            <TituloEnLineas
              as="h1"
              activo={entraTexto}
              className="relative font-titulo text-[20vw] uppercase leading-[0.88] tracking-[-0.01em] text-mg-crema md:text-[clamp(96px,10.8vw,156px)] md:leading-[0.86] [--trazo:1.8px] md:[--trazo:2.5px]"
              lineas={[{ texto: 'Tu web' }, { texto: 'pensada' }, { texto: 'desde cero', contorno: true }]}
              antetitulo="Estudio de diseño y desarrollo web"
              claseAntetitulo="mb-4 font-texto text-[15px] font-semibold normal-case leading-snug tracking-[0.01em] text-mg-crema/85 md:mb-6 md:text-xl"
            />
          </div>

          <motion.p
            className="mg-anim mt-8 max-w-[620px] text-[17px] leading-[1.55] text-mg-crema/90 md:mt-9 md:text-[21px] md:leading-normal"
            {...entrada(0.6)}
          >
            Diseñamos y programamos páginas web a&nbsp;medida
            <br className="hidden md:block" /> para emprendedores y&nbsp;pymes.
          </motion.p>

          <div className="mt-8 flex flex-col gap-3 md:mt-9 md:flex-row md:gap-3.5">
            <motion.div className="mg-anim" style={{ '--d': '0.62s' }} {...entrada(0.6 + stagger.items)}>
              <Boton href="#contacto" className="w-full md:w-[210px]">
                Hablemos
              </Boton>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}
