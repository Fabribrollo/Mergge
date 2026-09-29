# Guía de animaciones — Web de Mergge

> Para implementar con **Motion** (versión vanilla: `animate`, `inView`, `scroll`, `stagger`, `hover`, `press`), en el sitio en Astro. El diseño de referencia es el tablero «Landing completa» del canvas (y «Landing mobile 390» para celular).

---

## 1. Principios

1. **El movimiento cuenta la idea de la marca: dos cosas que se juntan.** Diseño y desarrollo, naranja y azul, la órbita y la estrella. Siempre que se pueda, la animación muestra encuentro o giro, no solo «aparecer».
2. **Pocas animaciones y bien hechas.** Cada sección tiene un solo momento protagonista; lo demás acompaña y no compite.
3. **Nunca hacer esperar para leer.** Los textos largos aparecen rápido o ya están. Nada bloquea el scroll ni el clic.
4. **Se animan solo `transform` y `opacity`** (y `pathLength` / `stroke-dashoffset` en SVG). Nunca `top`, `left`, `width` ni `height`, que traban.
5. **La página aparece mientras scrolleás.** Todo entra al llegar a la pantalla, una sola vez (ver 4b). Solo los efectos ligados al scroll responden en ambas direcciones.

## 2. Tokens

| Token | Valor | Uso |
|---|---|---|
| `dur.rapida` | 0,2 s | hover, cambios de estado |
| `dur.media` | 0,45 s | entradas de textos y botones |
| `dur.lenta` | 0,9 s | títulos grandes, órbitas, estrella |
| `dur.dibujo` | 1,4 s | trazar órbitas y contornos |
| `ease.marca` | `[0.22, 1, 0.36, 1]` | curva principal (sale rápido y frena suave) |
| `ease.entrada` | `[0.65, 0, 0.35, 1]` | movimientos de ida y vuelta |
| `resorte` | `{ type: "spring", stiffness: 260, damping: 22 }` | estrellas y detalles con rebote leve |
| `stagger.lineas` | 0,08 s | entre líneas de un título |
| `stagger.items` | 0,06 s | entre tarjetas, píldoras y botones |
| `subida` | 24 px (desktop) / 16 px (mobile) | cuánto sube un elemento al entrar |

**Entrada estándar (la que usa casi todo):** `opacity 0 → 1` + `y: subida → 0`, con `dur.media` y `ease.marca`.

## 3. Pantalla de carga (tomada de la referencia que te gustó)

Solo en la primera visita de la sesión (`sessionStorage`), con una duración máxima de ~1,8 s.

1. Pantalla completa **crema** (`#F1EEE4`) con el **isotipo** en el centro (120 px, `iso.png` del kit).
2. El isotipo aparece: `opacity 0 → 1` y `scale 0.86 → 1`, 0,5 s, ease `[0.16, 1, 0.3, 1]`.
3. Pausa de 0,25 s. El isotipo se va: `opacity → 0`, `scale → 0.94`, 0,3 s.
4. **La cortina crema sube** y descubre el azul de la apertura: `clipPath: inset(0 0 0% 0) → inset(0 0 100% 0)`, 0,75 s, ease `[0.76, 0, 0.24, 1]`.
5. Recién ahí arranca la secuencia de la apertura (sección 5). Se saca el preloader del DOM.

Si la página tarda en cargar, el isotipo queda visible hasta el evento `load`. Con «reducir movimiento», no hay preloader.

## 4. Globales

- **Header:** entra con la carga, con un fade de 0,4 s. Al bajar más de 80 px se vuelve «pegajoso»: fondo azul con blur (`backdrop-filter`) y la línea crema de abajo. Se esconde al bajar y reaparece al subir (`y: -100% ↔ 0`, `dur.media`).
- **Estrellitas del menú:** en hover sobre un ítem, la estrella de al lado gira 60° (una punta) con `resorte`. El ítem de la sección actual queda con su estrella girada.
- **Botones píldora:**
  - hover: escala 1,03 y la flecha se corre 4 px a la derecha (`dur.rapida`);
  - al presionar: escala 0,97.
- **Estrellas decorativas grandes en contorno:** giran muy lento, ligadas al scroll (`scroll` → `rotate` de 0° a 30° a lo largo de su sección). Casi no se nota, pero da vida.
- **Barra de progreso:** una línea de 3 px en el borde de arriba, en el amarillo del logo (`#FFD307`), que avanza con el scroll de toda la página (`scroll(p => scaleX(p))`, `transform-origin: left`). Acompaña a las estrellitas del menú.
- **Grano:** estático. No se anima (cuesta rendimiento y no suma).
- **Fondo continuo:** no se anima. Las luces se sienten vivas por el parallax suave de 2 o 3 halos (se mueven al 90 % de la velocidad del scroll).

## 4b. La página aparece mientras scrolleás

**La idea:** nada está «puesto» de antemano. Cada cosa aparece justo cuando llega a la pantalla, en orden de lectura, y la página se siente construyéndose bajo el dedo. Es lo que más aporta a la sensación premium.

**Base: scroll suave con Lenis**, como en la referencia que te gustó:
- `new Lenis({ duration: 1.1, smoothWheel: true })`, conectado a Motion para que las animaciones ligadas al scroll lean la misma posición;
- en celular se deja el scroll nativo (`smoothTouch: false`), que ya es suave y no hay que pelearlo;
- se apaga con «reducir movimiento».

**Sistema de revelado.** Una sola función `revelar()` que recorre elementos con `data-revelar="tipo"` y usa `inView` con `once: true`:

| Tipo (`data-revelar`) | Qué hace | Se dispara con | Duración |
|---|---|---|---|
| `titulo` | cada línea sube desde abajo, enmascarada (`y: 105% → 0`); la línea en contorno entra última | 25 % del título visible | `dur.lenta`, `stagger.lineas` |
| `texto` | fade + `y: subida → 0`; los párrafos largos entran enteros, no por palabra | 20 % visible | `dur.media` |
| `grupo` | los hijos (tarjetas, píldoras, botones) entran en cascada | 15 % del grupo visible | `dur.media`, `stagger.items` |
| `tarjeta` | fade + `y: 40 → 0` + `scale 0.97 → 1`, y la sombra crece desde 0 | 20 % visible | 0,7 s, `ease.marca` |
| `panel` | se descubre de abajo hacia arriba con `clipPath: inset(100% 0 0 0 round 40px) → inset(0 0 0 0 round 40px)` y el contenido entra 0,15 s después | 20 % visible | 0,9 s, `ease.entrada` |
| `orbita` | se dibuja (`pathLength 0 → 1`) | 30 % visible | `dur.dibujo` |
| `estrella` | `scale 0 → 1` + giro desde −90°, con `resorte` | 50 % visible | resorte |
| `linea` | separadores y líneas finas crecen de izquierda a derecha (`scaleX 0 → 1`, `transform-origin: left`) | 50 % visible | 0,8 s |

**Reglas para que se sienta bien y no cansador:**
1. **En orden de lectura.** Dentro de una sección, primero el título, después el texto, después lo interactivo y al final las decoraciones (órbita, estrella). La vista va hacia donde aparece algo.
2. **Entra antes de que lo necesites.** El disparo es con margen (`margin: "0px 0px -10% 0px"`): el elemento empieza a aparecer apenas asoma, así nadie llega a un hueco vacío.
3. **Scroll rápido = sin esperar.** Si la persona baja rápido y varios elementos entran juntos, se muestran casi a la vez (stagger máximo de 0,3 s por grupo). Si llega al final con el botón o el menú, todo lo que quedó atrás aparece de una.
4. **Nada sube desde lejos.** El recorrido máximo es 40 px; más que eso se siente pesado.
5. **Una sola vez.** Lo que ya apareció no vuelve a animarse al subir. Solo los efectos ligados al scroll (parallax, estrellas que giran, la rueda, la banda) responden en ambas direcciones.
6. **Parallax de profundidad, sutil.** Tres capas por sección:
   - fondo y luces al 90 % de la velocidad del scroll;
   - contenido al 100 %;
   - estrellas decorativas al 110–120 %.
   
   Nunca más del 20 % de diferencia. En mobile, solo las estrellas.
7. **Los cortes entre secciones también aparecen.** Donde una sección cambia de color (azul → naranja, marrón → naranja), el color nuevo sube como una cortina desde el borde (`clipPath` de la capa de fondo, ligado al scroll en los últimos 200 px). Así el cambio se siente como un pase, no como un salto.

**Implementación sugerida:**
```js
import { animate, inView, stagger, scroll } from "motion";

const tipos = {
  titulo:  el => animate(el.querySelectorAll(".linea > span"), { y: ["105%", "0%"] }, { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: stagger(0.08) }),
  texto:   el => animate(el, { opacity: [0, 1], y: [24, 0] }, { duration: 0.45, ease: [0.22, 1, 0.36, 1] }),
  grupo:   el => animate(el.children, { opacity: [0, 1], y: [24, 0] }, { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: stagger(0.06) }),
  // …
};

document.querySelectorAll("[data-revelar]").forEach(el => {
  prepararEstadoInicial(el);   // se aplica desde JS: sin JS, la página se ve completa
  inView(el, () => tipos[el.dataset.revelar](el), { margin: "0px 0px -10% 0px", amount: 0.2 });
});
```

## 5. Por sección

### 01 · Apertura (el momento más importante)
Secuencia al cargar la página, en total ~1,6 s:
1. **0,0 s:** las tres líneas del título suben desde abajo, enmascaradas (cada línea en un contenedor con `overflow: hidden`, `y: 100% → 0`), con `stagger.lineas` y `dur.lenta`. «DESDE CERO», en contorno, entra última.
2. **0,3 s:** la **órbita naranja se dibuja** alrededor del título (`pathLength 0 → 1`, `dur.dibujo`, `ease.marca`).
3. **1,1 s:** cuando la órbita termina, la **estrella naranja cae sobre ella**: escala 0 → 1 y rotación −90° → 14°, con `resorte`.
4. **0,6 s:** el párrafo y los botones hacen la entrada estándar, con `stagger.items`.
5. **La estrella grande en contorno** del fondo hace un fade 0 → 0,4 en 1,2 s.

Con el scroll, el título se desplaza un poco más lento que la página (parallax del 15 %) y la órbita rota 4° más.

### 02 · Quiénes somos (el encuentro)
- **DISEÑO** entra desde la izquierda (`x: -120 → 0`) y **DESARROLLO** desde la derecha (`x: 120 → 0`), al mismo tiempo, con `dur.lenta`. Es el concepto de la sección: dos disciplinas que se encuentran.
- Cuando se cruzan, la **estrella marrón aparece en el corte** con `resorte` y gira 180°: es el punto de fusión.
- Después, «Dos disciplinas / Un mismo proceso» y el párrafo hacen la entrada estándar.
- **Mobile:** igual, con recorridos más cortos (`x: ±60`).

### 03 · Cómo trabajamos (la rueda)
- **Desktop, ligado al scroll** (el protagonista de la página):
  1. la sección se queda fija (`position: sticky`) mientras se scrollea ~1,5 pantallas;
  2. la rueda gira de a una fase y la tarjeta activa pasa a ser la naranja, en orden de 01 a 06; la línea naranja que va del centro a la tarjeta activa rota con ella;
  3. al completar el giro, la sección se suelta y sigue la página.
  - *Alternativa más simple* si la versión fija da problemas: las 6 tarjetas entran en orden con `stagger`, la órbita se dibuja y la estrella central gira 60° por cada tarjeta que aparece.
- **Mobile (línea de tiempo):**
  - la línea vertical se dibuja de arriba hacia abajo siguiendo el scroll (`scaleY 0 → 1`);
  - cada tarjeta hace la entrada estándar cuando la línea llega a su punto;
  - el punto se enciende: pasa de azul a una estrellita naranja.
  - Al final, el ícono de «Y la rueda vuelve a empezar» da una vuelta completa.

### 05 · Diseño (la lista)
- **Entrada:** los cuatro nombres suben enmascarados, como el título de la apertura, con `stagger.lineas`. La órbita se dibuja detrás.
- **Hover o toque:** el ítem crece de 124 a 146 px (en mobile, de 46 a 60) y pasa a crema; la descripción se despliega con altura automática y fade, y su estrellita gira 90°. Todo con `dur.media` y `ease.marca`.
  - Para no animar `font-size`: animar `scale` desde el borde izquierdo (`transform-origin: left`) y reservar el alto con un contenedor.
- **Clic:** fija el servicio. La estrella naranja grande de la derecha da un giro de 60° con `resorte` cada vez que cambia el servicio fijado.

### Preguntas frecuentes (la conversación) — nivel iMessage
**El objetivo:** que se sienta como mandar un mensaje en un iPhone. Todo se mueve con resortes (nada con curvas lineales), las burbujas nacen desde su «colita», el chat se acomoda solo y cada paso tiene su ritmo. Es la sección donde más se tiene que notar el cuidado.

**Resortes de esta sección** (reemplazan a los tokens generales acá):

| Nombre | Valor | Uso |
|---|---|---|
| `resorte.burbuja` | `{ type: "spring", stiffness: 520, damping: 32, mass: 0.9 }` | nacimiento de burbujas (rápido, con un rebote apenas perceptible) |
| `resorte.acomodo` | `{ type: "spring", stiffness: 380, damping: 36 }` | burbujas anteriores que suben para hacer lugar |
| `resorte.pildora` | `{ type: "spring", stiffness: 600, damping: 38 }` | fondo naranja que se desliza entre píldoras |
| `resorte.toque` | `{ type: "spring", stiffness: 700, damping: 30 }` | reacción al tocar |

**Coreografía al elegir una pregunta** (en total, ~1,3 s):

1. **0 ms — el toque.** La píldora se hunde (`scale → 0.95`) y vuelve con `resorte.toque`. El fondo naranja viaja desde la píldora anterior hasta la nueva con `resorte.pildora`, deformándose apenas en el trayecto (FLIP o `layoutId` si se usa React).
2. **60 ms — sale tu mensaje.** La burbuja azul «Vos» nace desde su esquina inferior derecha, donde está la colita (`transform-origin: bottom right`):
   - `scale 0.4 → 1`, `y: 14 → 0` y `opacity 0 → 1`, con `resorte.burbuja`;
   - el texto adentro entra 40 ms después, con un fade de 0,15 s, para que primero se vea la forma y después el contenido.
3. **Al mismo tiempo, el chat se acomoda.** Las burbujas que ya estaban suben lo justo para hacer lugar (`y` con `resorte.acomodo`), nunca saltan. Las más viejas bajan su opacidad a 0,5 y, si no entran, se van por arriba con un degradé de máscara (`mask-image` en el borde superior del panel).
4. **120 ms — «Leído».** Debajo de tu burbuja aparece «Leído», chiquito, con fade de 0,2 s. Se va cuando llega la respuesta.
5. **350 ms — «escribiendo…».** Nace una burbuja gris desde abajo a la izquierda (`transform-origin: bottom left`, `scale 0.6 → 1`, `resorte.burbuja`) con tres puntitos:
   - cada puntito sube y baja 4 px y pasa de opacidad 0,35 a 1, en loop de 1,2 s, desfasados 0,15 s entre sí (`ease: "easeInOut"`);
   - dura entre 700 y 1.100 ms según el largo de la respuesta (≈ 6 ms por carácter, con esos topes), para que se sienta que alguien escribe.
6. **Llega la respuesta.** La burbuja de puntitos **se transforma** en la respuesta naranja, no se reemplaza:
   - el ancho y alto crecen de la burbuja chica a la final con `resorte.burbuja` (animar un contenedor con `clip-path` o FLIP para no animar `width` y `height`);
   - el color pasa de gris a naranja en 0,25 s;
   - el texto entra 80 ms después: fade + `y: 4 → 0`, por renglón, con 30 ms entre renglones;
   - la colita aparece al final, con un leve `scale 0.8 → 1`.
7. **Cierre.** Un brillo sutil cruza la burbuja naranja una sola vez (gradiente crema al 15 % que va de izquierda a derecha en 0,6 s). Es el detalle premium.

**Reglas finas:**
- **Si se toca otra pregunta en el medio**, la secuencia se corta con elegancia: los puntitos se encogen (`scale → 0.6`, `opacity → 0`, 0,15 s) y la nueva conversación arranca sin esperar. Nunca quedan dos respuestas escribiéndose a la vez.
- **Si se toca la misma pregunta** que ya está respondida, solo rebota la píldora y la respuesta hace un «pulso» (`scale 1 → 1.02 → 1`).
- **Historial:** se guardan como máximo las últimas 3 preguntas en el chat. Así se siente una conversación y el panel no se llena.
- **Primera vez:** cuando el panel entra en pantalla por primera vez, se escribe solo el saludo («¡Hola! Somos Delfina y Fabrizio…») con los puntitos antes, 600 ms. No se responde ninguna pregunta hasta que la persona toque una.
- **Sombra viva:** mientras «escriben», la sombra del panel respira apenas (`box-shadow` de 40 a 48 px de blur, loop de 2 s). Se detiene al llegar la respuesta.
- **Sin saltos de layout:** el panel tiene alto fijo y el área de mensajes se ancla abajo (`justify-content: flex-end`), así los mensajes nuevos empujan hacia arriba como en el teléfono.
- **Cursor y foco:** las píldoras tienen `:focus-visible` con anillo amarillo (`#FFD307`), y con teclado (Enter o Espacio) la animación es la misma.
- **Rendimiento:** solo `transform`, `opacity` y `clip-path`; `will-change` únicamente durante la secuencia.
- **Reducir movimiento:** sin resortes ni puntitos. La pregunta y la respuesta aparecen con un fade de 0,15 s.

**Mobile:**
- La fila de píldoras se desliza con inercia. Al tocar una, se centra sola (`scrollIntoView({ behavior: "smooth", inline: "center" })`).
- Si el panel no está completo en pantalla, la página hace un scroll suave hasta que quede visible, antes de que llegue la respuesta.
- Al tocar, vibración corta si el dispositivo la soporta (`navigator.vibrate(8)`); en iPhone no aplica, así que el feedback es solo visual.

**Esqueleto de la secuencia con Motion** (vanilla):
```js
import { animate, spring } from "motion";

async function responder(pregunta, respuesta) {
  cancelarSecuenciaAnterior();
  const vos = crearBurbuja("vos", pregunta);            // colita abajo a la derecha
  acomodarHistorial();                                    // sube las anteriores con resorte.acomodo
  animate(vos, { scale: [0.4, 1], y: [14, 0], opacity: [0, 1] }, RESORTE_BURBUJA);

  await esperar(350);
  const escribiendo = crearBurbuja("escribiendo");
  animate(escribiendo, { scale: [0.6, 1], opacity: [0, 1] }, RESORTE_BURBUJA);
  await esperar(Math.min(1100, Math.max(700, respuesta.length * 6)));

  await transformarEnRespuesta(escribiendo, respuesta);  // FLIP de tamaño + color + texto por renglón
  brillo(escribiendo);
}
```

### 06 · Hablemos
- «¿TENÉS UNA IDEA?» hace la entrada estándar.
- **HABLEMOS** entra letra por letra (`stagger` de 0,04 s, `y: 60% → 0`, enmascarado).
- La **órbita azul se dibuja** y la **estrella azul recorre la órbita** una vez hasta quedar en su lugar. Es el único recorrido de trayectoria de la página, un cierre que refleja la apertura.
- **La estrella grande en contorno de la derecha gira con el scroll** (como en la referencia): `rotate 0° → 150°` mientras la sección atraviesa la pantalla (`scroll(animate(estrella, { rotate: [0, 150] }, { ease: "linear" }), { target: seccion, offset: ["start end", "end start"] })`). Es el giro final de la página; las otras estrellas decorativas giran solo hasta 30°.
- **Botones:** entrada estándar con `stagger.items`. El de WhatsApp tiene además una pulsación suave de sombra cada 4 s, solo mientras está en pantalla.

### Banda separadora (propuesta; hoy no existe en el diseño)
Una banda horizontal que se desplaza de costado con el scroll, como en la referencia:
- **Diseño:** fondo naranja, bordes finos marrones arriba y abajo, y texto en Anton marrón de ~44 px: «Diseño ✶ Desarrollo ✶ Del pensamiento al detalle ✶ …», con estrellitas marrones de 20 px como separadores.
- **Animación:** `x: 0% → -42%` ligado al scroll mientras la banda cruza la pantalla (`offset: ["start end", "end start"]`). Así avanza solo cuando el usuario scrollea, no en loop.
- **Dónde:** entre Quiénes somos y Cómo trabajamos, justo en el corte de DESARROLLO. Es el pase del «quiénes» al «cómo». Una segunda, en azul con texto crema, podría ir antes de Hablemos.

### Página del análisis gratis
- **Campo del link:** al enfocar, la píldora crece 2 % y se ilumina el borde naranja.
- **Analizando:**
  - los pasos se tildan uno por uno con los tiempos reales del Worker, no simulados;
  - la barra avanza con `ease.marca`;
  - la estrella central gira continuamente, una vuelta cada 6 s;
  - las etiquetas orbitan sobre la elipse.
- **Informe:**
  - la nota cuenta de 0 a 62 mientras el anillo se llena (`pathLength`) en 1,2 s;
  - las tres tarjetas de cambios entran con `stagger`;
  - los tildes y cruces del detalle aparecen de a uno.

## 6. Accesibilidad y rendimiento

- **`prefers-reduced-motion: reduce`:** se desactiva todo lo que se mueve en recorrido (parallax, sticky de la rueda, giros, dibujos de órbita, letra por letra). Solo quedan los fades cortos (0,2 s). Todo el contenido tiene que verse completo sin animación.
- **Nada empieza oculto en el HTML:** los estados iniciales se aplican desde JavaScript. Si el JS no carga, la página se ve completa.
- **Mobile:**
  - sin parallax;
  - recorridos más cortos (`subida` 16 px);
  - la rueda no queda fija: se reemplaza por la línea de tiempo;
  - como máximo 2 animaciones en simultáneo en pantalla.
- **Presupuesto:**
  - que la página siga a 60 fps en un celular de gama media;
  - `will-change` solo durante la animación;
  - en las secciones de scroll, animar con `scroll()` de Motion, que usa la línea de tiempo del navegador cuando está disponible.

## 7. Orden sugerido para implementar

1. Pantalla de carga, Lenis, tokens y el sistema `revelar()` con sus tipos (4b).
2. Apertura completa.
3. Botones, header y menú.
4. Quiénes somos (el encuentro).
5. Diseño y Preguntas: las interacciones ya existen, solo hay que suavizarlas.
6. Hablemos.
7. La rueda con scroll, que es lo más complejo; primero la alternativa simple, después la versión fija.
8. Análisis gratis.
9. Revisión completa con «reducir movimiento» activado y en un celular real.
