import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const ahogamiento: ClinicalCase = {
  id: "ahogamiento-nino-pileta",
  level: 3,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 3, ageUnit: "años", sex: "M", context: "Enero. Cayó a una pileta de lona sin cerco en un cumpleaños; lo sacaron después de unos minutos." },
  frequency: "poco-frecuente",
  intro: "“Lo encontramos flotando en la pileta. Un tío le hizo respiración boca a boca y empezó a toser y vomitar. Ahora está dormido y respira rápido.” (relata la madre)",
  vitals: { FC: "156 lpm", FR: "42 rpm", "T°": "35,4 °C", "SatO₂": "88 %", Glasgow: "12/15", Peso: "15 kg" },
  anamnesis: [
    act("tiempo", "¿Cuánto tiempo estuvo bajo el agua? ¿Cuándo empezaron la reanimación?", "clave", "“No sabemos, unos minutos; el tío empezó enseguida.”", "La duración de la inmersión y la RCP inmediata son los principales factores pronósticos."),
    act("rcp", "¿Respiraba? ¿Le hicieron compresiones?", "clave", "“No respiraba; le dio respiraciones y compresiones hasta que tosió.”", "Paro respiratorio con recuperación tras RCP."),
    act("trauma", "¿Pudo haberse golpeado o tirado de cabeza?", "util", "“Se cayó, no se tiró.”", "Bajo riesgo de lesión cervical."),
    act("supervision", "¿Quién lo cuidaba?", "util", "“Estábamos todos en la mesa.”", "Falta de supervisión directa: el principal factor de riesgo."),
    act("antecedentes", "¿Tiene epilepsia u otra enfermedad?", "util", "“No.”", "Descarta causas desencadenantes."),
    act("juego", "¿Sabe nadar?", "neutro", "“No.”", "Factor de riesgo, no cambia el manejo."),
  ],
  exam: [
    act("respiratorio", "Trabajo respiratorio y auscultación", "clave", "Tiraje, rales bilaterales.", "Daño pulmonar por aspiración de agua (edema no cardiogénico)."),
    act("neuro", "Estado neurológico", "clave", "Somnoliento, responde a estímulos, pupilas reactivas.", "Lesión hipóxica posible; pronóstico a evaluar."),
    act("temperatura", "Temperatura central", "util", "35,4 °C.", "Hipotermia leve."),
  ],
  studies: [
    study("Laboratorio", "gases", "Gases arteriales, ionograma, glucemia", "clave", "pH 7,22, pO₂ 58, acidosis mixta.", "Hipoxemia y acidosis."),
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Infiltrados alveolares bilaterales.", "Lesión pulmonar por aspiración."),
    study("Imágenes", "tc-cervical", "Tomografía cervical de rutina", "innecesario", "No se realizó.", "Solo si hay mecanismo de trauma (zambullida)."),
    study("Microbiología", "atb-profilactico", "Antibióticos profilácticos por agua de pileta", "riesgoso", "No se realizó.", "No están indicados; favorecen resistencias."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ahogamiento", "Ahogamiento no fatal con paro respiratorio recuperado, insuficiencia respiratoria por aspiración e hipotermia leve", true, "Inmersión en pileta con apnea que respondió a RCP, hipoxemia, rales e infiltrados bilaterales y alteración de conciencia."),
      dx("nac", "Neumonía", false, "Los infiltrados son por la aspiración de agua inmediata."),
      dx("convulsion", "Convulsión con aspiración", false, "Sin antecedentes y con inmersión documentada."),
      dx("tec", "TEC por caída", false, "Sin mecanismo de trauma."),
      dx("sin-secuelas", "Inmersión sin consecuencias", false, "Hay hipoxemia y compromiso neurológico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("o2", "Oxígeno, CPAP o ventilación según evolución en terapia intensiva pediátrica", "clave", "La hipoxia es el problema central."),
      mg("temperatura", "Recalentar y evitar la hipertermia", "clave", "Protección neurológica."),
      mg("neuro", "Monitoreo neurológico y de glucemia", "clave", "Pronóstico."),
      mg("prevencion", "Prevención: cercos de 4 lados, supervisión adulta permanente, clases de natación, RCP para padres", "clave", "El ahogamiento es prevenible."),
      mg("heimlich", "Maniobra de Heimlich para sacar el agua de los pulmones", "riesgoso", "No sirve y demora la ventilación; aumenta el vómito."),
      mg("diureticos", "Diuréticos de rutina por el agua en los pulmones", "innecesario", "No está indicado."),
    ],
  },
  debrief: {
    diagnosis: "Ahogamiento no fatal en pileta con paro respiratorio recuperado por RCP de un testigo, insuficiencia respiratoria por aspiración, alteración de conciencia e hipotermia leve, en niño de 3 años.",
    pathologies: [
      { name: "Ahogamiento no fatal", role: "principal", why: "Inmersión con alteración respiratoria." },
      { name: "Lesión pulmonar y encefalopatía hipóxica", role: "asociada", why: "Consecuencias de la hipoxia." },
      { name: "Neumonía, convulsión, TEC", role: "diferencial", why: "Se descartan por el contexto." },
    ],
    reasoning: [
      "Causa: inmersión sin supervisión en una pileta sin cerco.",
      "Mecanismo: apnea, laringoespasmo y aspiración de agua que lava el surfactante; hipoxia que lleva al paro.",
      "Consecuencia: insuficiencia respiratoria, daño cerebral hipóxico y muerte; el pronóstico depende del tiempo de inmersión y de la RCP inmediata.",
    ],
    epidemiology:
      "El ahogamiento es una de las principales causas de muerte por lesiones no intencionales en niños de 1 a 4 años en Argentina, sobre todo en verano y en piletas domésticas, a menudo en reuniones familiares con muchos adultos y nadie mirando. Es más frecuente en varones.",
    management: [
      "RCP inmediata con énfasis en las ventilaciones.",
      "Oxígeno y soporte ventilatorio.",
      "Observación mínima de 6–8 h aun en casos leves.",
      "Prevención con cercos, supervisión y enseñanza de RCP.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Recomendaciones para la prevención de ahogamientos.", "Consenso de reanimación cardiopulmonar pediátrica."],
    pearls: ["En el ahogamiento, primero ventilar.", "Pileta = cerco y adulto mirando.", "RCP del testigo salva vidas."],
    pitfalls: ["Heimlich para sacar el agua.", "Alta precoz sin observación."],
    tribunal: [
      qa("¿Por qué en el ahogamiento se empieza la RCP con ventilaciones?", "Porque el paro es de origen hipóxico; se dan 5 ventilaciones de rescate antes de las compresiones, a diferencia del paro cardíaco súbito del adulto."),
      qa("¿Qué es el 'adulto guardavidas'?", "Una estrategia de prevención: designar a un adulto que mire a los niños en el agua sin distracciones (celular, alcohol), rotando cada cierto tiempo."),
      qa("¿Cuánto tiempo se observa a un niño tras una inmersión aparentemente leve?", "Al menos 6–8 horas, porque puede desarrollar dificultad respiratoria y edema pulmonar en las horas siguientes."),
    ],
  },
};
