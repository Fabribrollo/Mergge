// La flecha de la marca (la de los botones y links). Hereda el color y el
// tamaño del texto que la rodea. Calcada del ícono que pasó Fabrizio (64×64).
export default function Flecha({ className = '' }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`inline-block h-[1.15em] w-[1.15em] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      aria-hidden="true"
    >
      <path d="M12 32H52M31 12L52 32L31 52" />
    </svg>
  )
}
