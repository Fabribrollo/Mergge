// Datos de Mergge Studio que se repiten en varios lugares (footer, schema,
// preguntas frecuentes). Tenerlos en un solo archivo evita que una misma
// cosa quede escrita distinta en dos lados: para Google, que el nombre, el
// teléfono y la ciudad coincidan en todas partes suma confianza.

export const SITIO = {
  url: 'https://mergge.com.ar',
  nombre: 'Mergge Studio',
  nombreCorto: 'Mergge',
  descripcion:
    'Estudio de diseño y desarrollo web en Argentina. Páginas a medida para emprendedores y pymes de todo el mundo, con precios claros desde USD 400.',
  email: 'contacto@mergge.com.ar',
  telefono: '+54 9 2235 90-9949', // como se muestra
  telefonoE164: '+5492235909949', // como lo leen las máquinas (sin espacios)
  // El link de WhatsApp abre el chat con este mensaje ya escrito (el cliente lo puede cambiar antes de enviar).
  whatsapp: `https://wa.me/5492235909949?text=${encodeURIComponent('¡Hola, Mergge Studio! Quiero hacer una consulta sobre una página web.')}`,
  instagram: 'https://instagram.com/merggestudio',
  ciudad: 'Mar del Plata',
  provincia: 'Buenos Aires',
  pais: 'AR',
  imagenOg: '/og/mergge-og.jpg',
  equipo: [
    { nombre: 'Delfina Biondi', rol: 'Lic. en Diseño Gráfico y UX/UI Designer', perfiles: ['https://www.linkedin.com/in/delfinabiondi', 'https://www.behance.net/delfinabiondi'] },
    { nombre: 'Fabrizio Brollo', rol: 'Desarrollador Web Full Stack', perfiles: ['https://www.linkedin.com/in/fabrizio-brollo-03b964342'] },
  ],
}

// Preguntas frecuentes: las usa el chat de la landing y el schema FAQPage.
// Cada respuesta tiene que entenderse sola (sin leer la pregunta anterior):
// así la pueden citar Google y las IAs.
export const PREGUNTAS = [
  ['¿Cuánto cuesta una web?', 'Tenemos tres planes: una landing page de USD 400 a 550, un sitio autoadministrable de USD 800 a 1.200 y una web a medida o tienda online desde USD 1.400. El valor final depende del alcance: después de la primera charla te pasamos un presupuesto cerrado, así sabés desde el principio cuánto vas a pagar.'],
  ['¿Qué incluye el precio?', 'Todos los planes incluyen diseño a medida, desarrollo, versión para celulares, configuración para aparecer en Google, dominio y alojamiento durante el primer año y un correo con tu dominio (por ejemplo, hola@tunegocio.com.ar). Según el plan se suman un panel para editar la web, catálogo de productos, pagos online y gestión de ventas.'],
  ['¿Cómo se paga?', '50 % al empezar y 50 % al entregar. El proceso arranca cuando recibimos el primer pago y la información que necesitamos para empezar.'],
  ['¿Cuánto tarda?', 'Una landing page lleva entre 3 y 4 semanas, un sitio autoadministrable entre 5 y 7, y una web a medida o tienda online desde 8 semanas. La fecha exacta te la damos en la propuesta.'],
  ['¿Qué tengo que tener listo?', 'Saber qué hace tu negocio y a quién le vende. Si ya tenés logo, textos y fotos, mejor; si te falta algo, lo vemos juntos en la charla.'],
  ['¿Voy a poder cambiar cosas yo?', 'Sí, con los planes Profesional y A medida: incluyen un panel simple para cambiar textos y fotos, y te enseñamos a usarlo. En la landing page (plan Estática) los cambios los hacemos nosotros.'],
  ['¿Trabajan con gente de otras ciudades o países?', 'Sí. Trabajamos desde Mar del Plata para todo el mundo. Todo el proceso se hace a distancia.'],
  ['¿Usan plantillas?', 'No. Cada web se diseña y se programa desde cero para tu negocio, y la pensamos los dos juntos desde el primer boceto.'],
]
