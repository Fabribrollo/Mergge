import { motion } from 'motion/react'
import { dur } from './movimiento.js'
import Flecha from './Flecha.jsx'

// Botón píldora. Variantes: 'naranja' (principal), 'contorno' (secundario sobre color),
// 'marron' (principal sobre naranja o crema), 'crema' (principal sobre azul) y
// 'contorno-marron' (secundario sobre crema).
const ESTILOS = {
  naranja: 'bg-mg-naranja text-mg-marron',
  contorno: 'bg-transparent text-mg-crema shadow-[inset_0_0_0_1.5px_rgba(241,238,228,0.6)]',
  marron: 'bg-mg-marron text-mg-crema',
  crema: 'bg-mg-crema text-mg-marron',
  'contorno-marron': 'bg-transparent text-mg-marron shadow-[inset_0_0_0_1.5px_rgba(49,13,0,0.55)]',
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
        <Flecha />
      </span>
    </motion.a>
  )
}
