import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const retrasoDesarrolloTea: ClinicalCase = {
  id: "desarrollo-psicomotor-trastorno-espectro-autista",
  level: 2,
  area: "Pediatría",
  setting: "CAPS",
  patient: { age: 28, ageUnit: "meses", sex: "M", context: "Nació a término, sin complicaciones. Lo trae la abuela al control de niño sano." },
  frequency: "frecuente",
  intro: "“No dice palabras, no me señala nada y cuando lo llamo parece que no oye. Se la pasa alineando autitos.”",
  vitals: { FC: "108 lpm", FR: "24 rpm", "T°": "36,6 °C", Peso: "12,8 kg" },
  anamnesis: [
    act("lenguaje", "¿Qué palabras dice? ¿Señala? ¿Perdió alguna habilidad?", "clave", "“Decía mamá, a los 18 meses dejó de decirlo.”", "Regresión: alarma."),
    act("social", "¿Te mira, comparte, juega con otros niños?", "clave", "“Casi nunca.”", "Reciprocidad social."),
    act("conductas", "¿Movimientos repetidos, rutinas, sensibilidad a ruidos?", "clave", "“Aletea y se tapa los oídos.”", "Conductas repetitivas."),
    act("audicion", "¿Cuándo se controló la audición? ¿Otitis?", "util", "“En la maternidad, sin problemas.”", "Hipoacusia debe descartarse."),
    act("hitos", "¿Cómo fueron los otros hitos?", "util", "“Caminó a los 13 meses.”", "Motricidad conservada."),
    act("colectivo", "¿Vienen en colectivo?", "neutro", "“Sí, el 18.”", "No orienta."),
  ],
  exam: [
    act("observacion", "Observar interacción", "clave", "Escaso contacto visual, no responde al nombre, no comparte.", "Núcleo."),
    act("general", "Crecimiento y piel", "clave", "Perímetro cefálico normal; sin manchas café con leche.", "Sin síndromes."),
    act("neuro", "Examen neurológico", "util", "Normal.", "Sin lesión."),
  ],
  studies: [
    study("Otros", "mchat", "Pesquisa con M-CHAT y evaluación con especialista", "clave", "Riesgo alto; ADOS-2 compatible.", "El diagnóstico es clínico."),
    study("Otros", "audicion", "Evaluación audiológica", "clave", "Normal.", "Indispensable."),
    study("Laboratorio", "genetica", "Microarray y X frágil", "util", "Sin hallazgos.", "Se ofrece."),
    study("Imágenes", "rmn-rutina", "RM de encéfalo de rutina", "innecesario", "No se realizó.", "Sin signos, no aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tea", "Trastorno del espectro autista", true, "Déficit social y comunicativo, conductas repetitivas, audición normal."),
      dx("hipoacusia", "Hipoacusia", false, "Estudio normal."),
      dx("lenguaje", "Trastorno específico del lenguaje", false, "Hay compromiso social y conductas repetitivas."),
      dx("rett", "Síndrome de Rett", false, "Afecta casi solo a niñas."),
      dx("privacion", "Privación ambiental", false, "No se explica por el entorno."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("temprana", "Atención temprana y terapias de comunicación y conducta", "clave", "Mejor pronóstico con inicio temprano."),
      mg("cud", "Certificado único de discapacidad y orientación familiar", "clave", "Acceso a prestaciones."),
      mg("seguimiento", "Control periódico, con foco en sueño y salud mental", "clave", "Comorbilidades."),
      mg("escuela", "Apoyo escolar inclusivo", "util", "Integración."),
      mg("esperar", "Esperar porque los varones hablan tarde", "riesgoso", "Retrasa la intervención."),
      mg("quelantes", "Dietas extremas y quelantes", "riesgoso", "Sin evidencia y con riesgo."),
    ],
  },
  debrief: {
    diagnosis: "Trastorno del espectro autista con regresión del lenguaje, en varón de 28 meses.",
    pathologies: [
      { name: "Trastorno del espectro autista", role: "principal", why: "Neurodesarrollo." },
      { name: "Retraso del lenguaje, sensibilidad sensorial", role: "asociada", why: "Comorbilidades." },
      { name: "Hipoacusia, Rett, privación", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: genética y factores perinatales. Las vacunas no lo causan.",
      "Mecanismo: alteración del desarrollo de redes sociales y comunicativas.",
      "Consecuencia: dificultades de comunicación y flexibilidad.",
    ],
    epidemiology:
      "Se estima una prevalencia de alrededor de 1 cada 100 a 1 cada 36 niños, con más varones. Se puede diagnosticar a los 18 a 24 meses. La pérdida del lenguaje o de habilidades sociales, a cualquier edad, requiere una evaluación pronta, y en Argentina la Ley 27.043 promueve el abordaje integral.",
    management: [
      "Vigilar hitos.",
      "Pesquisa a los 18 y 24 meses.",
      "Audición.",
      "Tratamiento temprano y apoyo a familias.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Trastorno del espectro autista.", "American Academy of Pediatrics — Identification, Evaluation and Management of ASD."],
    pearls: ["Pérdida de lenguaje: alarma.", "No esperar.", "Siempre audición."],
    pitfalls: ["Decir que es “vago”.", "Asociarlo a vacunas."],
    tribunal: [
      qa("¿Qué hitos debe tener un niño de 12 y 24 meses?", "A los 12: camina con ayuda, señala y dice una o dos palabras. A los 24: frases de dos palabras y corre."),
      qa("¿Cuáles son las banderas rojas del desarrollo?", "No balbucear a los 12 meses, sin palabras a los 16, sin frases a los 24, y cualquier regresión."),
      qa("¿Qué dice la evidencia sobre la vacuna triple viral y autismo?", "Grandes estudios no encontraron asociación; el artículo original fue retirado por fraude."),
    ],
  },
};
