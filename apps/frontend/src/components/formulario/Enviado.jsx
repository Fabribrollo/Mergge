// Pantalla de confirmación, una vez que el backend confirmó que guardó el lead.
export default function Enviado({ onVolver }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-mg-crema font-texto text-mg-marron min-[860px]:flex-row">
      <div className="flex flex-none flex-col justify-between gap-8 bg-[linear-gradient(155deg,var(--color-mg-azul)_0%,#6021a8_48%,var(--color-mg-naranja)_100%)] px-8 py-9 text-mg-crema min-[860px]:w-[340px] min-[860px]:px-10 min-[860px]:py-12">
        <div>
          <div className="mb-7 flex items-center gap-2.5 text-sm font-semibold tracking-[0.22em] uppercase">
            <span>Mergge</span>
          </div>
          <h1 className="mb-4 font-titulo text-[clamp(34px,5vw,48px)] leading-[0.95] tracking-[0.01em] uppercase">
            Contanos
            <br />
            de tu
            <br />
            proyecto
          </h1>
          <p className="max-w-[300px] text-[15px] leading-[1.55] text-mg-crema/[0.82]">
            Ya está — gracias por tomarte los 3 minutos.
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 py-9 min-[860px]:px-18 min-[860px]:py-14">
        <div className="flex flex-1 flex-col items-start gap-5 pt-5">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(150deg,var(--color-mg-azul),var(--color-mg-naranja))]"
            aria-hidden="true"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#F1EEE4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12.5 9.5 18 20 6.5" />
            </svg>
          </div>
          <h3 className="font-titulo text-[clamp(32px,5vw,46px)] leading-[0.96] uppercase">Listo, gracias</h3>
          <p className="max-w-[480px] text-[17px] leading-[1.6] text-mg-marron-suave">
            Ya tenemos todo lo que necesitábamos. En menos de 24 horas te escribimos para coordinar la reunión, y
            vamos a llegar con las primeras ideas para tu proyecto.
          </p>
          <button
            type="button"
            className="flex min-h-12 cursor-pointer items-center gap-2.5 rounded-sm border-2 border-mg-marron px-6 text-[13px] font-semibold tracking-[0.08em] text-mg-marron uppercase"
            onClick={onVolver}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  )
}
