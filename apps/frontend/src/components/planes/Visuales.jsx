import Estrella from '../landing/ui/Estrella.jsx'

// Los dibujos de las tarjetas de "Qué incluye". Son decorado (aria-hidden):
// lo que cuenta cada tarjeta está en su título y su texto.
//
// Cada dibujo tiene un tamaño de diseño fijo (ancho × alto) y la tarjeta lo
// escala para que entre completo en el espacio que le toca, centrado. Así se ve
// bien en cualquier ancho de tarjeta, sin cortarse ni quedar chico. Algunos
// tienen más de una composición (apaisada / vertical) y se usa la que mejor
// aproveche el espacio.

const Barra = ({ ancho, color = 'rgba(49,13,0,0.14)', alto = 6, className = '' }) => (
  <span className={`block rounded ${className}`} style={{ width: ancho, height: alto, background: color }} />
)

const Candado = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
)
const Mail = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>
)
const WhatsApp = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 11.5a8 8 0 0 1-11.9 7L4 20l1.5-4A8 8 0 1 1 20 11.5z" />
  </svg>
)

const ESTRELLA = 'M 0.00 -100.00 Q 6.75 -56.69 15.00 -25.98 Q 45.72 -34.19 86.60 -50.00 Q 52.47 -22.50 30.00 0.00 Q 52.47 22.50 86.60 50.00 Q 45.72 34.19 15.00 25.98 Q 6.75 56.69 0.00 100.00 Q -6.75 56.69 -15.00 25.98 Q -45.72 34.19 -86.60 50.00 Q -52.47 22.50 -30.00 0.00 Q -52.47 -22.50 -86.60 -50.00 Q -45.72 -34.19 -15.00 -25.98 Q -6.75 -56.69 0.00 -100.00 Z'

// Una hoja en blanco con la órbita y la estrella: "diseño desde cero".
function HojaApaisada() {
  return (
    <svg viewBox="0 0 640 230" className="h-full w-full overflow-visible">
      <rect x="150" y="18" width="300" height="190" rx="14" fill="rgba(49,13,0,0.04)" stroke="rgba(49,13,0,0.25)" strokeWidth="1.5" strokeDasharray="6 6" />
      <ellipse cx="300" cy="113" rx="280" ry="70" fill="none" stroke="#FF4500" strokeWidth="4" strokeLinecap="round" transform="rotate(-8 300 113)" />
      <g transform="translate(560 64) rotate(14) scale(0.28)">
        <path d={ESTRELLA} fill="#FF4500" />
      </g>
    </svg>
  )
}
function HojaVertical() {
  return (
    <svg viewBox="0 0 400 330" className="h-full w-full overflow-visible">
      <rect x="80" y="14" width="240" height="302" rx="14" fill="rgba(49,13,0,0.04)" stroke="rgba(49,13,0,0.25)" strokeWidth="1.5" strokeDasharray="6 6" />
      <ellipse cx="200" cy="165" rx="190" ry="82" fill="none" stroke="#FF4500" strokeWidth="4.5" strokeLinecap="round" transform="rotate(-18 200 165)" />
      <g transform="translate(340 82) rotate(14) scale(0.3)">
        <path d={ESTRELLA} fill="#FF4500" />
      </g>
    </svg>
  )
}

// Una página larga, de arriba a abajo, que termina en el botón de contacto.
function UnaPagina() {
  const bloque = (alto, fondo) => <span className="block rounded-md" style={{ height: alto, background: fondo }} />
  return (
    <>
      <div className="absolute left-[62px] top-[14px] flex w-[118px] rotate-[5deg] flex-col gap-1.5 rounded-2xl p-2.5 shadow-[inset_0_0_0_2px_rgba(241,238,228,0.7)]">
        {bloque(44, '#F1EEE4')}
        <span className="grid grid-cols-3 gap-[5px]">
          {bloque(26, 'rgba(241,238,228,0.3)')}
          {bloque(26, 'rgba(241,238,228,0.3)')}
          {bloque(26, 'rgba(241,238,228,0.3)')}
        </span>
        {bloque(20, 'rgba(241,238,228,0.18)')}
        {bloque(20, 'rgba(241,238,228,0.18)')}
        <span className="mx-auto mt-1 block h-4 w-[62px] rounded-full bg-mg-naranja" />
      </div>
      <div className="absolute left-[204px] top-[70px] flex flex-col items-center">
        <span className="block h-[90px] w-0.5" style={{ background: 'linear-gradient(180deg, rgba(241,238,228,0) 0%, #F1EEE4 100%)' }} />
        <svg viewBox="0 0 24 24" className="-mt-2.5 h-[22px] w-[22px]" fill="none" stroke="#F1EEE4" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 13l6 6 6-6" />
        </svg>
      </div>
    </>
  )
}

// Un resultado de Google.
function Google({ titulo = 'Tu negocio · Lo que hacés, en tu ciudad' }) {
  return (
    <div className="flex h-full w-full flex-col justify-center rounded-[18px] bg-white px-5 shadow-[0_18px_40px_-24px_rgba(49,13,0,0.5)]">
      <p className="text-xs text-mg-marron/60">tunegocio.com.ar</p>
      <p className="mt-1 whitespace-nowrap text-[17px] font-semibold text-mg-azul">{titulo}</p>
      <Barra ancho="92%" className="mt-2.5" />
      <Barra ancho="70%" className="mt-1.5" />
    </div>
  )
}

// Un celular con la página adentro.
function Celular() {
  return (
    <div className="absolute left-[22px] top-[14px] flex h-40 w-24 -rotate-6 flex-col gap-[7px] rounded-[22px] px-[11px] py-3.5 shadow-[inset_0_0_0_2px_rgba(241,238,228,0.7)]">
      <span className="mx-auto mb-1.5 block h-1 w-[34px] rounded bg-mg-crema/50" />
      <span className="block h-[22px] rounded-[5px] bg-mg-crema" />
      <span className="block h-[22px] w-[70%] rounded-[5px] bg-mg-crema" />
      <Barra ancho="80%" color="rgba(241,238,228,0.4)" className="mt-1" />
      <Barra ancho="60%" color="rgba(241,238,228,0.4)" />
      <span className="mt-auto block h-4 w-14 rounded-full bg-mg-naranja" />
    </div>
  )
}

// El dominio y el correo propios, con el alojamiento al lado.
function Dominio() {
  return (
    <div className="flex h-full w-full flex-col items-start justify-center gap-3">
      <span className="inline-flex items-center gap-2.5 rounded-full bg-mg-crema/[0.14] px-5 py-3 text-lg font-semibold shadow-[inset_0_0_0_1px_rgba(241,238,228,0.3)]">
        <Candado />
        tunegocio.com.ar
      </span>
      <span className="ml-8 inline-flex items-center gap-2.5 rounded-full bg-mg-crema px-5 py-3 text-base font-semibold text-mg-marron">
        <Mail />
        hola@tunegocio.com.ar
      </span>
      <span className="ml-3 inline-flex items-center gap-2.5 rounded-full bg-mg-amarillo px-5 py-3 text-base font-semibold text-mg-marron">
        <span className="block h-2.5 w-2.5 rounded-full bg-mg-marron" />
        Alojamiento incluido
      </span>
    </div>
  )
}

// Una consulta que llega desde la web.
function TeEscriben() {
  return (
    <div className="flex h-full w-full flex-col items-start justify-center gap-3">
      <span className="inline-flex items-center gap-2 rounded-full bg-mg-naranja px-3.5 py-2 text-[13px] font-semibold text-mg-marron">
        <WhatsApp />
        Nueva consulta desde tu web
      </span>
      <div className="rounded-[20px_20px_20px_6px] bg-white px-[18px] py-3.5 text-[15px] leading-[1.45] text-mg-marron shadow-[0_18px_40px_-24px_rgba(49,13,0,0.5)]">
        Hola, vi tu página y quiero hacer una consulta. ¿Tenés disponibilidad este&nbsp;mes?
      </div>
    </div>
  )
}

// Un chat corto (pregunta azul, respuesta naranja).
function Chat({ chat }) {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-2.5">
      <div className="self-end rounded-[20px_20px_6px_20px] bg-mg-azul px-[18px] py-3 text-[15px] text-mg-crema">{chat[0]}</div>
      <div className="max-w-[440px] self-start rounded-[20px_20px_20px_6px] bg-mg-naranja px-[18px] py-3 text-[15px] leading-[1.45] text-mg-marron">{chat[1]}</div>
    </div>
  )
}

// El panel de edición: menú, un campo, una foto y el botón de guardar.
function PanelAncho() {
  return (
    <div className="flex h-full w-full overflow-hidden rounded-[18px] bg-white shadow-[0_24px_50px_-28px_rgba(49,13,0,0.55)]">
      <div className="flex w-[26%] shrink-0 flex-col gap-3 bg-mg-marron px-3.5 py-[18px]">
        <span className="mb-1 flex items-center gap-1.5">
          <Estrella color="#FF4500" className="h-3.5 w-3.5" />
          <Barra ancho="50%" color="#F1EEE4" />
        </span>
        {['70%', '55%', '64%', '48%'].map((w) => (
          <Barra key={w} ancho={w} color="rgba(241,238,228,0.35)" />
        ))}
      </div>
      <div className="flex min-w-0 flex-1 gap-4 p-[18px]">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-mg-marron/50">Título de inicio</span>
          <span className="flex h-[38px] items-center overflow-hidden whitespace-nowrap rounded-[10px] px-3 text-sm text-mg-marron shadow-[inset_0_0_0_1.5px_#3130E3]">
            Tu negocio, en una&nbsp;frase
            <span className="ml-0.5 inline-block h-[18px] w-[1.5px] bg-mg-azul" />
          </span>
          <span className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-mg-marron/50">Texto</span>
          <Barra ancho="92%" />
          <Barra ancho="74%" />
          <span className="mt-auto inline-flex h-8 items-center self-start rounded-full bg-mg-naranja px-4 text-[13px] font-semibold text-mg-marron">Guardar</span>
        </div>
        <div
          className="flex w-[30%] shrink-0 items-end justify-center rounded-xl pb-3"
          style={{ background: 'repeating-linear-gradient(135deg, rgba(49,48,227,0.16) 0 10px, rgba(49,48,227,0.08) 10px 20px)' }}
        >
          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-mg-marron">Cambiar foto</span>
        </div>
      </div>
    </div>
  )
}
function PanelCompacto() {
  return (
    <div className="flex h-full w-full flex-col gap-2.5 rounded-[18px] bg-white p-[18px] shadow-[0_24px_50px_-28px_rgba(49,13,0,0.55)]">
      <span className="flex items-center gap-2 rounded-lg bg-mg-marron px-3 py-2">
        <Estrella color="#FF4500" className="h-3.5 w-3.5" />
        <Barra ancho="34%" color="#F1EEE4" />
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-mg-marron/50">Título de inicio</span>
      <span className="flex h-[38px] items-center overflow-hidden whitespace-nowrap rounded-[10px] px-3 text-sm text-mg-marron shadow-[inset_0_0_0_1.5px_#3130E3]">
        Tu negocio, en una&nbsp;frase
        <span className="ml-0.5 inline-block h-[18px] w-[1.5px] bg-mg-azul" />
      </span>
      <div className="flex min-h-0 flex-1 gap-3">
        <div className="flex flex-1 flex-col justify-between">
          <span className="flex flex-col gap-2">
            <Barra ancho="92%" />
            <Barra ancho="74%" />
          </span>
          <span className="inline-flex h-8 items-center self-start rounded-full bg-mg-naranja px-4 text-[13px] font-semibold text-mg-marron">Guardar</span>
        </div>
        <div
          className="flex w-[38%] shrink-0 items-end justify-center rounded-xl pb-2.5"
          style={{ background: 'repeating-linear-gradient(135deg, rgba(49,48,227,0.16) 0 10px, rgba(49,48,227,0.08) 10px 20px)' }}
        >
          <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-mg-marron">Cambiar foto</span>
        </div>
      </div>
    </div>
  )
}

// Varias páginas apiladas: un sitio completo.
function Paginas() {
  const hojas = [
    { nombre: 'Contacto', borde: 'rgba(241,238,228,0.25)', giro: 'translate(52px,-16px) rotate(8deg)' },
    { nombre: 'Servicios', borde: 'rgba(241,238,228,0.5)', giro: 'translate(26px,-8px) rotate(4deg)' },
    { nombre: 'Inicio', borde: '#F1EEE4', giro: 'none' },
  ]
  return (
    <div className="absolute left-[18px] top-[24px] h-[170px] w-[150px]">
      {hojas.map((h) => {
        const frente = h.nombre === 'Inicio'
        return (
          <div
            key={h.nombre}
            className="absolute inset-0 flex flex-col gap-[7px] rounded-2xl p-3"
            style={{
              transform: h.giro,
              background: frente ? '#F1EEE4' : '#3D3CEB',
              boxShadow: `inset 0 0 0 1.5px ${h.borde}, 0 20px 40px -20px rgba(10,8,90,0.7)`,
            }}
          >
            <span className={`text-xs font-semibold ${frente ? 'text-mg-marron' : 'text-mg-crema'}`}>{h.nombre}</span>
            {frente && (
              <>
                <span className="block h-10 rounded-[7px] bg-mg-azul" />
                <Barra ancho="80%" />
                <Barra ancho="60%" />
                <span className="mt-auto block h-3.5 w-[54px] rounded-full bg-mg-naranja" />
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

// El anillo de velocidad con la estrella en el centro.
function Velocidad() {
  const arco = 2 * Math.PI * 70
  return (
    <svg viewBox="0 0 180 180" className="h-full w-full">
      <circle cx="90" cy="90" r="70" fill="none" stroke="rgba(241,238,228,0.15)" strokeWidth="10" />
      <circle
        cx="90"
        cy="90"
        r="70"
        fill="none"
        stroke="#FF4500"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${(arco * 0.82).toFixed(1)} ${arco.toFixed(1)}`}
        transform="rotate(-90 90 90)"
      />
      <g transform="translate(90 90) scale(0.29) rotate(12)">
        <path d={ESTRELLA} fill="#FF4500" />
      </g>
    </svg>
  )
}

// La grilla de productos: en fila (apaisada) o en 2 × 2 (vertical).
const FONDOS_PRODUCTO = ['radial-gradient(60% 60% at 50% 40%, rgba(255,69,0,0.9) 0%, rgba(255,69,0,0.5) 100%)', '#3130E3', '#310D00', '#FFD307']
function Producto({ fondo, i }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-[7px] rounded-[14px] bg-white p-2 shadow-[0_18px_36px_-24px_rgba(49,13,0,0.5)]">
      <span className="flex h-[84px] items-center justify-center rounded-[9px]" style={{ background: fondo }}>
        <Estrella color={fondo === '#FFD307' ? '#310D00' : '#F1EEE4'} className="h-[28px] w-[28px]" style={{ transform: `rotate(${12 * i}deg)` }} />
      </span>
      <Barra ancho="80%" />
      <Barra ancho="50%" color="rgba(49,13,0,0.3)" />
      <span className="flex h-6 w-6 items-center justify-center self-end rounded-full bg-mg-naranja text-base font-semibold leading-none text-mg-marron">+</span>
    </div>
  )
}
function CatalogoFila() {
  return (
    <div className="flex h-full w-full items-center gap-4">
      {FONDOS_PRODUCTO.map((f, i) => (
        <Producto key={i} fondo={f} i={i} />
      ))}
    </div>
  )
}
function CatalogoGrilla() {
  return (
    <div className="grid h-full w-full grid-cols-2 content-center gap-4">
      {FONDOS_PRODUCTO.map((f, i) => (
        <div key={i} className="flex">
          <Producto fondo={f} i={i} />
        </div>
      ))}
    </div>
  )
}

// El resumen de compra con el botón de pagar.
function Pago() {
  const fila = (a, b) => (
    <span className="flex items-center justify-between gap-3">
      <Barra ancho={a} />
      <Barra ancho={b} />
    </span>
  )
  return (
    <div className="absolute left-[18px] top-[14px] flex w-[210px] -rotate-[4deg] flex-col gap-2.5 rounded-[20px] bg-mg-crema p-[18px] shadow-[0_30px_50px_-24px_rgba(10,8,90,0.8)]">
      <span className="text-xs font-semibold uppercase tracking-[0.08em] text-mg-marron/55">Tu compra</span>
      {fila('55%', '22%')}
      {fila('45%', '22%')}
      <span className="my-0.5 block h-px bg-mg-marron/15" />
      <span className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-mg-marron">Total</span>
        <Barra ancho="30%" color="#310D00" alto={8} />
      </span>
      <span className="mt-1 flex h-[38px] items-center justify-center gap-2 rounded-full bg-mg-naranja text-sm font-semibold text-mg-marron">
        <Candado />
        Pagar
      </span>
    </div>
  )
}

// La lista de pedidos con su estado.
function Ventas() {
  const estados = [
    ['Nuevo', 'bg-mg-naranja text-mg-marron'],
    ['En camino', 'bg-mg-azul text-mg-crema'],
    ['Entregado', 'bg-mg-marron text-mg-crema'],
  ]
  return (
    <div className="flex w-full flex-col gap-2">
      {estados.map(([t, c], i) => (
        <div key={t} className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 shadow-[0_14px_30px_-22px_rgba(49,13,0,0.5)]">
          <span className="text-[13px] font-semibold text-mg-marron/55">#{1042 - i}</span>
          <span className="flex min-w-0 flex-1 flex-col gap-[5px]">
            <Barra ancho="85%" />
            <Barra ancho="50%" color="rgba(49,13,0,0.08)" />
          </span>
          <span className={`shrink-0 rounded-full px-2.5 py-[5px] text-xs font-semibold ${c}`}>{t}</span>
        </div>
      ))}
    </div>
  )
}

// Dibujos que se estiran a todo el ancho de la tarjeta (arriba, con el texto abajo)
// en vez de escalarse: son filas de lista, se ven mejor ocupando el ancho.
export const FLUIDOS = new Set(['ventas'])

// Cada dibujo: composiciones { ancho, alto, Dibujo } en su tamaño de diseño.
export const VISUALES = {
  hoja: [
    { ancho: 640, alto: 230, Dibujo: HojaApaisada },
    { ancho: 400, alto: 330, Dibujo: HojaVertical },
  ],
  unaPagina: [{ ancho: 240, alto: 220, Dibujo: UnaPagina }],
  google: [{ ancho: 420, alto: 116, Dibujo: Google }],
  celular: [{ ancho: 150, alto: 190, Dibujo: Celular }],
  dominio: [{ ancho: 340, alto: 190, Dibujo: Dominio }],
  teEscriben: [{ ancho: 430, alto: 126, Dibujo: TeEscriben }],
  chat: [{ ancho: 480, alto: 140, Dibujo: Chat }],
  panel: [
    { ancho: 560, alto: 196, Dibujo: PanelAncho },
    { ancho: 380, alto: 262, Dibujo: PanelCompacto },
  ],
  paginas: [{ ancho: 250, alto: 205, Dibujo: Paginas }],
  velocidad: [{ ancho: 180, alto: 180, Dibujo: Velocidad }],
  catalogo: [
    { ancho: 640, alto: 170, Dibujo: CatalogoFila },
    { ancho: 380, alto: 340, Dibujo: CatalogoGrilla },
  ],
  pago: [{ ancho: 246, alto: 258, Dibujo: Pago }],
  ventas: [{ ancho: 440, alto: 160, Dibujo: Ventas }],
}
