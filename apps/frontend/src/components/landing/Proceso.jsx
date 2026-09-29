import { useRef, useState } from 'react'
import { motion, MotionConfig, useInView, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react'
import Estrella from './ui/Estrella.jsx'
import Orbita from './ui/Orbita.jsx'
import Boton from './ui/Boton.jsx'
import { Revelar, TituloEnLineas } from './ui/Revelar.jsx'
import { dur, ease, resorte, stagger } from './ui/movimiento.js'

const PASOS = [
  { n: '01', valor: 'Integración', titulo: 'La charla', texto: 'Nos contás tu idea y te escuchamos los dos. 20 minutos, gratis.' },
  { n: '02', valor: 'Creatividad', titulo: 'La propuesta', texto: 'Una dirección visual y un presupuesto cerrado.' },
  { n: '03', valor: 'Funcionalidad', titulo: 'La estructura', texto: 'Qué va en cada página y cómo se recorre.' },
  { n: '04', valor: 'Innovación', titulo: 'Diseño y desarrollo', texto: 'Ves avances y pedís cambios antes de publicar.' },
  { n: '05', valor: 'Detalle', titulo: 'Las pruebas', texto: 'Celulares, velocidad y Google. Recién ahí publicamos.' },
  { n: '06', valor: 'Evolución', titulo: 'Después', texto: 'Te enseñamos a usarla y seguimos cerca.' },
]

const TITULO = [{ texto: 'Una vuelta' }, { texto: 'completa', contorno: true }]
const BAJADA =
  'Los procesos creativos y tecnológicos no son lineales. El nuestro tiene seis fases y cada una lleva el nombre de uno de nuestros valores. Cuando la rueda termina el giro, vuelve a empezar.'

// 03 · Cómo trabajamos.
// Compu: la sección queda fija mientras scrolleás y la rueda gira de a una fase.
// Celular: línea de tiempo vertical que se dibuja con el scroll.
export default function Proceso() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="proceso" data-tono="49,48,227" className="mg-seccion bg-mg-azul">
        {/* Luces: la violeta cruza hacia Quiénes somos (mismo azul), la naranja hacia Diseño */}
        <div
          className="mg-luz left-[-380px] top-[-380px] h-[760px] w-[760px] md:left-[-600px] md:top-[-600px] md:h-[1200px] md:w-[1200px]"
          style={{ background: 'radial-gradient(circle, rgba(120,118,255,0.46) 0%, rgba(120,118,255,0) 70%)' }}
          aria-hidden="true"
        />
        <div
          className="mg-luz bottom-[-400px] right-[-400px] h-[800px] w-[800px] md:bottom-[-760px] md:right-[-760px] md:h-[1520px] md:w-[1520px]"
          style={{ background: 'radial-gradient(circle, rgba(255,69,0,0.36) 0%, rgba(255,69,0,0) 70%)' }}
          aria-hidden="true"
        />
        <RuedaCompu />
        <LineaCelular />
      </section>
    </MotionConfig>
  )
}

/* ───────────────────────── Compu: la rueda ───────────────────────── */

function RuedaCompu() {
  const ref = useRef(null)
  const [activa, setActiva] = useState(0)
  // El progreso va de 0 a 1 mientras la sección está fija.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const suave = useSpring(scrollYProgress, { stiffness: 120, damping: 26 })

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setActiva(Math.min(PASOS.length - 1, Math.floor(p * PASOS.length)))
  })

  // La estrella central da una vuelta completa en todo el recorrido;
  // la línea naranja apunta siempre a la fase activa.
  const giroEstrella = useTransform(suave, [0, 1], [0, 360])
  const angulo = activa * 60

  // La rueda aparece recién cuando llegás a la sección (no se ve de antes).
  const ruedaRef = useRef(null)
  const entro = useInView(ruedaRef, { once: true, amount: 0.35 })

  return (
    // 170vh de alto: el "sticky" de adentro queda fijo mientras se recorre
    // (unas 0,7 pantallas de scroll para dar la vuelta completa).
    <div ref={ref} className="relative hidden h-[170vh] md:block">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="mg-contenido grid w-full grid-cols-[minmax(340px,440px)_1fr] items-center gap-6 px-[50px] pt-[86px]">
          {/* Columna izquierda: título, bajada y llamado */}
          <div>
            <TituloEnLineas
              className="font-titulo text-[clamp(64px,6.2vw,104px)] uppercase leading-[0.86] tracking-[-0.01em] text-mg-crema [--trazo:2.2px]"
              claseLinea="whitespace-nowrap"
              lineas={TITULO}
            />
            <Revelar as="div" className="mt-8 max-w-[300px]">
              <div className="mb-4 h-px bg-mg-crema/30" />
              <p className="text-[15.5px] leading-[1.55] text-mg-crema/90">{BAJADA}</p>
            </Revelar>
            <Revelar as="div" retraso={0.1} className="mt-10 flex flex-col items-start gap-3">
              <Boton href="#contacto" className="w-[280px]">
                Empezar con la charla
              </Boton>
              <span className="text-[15px] text-mg-crema/80">El primer paso no tiene costo ni&nbsp;compromiso.</span>
            </Revelar>
          </div>

          {/* La rueda. Todo se ubica en porcentajes de un cuadrado, así escala con la pantalla. */}
          <motion.div
            ref={ruedaRef}
            className="mg-anim relative mx-auto aspect-square w-[min(calc(100svh-150px),56vw)]"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={entro ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: dur.lenta, ease: ease.marca }}
          >
            <svg viewBox="-620 -620 1240 1240" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
              <circle r="500" fill="none" stroke="rgba(241,238,228,0.3)" strokeWidth="1" />
              <circle r="544" fill="none" stroke="rgba(241,238,228,0.14)" strokeWidth="1" strokeDasharray="3 7" />
              {PASOS.map((_, i) => {
                const a = ((i * 60 - 90) * Math.PI) / 180
                return (
                  <g key={i}>
                    <line x1={Math.cos(a) * 132} y1={Math.sin(a) * 132} x2={Math.cos(a) * 500} y2={Math.sin(a) * 500} stroke="#F1EEE4" strokeWidth="1" opacity="0.28" />
                    <circle cx={Math.cos(a) * 500} cy={Math.sin(a) * 500} r="5" fill="#F1EEE4" opacity="0.7" />
                  </g>
                )
              })}
            </svg>

            {/* Línea naranja que apunta a la fase activa. Se rota una capa HTML del
                tamaño de la rueda (gira sobre su centro), no el grupo SVG: así el
                punto de giro no depende de cómo cada navegador trata el origen en SVG. */}
            <motion.div className="absolute inset-0" animate={{ rotate: angulo }} transition={resorte} aria-hidden="true">
              <svg viewBox="-620 -620 1240 1240" className="h-full w-full overflow-visible">
                <line x1="0" y1="-132" x2="0" y2="-500" stroke="#FF4500" strokeWidth="3" />
                <circle cx="0" cy="-500" r="9" fill="#FF4500" />
              </svg>
            </motion.div>

            <Orbita rotacion={-16} grosor={4} className="pointer-events-none absolute left-[-3%] top-[31%] h-[38%] w-[106%]" />

            {/* Estrella en contorno + estrella naranja central que gira con el scroll */}
            <div className="pointer-events-none absolute inset-[13%]" aria-hidden="true">
              <Estrella contorno color="rgba(241,238,228,0.35)" grosor={1.4} className="h-full w-full" />
            </div>
            <motion.div
              className="absolute left-1/2 top-1/2 w-[25%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_22px_40px_rgba(10,8,80,0.55)]"
              style={{ rotate: giroEstrella }}
              initial={{ scale: 0 }}
              animate={entro ? { scale: 1 } : undefined}
              transition={{ ...resorte, delay: 0.35 }}
              aria-hidden="true"
            >
              <Estrella color="#FF4500" className="h-auto w-full" />
            </motion.div>

            {/* Tarjetas alrededor */}
            <ol>
              {PASOS.map((paso, i) => {
                const a = ((i * 60 - 90) * Math.PI) / 180
                const x = 50 + Math.cos(a) * 43
                const y = 50 + Math.sin(a) * 43
                return (
                  <li key={paso.n} className="absolute w-[clamp(200px,23vw,284px)] -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
                    <motion.div
                      className="mg-anim"
                      initial={{ opacity: 0, y: 24 }}
                      animate={entro ? { opacity: 1, y: 0 } : undefined}
                      transition={{ duration: dur.media, ease: ease.marca, delay: 0.25 + i * stagger.items }}
                    >
                      <Tarjeta paso={paso} activa={i === activa} />
                    </motion.div>
                  </li>
                )
              })}
            </ol>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function Tarjeta({ paso, activa }) {
  return (
    <motion.div
      className="rounded-[22px] px-5 py-[18px] backdrop-blur-md"
      initial={false}
      animate={{
        backgroundColor: activa ? '#FF4500' : 'rgba(24,22,150,0.62)',
        boxShadow: activa
          ? '0 30px 60px -28px rgba(49,13,0,0.6), inset 0 0 0 1px rgba(255,69,0,0)'
          : '0 26px 50px -30px rgba(10,8,80,0.8), inset 0 0 0 1px rgba(241,238,228,0.16)',
        scale: activa ? 1.04 : 1,
      }}
      transition={{ duration: dur.media, ease: ease.marca }}
    >
      <div className={`mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${activa ? 'text-mg-marron/70' : 'text-mg-crema/70'}`}>
        {paso.n} · {paso.valor}
      </div>
      <h3 className={`mb-2 font-titulo text-[27px] uppercase leading-[0.95] transition-colors duration-300 ${activa ? 'text-mg-marron' : 'text-mg-crema'}`}>
        {paso.titulo}
      </h3>
      <p className={`text-[14.5px] leading-[1.45] transition-colors duration-300 ${activa ? 'text-mg-marron/90' : 'text-mg-crema/90'}`}>{paso.texto}</p>
    </motion.div>
  )
}

/* ─────────────────────── Celular: línea de tiempo ─────────────────────── */

function LineaCelular() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 55%', 'end 55%'] })
  const alto = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })

  // Paso activo: el que está a la altura de la "punta" de la línea mientras scrolleás.
  const [activa, setActiva] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setActiva(Math.max(0, Math.min(PASOS.length - 1, Math.floor(p * PASOS.length))))
  })

  return (
    <div className="mg-contenido px-[22px] pb-24 pt-16 md:hidden">
      <TituloEnLineas
        className="font-titulo text-[17vw] uppercase leading-[0.9] text-mg-crema [--trazo:1.6px]"
        lineas={TITULO}
      />
      <Revelar as="p" className="mt-8 text-base leading-[1.55] text-mg-crema/90">
        {BAJADA}
      </Revelar>

      <div ref={ref} className="relative mt-10">
        {/* La línea vertical se dibuja siguiendo el scroll */}
        <div className="absolute bottom-[30px] left-3 top-5 w-0.5 bg-mg-crema/15" aria-hidden="true" />
        <motion.div
          className="absolute bottom-[30px] left-3 top-5 w-0.5 origin-top bg-gradient-to-b from-mg-naranja to-mg-crema/60"
          style={{ scaleY: alto }}
          aria-hidden="true"
        />
        <ol className="relative flex flex-col gap-3.5">
          {PASOS.map((paso, i) => (
            <PasoCelular key={paso.n} paso={paso} activa={i === activa} />
          ))}
        </ol>

        <Revelar as="div" className="mt-4 flex items-center gap-3.5">
          <motion.svg
            viewBox="0 0 24 24"
            className="ml-0.5 h-[22px] w-[22px] shrink-0"
            fill="none"
            stroke="#FF4500"
            strokeWidth="2"
            strokeLinecap="round"
            whileInView={{ rotate: 360 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 1.2, ease: ease.marca, delay: 0.2 }}
            aria-hidden="true"
          >
            <path d="M20 12a8 8 0 1 1-2.34-5.66" />
            <path d="M20 4v4h-4" />
          </motion.svg>
          <span className="text-[14.5px] text-mg-crema/80">Y la rueda vuelve a&nbsp;empezar.</span>
        </Revelar>
      </div>

      <Revelar as="div" className="mt-8">
        <Boton href="#contacto" className="w-full">
          Empezar con la charla
        </Boton>
        <p className="mt-3 text-sm text-mg-crema/75">El primer paso no tiene costo ni&nbsp;compromiso.</p>
      </Revelar>
    </div>
  )
}

function PasoCelular({ paso, activa }) {
  const ref = useRef(null)
  const visto = useInView(ref, { once: true, amount: 0.6 })
  return (
    <li ref={ref} className="flex items-start gap-3.5">
      {/* El punto se "enciende" y pasa a ser una estrellita naranja; la del paso activo late un poco más grande */}
      <div className="relative mt-3.5 flex h-[26px] w-[26px] shrink-0 items-center justify-center">
        <motion.span
          className="absolute h-3 w-3 rounded-full bg-mg-azul shadow-[0_0_0_2px_rgba(241,238,228,0.7)]"
          animate={{ scale: visto ? 0 : 1 }}
          transition={{ duration: dur.rapida }}
        />
        <motion.div
          className="absolute h-[26px] w-[26px]"
          initial={{ scale: 0, rotate: -90 }}
          animate={visto ? { scale: activa ? 1.25 : 0.85, rotate: activa ? 30 : 0 } : undefined}
          transition={resorte}
        >
          <Estrella color="#FF4500" className="h-full w-full" />
        </motion.div>
      </div>
      <motion.div
        className="mg-anim flex-1 rounded-[20px] px-[18px] py-4"
        initial={{ opacity: 0, y: 16, backgroundColor: 'rgba(24,22,150,0.62)', color: '#F1EEE4' }}
        animate={
          visto
            ? {
                opacity: 1,
                y: 0,
                backgroundColor: activa ? '#FF4500' : 'rgba(24,22,150,0.62)',
                color: activa ? '#310D00' : '#F1EEE4',
                boxShadow: activa
                  ? '0 24px 44px -24px rgba(49,13,0,0.6), inset 0 0 0 1px rgba(241,238,228,0)'
                  : '0 22px 40px -28px rgba(10,8,80,0.8), inset 0 0 0 1px rgba(241,238,228,0.16)',
              }
            : undefined
        }
        transition={{ duration: dur.media, ease: ease.marca }}
      >
        <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] opacity-70">
          {paso.n} · {paso.valor}
        </div>
        <h3 className="mb-1.5 font-titulo text-[25px] uppercase leading-[0.98]">{paso.titulo}</h3>
        <p className="text-[14.5px] leading-[1.45] opacity-90">{paso.texto}</p>
      </motion.div>
    </li>
  )
}
