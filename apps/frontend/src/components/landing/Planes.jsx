import { motion, MotionConfig } from 'motion/react'
import Estrella from './ui/Estrella.jsx'
import Boton from './ui/Boton.jsx'
import { Revelar, TituloEnLineas } from './ui/Revelar.jsx'
import { alAparecer, dur, ease, stagger } from './ui/movimiento.js'

// Cada plan tiene su "piel": fondo, colores de texto, estrella y botón.
const PLANES = [
  {
    id: 'estatica',
    etiqueta: 'Landing page',
    nombre: 'Estática',
    bajada: 'Una página, bien hecha, para presentarte y que te escriban.',
    antes: 'USD',
    precio: '400–550',
    tiempo: 'Entre 3 y 4 semanas',
    base: ['Diseño a medida', 'Adaptada a celulares', 'Visible en Google', 'Dominio y alojamiento'],
    suma: [],
    fondo:
      'radial-gradient(70% 45% at 100% 0%, rgba(255,69,0,0.55) 0%, rgba(255,69,0,0) 70%), radial-gradient(60% 40% at 0% 100%, rgba(49,48,227,0.28) 0%, rgba(49,48,227,0) 70%), radial-gradient(50% 40% at 20% 20%, #FFFFFF 0%, rgba(255,255,255,0) 70%), #F1EEE4',
    sombra: '0 30px 60px -30px rgba(49,13,0,0.5)',
    texto: 'text-mg-marron',
    suave: 'text-mg-marron/65',
    linea: 'bg-mg-marron/15',
    estrella: '#3130E3',
    boton: 'marron',
  },
  {
    id: 'profesional',
    etiqueta: 'Autoadministrable',
    nombre: 'Profesional',
    bajada: 'Un sitio completo que actualizás vos, sin depender de nadie.',
    antes: 'USD',
    precio: '800–1.200',
    tiempo: 'Entre 5 y 7 semanas',
    base: ['Diseño a medida', 'Adaptada a celulares', 'Visible en Google', 'Dominio y alojamiento'],
    suma: ['Panel de edición', 'Mejor posición en Google'],
    fondo:
      'radial-gradient(70% 40% at 100% 0%, rgba(255,69,0,0.85) 0%, rgba(255,69,0,0.3) 35%, rgba(255,69,0,0) 72%), radial-gradient(80% 45% at 0% 100%, rgba(49,48,227,0.8) 0%, rgba(49,48,227,0.25) 40%, rgba(49,48,227,0) 75%), conic-gradient(from 30deg at 55% 55%, #310D00, #451300, #250900, #310D00)',
    sombra: '0 60px 110px -30px rgba(49,13,0,0.8)',
    texto: 'text-mg-crema',
    suave: 'text-mg-crema/70',
    linea: 'bg-mg-crema/15',
    estrella: '#FF4500',
    boton: 'naranja',
    destacado: true,
  },
  {
    id: 'a-medida',
    etiqueta: 'Dinámica · ecommerce',
    nombre: 'A medida',
    bajada: 'Tu tienda o tu sistema, pensado y programado desde cero.',
    antes: 'A partir\nde USD',
    precio: '1.400',
    tiempo: 'A partir de 8 semanas',
    base: ['Diseño a medida', 'Adaptada a celulares', 'Visible en Google', 'Dominio y alojamiento', 'Panel de edición', 'Mejor posición en Google'],
    suma: ['Catálogo de productos', 'Pagos online', 'Gestión de ventas'],
    fondo:
      'radial-gradient(60% 40% at 100% 0%, rgba(255,69,0,0.75) 0%, rgba(255,69,0,0) 70%), radial-gradient(70% 50% at 0% 100%, #1C1A9A 0%, rgba(28,26,154,0) 72%), radial-gradient(45% 35% at 15% 10%, rgba(140,138,255,0.55) 0%, rgba(140,138,255,0) 70%), #3130E3',
    sombra: '0 30px 60px -30px rgba(20,18,140,0.7)',
    texto: 'text-mg-crema',
    suave: 'text-mg-crema/70',
    linea: 'bg-mg-crema/15',
    estrella: '#FF4500',
    boton: 'crema',
  },
]

const Reloj = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

// 04 · Planes. Va entre Cómo trabajamos y Diseño.
export default function Planes() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="planes"
        data-tono="255,69,0"
        className="mg-seccion [--mezcla:120px] md:[--mezcla:170px]"
        style={{
          background:
            'linear-gradient(180deg, #3130E3 0, #FF4500 var(--mezcla), #FF4500 calc(100% - var(--mezcla)), #3130E3 100%)',
        }}
      >
        {/* Luces: el azul de abajo a la izquierda se funde con Diseño; el durazno queda recortado arriba */}
        <div
          className="mg-luz bottom-[-420px] left-[-420px] h-[840px] w-[840px] md:bottom-[-900px] md:left-[-900px] md:h-[1800px] md:w-[1800px]"
          style={{ background: 'radial-gradient(circle, rgba(49,48,227,0.9) 0%, rgba(49,48,227,0.5) 35%, rgba(49,48,227,0) 72%)' }}
          aria-hidden="true"
        />
        <div className="mg-recorte" aria-hidden="true">
          <div
            className="absolute right-[-360px] top-[-120px] h-[720px] w-[720px] md:right-[-700px] md:top-[-500px] md:h-[1400px] md:w-[1400px]"
            style={{ background: 'radial-gradient(circle, rgba(255,140,90,0.55) 0%, rgba(255,140,90,0) 70%)' }}
          />
        </div>

        <div className="mg-contenido px-[22px] pb-28 pt-[150px] md:px-[50px] md:pb-[180px] md:pt-[210px]">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <TituloEnLineas
              className="font-titulo text-[21vw] uppercase leading-[0.86] tracking-[-0.01em] text-mg-marron md:text-[min(9.7vw,140px)] [--contorno:#310D00] [--trazo:1.8px] md:[--trazo:2.4px]"
              lineas={[{ texto: 'Nuestros' }, { texto: 'planes', contorno: true }]}
            />
            <Revelar as="p" className="max-w-[380px] text-[17px] leading-[1.5] text-mg-marron [text-wrap:balance] md:mt-4 md:max-w-[400px] md:text-right md:text-lg">
              Tres formas de empezar. Los valores están en dólares y dependen del alcance final. Si lo tuyo no entra en ninguno, lo&nbsp;vemos.
            </Revelar>
          </div>

          <ul className="mt-12 flex flex-col gap-5 md:mt-20 md:flex-row md:items-center md:justify-center md:gap-[30px]">
            {PLANES.map((plan, i) => (
              <motion.li
                key={plan.id}
                className={`mg-anim md:flex-1 ${plan.destacado ? 'md:max-w-[440px]' : 'md:max-w-[400px]'}`}
                initial={{ opacity: 0, y: 60, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={alAparecer}
                transition={{ duration: dur.lenta, ease: ease.marca, delay: (plan.destacado ? 2 : i) * stagger.items * 2 }}
              >
                <Tarjeta plan={plan} />
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </MotionConfig>
  )
}

function Tarjeta({ plan }) {
  return (
    <motion.article
      className={`flex flex-col rounded-[34px] px-6 py-7 md:rounded-[36px] md:px-[34px] ${
        plan.destacado ? 'md:min-h-[840px] md:py-[54px]' : 'md:min-h-[760px] md:py-[42px]'
      } ${plan.texto}`}
      style={{ background: plan.fondo, boxShadow: plan.sombra }}
      whileHover={{ y: -6 }}
      transition={{ duration: dur.media, ease: ease.marca }}
    >
      <p className={`text-[13px] font-semibold tracking-[0.01em] ${plan.suave}`}>{plan.etiqueta}</p>
      <h3 className={`mt-3.5 font-titulo uppercase leading-[0.95] ${plan.destacado ? 'text-[52px] md:text-[60px]' : 'text-[46px] md:text-[52px]'}`}>
        {plan.nombre}
      </h3>
      <p className={`mt-2 text-[15px] leading-[1.45] ${plan.suave}`}>{plan.bajada}</p>

      <div className="mt-7 flex items-end gap-2">
        <span className="whitespace-pre-line pb-[0.35em] font-titulo text-xl uppercase leading-[0.9]">{plan.antes}</span>
        <span className={`whitespace-nowrap font-titulo leading-[0.85] ${plan.destacado ? 'text-[min(17vw,72px)] md:text-[84px]' : 'text-[62px] md:text-[70px]'}`}>{plan.precio}</span>
      </div>
      <p className={`mt-3 flex items-center gap-2 text-[13px] font-semibold ${plan.suave}`}>
        <Reloj /> {plan.tiempo}
      </p>

      <div className={`my-6 h-px ${plan.linea}`} />

      <ul className="flex flex-col gap-2.5">
        {plan.base.map((item) => (
          <Item key={item} texto={item} color={plan.estrella} />
        ))}
        {plan.suma.map((item) => (
          <Item key={item} texto={item} color={plan.estrella} destacado />
        ))}
      </ul>

      <div className="mt-8 pt-2 md:mt-auto">
        <Boton
          href="#contacto"
          variante={plan.boton === 'crema' ? 'marron' : plan.boton}
          className={`w-full ${plan.boton === 'crema' ? '!bg-mg-crema !text-mg-marron' : ''}`}
        >
          Elegir {plan.nombre}
        </Boton>
      </div>
    </motion.article>
  )
}

function Item({ texto, color, destacado }) {
  return (
    <li className={`flex items-center gap-3 text-[15.5px] ${destacado ? 'font-semibold' : ''}`}>
      <Estrella color={color} className="h-3.5 w-3.5 shrink-0" />
      {texto}
    </li>
  )
}
