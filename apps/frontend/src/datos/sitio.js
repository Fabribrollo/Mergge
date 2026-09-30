// Datos de Mergge Studio que se repiten en varios lugares (footer, schema,
// preguntas frecuentes). Tenerlos en un solo archivo evita que una misma
// cosa quede escrita distinta en dos lados: para Google, que el nombre, el
// teléfono y la ciudad coincidan en todas partes suma confianza.

export const SITIO = {
  url: 'https://mergge.com.ar',
  nombre: 'Mergge Studio',
  nombreCorto: 'Mergge',
  descripcion:
    'Estudio de diseño y desarrollo web en Argentina. Páginas a medida para emprendedores y pymes de todo el país, con precios claros desde USD 400.',
  email: 'hola@mergge.com.ar',
  telefono: '+54 9 2235 90-9949', // como se muestra
  telefonoE164: '+5492235909949', // como lo leen las máquinas (sin espacios)
  whatsapp: 'https://wa.me/5492235909949',
  instagram: 'https://instagram.com/merggestudio',
  ciudad: 'Mar del Plata',
  provincia: 'Buenos Aires',
  pais: 'AR',
  imagenOg: '/og/mergge-og.jpg',
  equipo: [
    { nombre: 'Delfina Biondi', rol: 'Diseñadora', perfiles: ['https://www.linkedin.com/in/delfinabiondi', 'https://www.behance.net/delfinabiondi'] },
    { nombre: 'Fabrizio Brollo', rol: 'Desarrollador', perfiles: ['https://www.linkedin.com/in/fabrizio-brollo-03b964342'] },
  ],
}

// Preguntas frecuentes: las usa el chat de la landing y el schema FAQPage.
export const PREGUNTAS = [
  ['¿Cuánto cuesta una web?', 'Depende de lo que necesites. Después de la charla te pasamos un presupuesto cerrado, así sabés desde el principio cuánto vas a pagar.'],
  ['¿Cómo se paga?', '50 % al empezar y 50 % al entregar. El proceso arranca cuando recibimos el primer pago y la información que necesitamos para empezar.'],
  ['¿Cuánto tarda?', 'Entre 3 y 8 semanas, según lo que incluya tu web. La fecha exacta te la damos en la propuesta.'],
  ['¿Qué tengo que tener listo?', 'Saber qué hace tu negocio y a quién le vende. Si ya tenés logo, textos y fotos, mejor; si te falta algo, lo vemos juntos en la charla.'],
  ['¿Voy a poder cambiar cosas yo?', 'Sí, si lo necesitás. La armamos para que cambies textos y fotos desde un panel simple, y te enseñamos a usarlo.'],
  ['¿Trabajan con gente de otras ciudades?', 'Sí. Somos de Mar del Plata y trabajamos con gente de todo el país. Todo el proceso se hace a distancia.'],
  ['¿Usan plantillas?', 'No. Cada web se diseña y se programa desde cero para tu negocio, y la pensamos los dos juntos desde el primer boceto.'],
]
