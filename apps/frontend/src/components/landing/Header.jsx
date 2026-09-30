import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, MotionConfig } from 'motion/react'
import Estrella from './ui/Estrella.jsx'
import { dur, ease, resorte, stagger } from './ui/movimiento.js'

const LINKS = [
  { texto: 'Cómo trabajamos', href: '#proceso' },
  { texto: 'Planes', href: '#planes' },
  { texto: 'Diseño', href: '#diseno' },
  { texto: 'Contacto', href: '#contacto' },
]

export default function Header() {
  const { scrollY } = useScroll()
  const [solido, setSolido] = useState(false) // fondo con blur después de 80px
  const [oculto, setOculto] = useState(false) // se esconde al bajar, vuelve al subir
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [sobre, setSobre] = useState(null) // ítem con el mouse encima

  useMotionValueEvent(scrollY, 'change', (y) => {
    const anterior = scrollY.getPrevious() ?? 0
    setSolido(y > 80)
    setOculto(y > 240 && y > anterior && !menuAbierto)
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

  // Con el menú de celular abierto, no se scrollea la página de atrás.
  useEffect(() => {
    document.documentElement.style.overflow = menuAbierto ? 'hidden' : ''
  }, [menuAbierto])

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
          style={{ backgroundColor: solido ? `rgba(${tono}, 0.32)` : 'rgba(0,0,0,0)' }}
        >
          <div className="mx-auto flex h-16 items-center justify-between px-[22px] md:h-[86px] md:px-[50px] md:pr-[34px]">
            <a href="#inicio" aria-label="Mergge Studio — inicio">
              <img src="/marca/logo-crema.png" alt="Mergge Studio" className="h-[17px] w-auto md:h-[22px]" width="147" height="22" />
            </a>

            {/* Menú de compu: texto crema, separado por estrellitas amarillas */}
            <nav className="hidden items-center lg:flex" aria-label="Principal" onMouseLeave={() => setSobre(null)}>
              {LINKS.map((link, i) => (
                <div key={link.href} className="flex items-center">
                  {i > 0 && (
                    <motion.span
                      className="mx-[18px] block h-[13px] w-[13px]"
                      animate={{ rotate: sobre === i || sobre === i - 1 ? 60 : 0 }}
                      transition={resorte}
                      aria-hidden="true"
                    >
                      <Estrella color="#FFD307" className="h-full w-full" />
                    </motion.span>
                  )}
                  <a
                    href={link.href}
                    onMouseEnter={() => setSobre(i)}
                    // Subrayado amarillo que se dibuja de izquierda a derecha al entrar
                    // y se va hacia la derecha al salir (cambia el origen del scale).
                    className="relative py-1.5 text-base font-medium tracking-[0.01em] text-mg-crema after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-right after:scale-x-0 after:bg-mg-amarillo after:transition-transform after:duration-[450ms] after:ease-[cubic-bezier(0.16,1,0.3,1)] after:content-[''] hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100"
                  >
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
                className="block h-0.5 w-6 rounded bg-mg-crema"
                animate={menuAbierto ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={resorte}
              />
              <motion.span
                className="block h-0.5 rounded bg-mg-amarillo"
                animate={menuAbierto ? { rotate: -45, y: -4, width: 24 } : { rotate: 0, y: 0, width: 16 }}
                transition={resorte}
              />
            </button>
          </div>
          {/* La línea fina crema debajo del header */}
          <div className="h-px bg-mg-crema/30" aria-hidden="true" />
        </div>
      </motion.header>

      {/* Menú de celular a pantalla completa */}
      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-mg-azul px-[22px] md:px-[50px] lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: ease.entrada }}
          >
            <nav className="flex flex-col gap-2" aria-label="Principal">
              {LINKS.map((link, i) => (
                // Máscara con aire arriba y abajo: Anton dibuja los acentos por
                // fuera de su caja y sin este margen se cortaban (Ó, É).
                <div key={link.href} className="-mb-[0.1em] -mt-[0.18em] overflow-hidden pb-[0.1em] pt-[0.18em]">
                  <motion.a
                    href={link.href}
                    onClick={() => setMenuAbierto(false)}
                    className="flex items-center gap-3 whitespace-nowrap font-titulo text-[min(9.4vw,64px)] uppercase leading-[1.05] text-mg-crema"
                    initial={{ y: '130%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '130%' }}
                    transition={{ duration: 0.6, ease: ease.marca, delay: 0.15 + i * stagger.lineas }}
                  >
                    <Estrella color="#FFD307" className="h-[0.3em] w-[0.3em] shrink-0" />
                    {link.texto}
                  </motion.a>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
