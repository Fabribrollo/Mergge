import { PREGUNTAS, SITIO } from './sitio.js'

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
        // La base es Mar del Plata (coincide con Google Business); atendemos a todo el país.
        address: {
          '@type': 'PostalAddress',
          addressLocality: SITIO.ciudad,
          addressRegion: SITIO.provincia,
          addressCountry: SITIO.pais,
        },
        areaServed: { '@type': 'Country', name: 'Argentina' },
        founder: SITIO.equipo.map((p) => ({ '@id': id(p.nombre.toLowerCase().replace(/\s+/g, '-')) })),
        sameAs: [SITIO.instagram],
        makesOffer: [
          { '@type': 'Offer', name: 'Landing page (plan Estática)', priceSpecification: precio(400, 550) },
          { '@type': 'Offer', name: 'Sitio autoadministrable (plan Profesional)', priceSpecification: precio(800, 1200) },
          { '@type': 'Offer', name: 'Web a medida o tienda online (plan A medida)', priceSpecification: precio(1400) },
        ],
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
