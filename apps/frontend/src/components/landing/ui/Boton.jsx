import { motion } from 'motion/react'
import { dur } from './movimiento.js'

// Botón píldora. Variantes: 'naranja' (principal), 'contorno' (secundario sobre color),
// 'marron' (principal sobre naranja o crema).
const ESTILOS = {
  naranja: 'bg-mg-naranja text-mg-marron',
  contorno: 'bg-transparent text-mg-crema shadow-[inset_0_0_0_1.5px_rgba(241,238,228,0.6)]',
  marron: 'bg-mg-marron text-mg-crema',
}

export default function Boton({ href = '#', variante = 'naranja', className = '', children, ...resto }) {
  return (
    <motion.a
      href={href}
      className={`group inline-flex h-14 items-center justify-center gap-2.5 rounded-full px-8 text-base font-semibold ${ESTILOS[variante]} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: dur.rapida }}
      {...resto}
    >
      {children}
      <span className="text-lg leading-none transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
        →
      </span>
    </motion.a>
  )
}
