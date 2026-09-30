import { useEffect, useRef, useState } from 'react'
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
  'Los procesos creativos y tecnológicos no son lineales. El nuestro tiene seis fases y cada una lleva el nombre de uno de nuestros valores.'

// 03 · Cómo trabajamos.
// Una sola lista de pasos en el HTML (Google y los lectores de pantalla la leen
// una vez) que se dibuja de dos maneras según el ancho:
// - Compu: la sección queda fija mientras scrolleás y los pasos se ubican
//   alrededor de una rueda que gira de a una fase.
// - Celular: los mismos pasos, uno debajo del otro, sobre una línea de tiempo
//   que se dibuja con el scroll.
// La ubicación la resuelve el CSS (clases md:); el JS solo decide qué paso
// está activo y cuándo aparece cada cosa.

const N = PASOS.length
const acotar = (i) => Math.max(0, Math.min(N - 1, i))

// true desde 768 px (el breakpoint md de Tailwind). No usamos useEsCompu porque
// ese pide además mouse, y acá lo que importa es qué diseño se está viendo.
function useAnchoCompu() {
  const [ancho, setAncho] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const actualizar = () => setAncho(mq.matches)
    actualizar()
    mq.addEventListener('change', actualizar)
    return () => mq.removeEventListener('change', actualizar)
  }, [])
  return ancho
}

export default function Proceso() {
  const anchoCompu = useAnchoCompu()

  // Compu: el progreso va de 0 a 1 mientras la sección está fija (170vh de alto,
  // unas 0,7 pantallas de scroll para la vuelta completa).
  const envolturaRef = useRef(null)
  const { scrollYProgress: progCompu } = useScroll({ target: envolturaRef, offset: ['start start', 'end end'] })
  const suave = useSpring(progCompu, { stiffness: 120, damping: 26 })
  const giroEstrella = useTransform(suave, [0, 1], [0, 360])

  // Celular: el progreso sigue a la lista; el paso activo es el que está a la
  // altura de la "punta" de la línea.
  const listaRef = useRef(null)
  const { scrollYProgress: progCelular } = useScroll({ target: listaRef, offset: ['start 55%', 'end 55%'] })
  const altoLinea = useSpring(progCelular, { stiffness: 140, damping: 30 })

  const [activaCompu, setActivaCompu] = useState(0)
  const [activaCelular, setActivaCelular] = useState(0)
  useMotionValueEvent(progCompu, 'change', (p) => setActivaCompu(acotar(Math.floor(p * N))))
  useMotionValueEvent(progCelular, 'change', (p) => setActivaCelular(acotar(Math.floor(p * N))))
  const activa = anchoCompu ? activaCompu : activaCelular

  // La rueda aparece recién cuando llegás a la sección (no se ve de antes).
  const entro = useInView(listaRef, { once: true, amount: 0.35 })

  return (
    <MotionConfig reducedMotion="user">
      <section id="proceso" data-tono="49,48,227" className="mg-seccion bg-mg-azul">
        {/* Luces: la violeta cruza hacia Quiénes somos (mismo azul), la naranja hacia Planes */}
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

        <div ref={envolturaRef} className="relative md:h-[170vh]">
          <div className="md:sticky md:top-0 md:flex md:h-svh md:items-center md:overflow-hidden">
            <div className="mg-contenido px-[22px] pb-24 pt-16 md:grid md:w-full md:grid-cols-[minmax(340px,440px)_1fr] md:items-center md:gap-6 md:px-[50px] md:pb-0 md:pt-[86px]">
              {/* Título, bajada y (en compu) el llamado */}
              <div>
                <TituloEnLineas
                  className="font-titulo text-[17vw] uppercase leading-[0.9] text-mg-crema [--trazo:1.6px] md:text-[clamp(64px,6.2vw,104px)] md:leading-[0.86] md:tracking-[-0.01em] md:[--trazo:2.2px]"
                  claseLinea="md:whitespace-nowrap"
                  lineas={TITULO}
                />
                <Revelar as="div" className="mt-8 md:max-w-[300px]">
                  <div className="mb-4 hidden h-px bg-mg-crema/30 md:block" />
                  <p className="text-base leading-[1.55] text-mg-crema/90 md:text-[15.5px]">{BAJADA}</p>
                </Revelar>
                <Revelar as="div" retraso={0.1} className="mt-10 hidden md:block">
                  <Boton href="#contacto" className="w-[220px]">
                    Hablemos
                  </Boton>
                </Revelar>
              </div>

              {/* En compu es la rueda (un cuadrado que escala con la pantalla);
                  en celular, el contenedor de la línea de tiempo. */}
              <div
                ref={listaRef}
                className="relative mt-10 md:mx-auto md:mt-0 md:aspect-square md:w-[min(calc(100svh-150px),56vw)]"
              >
                <DecoradoRueda entro={entro} angulo={activaCompu * 60} giroEstrella={giroEstrella} />

                {/* Línea de tiempo de celular: fondo tenue + trazo que se dibuja con el scroll */}
                <div className="absolute bottom-[30px] left-3 top-5 w-0.5 bg-mg-crema/15 md:hidden" aria-hidden="true" />
                <motion.div
                  className="absolute bottom-[30px] left-3 top-5 w-0.5 origin-top bg-gradient-to-b from-mg-naranja to-mg-crema/60 md:hidden"
                  style={{ scaleY: altoLinea }}
                  aria-hidden="true"
                />

                <ol className="relative flex flex-col gap-3.5 md:static md:block">
                  {PASOS.map((paso, i) => (
                    <Paso key={paso.n} paso={paso} i={i} activa={i === activa} anchoCompu={anchoCompu} entro={entro} />
                  ))}
                </ol>
              </div>

              <Revelar as="div" className="mt-8 md:hidden">
                <Boton href="#contacto" className="w-full">
                  Hablemos
                </Boton>
              </Revelar>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}

/* ─────────────── Decorado de la rueda (solo compu, no es contenido) ─────────────── */

function DecoradoRueda({ entro, angulo, giroEstrella }) {
  return (
    <motion.div
      className="mg-anim absolute inset-0 hidden md:block"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={entro ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: dur.lenta, ease: ease.marca }}
      aria-hidden="true"
    >
      <svg viewBox="-620 -620 1240 1240" className="absolute inset-0 h-full w-full overflow-visible">
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
      <motion.div className="absolute inset-0" animate={{ rotate: angulo }} transition={resorte}>
        <svg viewBox="-620 -620 1240 1240" className="h-full w-full overflow-visible">
          <line x1="0" y1="-132" x2="0" y2="-500" stroke="#FF4500" strokeWidth="3" />
          <circle cx="0" cy="-500" r="9" fill="#FF4500" />
        </svg>
      </motion.div>

      <Orbita rotacion={-16} grosor={4} className="pointer-events-none absolute left-[-3%] top-[31%] h-[38%] w-[106%]" />

      {/* Estrella en contorno + estrella naranja central que gira con el scroll */}
      <div className="pointer-events-none absolute inset-[13%]">
        <Estrella contorno color="rgba(241,238,228,0.35)" grosor={1.4} className="h-full w-full" />
      </div>
      <motion.div
        className="absolute left-1/2 top-1/2 w-[25%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_22px_40px_rgba(10,8,80,0.55)]"
        style={{ rotate: giroEstrella }}
        initial={{ scale: 0 }}
        animate={entro ? { scale: 1 } : undefined}
        transition={{ ...resorte, delay: 0.35 }}
      >
        <Estrella color="#FF4500" className="h-auto w-full" />
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────── Un paso ─────────────────────────── */

function Paso({ paso, i, activa, anchoCompu, entro }) {
  const ref = useRef(null)
  const visto = useInView(ref, { once: true, amount: 0.6 })
  // En compu todos entran juntos (escalonados) cuando aparece la rueda;
  // en celular cada uno entra cuando llega a la pantalla.
  const mostrar = anchoCompu ? entro : visto

  // Posición alrededor de la rueda (solo la usa el CSS de compu).
  const a = ((i * 60 - 90) * Math.PI) / 180
  const posicion = { '--x': `${50 + Math.cos(a) * 43}%`, '--y': `${50 + Math.sin(a) * 43}%` }

  return (
    <li
      ref={ref}
      style={posicion}
      className="flex items-start gap-3.5 md:absolute md:left-(--x) md:top-(--y) md:block md:w-[clamp(200px,23vw,284px)] md:-translate-x-1/2 md:-translate-y-1/2"
    >
      {/* Celular: el punto se "enciende" y pasa a ser una estrellita naranja */}
      <div className="relative mt-3.5 flex h-[26px] w-[26px] shrink-0 items-center justify-center md:hidden" aria-hidden="true">
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
        className="mg-anim flex-1"
        initial={{ opacity: 0, y: anchoCompu ? 24 : 16 }}
        animate={mostrar ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: dur.media, ease: ease.marca, delay: anchoCompu ? 0.25 + i * stagger.items : 0 }}
      >
        <motion.div
          className="rounded-[20px] px-[18px] py-4 md:rounded-[22px] md:px-5 md:py-[18px] md:backdrop-blur-md"
          initial={false}
          animate={{
            backgroundColor: activa ? '#FF4500' : 'rgba(24,22,150,0.62)',
            color: activa ? '#310D00' : '#F1EEE4',
            boxShadow: activa
              ? '0 30px 60px -28px rgba(49,13,0,0.6), inset 0 0 0 1px rgba(241,238,228,0)'
              : '0 26px 50px -30px rgba(10,8,80,0.8), inset 0 0 0 1px rgba(241,238,228,0.16)',
            scale: anchoCompu && activa ? 1.04 : 1,
          }}
          transition={{ duration: dur.media, ease: ease.marca }}
        >
          <div className="mb-1.5 text-[13px] font-semibold tracking-[0.01em] opacity-70 md:mb-2">
            {paso.n} - {paso.valor}
          </div>
          <h3 className="mb-1.5 font-titulo text-[25px] uppercase leading-[0.98] md:mb-2 md:text-[27px] md:leading-[0.95]">{paso.titulo}</h3>
          <p className="text-[14.5px] leading-[1.45] opacity-90">{paso.texto}</p>
        </motion.div>
      </motion.div>
    </li>
  )
}
