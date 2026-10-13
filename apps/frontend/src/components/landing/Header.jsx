import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, MotionConfig } from 'motion/react'
import Estrella from './ui/Estrella.jsx'
import { dur, ease, resorte, stagger } from './ui/movimiento.js'
import { PLANES } from '../../datos/planes.js'

// Menú: Servicios ▾ · Planes · Nosotros · Contacto.
// `ruta` es la página actual ('/' en la home). En la home, Planes y Nosotros
// bajan a su sección; desde otra página, llevan a esa sección de la home.
export default function Header({ ruta = '/' }) {
  const enHome = ruta === '/'
  const ir = (ancla) => (enHome ? ancla : `/${ancla}`)

  // Servicios: los tres planes y Diseño (que por ahora es una sección de la home).
  const servicios = [
    ...PLANES.map((p) => ({ texto: p.producto, href: p.ruta })),
    { texto: 'Diseño', href: ir('#diseno') },
  ]
  const links = [
    { texto: 'Planes', href: ir('#planes') },
    { texto: 'Nosotros', href: ir('#quienes') },
    { texto: 'Contacto', href: '#contacto' },
  ]

  const { scrollY } = useScroll()
  const [solido, setSolido] = useState(false) // fondo con blur después de 80px
  const [oculto, setOculto] = useState(false) // se esconde al bajar, vuelve al subir
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [srvAbierto, setSrvAbierto] = useState(false) // panel de Servicios (compu)
  const [srvMovil, setSrvMovil] = useState(false) // desplegable de Servicios (celular)
  const [sobre, setSobre] = useState(null) // ítem con el mouse encima

  useMotionValueEvent(scrollY, 'change', (y) => {
    const anterior = scrollY.getPrevious() ?? 0
    setSolido(y > 80)
    const bajando = y > 240 && y > anterior && !menuAbierto
    setOculto(bajando)
    if (bajando) setSrvAbierto(false)
  })

  // El header toma el color de la sección que tiene detrás: miramos qué hay
  // en el punto donde está el header y buscamos el bloque con data-tono.
  const [tono, setTono] = useState('49,48,227')
  useEffect(() => {
    let pedido = null
    const medir = () => {
      pedido = null
      const elementos = document.elementsFromPoint(window.innerWidth / 2, 40)
      for (const el of elementos) {
        const bloque = el.closest('[data-tono]')
        if (bloque) {
          setTono(bloque.dataset.tono)
          return
        }
      }
    }
    const alScrollear = () => {
      if (!pedido) pedido = requestAnimationFrame(medir)
    }
    medir()
    window.addEventListener('scroll', alScrollear, { passive: true })
    window.addEventListener('resize', alScrollear)
    return () => {
      window.removeEventListener('scroll', alScrollear)
      window.removeEventListener('resize', alScrollear)
    }
  }, [])
  // Sobre el crema el menú pasa a marrón (si no, el texto crema no se lee).
  const claro = tono === '241,238,228' && !menuAbierto

  // Con el menú de celular abierto, no se scrollea la página de atrás.
  useEffect(() => {
    document.documentElement.style.overflow = menuAbierto ? 'hidden' : ''
    if (!menuAbierto) setSrvMovil(false)
  }, [menuAbierto])

  // El panel de Servicios se cierra con Escape o tocando afuera.
  const srvRef = useRef(null)
  useEffect(() => {
    if (!srvAbierto) return
    const cerrar = (e) => {
      if (e.type === 'keydown' ? e.key === 'Escape' : !srvRef.current?.contains(e.target)) setSrvAbierto(false)
    }
    document.addEventListener('keydown', cerrar)
    document.addEventListener('pointerdown', cerrar)
    return () => {
      document.removeEventListener('keydown', cerrar)
      document.removeEventListener('pointerdown', cerrar)
    }
  }, [srvAbierto])

  const colorTexto = claro ? 'text-mg-marron' : 'text-mg-crema'
  const subrayado =
    "relative py-1.5 text-base font-medium tracking-[0.01em]"

  const separador = (i) => (
    <motion.span
      className="mx-[18px] block h-[13px] w-[13px]"
      animate={{ rotate: sobre === i || sobre === i - 1 ? 60 : 0 }}
      transition={resorte}
      aria-hidden="true"
    >
      <Estrella color={claro ? '#FF4500' : '#FFD307'} className="h-full w-full" />
    </motion.span>
  )

  return (
    <MotionConfig reducedMotion="user">
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: oculto ? '-100%' : '0%' }}
        transition={{ duration: dur.media, ease: ease.marca }}
      >
        {/* Vidrio: casi transparente, con desenfoque y un tinte del color de la sección de atrás */}
        <div
          className={`transition-[background-color,backdrop-filter] duration-500 ${solido ? 'backdrop-blur-xl backdrop-saturate-150' : ''}`}
          style={{ backgroundColor: solido ? `rgba(${tono}, ${claro ? 0.6 : 0.32})` : 'rgba(0,0,0,0)' }}
        >
          <div className="mx-auto flex h-16 items-center justify-between px-[22px] md:h-[86px] md:px-[50px]">
            <a href={enHome ? '#inicio' : '/'} aria-label="Mergge Studio — inicio">
              <img
                src={claro ? '/marca/logo-marron.png' : '/marca/logo-crema.png'}
                alt="Mergge Studio"
                className="h-[17px] w-auto md:h-[22px]"
                width="147"
                height="22"
              />
            </a>

            {/* Menú de compu, separado por estrellitas */}
            <nav className={`hidden items-center lg:flex ${colorTexto}`} aria-label="Principal" onMouseLeave={() => setSobre(null)}>
              {/* Servicios: abre el panel al pasar el mouse o al tocar */}
              <div ref={srvRef} className="relative" onMouseEnter={() => setSrvAbierto(true)} onMouseLeave={() => setSrvAbierto(false)}>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 py-1.5 text-base font-medium tracking-[0.01em]"
                  aria-expanded={srvAbierto}
                  aria-controls="menu-servicios"
                  onClick={() => setSrvAbierto((v) => !v)}
                  onMouseEnter={() => setSobre(0)}
                >
                  Servicios
                  <motion.svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ rotate: srvAbierto ? 180 : 0 }}
                    transition={{ duration: dur.rapida }}
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {srvAbierto && (
                    <motion.div
                      id="menu-servicios"
                      className="absolute left-[-24px] top-full pt-[18px]"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: dur.rapida, ease: ease.marca }}
                    >
                      <div className="w-[260px] rounded-[24px] bg-mg-crema p-2 text-mg-marron shadow-[0_40px_80px_-30px_rgba(20,18,140,0.65),0_0_0_1px_rgba(49,13,0,0.06)]">
                        <PanelServicios servicios={servicios} ruta={ruta} alElegir={() => setSrvAbierto(false)} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {links.map((link, i) => (
                <div key={link.texto} className="flex items-center">
                  {separador(i + 1)}
                  <a href={link.href} onMouseEnter={() => setSobre(i + 1)} className={subrayado}>
                    {link.texto}
                  </a>
                </div>
              ))}
            </nav>

            {/* Botón de menú en celular: dos líneas, la de abajo amarilla */}
            <button
              type="button"
              className="flex h-10 w-10 flex-col items-end justify-center gap-1.5 lg:hidden"
              aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuAbierto}
              onClick={() => setMenuAbierto((v) => !v)}
            >
              <motion.span
                className={`block h-0.5 w-6 rounded ${claro ? 'bg-mg-marron' : 'bg-mg-crema'}`}
                animate={menuAbierto ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={resorte}
              />
              <motion.span
                className={`block h-0.5 rounded ${claro ? 'bg-mg-naranja' : 'bg-mg-amarillo'}`}
                animate={menuAbierto ? { rotate: -45, y: -4, width: 24 } : { rotate: 0, y: 0, width: 16 }}
                transition={resorte}
              />
            </button>
          </div>
          {/* La línea fina debajo del header */}
          <div className={`h-px ${claro ? 'bg-mg-marron/20' : 'bg-mg-crema/30'}`} aria-hidden="true" />
        </div>
      </motion.header>

      {/* Menú de celular a pantalla completa */}
      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center overflow-y-auto bg-mg-azul px-[22px] pb-10 pt-24 md:px-[50px] lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: ease.entrada }}
          >
            <nav className="flex flex-col" aria-label="Principal">
              {/* Servicios: un desplegable con la misma tipografía que los otros links */}
              <div className="mb-2">
                <div className="-mb-[0.1em] -mt-[0.18em] overflow-hidden pb-[0.1em] pt-[0.18em]">
                  <motion.button
                    type="button"
                    onClick={() => setSrvMovil((v) => !v)}
                    aria-expanded={srvMovil}
                    aria-controls="servicios-movil"
                    className="flex w-full items-center gap-3 whitespace-nowrap text-left font-titulo text-[min(11vw,64px)] uppercase leading-[1.05] text-mg-crema"
                    initial={{ y: '130%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '130%' }}
                    transition={{ duration: 0.6, ease: ease.marca, delay: 0.2 }}
                  >
                    <Estrella color="#FFD307" className="h-[0.3em] w-[0.3em] shrink-0" />
                    Servicios
                    <motion.svg
                      viewBox="0 0 24 24"
                      className="h-[0.42em] w-[0.42em] shrink-0"
                      fill="none"
                      stroke="#FFD307"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      animate={{ rotate: srvMovil ? 180 : 0 }}
                      transition={{ duration: dur.rapida }}
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </motion.svg>
                  </motion.button>
                </div>
                <AnimatePresence initial={false}>
                  {srvMovil && (
                    <motion.ul
                      id="servicios-movil"
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: dur.media, ease: ease.marca }}
                    >
                      {servicios.map((sv) => (
                        <li key={sv.href}>
                          <a
                            href={sv.href}
                            aria-current={sv.href === ruta ? 'page' : undefined}
                            onClick={() => setMenuAbierto(false)}
                            className="flex items-center gap-3 py-2.5 pl-[calc(min(11vw,64px)*0.3+12px)] text-xl font-semibold text-mg-crema"
                          >
                            <Estrella color="#FF4500" className="h-3.5 w-3.5 shrink-0" />
                            {sv.texto}
                          </a>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex flex-col gap-2">
                {links.map((link, i) => (
                  // Máscara con aire arriba y abajo: Anton dibuja los acentos por
                  // fuera de su caja y sin este margen se cortaban (Ó, É).
                  <div key={link.texto} className="-mb-[0.1em] -mt-[0.18em] overflow-hidden pb-[0.1em] pt-[0.18em]">
                    <motion.a
                      href={link.href}
                      onClick={() => setMenuAbierto(false)}
                      className="flex items-center gap-3 whitespace-nowrap font-titulo text-[min(11vw,64px)] uppercase leading-[1.05] text-mg-crema"
                      initial={{ y: '130%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '130%' }}
                      transition={{ duration: 0.6, ease: ease.marca, delay: 0.2 + (i + 1) * stagger.lineas }}
                    >
                      <Estrella color="#FFD307" className="h-[0.3em] w-[0.3em] shrink-0" />
                      {link.texto}
                    </motion.a>
                  </div>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}

// La lista del panel de Servicios (compu): solo los nombres.
function PanelServicios({ servicios, ruta, alElegir }) {
  return (
    <ul>
      {servicios.map((s, i) => {
        const actual = s.href === ruta
        return (
          <li key={s.href}>
            {i === servicios.length - 1 && <div className="mx-3.5 my-1.5 h-px bg-mg-marron/12" />}
            <a
              href={s.href}
              aria-current={actual ? 'page' : undefined}
              onClick={alElegir}
              className={`flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-base font-semibold transition-colors ${actual ? 'bg-mg-naranja/15' : 'hover:bg-mg-marron/[0.06]'}`}
            >
              <Estrella color="#FF4500" className="h-3.5 w-3.5 shrink-0" />
              {s.texto}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
