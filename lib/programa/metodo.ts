/* Método del plan integrado: plantilla de razonamiento, repasos, autoevaluación y distribución del estudio. */

export const IDEA_RECTORA =
  "No estudiar las materias como compartimentos separados. Elegir un problema clínico y reconstruirlo desde las distintas perspectivas que aportan las materias.";

export const PLANTILLA: Array<{ apartado: string; pregunta: string }> = [
  { apartado: "Definición", pregunta: "¿Qué enfermedad o síndrome estoy estudiando?" },
  { apartado: "Anatomía", pregunta: "¿Qué órgano, estructura o territorio está comprometido?" },
  { apartado: "Fisiopatología", pregunta: "¿Qué mecanismo produce la enfermedad?" },
  { apartado: "Patología", pregunta: "¿Qué lesión celular o tisular genera?" },
  { apartado: "Clínica", pregunta: "¿Cómo se presenta y qué signos de alarma tiene?" },
  { apartado: "Diagnóstico", pregunta: "¿Qué estudios confirman o descartan hipótesis?" },
  { apartado: "Tratamiento", pregunta: "¿Qué medidas farmacológicas, quirúrgicas o de soporte corresponden?" },
  { apartado: "Prevención", pregunta: "¿Cómo se evita, detecta precozmente o controla?" },
  { apartado: "Integración", pregunta: "¿Qué otras materias permiten comprender mejor el caso?" },
];

export const PIE_DIABETICO: Array<{ dimension: string; aplicacion: string }> = [
  { dimension: "Anatomía", aplicacion: "Vascularización del miembro inferior, nervios periféricos y estructuras del pie." },
  { dimension: "Fisiopatología", aplicacion: "Hiperglucemia crónica, neuropatía y enfermedad arterial periférica." },
  { dimension: "Patología", aplicacion: "Daño vascular, inflamación, necrosis e infección." },
  { dimension: "Clínica", aplicacion: "Úlcera, pérdida de sensibilidad, signos de infección e isquemia." },
  { dimension: "Diagnóstico", aplicacion: "Evaluación vascular y neurológica, laboratorio e imágenes según sospecha." },
  { dimension: "Tratamiento", aplicacion: "Control glucémico, descarga, cuidado de la herida, antimicrobianos si hay infección y evaluación quirúrgica." },
  { dimension: "Prevención", aplicacion: "Inspección de pies, educación, controles y seguimiento comunitario." },
];

export const RECUPERACION: Array<{ name: string; text: string }> = [
  { name: "Inmediata", text: "Cerrar el material y explicar el tema en voz alta." },
  { name: "Espaciada", text: "Volver al tema al día siguiente, a los 7 días y a los 21–30 días. Las Tarjetas ya lo hacen solas." },
  { name: "Aplicación", text: "Resolver un caso nuevo sin saber de antemano qué enfermedad se está evaluando (Caso al azar)." },
];

export const AUTOEVALUACION = [
  "¿Puedo explicar la fisiopatología sin consultar?",
  "¿Puedo relacionar la anatomía con las manifestaciones?",
  "¿Puedo construir al menos tres diagnósticos diferenciales?",
  "¿Puedo justificar los estudios que pediría?",
  "¿Puedo explicar por qué elegiría un tratamiento y no otro?",
  "¿Puedo reconocer complicaciones y medidas preventivas?",
  "¿Puedo conectar el tema con al menos otras tres materias?",
];

export const BLOQUES: Array<{ name: string; minutes: number; steps: Array<{ min: number; text: string }> }> = [
  {
    name: "Mañana",
    minutes: 60,
    steps: [
      { min: 10, text: "Recordar lo estudiado el día anterior sin mirar apuntes." },
      { min: 35, text: "Estudiar un mecanismo, una enfermedad o un grupo de patologías." },
      { min: 15, text: "Dibujar un esquema de memoria o responder preguntas." },
    ],
  },
  {
    name: "Noche",
    minutes: 60,
    steps: [
      { min: 20, text: "Conectar el tema con otra materia." },
      { min: 25, text: "Resolver un caso clínico o preguntas." },
      { min: 15, text: "Corregir errores y anotar qué no pudiste explicar." },
    ],
  },
];

export const SEMANA_TIPO: Array<{ day: string; morning: string; night: string }> = [
  { day: "Lunes", morning: "Anatomía + fisiopatología", night: "Patología del mismo eje" },
  { day: "Martes", morning: "Clínica y manifestaciones", night: "Diagnóstico diferencial" },
  { day: "Miércoles", morning: "Farmacología", night: "Tratamiento y efectos adversos" },
  { day: "Jueves", morning: "Infectología o especialidad relacionada", night: "Caso clínico integrador" },
  { day: "Viernes", morning: "Prevención y Salud Comunitaria", night: "Preguntas sin apuntes" },
  { day: "Sábado", morning: "Repaso de errores", night: "Caso clínico acumulativo" },
  { day: "Domingo", morning: "Descanso o recuperación liviana", night: "Sin obligación de estudio" },
];

export const REGLA = "No estudiar dos veces lo mismo de la misma manera. La mañana sirve para comprender; la noche, para recuperar, conectar y aplicar.";

export const CRITERIO_AVANCE =
  "No pasar al siguiente eje por haber terminado de leer, sino cuando puedas explicar el caso, justificar el diagnóstico y defender la conducta terapéutica.";

export const COMO_USARLO = [
  "Elegí un eje prioritario y una enfermedad concreta.",
  "Completá la plantilla de razonamiento con tus fuentes de estudio.",
  "Identificá qué materias aportan conocimientos centrales y cuáles conexiones secundarias.",
  "Construí preguntas de recuperación y resolvé un caso clínico.",
  "Registrá errores y volvé a ellos en repasos espaciados.",
  "Actualizá el Temario al revisar los programas: no marques como exigible algo que no verificaste.",
];

export const IDEA_FINAL =
  "Estudiar un problema clínico por vez y hacer que cada materia aporte una pieza distinta para resolverlo: de la estructura y el mecanismo a la clínica, el diagnóstico, el tratamiento y la prevención.";

export const FUENTES = [
  "Plan de estudio integrado de Medicina (mapa de relaciones entre 14 materias), material orientativo.",
  "FCM-UNC — Programas del plan de estudio de la carrera de Medicina, revisión 2024.",
  "FCM-UNC — Asignaturas de la carrera de Medicina por año.",
];
