// Configuración de los 5 capítulos del formulario, en el mismo orden y con el mismo
// texto que el diseño aprobado (variante "bandas", 2026-10-20). Cada `name` coincide exactamente
// con un campo de `leadSchema` (packages/shared/src/index.ts), así que este
// archivo es el único lugar donde hay que tocar algo si cambia una pregunta.
//
// Tipos de campo:
//   'input'    -> <input>, opcionalmente con inputType ('email' | 'tel' | 'text')
//   'textarea' -> <textarea>
//   'opciones' -> botones de selección, modo 'single' (una opción) o 'multi'
//                 (varias, con `max` opcional). `variante` define el look:
//                 'circulo' (fila con círculo, frases largas) | 'cuadrado'
//                 (tarjeta, para elegir varias) | 'pildora' (opción corta).
//
// Cada capítulo tiene `lineas` (el título, una por renglón; la última sale en
// contorno), `subtitulo` y `tituloCorto` (el que se ve arriba, en el avance).
// No hay textos de ayuda al lado de las preguntas; la única aclaración es la
// `nota` del presupuesto (campo `destacado`, en recuadro aparte).
//
// Un campo dentro de un array (en vez de directamente en `campos`) se agrupa
// en una misma fila (dos columnas en compu) — así están email y whatsapp.

export const PASOS = [
  {
    titulo: 'Quién sos',
    lineas: ['Quién', 'sos'],
    subtitulo: 'Lo básico para poder escribirte.',
    tituloCorto: 'Quién sos',
    campos: [
      {
        tipo: 'input',
        name: 'nombre',
        label: '¿Cómo te llamás?',
        requerido: true,
        placeholder: 'Tu nombre',
      },
      {
        tipo: 'input',
        name: 'empresa',
        label: '¿Cómo se llama tu empresa o proyecto?',
        requerido: true,
        placeholder: 'Si todavía no tiene nombre, escribí "en definición"',
      },
      {
        tipo: 'input',
        name: 'rubro',
        label: 'Contanos en una frase a qué se dedican',
        requerido: true,
        placeholder: 'Ej: estudio contable para pymes',
      },
      [
        {
          tipo: 'input',
          inputType: 'email',
          name: 'email',
          label: 'Email',
          requerido: true,
          placeholder: 'hola@tuempresa.com',
        },
        {
          tipo: 'input',
          inputType: 'tel',
          name: 'whatsapp',
          label: 'WhatsApp',
          requerido: true,
          placeholder: '223 000 0000',
        },
      ],
    ],
  },
  {
    titulo: 'Situación actual',
    lineas: ['Situación', 'actual'],
    subtitulo: 'Dónde estás parado hoy.',
    tituloCorto: 'Situación actual',
    campos: [
      {
        tipo: 'opciones',
        name: 'webActual',
        label: '¿Tenés página web hoy?',
        modo: 'single',
        variante: 'circulo',
        opciones: [
          'Sí, y la quiero rehacer de cero',
          'Sí, pero solo necesito mejoras o rediseño',
          'No, arrancamos de cero',
          'No, solo tengo redes sociales',
        ],
      },
      {
        tipo: 'textarea',
        name: 'links',
        label: 'Si tenés web o redes, pegá los links acá',
        placeholder: 'Nos sirve para llegar a la reunión con el diagnóstico hecho',
        filas: 2,
      },
      {
        tipo: 'opciones',
        name: 'problemas',
        label: '¿Qué es lo que hoy no te está funcionando?',
        modo: 'multi',
        variante: 'cuadrado',
        opciones: [
          'No me llegan consultas ni clientes',
          'Se ve desactualizada o poco profesional',
          'No aparezco en Google',
          'Es lenta o se ve mal en el celular',
          'No puedo actualizarla yo mismo',
          'Todavía no tengo nada, por eso estoy acá',
        ],
      },
    ],
  },
  {
    titulo: 'El proyecto',
    lineas: ['El', 'proyecto'],
    subtitulo: 'Qué querés lograr y qué tipo de web te imaginás.',
    tituloCorto: 'El proyecto',
    campos: [
      {
        tipo: 'opciones',
        name: 'objetivos',
        label: '¿Qué querés lograr con la nueva web?',
        modo: 'multi',
        variante: 'cuadrado',
        opciones: [
          'Conseguir más consultas y clientes',
          'Vender productos online',
          'Transmitir más profesionalismo',
          'Mostrar mi portfolio o catálogo',
          'Automatizar turnos o reservas',
          'Posicionarme mejor en Google',
        ],
      },
      {
        tipo: 'opciones',
        name: 'tipoProyecto',
        label: '¿Qué tipo de proyecto creés que necesitás?',
        modo: 'single',
        variante: 'pildora',
        opciones: [
          'Una página simple',
          'Sitio institucional',
          'Tienda online',
          'Plataforma a medida',
          'No estoy seguro, quiero asesoramiento',
        ],
      },
      {
        tipo: 'opciones',
        name: 'autogestion',
        label: '¿Vas a querer editar los contenidos vos mismo?',
        modo: 'single',
        variante: 'circulo',
        opciones: [
          'Sí, quiero cambiar cosas seguido',
          'De vez en cuando, cambios chicos',
          'No, prefiero que lo manejen ustedes',
        ],
      },
      {
        tipo: 'opciones',
        name: 'material',
        label: '¿Tenés listo el material?',
        modo: 'single',
        variante: 'circulo',
        opciones: [
          'Sí, tengo todo listo',
          'Tengo algunas cosas, otras no',
          'No tengo nada, necesito ayuda',
        ],
      },
    ],
  },
  {
    titulo: 'Tiempos y presupuesto',
    lineas: ['Tiempos y', 'presupuesto'],
    subtitulo: 'Cómo nos organizamos.',
    tituloCorto: 'Tiempos y presupuesto',
    campos: [
      {
        tipo: 'opciones',
        name: 'plazo',
        label: '¿Para cuándo te gustaría tenerla online?',
        modo: 'single',
        variante: 'pildora',
        opciones: [
          'Lo antes posible',
          'En el próximo mes o dos',
          'En tres meses o más',
          'Tengo una fecha fija',
          'Todavía no tengo fecha',
        ],
      },
      {
        tipo: 'opciones',
        name: 'presupuesto',
        label: '¿Qué presupuesto tenés pensado destinarle?',
        nota: 'No es un compromiso ni una cotización. Nos sirve para proponerte algo realista y no hacerte perder el tiempo.',
        modo: 'single',
        variante: 'cuadrado',
        destacado: true,
        opciones: [
          'Hasta USD 400',
          'USD 400 a 800',
          'USD 800 a 1.500',
          'USD 1.500 a 3.000',
          'Más de USD 3.000',
          'Prefiero conversarlo',
        ],
      },
      {
        tipo: 'opciones',
        name: 'decisor',
        label: '¿Quién toma la decisión final sobre el proyecto?',
        modo: 'single',
        variante: 'pildora',
        opciones: ['Yo', 'Yo junto a un socio o socia', 'Depende de un tercero'],
      },
    ],
  },
  {
    titulo: 'Para conocernos',
    lineas: ['Para', 'conocernos'],
    subtitulo: 'Último capítulo, y listo.',
    tituloCorto: 'Para conocernos',
    campos: [
      {
        tipo: 'opciones',
        name: 'comoLlego',
        label: '¿Cómo llegaste a Mergge?',
        modo: 'single',
        variante: 'pildora',
        opciones: ['Instagram', 'Me lo recomendaron', 'Google', 'LinkedIn', 'Vi un trabajo suyo', 'Otro'],
      },
      {
        tipo: 'opciones',
        name: 'valora',
        label: '¿Qué es lo que más valorás al elegir con quién trabajar?',
        modo: 'multi',
        variante: 'cuadrado',
        max: 2,
        opciones: [
          'Que el diseño sea único y a medida',
          'El precio',
          'La rapidez de entrega',
          'El trato cercano y directo',
          'Que me acompañen después de entregar',
        ],
      },
      {
        tipo: 'textarea',
        name: 'comentario',
        label: '¿Algo más que quieras contarnos?',
        placeholder: 'Una referencia que te guste, una idea suelta, una duda. Todo suma.',
        filas: 3,
      },
    ],
  },
]

// Solo el paso 1 tiene campos obligatorios en el diseño (los que llevan *).
// Nota: en `leadSchema` estos mismos campos están como `.optional()` menos
// nombre/empresa/email — si querés que el backend también los exija, hay que
// tocar `packages/shared/src/index.ts`.
export const REQUERIDOS_POR_PASO = {
  1: ['nombre', 'empresa', 'rubro', 'email', 'whatsapp'],
}

export const ESTADO_INICIAL = {
  nombre: '',
  empresa: '',
  rubro: '',
  email: '',
  whatsapp: '',
  webActual: '',
  links: '',
  problemas: [],
  objetivos: [],
  tipoProyecto: '',
  autogestion: '',
  material: '',
  plazo: '',
  presupuesto: '',
  decisor: '',
  comoLlego: '',
  valora: [],
  comentario: '',
  token: '',
  website: '',
}
