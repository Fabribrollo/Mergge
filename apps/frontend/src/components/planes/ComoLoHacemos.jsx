import { motion, MotionConfig } from 'motion/react'
import Estrella from '../landing/ui/Estrella.jsx'
import Orbita from '../landing/ui/Orbita.jsx'
import { Revelar, TituloEnLineas } from '../landing/ui/Revelar.jsx'
import { alAparecer, dur, ease, stagger } from '../landing/ui/movimiento.js'

// Las seis fases, iguales a las de la home.
const PASOS = [
  { n: '01', valor: 'Integración', titulo: 'La charla', texto: 'Nos contás tu idea y te escuchamos los dos. 20 minutos, gratis.' },
  { n: '02', valor: 'Creatividad', titulo: 'La propuesta', texto: 'Una dirección visual y un presupuesto cerrado.' },
  { n: '03', valor: 'Funcionalidad', titulo: 'La estructura', texto: 'Qué va en cada página y cómo se recorre.' },
  { n: '04', valor: 'Innovación', titulo: 'Diseño y desarrollo', texto: 'Ves avances y pedís cambios antes de publicar.' },
  { n: '05', valor: 'Detalle', titulo: 'Las pruebas', texto: 'Celulares, velocidad y Google. Recién ahí publicamos.' },
  { n: '06', valor: 'Evolución', titulo: 'Después', texto: 'Te enseñamos a usarla y seguimos cerca.' },
]

// "Cómo lo hacemos": sobre crema (nuestro blanco), con el plazo de este plan.
// Abajo, un degradé cálido lleva al marrón de las preguntas.
export default function ComoLoHacemos({ intro }) {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="proceso"
        data-tono="241,238,228"
        className="mg-seccion text-mg-marron"
        style={{ background: 'linear-gradient(180deg, #F1EEE4 0, #F1EEE4 calc(100% - 230px), #F6CBB2 calc(100% - 160px), #8A2600 calc(100% - 70px), #310D00 100%)' }}
      >
        <div className="mg-recorte" aria-hidden="true">
          <div
            className="absolute right-[-300px] top-[60px] h-[600px] w-[600px] md:right-[-420px] md:h-[900px] md:w-[900px]"
            style={{ background: 'radial-gradient(circle, rgba(255,69,0,0.2) 0%, rgba(255,69,0,0) 70%)' }}
          />
          <div className="absolute right-[-140px] top-[150px] w-[420px] opacity-[0.12] md:w-[620px]">
            <Estrella contorno color="#310D00" grosor={1.4} className="h-auto w-full rotate-[12deg]" />
          </div>
        </div>

        <div className="mg-contenido px-[22px] pb-[260px] pt-16 md:px-[50px] md:pb-[330px] md:pt-[122px]">
          <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-x-12">
            <div className="relative">
              <Orbita rotacion={-7} grosor={4} className="pointer-events-none absolute left-[-7%] top-[18%] h-[82%] w-[116%]" />
              <TituloEnLineas
                className="relative font-titulo text-[17vw] uppercase leading-[0.86] tracking-[-0.01em] md:text-[min(7.2vw,104px)] [--contorno:#310D00] [--trazo:1.6px] md:[--trazo:2px]"
                lineas={[{ texto: 'Cómo lo' }, { texto: 'hacemos', contorno: true }]}
              />
            </div>
            <Revelar as="p" className="max-w-[420px] text-base leading-[1.55] text-mg-marron/85 md:text-lg">
              {intro}
            </Revelar>
          </div>

          <ol className="mt-14 grid gap-3.5 md:mt-[72px] md:max-lg:grid-cols-2 lg:max-[1880px]:grid-cols-3 min-[1880px]:grid-cols-6">
            {PASOS.map((paso, i) => (
              <motion.li
                key={paso.n}
                className={`mg-anim min-h-[150px] rounded-[22px] px-5 py-[18px] md:min-h-[170px] ${
                  i === 0
                    ? 'bg-mg-naranja shadow-[0_30px_60px_-28px_rgba(49,13,0,0.55)]'
                    : 'bg-white/45 shadow-[inset_0_0_0_1px_rgba(49,13,0,0.12),0_24px_44px_-32px_rgba(49,13,0,0.35)]'
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={alAparecer}
                transition={{ duration: dur.media, ease: ease.marca, delay: (i % 3) * stagger.items }}
              >
                <p className="mb-2 text-[13px] font-semibold tracking-[0.01em] opacity-70">
                  {paso.n} - {paso.valor}
                </p>
                <h3 className="mb-2 font-titulo text-[27px] uppercase leading-[0.95]">{paso.titulo}</h3>
                <p className="text-[14.5px] leading-[1.45] opacity-90">{paso.texto}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
    </MotionConfig>
  )
}
