import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, MotionConfig, useAnimate, useInView } from 'motion/react'
import Estrella from './ui/Estrella.jsx'
import Orbita from './ui/Orbita.jsx'
import { Revelar, TituloEnLineas } from './ui/Revelar.jsx'
import { resorte as resorteGeneral } from './ui/movimiento.js'
import useEsCompu from './ui/useEsCompu.js'
import { PREGUNTAS } from '../../datos/sitio.js'

// Orden de las píldoras en celular (índices de PREGUNTAS): primero el precio y
// después si pueden editar la web. En compu se respeta el orden original.
const ORDEN_CELULAR = [0, 5, 1, 2, 3, 4, 6, 7]

const SALUDO = '¡Hola! Somos Delfina y Fabrizio. Elegí una pregunta y te contamos.'

// Resortes propios de esta sección (ver guía: "nivel iMessage").
const R = {
  burbuja: { type: 'spring', stiffness: 520, damping: 32, mass: 0.9 },
  acomodo: { type: 'spring', stiffness: 380, damping: 36 },
  pildora: { type: 'spring', stiffness: 600, damping: 38 },
  toque: { type: 'spring', stiffness: 700, damping: 30 },
}
const GRIS = '#E4DECF'
const MAX_MENSAJES = 7 // saludo + las últimas 3 preguntas con su respuesta

let contador = 0
const nuevoId = () => `m${++contador}`

export default function Preguntas() {
  const esCompu = useEsCompu()
  const [mensajes, setMensajes] = useState([])
  const [sel, setSel] = useState(null)
  const [leido, setLeido] = useState(null) // id de la burbuja "Vos" que muestra "Leído"
  const [pulso, setPulso] = useState(0) // para el rebote al tocar la misma pregunta
  const timers = useRef([])
  const panelRef = useRef(null)
  const panelVisto = useInView(panelRef, { once: true, amount: 0.5 })
  const pildorasRef = useRef([])

  const escribiendo = mensajes.some((m) => m.tipo === 'escribiendo')

  const limpiarTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  const luego = (ms, fn) => timers.current.push(setTimeout(fn, ms))
  useEffect(() => limpiarTimers, [])

  // La primera vez que el panel aparece, se "escribe" el saludo.
  useEffect(() => {
    if (!panelVisto) return
    const id = nuevoId()
    setMensajes([{ id, tipo: 'escribiendo' }])
    luego(700, () => setMensajes([{ id, tipo: 'mergge', texto: SALUDO, saludo: true }]))
  }, [panelVisto])

  const elegir = useCallback(
    (i) => {
      // Centrar la píldora tocada (en celular la fila se desliza).
      pildorasRef.current[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })

      const ultima = mensajes[mensajes.length - 1]
      if (i === sel && ultima?.tipo === 'mergge' && !ultima.saludo) {
        setPulso((p) => p + 1)
        return
      }
      limpiarTimers()
      setSel(i)
      const [pregunta, respuesta] = PREGUNTAS[i]
      const idVos = nuevoId()
      const idResp = nuevoId()

      // 1. Sale tu mensaje (si había alguien "escribiendo", esa burbuja se va).
      setMensajes((prev) => recortar([...prev.filter((m) => m.tipo !== 'escribiendo'), { id: idVos, tipo: 'vos', texto: pregunta }]))
      setLeido(null)
      luego(120, () => setLeido(idVos))
      // 2. "escribiendo…"
      luego(350, () => setMensajes((prev) => recortar([...prev, { id: idResp, tipo: 'escribiendo' }])))
      // 3. La burbuja de puntitos se transforma en la respuesta (misma id = misma burbuja).
      const espera = Math.min(1100, Math.max(700, respuesta.length * 6))
      luego(350 + espera, () => {
        setMensajes((prev) => prev.map((m) => (m.id === idResp ? { id: idResp, tipo: 'mergge', texto: respuesta } : m)))
        setLeido(null)
      })
    },
    [mensajes, sel],
  )

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="preguntas"
        data-tono="49,13,0"
        className="mg-seccion [--mezcla:110px] md:[--mezcla:160px]"
        style={{ background: 'linear-gradient(180deg, #3130E3 0, #310D00 var(--mezcla), #310D00 100%)' }}
      >
        {/* Luz naranja que viene desde Diseño */}
        <div
          className="mg-luz left-[-360px] top-[-340px] h-[720px] w-[720px] md:left-[-720px] md:top-[-680px] md:h-[1440px] md:w-[1440px]"
          style={{ background: 'radial-gradient(circle, rgba(255,69,0,0.36) 0%, rgba(255,69,0,0) 70%)' }}
          aria-hidden="true"
        />
        {/* Luz azul de abajo: cruza hacia Hablemos y acompaña el degradé marrón → naranja */}
        <div
          className="mg-luz bottom-[-420px] right-[-420px] h-[840px] w-[840px] md:bottom-[-760px] md:right-[-760px] md:h-[1520px] md:w-[1520px]"
          style={{ background: 'radial-gradient(circle, rgba(49,48,227,0.5) 0%, rgba(49,48,227,0) 70%)' }}
          aria-hidden="true"
        />
        <div className="mg-recorte" aria-hidden="true">
          <div className="absolute bottom-[-160px] left-[-200px] w-[440px] opacity-[0.12] md:bottom-[-180px] md:w-[520px]">
            <Estrella contorno color="#F1EEE4" className="h-auto w-full rotate-[14deg]" />
          </div>
        </div>

        <div className="mg-contenido grid gap-8 px-[22px] pb-20 pt-24 md:grid-cols-[minmax(0,570px)_minmax(0,716px)] md:justify-between md:gap-10 md:px-[50px] md:pb-[70px] md:pt-[212px]">
          {/* Columna izquierda */}
          <div className="min-w-0">
            <div className="relative">
              <Orbita rotacion={-6} grosor={esCompu ? 4 : 3} className="pointer-events-none absolute left-[-7%] top-[8%] h-[84%] w-[116%] md:left-[-7%] md:top-[12%] md:h-[78%] md:w-[112%]" />
              <TituloEnLineas
                className="relative font-titulo text-[19vw] uppercase leading-[0.96] text-mg-crema md:text-[min(7.2vw,104px)] [--trazo:1.6px] md:[--trazo:2px]"
                lineas={[{ texto: 'Preguntas' }, { texto: 'frecuentes', contorno: true }]}
              />
            </div>
            <Revelar as="p" className="mt-8 text-[17px] leading-normal text-mg-crema/85 md:text-xl">
              Tocá una pregunta y te respondemos {esCompu ? 'al lado' : 'abajo'}.
            </Revelar>

            {/* Píldoras: en compu se acomodan en varias líneas; en celular, una fila que se desliza */}
            <Revelar as="div" className="-mx-[22px] mt-6 overflow-x-auto overscroll-x-contain px-[22px] [scrollbar-width:none] md:mx-0 md:overflow-visible md:px-0">
              <div className="flex w-max gap-2 md:w-auto md:flex-wrap md:gap-2.5">
                {PREGUNTAS.map(([pregunta], i) => (
                  <motion.button
                    key={pregunta}
                    ref={(el) => (pildorasRef.current[i] = el)}
                    type="button"
                    onClick={() => elegir(i)}
                    aria-pressed={sel === i}
                    style={{ '--orden': ORDEN_CELULAR.indexOf(i) }}
                    className={`relative order-(--orden) h-[42px] shrink-0 md:order-none whitespace-nowrap rounded-full px-[18px] text-sm font-semibold md:h-12 md:px-[22px] md:text-base ${
                      sel === i ? 'text-mg-marron' : 'text-mg-crema'
                    }`}
                    whileTap={{ scale: 0.95 }}
                    transition={R.toque}
                  >
                    {/* Borde de la píldora */}
                    <span className="absolute inset-0 rounded-full bg-mg-crema/[0.04] shadow-[inset_0_0_0_1.5px_rgba(241,238,228,0.3)]" aria-hidden="true" />
                    {/* El fondo naranja viaja de una píldora a otra */}
                    {sel === i && (
                      <motion.span layoutId="pildora-activa" className="absolute inset-0 rounded-full bg-mg-naranja" transition={R.pildora} aria-hidden="true" />
                    )}
                    <span className="relative">{pregunta}</span>
                  </motion.button>
                ))}
              </div>
            </Revelar>

            {/* Todas las preguntas con su respuesta, en texto. No se ven en pantalla
                (el chat las muestra de a una), pero quedan en el HTML: así las leen
                Google, las IAs (que no ejecutan el chat) y los lectores de pantalla. */}
            <dl className="sr-only">
              {PREGUNTAS.map(([pregunta, respuesta]) => (
                <div key={pregunta}>
                  <dt>{pregunta}</dt>
                  <dd>{respuesta}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* El chat */}
          <motion.div
            ref={panelRef}
            className="mg-anim flex h-[520px] min-w-0 flex-col overflow-hidden rounded-[30px] bg-mg-crema md:h-[min(700px,80svh)] md:rounded-[40px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            animate={{
              boxShadow: escribiendo
                ? ['0 50px 90px rgba(0,0,0,0.42)', '0 50px 110px rgba(0,0,0,0.5)', '0 50px 90px rgba(0,0,0,0.42)']
                : '0 50px 100px rgba(0,0,0,0.45)',
            }}
            transition={{
              opacity: { duration: 0.7 },
              y: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              boxShadow: escribiendo ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.4 },
            }}
          >
            {/* Cabecera */}
            <div className="flex items-center gap-3 border-b border-mg-marron/10 px-[18px] py-3.5 md:gap-3.5 md:px-7 md:py-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mg-marron md:h-12 md:w-12">
                <Estrella color="#FF4500" className="h-[22px] w-[22px] rotate-[10deg] md:h-7 md:w-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold text-mg-marron md:text-[17px]">Mergge Studio</span>
                <span className="text-[12.5px] text-mg-marron/60 md:text-sm">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={escribiendo ? 'escr' : 'dis'}
                      className="inline-block"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {escribiendo ? 'escribiendo…' : 'Diseño y desarrollo web'}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>
            </div>

            {/* Mensajes: anclados abajo, los nuevos empujan hacia arriba como en el teléfono */}
            <div
              className="flex flex-1 flex-col justify-end gap-2.5 overflow-hidden px-4 py-[18px] md:gap-3 md:px-7 md:py-6"
              style={{ maskImage: 'linear-gradient(180deg, transparent 0, #000 64px)', WebkitMaskImage: 'linear-gradient(180deg, transparent 0, #000 64px)' }}
              aria-live="polite"
            >
              <AnimatePresence initial={false} mode="popLayout">
                {mensajes.map((m) => (
                  <Burbuja key={m.id} m={m} leido={leido === m.id} pulso={m === mensajes[mensajes.length - 1] ? pulso : 0} />
                ))}
              </AnimatePresence>
            </div>

            {/* Pie */}
            <div className="flex items-center justify-between gap-2.5 border-t border-mg-marron/10 py-3 pl-[18px] pr-3 md:py-[18px] md:pl-7 md:pr-5">
              <span className="text-[13.5px] text-mg-marron/60 md:text-base">¿No está tu pregunta?</span>
              <motion.a
                href="#contacto"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-mg-marron px-[18px] text-[14.5px] font-semibold text-mg-crema md:h-14 md:px-[30px] md:text-base"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Escribinos <span aria-hidden="true">→</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}

// Deja el historial corto: el saludo se va primero cuando no entra más.
function recortar(lista) {
  return lista.length > MAX_MENSAJES ? lista.slice(lista.length - MAX_MENSAJES) : lista
}

function Burbuja({ m, leido, pulso }) {
  const esVos = m.tipo === 'vos'
  const escribiendo = m.tipo === 'escribiendo'
  const esRespuesta = m.tipo === 'mergge' && !m.saludo
  const fondo = esVos ? '#3130E3' : esRespuesta ? '#FF4500' : GRIS
  const color = esVos ? '#F1EEE4' : '#310D00'

  // Rebote suave cuando se toca de nuevo la misma pregunta.
  const [pulsoRef, animar] = useAnimate()
  useEffect(() => {
    if (pulso && pulsoRef.current) animar(pulsoRef.current, { scale: [1, 1.03, 1] }, { duration: 0.35, ease: 'easeInOut' })
  }, [pulso])

  return (
    <motion.div
      layout="position"
      className={`flex flex-col ${esVos ? 'items-end' : 'items-start'}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18, transition: { duration: 0.25 } }}
      transition={{ layout: R.burbuja, default: R.burbuja }}
    >
      <div ref={pulsoRef} className="max-w-[86%] md:max-w-[470px]" style={{ transformOrigin: esVos ? 'bottom right' : 'bottom left' }}>
      <motion.div
        layout
        className="relative overflow-hidden"
        style={{
          borderRadius: esVos ? '22px 22px 6px 22px' : '22px 22px 22px 6px',
          transformOrigin: esVos ? 'bottom right' : 'bottom left',
        }}
        initial={{ scale: esVos ? 0.4 : 0.6, backgroundColor: fondo }}
        animate={{ scale: 1, backgroundColor: fondo }}
        transition={{ layout: R.burbuja, scale: R.burbuja, backgroundColor: { duration: 0.25 } }}
      >
        {escribiendo ? (
          <Puntitos />
        ) : (
          <motion.p
            layout
            className="px-4 py-3 text-[15.5px] leading-normal md:px-[22px] md:py-4 md:text-lg"
            style={{ color }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ layout: R.burbuja, default: { duration: 0.25, delay: esVos ? 0.04 : 0.08 } }}
          >
            {m.texto}
          </motion.p>
        )}
        {/* Brillo sutil que cruza la respuesta una sola vez */}
        {esRespuesta && (
          <motion.span
            className="pointer-events-none absolute inset-y-0 left-0 w-1/2"
            style={{ background: 'linear-gradient(100deg, transparent, rgba(241,238,228,0.28), transparent)' }}
            initial={{ x: '-120%' }}
            animate={{ x: '260%' }}
            transition={{ duration: 0.6, delay: 0.35, ease: 'easeInOut' }}
            aria-hidden="true"
          />
        )}
      </motion.div>
      </div>
      <AnimatePresence>
        {leido && (
          <motion.span
            className="mr-1 mt-1 text-[11px] font-medium text-mg-marron/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            Leído
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Puntitos() {
  return (
    <motion.div layout transition={{ layout: R.burbuja }} className="flex h-[46px] items-center gap-[5px] px-[18px] md:h-[54px] md:px-[22px]" aria-label="escribiendo">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-2 w-2 rounded-full bg-mg-marron"
          animate={{ y: [0, -4, 0], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
        />
      ))}
    </motion.div>
  )
}
