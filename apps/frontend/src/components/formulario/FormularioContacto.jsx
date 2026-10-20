import { useEffect, useRef, useState } from 'react'
import { leadSchema } from 'shared'
import { PASOS, REQUERIDOS_POR_PASO, ESTADO_INICIAL } from './pasos.js'
import Banda from './Banda.jsx'
import Cabecera from './Cabecera.jsx'
import Campo from './Campo.jsx'
import Enviado from './Enviado.jsx'
import Estrella from '../landing/ui/Estrella.jsx'
import Navegacion from './Navegacion.jsx'
import Portada from './Portada.jsx'
import Titulo from './Titulo.jsx'

const TOTAL_PASOS = PASOS.length

export default function FormularioContacto() {
  const [paso, setPaso] = useState(0) // 0 = apertura, 1..5 = capítulos, 6 = enviado
  const [datos, setDatos] = useState(ESTADO_INICIAL)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const [erroresCampo, setErroresCampo] = useState({})
  const turnstileRef = useRef(null)
  const widgetIdRef = useRef(null)

  function actualizar(nombreCampo, valor) {
    setDatos((prev) => ({ ...prev, [nombreCampo]: valor }))
    // en cuanto corrige un campo, le sacamos el error de encima —
    // no lo hacemos esperar hasta el próximo "Seguir"
    if (erroresCampo[nombreCampo]) {
      setErroresCampo((prev) => {
        const copia = { ...prev }
        delete copia[nombreCampo]
        return copia
      })
    }
  }

  // Valida un paso en dos niveles: (1) que los campos obligatorios de ESE
  // paso (según el diseño, en REQUERIDOS_POR_PASO) no estén vacíos, y (2)
  // que los que ya tienen una regla de formato en `leadSchema` (hoy: email
  // y whatsapp) la cumplan. Así el error de "el email está mal escrito" se
  // ve al toque, en el paso 1, y no recién al final del formulario.
  function validarPaso(numeroPaso) {
    const requeridos = REQUERIDOS_POR_PASO[numeroPaso] || []
    const erroresNuevos = {}

    requeridos.forEach((campo) => {
      const v = datos[campo]
      const vacio = typeof v === 'string' ? v.trim().length === 0 : v == null
      if (vacio) erroresNuevos[campo] = 'Este dato es obligatorio'
    })

    const camposConValorParaChequearFormato = requeridos.filter(
      (campo) => !erroresNuevos[campo] && String(datos[campo] ?? '').length > 0
    )

    if (camposConValorParaChequearFormato.length > 0) {
      const forma = Object.fromEntries(camposConValorParaChequearFormato.map((c) => [c, true]))
      const parcial = leadSchema.pick(forma).safeParse(datos)
      if (!parcial.success) {
        parcial.error.issues.forEach((issue) => {
          const campo = issue.path[0]
          if (!erroresNuevos[campo]) erroresNuevos[campo] = issue.message
        })
      }
    }

    setErroresCampo(erroresNuevos)
    return Object.keys(erroresNuevos).length === 0
  }

  function empezar() {
    setError('')
    setPaso(1)
  }

  function siguiente() {
    if (!validarPaso(paso)) {
      setError('Revisá los campos marcados antes de seguir.')
      return
    }
    setError('')
    setPaso((p) => Math.min(TOTAL_PASOS, p + 1))
  }

  function anterior() {
    setError('')
    setPaso((p) => Math.max(1, p - 1))
  }

  // Cada pantalla es una página nueva: arrancamos siempre desde arriba.
  const primeraVez = useRef(true)
  useEffect(() => {
    if (primeraVez.current) {
      primeraVez.current = false
      return
    }
    window.scrollTo(0, 0)
  }, [paso])

  // Medición (Umami): hasta qué paso llega cada persona y si lo envía.
  // Así vemos en qué paso abandonan. Nunca mandamos lo que escribieron, solo el número de paso.
  const pasoMaximo = useRef(0)
  useEffect(() => {
    if (paso <= pasoMaximo.current) return
    pasoMaximo.current = paso
    if (paso <= TOTAL_PASOS) window.umami?.track('formulario-paso', { paso: String(paso) })
    else window.umami?.track('formulario-enviado')
  }, [paso])

  // Renderiza el widget de Turnstile cuando se llega al último paso. El script
  // de Cloudflare se carga async desde form.astro, así que puede no estar
  // listo todavía cuando este efecto corre por primera vez — por eso reintenta.
  useEffect(() => {
    if (paso !== TOTAL_PASOS) return

    let cancelado = false

    function intentarRenderizar() {
      if (cancelado) return
      if (!window.turnstile) {
        setTimeout(intentarRenderizar, 150)
        return
      }
      if (widgetIdRef.current !== null) return

      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY,
        theme: 'dark',
        callback: (token) => actualizar('token', token),
        'expired-callback': () => actualizar('token', ''),
        'error-callback': () => actualizar('token', ''),
      })
    }

    intentarRenderizar()

    return () => {
      cancelado = true
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paso])

  async function enviar() {
    setError('')

    if (!datos.token) {
      setError('Esperá un segundo a que se termine de verificar el captcha.')
      return
    }

    const parsed = leadSchema.safeParse(datos)
    if (!parsed.success) {
      const camposConError = parsed.error.issues.map((issue) => issue.path[0])
      const hayErrorEnPaso1 = camposConError.some((c) => REQUERIDOS_POR_PASO[1]?.includes(c))
      setError(
        hayErrorEnPaso1
          ? 'Hay un dato mal cargado en el capítulo 1 (nombre, empresa, rubro, email o WhatsApp) — volvé y revisalo.'
          : 'Revisá que hayas completado bien los datos antes de enviar.'
      )
      return
    }

    setEnviando(true)
    try {
      const resp = await fetch(`${import.meta.env.PUBLIC_API_URL}/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })
      const json = await resp.json().catch(() => null)

      if (!resp.ok || !json?.success) {
        setError(json?.error || 'No pudimos enviar el formulario. Probá de nuevo en un momento.')
        setEnviando(false)
        return
      }

      setPaso(TOTAL_PASOS + 1)
    } catch {
      setError('No pudimos conectar con el servidor. Revisá tu conexión e intentá de nuevo.')
      setEnviando(false)
    }
  }

  function volverAlInicio() {
    setDatos(ESTADO_INICIAL)
    widgetIdRef.current = null
    setEnviando(false)
    setErroresCampo({})
    setError('')
    pasoMaximo.current = 0
    setPaso(0)
  }

  const esUltimoPaso = paso === TOTAL_PASOS
  const pasoActual = PASOS[paso - 1]

  // Lo que muestra el avance de arriba según la pantalla.
  const cabecera =
    paso === 0
      ? { hechos: 0, actual: -1, texto: 'Tarda 3 minutos' }
      : paso > TOTAL_PASOS
        ? { hechos: TOTAL_PASOS, actual: -1, texto: 'Enviado', sub: 'Cinco de cinco' }
        : { hechos: paso - 1, actual: paso - 1, texto: `Capítulo ${paso} de ${TOTAL_PASOS}`, sub: pasoActual.tituloCorto }

  function renderCampo(campo) {
    return (
      <Campo key={campo.name} campo={campo} valor={datos[campo.name]} onChange={actualizar} error={erroresCampo[campo.name]} />
    )
  }

  let pantalla
  if (paso === 0) {
    pantalla = <Portada onEmpezar={empezar} />
  } else if (paso > TOTAL_PASOS) {
    pantalla = <Enviado onVolver={volverAlInicio} />
  } else {
    pantalla = (
      <Banda tono="marron" estrella="cap">
        <div className="fm-wrap">
          <div className="fm-cuerpo">
            <div className="fm-tit-col">
              <Titulo lineas={pasoActual.lineas} />
              <p className="fm-lead">{pasoActual.subtitulo}</p>
            </div>

            <div className="fm-campos">
              {pasoActual.campos.map((campo, i) =>
                Array.isArray(campo) ? (
                  <div className="fm-fila2" key={`fila-${i}`}>
                    {campo.map(renderCampo)}
                  </div>
                ) : (
                  renderCampo(campo)
                )
              )}

              {/* Honeypot: invisible para una persona, tentador para un bot. Si viene
                  con algo cargado, el backend descarta el envío sin decir nada. */}
              <input
                type="text"
                name="website"
                className="fm-trampa"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={datos.website}
                onChange={(e) => actualizar('website', e.target.value)}
              />

              {esUltimoPaso && (
                <div className="fm-verif">
                  <div ref={turnstileRef} />
                  <p className="fm-legal">
                    Al enviar aceptás nuestra{' '}
                    <a href="/privacidad" target="_blank" rel="noopener noreferrer">
                      política de privacidad
                    </a>
                    .
                  </p>
                </div>
              )}

              {error && (
                <div className="fm-error" role="alert">
                  <Estrella color="#FF4500" style={{ width: 14, height: 14, flex: 'none' }} />
                  <span>{error}</span>
                </div>
              )}

              <Navegacion
                texto={esUltimoPaso ? (enviando ? 'Enviando…' : 'Enviar') : 'Seguir'}
                onSiguiente={esUltimoPaso ? enviar : siguiente}
                onAtras={paso > 1 ? anterior : undefined}
                deshabilitado={esUltimoPaso && (enviando || !datos.token)}
              />

              {esUltimoPaso && <div className="fm-cont">Lo que nos cuentes queda entre nosotros.</div>}
            </div>
          </div>
        </div>
      </Banda>
    )
  }

  return (
    <div className="fm">
      <Cabecera {...cabecera} />
      {/* key: cada pantalla arranca de cero (animaciones y widget de Turnstile) */}
      <div key={paso}>{pantalla}</div>
      <div className="fm-grano" aria-hidden="true" />
    </div>
  )
}
