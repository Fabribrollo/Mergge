import { useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import Estrella from './ui/Estrella.jsx'
import Orbita from './ui/Orbita.jsx'
import Boton from './ui/Boton.jsx'
import { Revelar } from './ui/Revelar.jsx'
import { alAparecer, dur, ease, resorte, stagger } from './ui/movimiento.js'
import useEsCompu from './ui/useEsCompu.js'

const SERVICIOS = [
  { nombre: 'Branding', desc: 'Definimos qué transmite tu marca, cómo habla y qué la hace distinta.' },
  { nombre: 'Identidad visual', desc: 'Logo, colores, tipografías y el manual para usarlos bien en todos lados.' },
  { nombre: 'Redes sociales', desc: 'Plantillas y piezas con tu identidad, listas para publicar.' },
  { nombre: 'Packaging', desc: 'Etiquetas, cajas y envases que se reconocen de un vistazo.' },
]

// 05 · Diseño. En compu: pasar el mouse abre el servicio y hacer clic lo deja
// fijo. En celular: tocar abre (y el último tocado queda abierto).
export default function Servicios() {
  const esCompu = useEsCompu()
  const [fijo, setFijo] = useState(0)
  const [sobre, setSobre] = useState(null)
  const abierto = sobre ?? fijo

  return (
    <MotionConfig reducedMotion="user">
      <section id="diseno" data-tono="49,48,227" className="mg-seccion bg-mg-azul">
        <div
          className="mg-luz left-[-340px] top-[-340px] h-[680px] w-[680px] md:left-[-640px] md:top-[-640px] md:h-[1280px] md:w-[1280px]"
          style={{ background: 'radial-gradient(circle, rgba(120,118,255,0.34) 0%, rgba(120,118,255,0) 70%)' }}
          aria-hidden="true"
        />
        {/* Luz naranja que cruza hacia Preguntas */}
        <div
          className="mg-luz bottom-[-380px] right-[-380px] h-[760px] w-[760px] md:bottom-[-720px] md:right-[-720px] md:h-[1440px] md:w-[1440px]"
          style={{ background: 'radial-gradient(circle, rgba(255,69,0,0.34) 0%, rgba(255,69,0,0) 70%)' }}
          aria-hidden="true"
        />

        <div className="mg-contenido flex min-h-[78svh] flex-col justify-center px-[22px] pb-24 pt-20 md:block md:min-h-0 md:px-[50px] md:pb-24 md:pt-[124px]">
          <Revelar as="p" className="max-w-[300px] text-lg leading-[1.55] text-mg-crema md:max-w-none md:text-[21px] md:leading-normal">
            También diseñamos la marca que acompaña a&nbsp;tu&nbsp;web.
          </Revelar>

          <div className="relative mt-11 md:mt-10">
            <Orbita rotacion={-9} grosor={esCompu ? 5 : 3} className="pointer-events-none absolute left-[-8%] top-[6%] h-[64%] w-[122%] md:left-[-2%] md:top-[2%] md:h-[58%] md:w-[min(86vw,1240px)]" />

            {/* Estrella naranja que gira cada vez que cambia el servicio fijado */}
            <motion.div
              className="pointer-events-none absolute right-[-40px] top-[62%] w-[120px] drop-shadow-[0_20px_40px_rgba(10,8,80,0.5)] md:right-[-128px] md:top-[18%] md:w-[280px]"
              animate={{ rotate: 20 + fijo * 60 }}
              transition={resorte}
              aria-hidden="true"
            >
              <Estrella color="#FF4500" className="h-auto w-full" />
            </motion.div>

            <ul className="relative flex flex-col" onMouseLeave={() => setSobre(null)}>
              {SERVICIOS.map((s, i) => {
                const activo = i === abierto
                return (
                  <motion.li
                    key={s.nombre}
                    className="mg-anim"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={alAparecer}
                    transition={{ duration: dur.lenta, ease: ease.marca, delay: i * stagger.lineas }}
                  >
                    <button
                      type="button"
                      className="block w-full text-left"
                      aria-expanded={activo}
                      aria-pressed={i === fijo}
                      onMouseEnter={() => esCompu && setSobre(i)}
                      onFocus={() => setSobre(i)}
                      onBlur={() => setSobre(null)}
                      onClick={() => {
                        setFijo(i)
                        setSobre(null)
                      }}
                    >
                      {/* Igual que en el canvas: crece el tamaño de letra (anclado a la
                          izquierda) y cambia el color, con una transición de 0,35 s.
                          CSS sabe interpolar font-size aunque venga de un min() o vw. */}
                      <span
                        className={`block whitespace-nowrap font-titulo uppercase leading-[1.12] tracking-[-0.01em] transition-[font-size,color] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:leading-[0.98] ${
                          activo
                            ? 'text-[15.3vw] text-mg-crema md:text-[min(10.1vw,146px)]'
                            : 'text-[11.8vw] text-[#9897EA] md:text-[min(8.6vw,124px)]'
                        }`}
                      >
                        {s.nombre}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {activo && (
                        <motion.div
                          key="desc"
                          className="overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: ease.marca }}
                        >
                          <div className="flex items-start gap-3 pb-4 pl-1 pt-2 md:w-[640px] md:pb-[18px] md:pt-3">
                            <motion.span
                              className="mt-[5px] block h-[14px] w-[14px] shrink-0 md:mt-[7px] md:h-[15px] md:w-[15px]"
                              initial={{ rotate: -90 }}
                              animate={{ rotate: 0 }}
                              transition={resorte}
                            >
                              <Estrella color="#FF4500" className="h-full w-full" />
                            </motion.span>
                            <p className="text-base leading-[1.5] text-mg-crema/90 md:text-xl">{s.desc}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                )
              })}
            </ul>
          </div>

          <Revelar as="div" className="mt-12 md:mt-16">
            <Boton href="#contacto" className="w-full md:w-[250px]">
              Pedir presupuesto
            </Boton>
          </Revelar>
        </div>
      </section>
    </MotionConfig>
  )
}
