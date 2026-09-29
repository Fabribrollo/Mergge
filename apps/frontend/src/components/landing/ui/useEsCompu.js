import { useEffect, useState } from 'react'

// true en pantallas de compu con mouse. Se usa para prender efectos que en
// celular no suman (parallax, hovers). Arranca en false para que el HTML del
// servidor y el primer render del cliente coincidan.
export default function useEsCompu() {
  const [esCompu, setEsCompu] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px) and (pointer: fine)')
    const actualizar = () => setEsCompu(mq.matches)
    actualizar()
    mq.addEventListener('change', actualizar)
    return () => mq.removeEventListener('change', actualizar)
  }, [])
  return esCompu
}
