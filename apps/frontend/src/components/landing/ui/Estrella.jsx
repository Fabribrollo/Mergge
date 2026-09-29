// La estrella de 6 puntas de Mergge. Un solo path para toda la web:
// rellena (color), en contorno (trazo) o chiquita como viñeta.

export const ESTRELLA_PATH =
  'M 0.00 -100.00 Q 6.75 -56.69 15.00 -25.98 Q 45.72 -34.19 86.60 -50.00 Q 52.47 -22.50 30.00 0.00 Q 52.47 22.50 86.60 50.00 Q 45.72 34.19 15.00 25.98 Q 6.75 56.69 0.00 100.00 Q -6.75 56.69 -15.00 25.98 Q -45.72 34.19 -86.60 50.00 Q -52.47 22.50 -30.00 0.00 Q -52.47 -22.50 -86.60 -50.00 Q -45.72 -34.19 -15.00 -25.98 Q -6.75 -56.69 0.00 -100.00 Z'

export default function Estrella({ color = '#FF4500', contorno = false, grosor = 1.6, className = '', style }) {
  return (
    <svg viewBox="-104 -104 208 208" className={className} style={style} aria-hidden="true">
      <path
        d={ESTRELLA_PATH}
        fill={contorno ? 'none' : color}
        stroke={contorno ? color : 'none'}
        strokeWidth={contorno ? grosor : 0}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
