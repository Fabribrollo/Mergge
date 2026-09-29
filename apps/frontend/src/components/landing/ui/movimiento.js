// Tokens de movimiento — los mismos de la guía de animaciones.
// Si algo "se siente" lento o rápido en toda la web, se ajusta acá.

export const ease = {
  marca: [0.22, 1, 0.36, 1], // sale rápido y frena suave: la curva principal
  entrada: [0.65, 0, 0.35, 1], // ida y vuelta, para cortinas y recortes
}

export const dur = {
  rapida: 0.2,
  media: 0.45,
  lenta: 0.9,
  dibujo: 1.4,
}

export const resorte = { type: 'spring', stiffness: 260, damping: 22 }

export const stagger = {
  lineas: 0.08,
  items: 0.06,
}

// Cuánto sube un elemento al aparecer. En celular, menos.
export const subida = 24

// Disparo de los revelados: empieza apenas el elemento asoma,
// así nadie llega a un hueco vacío.
export const alAparecer = { once: true, amount: 0.2, margin: '0px 0px -10% 0px' }

// La pantalla de carga avisa cuándo terminó. La apertura espera ese aviso
// para arrancar su secuencia. Si no hubo pantalla de carga, arranca ya.
export function alListo(callback) {
  if (typeof window === 'undefined') return () => {}
  if (window.__merggeListo) {
    callback()
    return () => {}
  }
  window.addEventListener('mergge:listo', callback, { once: true })
  return () => window.removeEventListener('mergge:listo', callback)
}
