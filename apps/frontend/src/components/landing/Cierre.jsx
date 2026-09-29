import { useRef } from 'react'
import { motion, MotionConfig, useInView, useScroll, useTransform } from 'motion/react'
import Estrella from './ui/Estrella.jsx'
import Orbita from './ui/Orbita.jsx'
import { Revelar } from './ui/Revelar.jsx'
import { alAparecer, dur, ease, stagger } from './ui/movimiento.js'
import useEsCompu from './ui/useEsCompu.js'

const PALABRA = 'Hablemos'

const Icono = {
  whatsapp: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 11.5a8 8 0 0 1-11.9 7L4 20l1.5-4A8 8 0 1 1 20 11.5z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
    </svg>
  ),
}

// 06 · Hablemos + pie.
export default function Cierre() {
  const esCompu = useEsCompu()
  const ref = useRef(null)
  const tituloRef = useRef(null)
  const tituloVisto = useInView(tituloRef, { once: true, amount: 0.5 })

  // La estrella grande en contorno gira con el scroll: 0° → 150° mientras la sección cruza la pantalla.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const giro = useTransform(scrollYProgress, [0, 1], [0, 150])

  // El botón de WhatsApp "respira" cada 4 s mientras está en pantalla.
  const whatsRef = useRef(null)
  const whatsVisible = useInView(whatsRef, { amount: 0.8 })

  return (
    <MotionConfig reducedMotion="user">
      {/* Arriba, un degradé corto desde el marrón de Preguntas. */}
      <section
        id="contacto"
        ref={ref}
        data-tono="255,69,0"
        data-ancla="200"
        className="mg-seccion text-mg-marron [--mezcla:240px] md:[--mezcla:340px]"
        style={{ background: 'linear-gradient(180deg, #310D00 0, #8A2600 calc(var(--mezcla) * 0.45), #FF4500 var(--mezcla), #FF4500 100%)' }}
      >
        <div className="mg-recorte" aria-hidden="true">
          <div
            className="absolute left-[-20%] top-[40px] h-[600px] w-[140%] md:left-[-10%] md:top-[0px] md:h-[1120px] md:w-[125%]"
            style={{ background: 'radial-gradient(closest-side, rgba(255,170,130,0.5) 0%, rgba(255,170,130,0) 100%)' }}
          />
          <div
            className="absolute right-[-330px] top-[45%] h-[660px] w-[660px] md:right-[-620px] md:top-[20%] md:h-[1240px] md:w-[1240px]"
            style={{ background: 'radial-gradient(circle, rgba(49,48,227,0.72) 0%, rgba(49,48,227,0.32) 38%, rgba(49,48,227,0) 72%)' }}
          />
          <motion.div
            className="absolute left-[40%] top-[48%] w-[420px] opacity-[0.28] md:left-auto md:right-[-170px] md:top-[150px] md:w-[640px]"
            style={{ rotate: giro }}
          >
            <Estrella contorno color="#310D00" grosor={1.4} className="h-auto w-full" />
          </motion.div>
        </div>

        <div className="mg-contenido px-[22px] pt-[230px] md:px-[48px] md:pt-[330px]">
          <Revelar as="p" className="font-titulo text-[10.2vw] uppercase leading-none md:text-[min(5vw,72px)]">
            ¿Tenés una idea?
          </Revelar>

          {/* HABLEMOS entra letra por letra; después se dibuja la órbita azul y cae la estrella */}
          <div className="relative mt-3 inline-block md:mt-2" ref={tituloRef}>
            <Orbita
              color="#3130E3"
              grosor={esCompu ? 5 : 3}
              rotacion={-5}
              activa={tituloVisto}
              retraso={0.5}
              estrella={{ angulo: -24, tamano: (w) => Math.min(82, Math.max(34, w * 0.07)), color: '#3130E3', giro: 10 }}
              className="pointer-events-none absolute left-[-5%] top-[-2%] h-[104%] w-[112%]"
            />
            <h2 className="relative flex font-titulo text-[22vw] uppercase leading-[0.9] tracking-[-0.01em] md:text-[min(17.4vw,250px)] md:leading-[0.86]" aria-label={PALABRA}>
              {PALABRA.split('').map((letra, i) => (
                <span key={i} className="-mb-[0.08em] -mt-[0.16em] block overflow-hidden pb-[0.08em] pt-[0.16em]" aria-hidden="true">
                  <motion.span
                    className="mg-anim block"
                    initial={{ y: '130%' }}
                    animate={tituloVisto ? { y: '0%' } : undefined}
                    transition={{ duration: dur.lenta, ease: ease.marca, delay: i * 0.04 }}
                  >
                    {letra}
                  </motion.span>
                </span>
              ))}
            </h2>
          </div>

          <Revelar as="p" className="mt-12 max-w-[880px] text-[17px] leading-[1.6] md:mt-[70px] md:text-xl md:leading-normal">
            Contanos qué tenés en mente. La primera charla no tiene costo ni&nbsp;compromiso.
          </Revelar>

          <div className="mt-9 flex flex-col gap-3.5 md:mt-8 md:flex-row md:gap-3.5">
            {[
              { href: 'https://wa.me/[NUMERO]', texto: 'Escribinos por WhatsApp', icono: Icono.whatsapp, oscuro: true },
              { href: 'mailto:hola@mergge.com.ar', texto: 'hola@mergge.com.ar', icono: Icono.mail },
              { href: 'https://instagram.com/merggestudio', texto: '@merggestudio', icono: Icono.instagram },
            ].map((b, i) => (
              <motion.a
                key={b.href}
                ref={b.oscuro ? whatsRef : undefined}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mg-anim inline-flex h-[54px] items-center justify-center gap-3 rounded-full px-7 text-base font-semibold md:h-[60px] md:text-[17px] ${
                  b.oscuro ? 'bg-mg-marron text-mg-crema' : 'bg-mg-crema/15 text-mg-marron shadow-[inset_0_0_0_1.5px_rgba(49,13,0,0.55)]'
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={alAparecer}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: dur.media, ease: ease.marca, delay: i * stagger.items }}
                {...(b.oscuro && {
                  animate: whatsVisible
                    ? { boxShadow: ['0 24px 44px -22px rgba(49,13,0,0.8)', '0 24px 60px -18px rgba(49,13,0,0.95)', '0 24px 44px -22px rgba(49,13,0,0.8)'] }
                    : { boxShadow: '0 24px 44px -22px rgba(49,13,0,0.8)' },
                  transition: {
                    boxShadow: whatsVisible ? { duration: 1.2, repeat: Infinity, repeatDelay: 2.8, ease: 'easeInOut' } : { duration: 0.3 },
                    default: { duration: dur.media, ease: ease.marca },
                  },
                })}
              >
                {b.icono}
                {b.texto}
              </motion.a>
            ))}
          </div>

          {/* Pie */}
          <footer className="-mx-[22px] mt-24 border-t border-mg-marron/25 px-[22px] pb-10 pt-8 md:-mx-[48px] md:mt-[130px] md:px-[50px] md:py-6">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
              <img src="/marca/logo-marron.png" alt="Mergge Studio" className="h-5 w-auto" width="133" height="20" />
              <span className="text-[12.5px] text-mg-marron/80 md:text-sm">© 2026 Mergge Studio</span>
            </div>
          </footer>
        </div>
      </section>
    </MotionConfig>
  )
}
