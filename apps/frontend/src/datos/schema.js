import { PREGUNTAS, SITIO } from './sitio.js'
import { PLANES } from './planes.js'

// Datos estructurados (JSON-LD) de la home. Es la forma directa de decirles a
// Google, Bing y las IAs quiénes somos, dónde estamos, qué vendemos y a qué
// precio, sin que tengan que deducirlo del diseño.
// Validar en https://validator.schema.org después de cada cambio.

const id = (ancla) => `${SITIO.url}/#${ancla}`
const precio = (min, max) => ({
  '@type': 'PriceSpecification',
  priceCurrency: 'USD',
  minPrice: min,
  ...(max ? { maxPrice: max } : {}),
})

// Lo que dice cada oferta: las mismas palabras que las tarjetas de la home.
const PAGINA_DESCRIPCION = {
  estatica: 'Una página con diseño a medida, adaptada a celulares y visible en Google. Incluye dominio y alojamiento el primer año y un correo con tu dominio. Entre 3 y 4 semanas.',
  profesional: 'Todo lo del plan Estática, más panel de edición para actualizar la web y mejor posición en Google. Entre 5 y 7 semanas.',
  'a-medida': 'Todo lo del plan Profesional, más catálogo de productos, pagos online y gestión de ventas. A partir de 8 semanas.',
}

export function schemaHome() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': id('negocio'),
        name: SITIO.nombre,
        alternateName: SITIO.nombreCorto,
        url: `${SITIO.url}/`,
        logo: `${SITIO.url}/marca/favicon-512.png`,
        image: `${SITIO.url}${SITIO.imagenOg}`,
        description: SITIO.descripcion,
        telephone: SITIO.telefonoE164,
        email: SITIO.email,
        // La base es Mar del Plata (coincide con Google Business); trabajamos para todo el mundo.
        address: {
          '@type': 'PostalAddress',
          addressLocality: SITIO.ciudad,
          addressRegion: SITIO.provincia,
          addressCountry: SITIO.pais,
        },
        areaServed: { '@type': 'Place', name: 'Todo el mundo' },
        founder: SITIO.equipo.map((p) => ({ '@id': id(p.nombre.toLowerCase().replace(/\s+/g, '-')) })),
        sameAs: [SITIO.instagram, SITIO.linkedin],
        makesOffer: PLANES.map((p) => ({
          '@type': 'Offer',
          name: `${p.producto} (plan ${p.nombre})`,
          url: `${SITIO.url}${p.ruta}`,
          description: PAGINA_DESCRIPCION[p.id],
          priceSpecification: precio(p.precioMin, p.precioMax),
        })),
      },
      ...SITIO.equipo.map((p) => ({
        '@type': 'Person',
        '@id': id(p.nombre.toLowerCase().replace(/\s+/g, '-')),
        name: p.nombre,
        jobTitle: p.rol,
        worksFor: { '@id': id('negocio') },
        sameAs: p.perfiles,
      })),
      {
        '@type': 'WebSite',
        '@id': id('sitio'),
        url: `${SITIO.url}/`,
        name: SITIO.nombre,
        inLanguage: 'es-AR',
        publisher: { '@id': id('negocio') },
      },
      {
        '@type': 'FAQPage',
        '@id': id('preguntas'),
        isPartOf: { '@id': id('sitio') },
        mainEntity: PREGUNTAS.map(([pregunta, respuesta]) => ({
          '@type': 'Question',
          name: pregunta,
          acceptedAnswer: { '@type': 'Answer', text: respuesta },
        })),
      },
    ],
  }
}

// Datos estructurados de la página de un plan: el servicio con su precio, la
// miga de pan (Inicio › plan) y sus preguntas frecuentes.
export function schemaPlan(plan, pagina) {
  const url = `${SITIO.url}${plan.ruta}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#servicio`,
        name: plan.producto,
        serviceType: plan.producto,
        url,
        description: pagina.seo.descripcion,
        provider: { '@type': 'ProfessionalService', '@id': id('negocio'), name: SITIO.nombre, url: `${SITIO.url}/` },
        areaServed: { '@type': 'Place', name: 'Todo el mundo' },
        offers: {
          '@type': 'Offer',
          name: `${plan.producto} (plan ${plan.nombre})`,
          url,
          description: PAGINA_DESCRIPCION[plan.id],
          priceSpecification: precio(plan.precioMin, plan.precioMax),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITIO.url}/` },
          { '@type': 'ListItem', position: 2, name: plan.producto, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#preguntas`,
        mainEntity: pagina.preguntas.map(([pregunta, respuesta]) => ({
          '@type': 'Question',
          name: pregunta,
          acceptedAnswer: { '@type': 'Answer', text: respuesta },
        })),
      },
    ],
  }
}
