// Los tres planes: un solo lugar para precios, plazos, lo que incluye cada uno
// y los textos de su página propia. Lo usan las tarjetas de la home
// (Planes.jsx), las páginas /landing-page, /sitio-autoadministrable y
// /tienda-online, y el schema. Si cambia un precio, se cambia acá.
// Las rutas terminan en / porque así las publica Astro (carpeta/index.html) y
// así figuran en el canonical y en el sitemap: un solo formato en todos lados.

const BASE = ['Diseño a medida', 'Adaptada a celulares', 'Visible en Google', 'Dominio y alojamiento', 'Correo con tu @dominio']

// "Pieles" de cada plan: el mismo degradé de la tarjeta se usa en la apertura
// de su página, así el plan se reconoce apenas entrás.
export const PIELES = {
  estatica: {
    fondo:
      'radial-gradient(70% 45% at 100% 0%, rgba(255,69,0,0.55) 0%, rgba(255,69,0,0) 70%), radial-gradient(60% 40% at 0% 100%, rgba(49,48,227,0.28) 0%, rgba(49,48,227,0) 70%), radial-gradient(50% 40% at 20% 20%, #FFFFFF 0%, rgba(255,255,255,0) 70%), #F1EEE4',
    // La misma piel, estirada para una sección entera (la apertura).
    fondoSeccion:
      'radial-gradient(55% 75% at 100% 0%, rgba(255,69,0,0.55) 0%, rgba(255,69,0,0) 70%), radial-gradient(50% 70% at 0% 100%, rgba(49,48,227,0.28) 0%, rgba(49,48,227,0) 70%), radial-gradient(40% 55% at 22% 18%, #FFFFFF 0%, rgba(255,255,255,0) 70%), #F1EEE4',
    tono: '241,238,228',
    claro: true,
    sombra: '0 30px 60px -30px rgba(49,13,0,0.5)',
    texto: 'text-mg-marron',
    suave: 'text-mg-marron/65',
    linea: 'bg-mg-marron/15',
    borde: 'border-mg-marron/15',
    estrella: '#3130E3',
    boton: 'marron',
  },
  profesional: {
    fondo:
      'radial-gradient(70% 40% at 100% 0%, rgba(255,69,0,0.85) 0%, rgba(255,69,0,0.3) 35%, rgba(255,69,0,0) 72%), radial-gradient(80% 45% at 0% 100%, rgba(49,48,227,0.8) 0%, rgba(49,48,227,0.25) 40%, rgba(49,48,227,0) 75%), conic-gradient(from 30deg at 55% 55%, #310D00, #451300, #250900, #310D00)',
    fondoSeccion:
      'radial-gradient(55% 60% at 100% 0%, rgba(255,69,0,0.85) 0%, rgba(255,69,0,0.3) 35%, rgba(255,69,0,0) 72%), radial-gradient(65% 70% at 0% 100%, rgba(49,48,227,0.8) 0%, rgba(49,48,227,0.25) 40%, rgba(49,48,227,0) 75%), conic-gradient(from 30deg at 55% 55%, #310D00, #451300, #250900, #310D00)',
    tono: '49,13,0',
    claro: false,
    sombra: '0 60px 110px -30px rgba(49,13,0,0.8)',
    texto: 'text-mg-crema',
    suave: 'text-mg-crema/70',
    linea: 'bg-mg-crema/15',
    borde: 'border-mg-crema/15',
    estrella: '#FF4500',
    boton: 'naranja',
  },
  'a-medida': {
    fondo:
      'radial-gradient(60% 40% at 100% 0%, rgba(255,69,0,0.75) 0%, rgba(255,69,0,0) 70%), radial-gradient(70% 50% at 0% 100%, #1C1A9A 0%, rgba(28,26,154,0) 72%), radial-gradient(45% 35% at 15% 10%, rgba(140,138,255,0.55) 0%, rgba(140,138,255,0) 70%), #3130E3',
    fondoSeccion:
      'radial-gradient(55% 55% at 100% 0%, rgba(255,69,0,0.75) 0%, rgba(255,69,0,0) 70%), radial-gradient(65% 70% at 0% 100%, #1C1A9A 0%, rgba(28,26,154,0) 72%), radial-gradient(40% 50% at 15% 10%, rgba(140,138,255,0.55) 0%, rgba(140,138,255,0) 70%), #3130E3',
    tono: '49,48,227',
    claro: false,
    sombra: '0 30px 60px -30px rgba(20,18,140,0.7)',
    texto: 'text-mg-crema',
    suave: 'text-mg-crema/70',
    linea: 'bg-mg-crema/15',
    borde: 'border-mg-crema/15',
    estrella: '#FF4500',
    boton: 'crema',
  },
}

// ── Los planes (tarjetas) ────────────────────────────────────────────────
export const PLANES = [
  {
    id: 'estatica',
    ruta: '/landing-page/',
    etiqueta: 'Landing Page',
    nombre: 'Estática',
    // Cómo se lo llama en la web cuando se habla del producto (no del plan).
    producto: 'Landing Page',
    verMas: 'Ver más',
    bajada: 'Una página, bien hecha, para presentarte y que te escriban.',
    antes: 'USD',
    precio: '400–550',
    precioMin: 400,
    precioMax: 550,
    tiempo: 'Entre 3 y 4 semanas',
    plazoCorto: '3 a 4 semanas',
    base: BASE,
    suma: [],
  },
  {
    id: 'profesional',
    ruta: '/sitio-autoadministrable/',
    etiqueta: 'Autoadministrable',
    nombre: 'Profesional',
    producto: 'Sitio autoadministrable',
    verMas: 'Ver más',
    bajada: 'Un sitio completo que actualizás vos, sin depender de nadie.',
    antes: 'USD',
    precio: '800–1.200',
    precioMin: 800,
    precioMax: 1200,
    tiempo: 'Entre 5 y 7 semanas',
    plazoCorto: '5 a 7 semanas',
    base: BASE,
    suma: ['Panel de edición', 'Mejor posición en Google'],
    destacado: true,
  },
  {
    id: 'a-medida',
    ruta: '/tienda-online/',
    etiqueta: 'Dinámica · ecommerce',
    nombre: 'A medida',
    producto: 'Tienda online',
    verMas: 'Ver más',
    bajada: 'Tu tienda o tu sistema, pensado y programado desde cero.',
    antes: 'A partir\nde USD',
    precio: '1.400',
    precioMin: 1400,
    tiempo: 'A partir de 8 semanas',
    plazoCorto: '8 semanas o más',
    base: [...BASE, 'Panel de edición', 'Mejor posición en Google'],
    suma: ['Catálogo de productos', 'Pagos online', 'Gestión de ventas'],
  },
].map((plan) => ({ ...plan, ...PIELES[plan.id] }))

export const planPorId = (id) => PLANES.find((p) => p.id === id)

// Lo que distingue a cada plan en las tarjetas de "¿Qué es…?".
export const RASGOS = {
  estatica: { nombre: 'Landing Page', frase: 'Una sola página para presentarte y que te escriban.', items: ['Una página', 'Los cambios los hacemos nosotros'] },
  profesional: { nombre: 'Autoadministrable', frase: 'Un sitio completo que actualizás vos.', items: ['Varias secciones', 'Panel de edición propio'] },
  'a-medida': { nombre: 'Tienda online', frase: 'Tu tienda para vender y cobrar online.', items: ['Catálogo, pagos y ventas', 'Panel de edición propio'] },
}

// ── El contenido de cada página ─────────────────────────────────────────
// Los textos llevan espacios duros ( ) antes de la última palabra de los
// párrafos para que no quede una palabra sola en la última línea.
const nb = (texto) => texto.replace(/ (\S+)$/, ' $1')

export const PAGINAS_PLAN = {
  estatica: {
    seo: {
      titulo: 'Landing Page a medida para tu negocio | Mergge Studio',
      descripcion:
        'Landing Page diseñada desde cero: rápida en el celular, visible en Google y lista en 3 a 4 semanas. Desde USD 400. Pedí tu presupuesto.',
    },
    apertura: {
      antetitulo: 'Landing Page a medida · plan Estática',
      titulo: [{ texto: 'Landing Page' }, { texto: 'a medida', contorno: true }],
      bajada: nb('Una página diseñada desde cero para que te encuentren y te escriban.'),
    },
    queEs: {
      titulo: [{ texto: '¿Qué es una' }, { texto: 'Landing Page?', contorno: true }],
      definicion: nb('Una sola página web con un objetivo claro: que quien entra entienda qué hacés y te escriba.'),
      fondo: 'marron',
    },
    incluye: {
      titulo: [{ texto: 'Qué incluye' }, { texto: 'tu Landing Page', contorno: true }],
      intro: nb('Todo lo que necesitás para estar en internet con una presencia seria, en una sola página bien pensada.'),
      yaIncluido: null,
      tarjetas: [
        { col: 3, piel: 'cremaAzul', visual: 'teEscriben', titulo: 'Pensada para que te escriban', texto: 'Cada sección lleva al mismo lugar: tu WhatsApp, tu mail o un formulario, lo que te quede más cómodo.' },
        { col: 3, piel: 'azul', visual: 'unaPagina', titulo: 'Todo en una página', texto: 'Quién sos, qué ofrecés y cómo contactarte, en un recorrido claro de principio a fin.' },
        { col: 3, piel: 'crema', visual: 'google', titulo: 'Visible en Google', texto: 'Títulos, descripciones y datos para buscadores cuidados desde el primer día.' },
        { col: 3, piel: 'marron', visual: 'celular', titulo: 'Adaptada a celulares', texto: 'La diseñamos primero para el teléfono, que es desde donde te van a ver.' },
        { col: 7, piel: 'crema', visual: 'hoja', titulo: 'Diseño a medida', texto: 'Pensada para tu marca y tu cliente. Nada de plantillas: arranca en una hoja en blanco.' },
        { col: 5, piel: 'azulNaranja', visual: 'dominio', titulo: 'Dominio, alojamiento y correo', texto: 'El primer año de dominio y alojamiento incluido, y un correo con tu @dominio.' },
      ],
    },
    paraVos: [
      'Querés presentar tu negocio, un servicio o un lanzamiento en un solo lugar.',
      'Lo más importante es que te encuentren y te escriban.',
      'No vas a cambiar el contenido muy seguido: los cambios los hacemos nosotros.',
    ],
    proceso: 'Las mismas seis fases que en cualquier proyecto, en 3 a 4 semanas. Pagás 50\u00A0% al empezar y 50\u00A0% al\u00A0entregar.',
    preguntas: [
      ['¿Qué es una Landing Page?', 'Una sola página que presenta tu negocio y lleva a quien entra a escribirte: quién sos, qué ofrecés y cómo contactarte, en un mismo recorrido.'],
      ['¿Cuánto cuesta una Landing Page?', 'De USD 400 a 550, según el alcance. Incluye dominio y alojamiento el primer año y un correo con tu dominio. Después de la charla te pasamos un presupuesto cerrado.'],
      ['¿Cuánto tarda?', 'Entre 3 y 4 semanas. La fecha exacta te la damos en la propuesta.'],
      ['¿Puedo cambiar cosas yo después?', 'En este plan los cambios los hacemos nosotros: nos escribís y lo vemos. Si querés editarla vos, el plan Profesional suma un panel de edición.'],
      ['¿Qué pasa después del primer año?', 'La web sigue siendo tuya. Desde el segundo año, el dominio y el alojamiento se renuevan aparte.'],
    ],
    cierre: '¿Arrancamos tu Landing Page?',
  },
  profesional: {
    seo: {
      titulo: 'Sitio web autoadministrable a medida | Mergge Studio',
      descripcion:
        'Sitio web a medida con panel de edición: cambiás textos y fotos vos, sin saber programar. De USD 800 a 1.200, en 5 a 7 semanas.',
    },
    apertura: {
      antetitulo: 'Sitio web autoadministrable · plan Profesional',
      titulo: [{ texto: 'Tu web' }, { texto: 'la editás vos', contorno: true }],
      bajada: nb('Un sitio a medida que actualizás vos, cuando quieras.'),
    },
    queEs: {
      titulo: [{ texto: '¿Qué es un sitio' }, { texto: 'autoadministrable?', contorno: true }],
      tituloLargo: true, // en celular va más chico para que entre la palabra larga
      definicion: nb('Una web de varias secciones que actualizás vos desde un panel de edición: cambiás textos y fotos sin saber programar y sin depender de nadie.'),
      fondo: 'crema',
    },
    incluye: {
      titulo: [{ texto: 'Qué incluye' }, { texto: 'tu sitio', contorno: true }],
      intro: nb('Todo lo que trae la Landing Page, más un panel para editarla vos y más trabajo para que te encuentren en Google.'),
      yaIncluido: BASE,
      tarjetas: [
        { col: 8, piel: 'crema', visual: 'panel', titulo: 'Panel de edición', texto: 'Cambiás textos y fotos desde un panel simple, sin tocar código y sin esperar a nadie.' },
        { col: 4, piel: 'azul', visual: 'paginas', titulo: 'Un sitio completo', texto: 'Las secciones que tu negocio necesita, cada una con su lugar y fáciles de recorrer.' },
        { col: 4, piel: 'crema', visual: 'google', titulo: 'Mejor posición en Google', texto: 'Más trabajo en títulos, textos y estructura para que Google entienda cada página.' },
        { col: 4, piel: 'marron', visual: 'velocidad', titulo: 'Rápida', texto: 'La medimos y la optimizamos antes de publicar, en celular y en compu.' },
        {
          col: 4,
          piel: 'cremaAzul',
          visual: 'chat',
          chat: ['¿Cómo cambio la foto de inicio?', 'Entrás al panel, tocás la foto y subís la nueva. Te lo mostramos todo al entregar.'],
          titulo: 'Te enseñamos a usarlo',
          texto: 'Al entregar te mostramos cómo funciona el panel y seguimos cerca para lo que necesites.',
        },
      ],
    },
    paraVos: [
      'Tenés varios servicios, productos o secciones para mostrar.',
      'Querés cambiar textos y fotos vos, cuando lo necesites.',
      'Querés trabajar más tu posición en Google.',
    ],
    proceso: 'Las mismas seis fases que en cualquier proyecto, en 5 a 7 semanas. Pagás 50\u00A0% al empezar y 50\u00A0% al\u00A0entregar.',
    preguntas: [
      ['¿Qué es un sitio autoadministrable?', 'Una web que podés actualizar vos desde un panel de edición: cambiás textos y fotos sin saber programar y sin depender de nadie.'],
      ['¿Cuánto cuesta?', 'De USD 800 a 1.200, según el alcance. Incluye dominio y alojamiento el primer año y un correo con tu dominio. Después de la charla te pasamos un presupuesto cerrado.'],
      ['¿Necesito saber programar?', 'No. El panel es simple y te enseñamos a usarlo cuando te entregamos la web.'],
      ['¿Cuánto tarda?', 'Entre 5 y 7 semanas. La fecha exacta te la damos en la propuesta.'],
      ['¿Qué diferencia hay con la Landing Page?', 'La Landing Page es una sola página y los cambios los hacemos nosotros. El sitio autoadministrable es más completo, suma el panel para editarlo vos y más trabajo para Google.'],
    ],
    cierre: '¿Armamos tu sitio?',
  },
  'a-medida': {
    seo: {
      titulo: 'Tienda online a medida para tu negocio | Mergge Studio',
      descripcion:
        'Tienda online diseñada y programada desde cero: catálogo, pagos online y gestión de ventas. Desde USD 1.400. Pedí tu presupuesto.',
    },
    apertura: {
      antetitulo: 'Tienda online a medida · plan A medida',
      titulo: [{ texto: 'Tienda online' }, { texto: 'a medida', contorno: true }],
      bajada: nb('Tu tienda diseñada y programada desde cero, lista para vender.'),
    },
    queEs: {
      titulo: [{ texto: '¿Qué es una' }, { texto: 'tienda online?', contorno: true }],
      definicion: nb('Una web donde tus clientes ven tus productos, los compran y los pagan, y vos gestionás cada venta desde un mismo lugar.'),
      fondo: 'marron',
    },
    incluye: {
      titulo: [{ texto: 'Qué incluye' }, { texto: 'tu tienda', contorno: true }],
      intro: nb('Todo lo que traen la Landing Page y el sitio autoadministrable, más lo que hace falta para vender: catálogo, pagos y pedidos.'),
      yaIncluido: [...BASE, 'Panel de edición', 'Mejor posición en Google'],
      tarjetas: [
        { col: 7, piel: 'azul', visual: 'pago', titulo: 'Pagos online', texto: 'Tus clientes compran y pagan desde la web, a cualquier hora.' },
        { col: 5, piel: 'marron', visual: 'velocidad', titulo: 'Rápida', texto: 'Una tienda lenta pierde ventas. La medimos y la optimizamos antes de publicar.' },
        { col: 5, piel: 'crema', visual: 'ventas', titulo: 'Gestión de ventas', texto: 'Ves cada pedido y en qué estado está, todo en un mismo lugar.' },
        { col: 7, piel: 'crema', visual: 'catalogo', titulo: 'Catálogo de productos', texto: 'Tus productos con fotos, precios y categorías, ordenados para que se encuentren fácil.' },
      ],
    },
    paraVos: [
      'Querés vender tus productos online y cobrar desde la web.',
      'Querés manejar tus pedidos en un solo lugar.',
      'Necesitás algo pensado para tu negocio, no una tienda genérica.',
    ],
    proceso: 'Las mismas seis fases que en cualquier proyecto, a partir de 8 semanas. Pagás 50\u00A0% al empezar y 50\u00A0% al\u00A0entregar.',
    preguntas: [
      ['¿Cuánto cuesta una tienda online?', 'Desde USD 1.400. El valor final depende del alcance: después de la charla te pasamos un presupuesto cerrado.'],
      ['¿Qué incluye?', 'Lo mismo que la Landing Page y el sitio autoadministrable (diseño a medida, adaptada a celulares, visible en Google, panel de edición, dominio, alojamiento y correo el primer año), más catálogo de productos, pagos online y gestión de ventas.'],
      ['¿Cuánto tarda?', 'A partir de 8 semanas. La fecha exacta te la damos en la propuesta.'],
      ['¿Puedo cargar mis productos yo?', 'Sí. La tienda incluye el panel de edición, así que productos, textos y fotos los manejás vos. Te enseñamos a usarlo.'],
      ['¿Es una plantilla de tienda?', 'No. Se diseña y se programa desde cero para tu negocio, tus productos y tus clientes.'],
    ],
    cierre: '¿Armamos tu tienda?',
  },
}
