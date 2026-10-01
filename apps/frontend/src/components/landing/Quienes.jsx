import { motion, MotionConfig } from 'motion/react'
import Estrella from './ui/Estrella.jsx'
import { Revelar } from './ui/Revelar.jsx'
import { alAparecer, dur, ease, resorte } from './ui/movimiento.js'
import useEsCompu from './ui/useEsCompu.js'

// 02 · Quiénes somos. El encuentro: DISEÑO entra por la izquierda,
// DESARROLLO por la derecha, y se juntan en la estrella del corte.
export default function Quienes() {
  const esCompu = useEsCompu()
  const recorrido = esCompu ? 120 : 60

  return (
    <MotionConfig reducedMotion="user">
      <section id="quienes" className="mg-seccion" aria-labelledby="quienes-titulo">
        {/* Título de la sección para Google y lectores de pantalla. Las palabras
            grandes DISEÑO / DESARROLLO son la versión visual del mismo título. */}
        <h2 id="quienes-titulo" className="sr-only">
          Quiénes somos: diseño y desarrollo web en un mismo equipo
        </h2>
        {/* Mitad naranja. Arriba, un degradé corto desde el azul de la apertura. */}
        <div
          data-tono="255,69,0"
          className="relative [--mezcla:100px] md:[--mezcla:150px]"
          style={{ background: 'linear-gradient(180deg, #3130E3 0, #FF4500 var(--mezcla), #FF4500 100%)' }}
        >
          <div className="mg-recorte" aria-hidden="true">
            <div
              className="absolute right-[-170px] top-[-20px] h-[340px] w-[340px] md:right-[-300px] md:top-[-40px] md:h-[640px] md:w-[640px]"
              style={{ background: 'radial-gradient(circle, rgba(255,160,120,0.5) 0%, rgba(255,160,120,0) 70%)' }}
            />
          </div>

          <div className="mg-contenido flex min-h-[46svh] flex-col justify-end gap-10 px-[22px] pb-3 pt-[150px] md:min-h-0 md:flex-row-reverse md:items-end md:justify-between md:gap-8 md:px-[60px] md:pt-[230px]">
            <Revelar
              as="p"
              className="text-[22px] font-semibold leading-tight text-mg-marron md:mb-[4.5vw] md:text-right md:text-[clamp(24px,2.4vw,34px)]"
            >
              Dos disciplinas que trabajan
              <br />
              desde el mismo&nbsp;lugar
            </Revelar>

            <motion.p
              aria-hidden="true"
              className="mg-anim font-titulo text-[30.5vw] uppercase leading-[0.86] tracking-[-0.01em] text-mg-marron md:text-[min(16vw,230px)]"
              initial={{ opacity: 0, x: -recorrido }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={alAparecer}
              transition={{ duration: dur.lenta, ease: ease.marca }}
            >
              Diseño
            </motion.p>
          </div>
        </div>

        {/* Mitad azul */}
        <div data-tono="49,48,227" className="relative bg-mg-azul">
          {/* La estrella de la fusión, justo en el corte */}
          <motion.div
            className="absolute right-[-30px] top-0 z-[1] w-28 -translate-y-1/2 drop-shadow-[0_14px_28px_rgba(49,13,0,0.45)] md:left-[53.5%] md:right-auto md:w-[min(18vw,260px)]"
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 90 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ ...resorte, delay: 0.55 }}
            aria-hidden="true"
          >
            <Estrella color="#310D00" className="h-auto w-full" />
          </motion.div>

          <div className="mg-contenido flex min-h-[36svh] flex-col px-[22px] pb-20 pt-3 md:block md:min-h-0 md:px-[60px] md:pb-[120px] md:text-right">
            <motion.p
              aria-hidden="true"
              className="mg-anim font-titulo text-[19.5vw] uppercase leading-[0.9] tracking-[-0.01em] text-mg-crema md:text-[min(16vw,230px)] md:leading-[0.86]"
              initial={{ opacity: 0, x: recorrido }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={alAparecer}
              transition={{ duration: dur.lenta, ease: ease.marca }}
            >
              Desarrollo
            </motion.p>

            <Revelar
              as="p"
              retraso={0.15}
              className="mt-auto max-w-[560px] pt-10 text-[17px] leading-[1.55] text-mg-crema md:ml-auto md:mt-20 md:pt-0 md:text-xl md:leading-normal"
            >
              Mergge existe para transformar ideas en experiencias digitales que conectan marcas con personas. Somos
              Delfina (Lic. en Diseño Gráfico y UX/UI Designer) y Fabrizio (Desarrollador Web Full Stack).
              Trabajamos desde Mar del Plata para todo el&nbsp;mundo.
            </Revelar>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}
