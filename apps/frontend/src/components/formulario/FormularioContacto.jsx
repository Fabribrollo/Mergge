import { useEffect, useRef, useState } from 'react'
import { leadSchema } from 'shared'
import { PASOS, REQUERIDOS_POR_PASO, ESTADO_INICIAL } from './pasos.js'
import Campo from './Campo.jsx'
import Enviado from './Enviado.jsx'

const TOTAL_PASOS = PASOS.length

export default function FormularioContacto() {
  const [paso, setPaso] = useState(1) // 1..5, y 6 = enviado
  const [datos, setDatos] = useState(ESTADO_INICIAL)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const [erroresCampo, setErroresCampo] = useState({})
  const turnstileRef = useRef(null)
  const widgetIdRef = useRef(null)

  function actualizar(nombreCampo, valor) {
    setDatos((prev) => ({ ...prev, [nombreCampo]: valor }))
    // en cuanto corrige un campo, le sacamos el error de encima —
    // no lo hacemos esperar hasta el próximo "Siguiente"
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

  // Renderiza el widget de Turnstile cuando se llega al último paso. El script
  // de Cloudflare se carga async desde contacto.astro, así que puede no estar
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
          ? 'Hay un dato mal cargado en el paso 1 (nombre, empresa, rubro, email o WhatsApp) — volvé y revisalo.'
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

  if (paso === TOTAL_PASOS + 1) {
    return (
      <Enviado
        onVolver={() => {
          setDatos(ESTADO_INICIAL)
          widgetIdRef.current = null
          setEnviando(false)
          setPaso(1)
        }}
      />
    )
  }

  const pasoActual = PASOS[paso - 1]
  const esUltimoPaso = paso === TOTAL_PASOS
  const porcentaje = Math.min(100, paso * (100 / TOTAL_PASOS))

  return (
    <div className="flex min-h-screen w-full flex-col bg-mg-crema font-texto text-mg-marron min-[860px]:flex-row">
      <div className="flex flex-none flex-col justify-between gap-8 bg-[linear-gradient(155deg,var(--color-mg-azul)_0%,#6021a8_48%,var(--color-mg-naranja)_100%)] px-8 py-9 text-mg-crema min-[860px]:w-[400px] min-[860px]:px-10 min-[860px]:py-12">
        <div>
          <div className="mb-7 flex items-center text-sm font-semibold tracking-[0.22em] uppercase">
            <img src="/icons/estrella.svg" alt="Estrella" className="mr-2 inline-block h-4 w-4" />
            Mergge
          </div>
          <h1 className="mt-16 mb-8 font-titulo text-[clamp(34px,5vw,3.5rem)] leading-[0.95] tracking-[0.01em] uppercase">
            Contanos
            <br />
            de tu
            <br />
            proyecto
          </h1>
          <p className="max-w-[300px] text-[15px] leading-[1.55] text-mg-crema/[0.82]">
            Antes de charlar queremos entender qué necesitás, así llegamos a la reunión con ideas concretas y no te
            hacemos repetir todo.
          </p>
          <div className="mt-6 flex items-center text-[13px] font-medium  text-mg-crema/75">
            <img src="/icons/tiempo.svg" alt="Tiempo" className="mr-2 inline-block h-4 w-4" />
            Tarda 3 minutos
          </div>

        </div>

        <div>
          <div className="mb-6.5 flex flex-col gap-0.5">
            {PASOS.map((p, i) => {
              const numero = i + 1
              const activo = numero === paso
              const hecho = numero < paso
              return (
                <div
                  className="flex items-center gap-3 py-1.5"
                  key={p.titulo}
                  style={{ opacity: activo ? 1 : hecho ? 0.72 : 0.42,
                  }}
                >
                  <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 border-mg-crema text-[11px] font-semibold"
                  style={{
                    backgroundColor: activo || hecho ? 'var(--color-mg-crema)' : 'transparent',
                    color: activo || hecho ? 'var(--color-mg-azul)' : 'var(--color-mg-crema)',
                  }}
                  >

                    {numero}
                  </span>
                  <span className="text-[13px] font-medium">{p.tituloCorto}</span>
                </div>
              )
            })}
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-mg-crema/25">
            <div
              className="h-full bg-mg-crema transition-[width] duration-250 ease-out"
              style={{ width: `${porcentaje}%` }}
            />
          </div>
          <div className="mt-2.5 text-xs font-medium tracking-[0.12em] text-mg-crema/75 uppercase">
            Paso {paso} de {TOTAL_PASOS}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 py-9 min-[860px]:px-18 min-[860px]:py-14">
        <div className="mb-1.5 flex items-baseline gap-3.5">
          <span className="font-titulo text-[44px] leading-[0.8] text-mg-naranja">
            {String(paso).padStart(2, '0')}
          </span>
          <h2 className="font-titulo text-[clamp(24px,4vw,32px)] leading-none tracking-[0.01em] uppercase">
            {pasoActual.titulo}
          </h2>
        </div>
        <div className="mb-7.5 h-[3px] bg-mg-marron" />

        <div className="flex flex-1 flex-col gap-6">
          {pasoActual.campos.map((campo, i) =>
            Array.isArray(campo) ? (
              <div className="grid gap-4 sm:grid-cols-2" key={`fila-${i}`}>
                {campo.map((c) => (
                  <Campo
                    key={c.name}
                    campo={c}
                    valor={datos[c.name]}
                    onChange={actualizar}
                    error={erroresCampo[c.name]}
                  />
                ))}
              </div>
            ) : (
              <Campo
                key={campo.name}
                campo={campo}
                valor={datos[campo.name]}
                onChange={actualizar}
                error={erroresCampo[campo.name]}
              />
            )
          )}

          {esUltimoPaso && (
            <div className="flex flex-col gap-2">
              <div ref={turnstileRef} />
            </div>
          )}

          {/* Honeypot: invisible para una persona, tentador para un bot. Si viene
              con algo cargado, el backend descarta el envío sin decir nada. */}
          <input
            type="text"
            name="website"
            className="absolute -left-[9999px] h-px w-px overflow-hidden"
            tabIndex={-1}
            autoComplete="off"
            value={datos.website}
            onChange={(e) => actualizar('website', e.target.value)}
          />

          {error && (
            <div className="rounded-sm border-2 border-mg-naranja bg-mg-naranja-fondo px-4 py-3 text-sm font-medium text-mg-naranja-texto">
              {error}
            </div>
          )}
        </div>

        <div className="mt-7.5 flex items-center justify-between gap-4 border-t-2 border-mg-linea pt-5.5">
          <div className="hidden items-center gap-2 text-[13px] text-mg-marron-tenue sm:flex">
            <span>Lo que nos cuentes queda entre nosotros</span>
          </div>
          <div className="ml-auto flex gap-2.5">
            <button
              type="button"
              className="flex min-h-12 cursor-pointer items-center gap-2.5 rounded-sm border-2 border-mg-marron px-6 text-[13px] font-semibold tracking-[0.08em] text-mg-marron uppercase disabled:cursor-default disabled:opacity-35"
              onClick={anterior}
              disabled={paso === 1}
            >
              Atrás
            </button>
            {esUltimoPaso ? (
              <button
                type="button"
                className="flex min-h-12 cursor-pointer items-center gap-2.5 rounded-sm bg-mg-naranja px-6 text-[13px] font-semibold tracking-[0.08em] text-mg-crema uppercase disabled:cursor-default disabled:opacity-60"
                onClick={enviar}
                disabled={enviando || !datos.token}
              >
                {enviando ? 'Enviando…' : 'Enviar'}
              </button>
            ) : (
              <button
                type="button"
                className="flex min-h-12 cursor-pointer items-center gap-2.5 rounded-sm bg-mg-naranja px-6 text-[13px] font-semibold tracking-[0.08em] text-mg-crema uppercase"
                onClick={siguiente}
              >
                Siguiente
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
