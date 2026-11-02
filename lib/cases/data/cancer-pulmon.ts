import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cancerPulmon: ClinicalCase = {
  id: "cancer-de-pulmon",
  level: 3,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 63, ageUnit: "años", sex: "M", context: "Fuma 30 cigarrillos por día desde los 15 años. Trabajó en una fábrica de frenos." },
  frequency: "frecuente",
  intro: "“Hace dos meses tengo una tos que no se va, y la semana pasada escupí con sangre. Bajé bastante de peso sin hacer dieta.”",
  vitals: { TA: "132/82 mmHg", FC: "88 lpm", FR: "18 rpm", "T°": "36,7 °C", "SatO₂": "94 %", Peso: "66 kg" },
  anamnesis: [
    act("tos", "¿Cambió tu tos de siempre?", "clave", "“Antes tosía a la mañana; ahora todo el día, distinta.”", "El cambio en la tos de un fumador es un signo de alarma."),
    act("hemoptisis", "¿Cuánta sangre escupiste?", "clave", "“Hilitos de sangre, varias veces.”", "Hemoptisis en un fumador mayor de 40: descartar cáncer de pulmón."),
    act("peso", "¿Cuánto peso bajaste?", "clave", "“Ocho kilos en tres meses.”", "Pérdida de más del 5 % del peso: síntoma constitucional."),
    act("exposicion", "¿Trabajaste con asbesto u otras sustancias?", "util", "“En una fábrica de pastillas de frenos, 15 años.”", "El asbesto se suma al tabaco y multiplica el riesgo."),
    act("dolor", "¿Te duelen los huesos, la cabeza, o ves algo raro?", "clave", "“Me duele la espalda hace unas semanas.”", "Buscar metástasis óseas."),
    act("tbc", "¿Tuviste contacto con tuberculosis, sudoración nocturna o fiebre?", "util", "“No, nada de fiebre.”", "La tuberculosis es un diferencial obligado en Argentina."),
    act("nietos", "¿Tenés nietos?", "neutro", "“Dos.”", "No orienta."),
  ],
  exam: [
    act("dedos", "Manos", "clave", "Hipocratismo digital.", "Se asocia a cáncer de pulmón (síndrome paraneoplásico) y otras enfermedades."),
    act("ganglios", "Ganglios supraclaviculares", "clave", "Adenopatía supraclavicular derecha dura, fija.", "Posible diseminación ganglionar."),
    act("pulmon", "Auscultación", "util", "Hipoventilación en el vértice derecho, sibilancia localizada.", "Obstrucción bronquial localizada."),
    act("ojo", "Ojos y cara", "util", "Ptosis y miosis derecha.", "Síndrome de Horner: tumor del vértice (Pancoast)."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Masa en el vértice derecho de 5 cm.", "Primer estudio."),
    study("Imágenes", "tc", "Tomografía de tórax, abdomen y cerebro con contraste", "clave", "Masa de 5,5 cm que invade la pared, adenopatías mediastinales; lesión lítica vertebral.", "Estadificación."),
    study("Otros", "biopsia", "Biopsia (broncoscopía, punción de la adenopatía o de la masa)", "clave", "Adenocarcinoma de pulmón.", "El diagnóstico es histológico y define el tratamiento."),
    study("Laboratorio", "molecular", "Estudios moleculares (EGFR, ALK, PD-L1)", "util", "Pendientes.", "Definen tratamientos dirigidos o inmunoterapia."),
    study("Laboratorio", "marcadores", "Marcadores tumorales para el diagnóstico", "innecesario", "No se realizó.", "No sirven para diagnosticar cáncer de pulmón."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cancer", "Cáncer de pulmón (adenocarcinoma) del vértice derecho, estadio IV por metástasis ósea", true, "Fumador intenso con exposición al asbesto, tos nueva, hemoptisis, pérdida de peso, Horner, masa del vértice con invasión y lesión vertebral, con biopsia de adenocarcinoma."),
      dx("tbc", "Tuberculosis pulmonar", false, "Sin fiebre ni sudores; la biopsia muestra adenocarcinoma."),
      dx("epoc", "Exacerbación de EPOC", false, "No explica la masa ni la pérdida de peso."),
      dx("neumonia", "Neumonía", false, "Sin fiebre y con masa persistente."),
      dx("mesotelioma", "Mesotelioma pleural", false, "Asociado al asbesto, pero afecta la pleura; la biopsia es adenocarcinoma pulmonar."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("comite", "Derivación a oncología y evaluación en comité de tumores", "clave", "Las decisiones se toman en equipo según estadio, molecular y estado funcional."),
      mg("tabaco", "Dejar de fumar", "clave", "Mejora la respuesta al tratamiento y la calidad de vida."),
      mg("paliativos", "Cuidados paliativos desde el diagnóstico, control del dolor y radioterapia en la vértebra", "clave", "Mejoran calidad de vida y supervivencia en estadio IV."),
      mg("comunicar", "Comunicar el diagnóstico con tiempo, privacidad y respeto por lo que quiere saber", "util", "La comunicación de malas noticias es parte del tratamiento."),
      mg("cirugia", "Cirugía de resección del tumor ya", "innecesario", "En estadio IV la cirugía no es el tratamiento estándar."),
      mg("esperar", "Repetir la radiografía en 3 meses", "riesgoso", "Retrasa el diagnóstico y el tratamiento."),
    ],
  },
  debrief: {
    diagnosis: "Adenocarcinoma de pulmón del vértice derecho (tumor de Pancoast con síndrome de Horner), estadio IV por metástasis ósea, en varón fumador de 63 años expuesto al asbesto.",
    pathologies: [
      { name: "Cáncer de pulmón (adenocarcinoma)", role: "principal", why: "Biopsia de adenocarcinoma." },
      { name: "Síndrome de Horner y metástasis ósea", role: "asociada", why: "Invasión local y diseminación." },
      { name: "Tuberculosis, EPOC, mesotelioma", role: "diferencial", why: "Otras causas de tos y masa pulmonar." },
    ],
    reasoning: [
      "Causa: carcinógenos del tabaco (y asbesto) que producen mutaciones en el epitelio bronquial.",
      "Mecanismo: acumulación de mutaciones que llevan a una proliferación sin control; el tumor del vértice invade la cadena simpática cervical y el plexo braquial.",
      "Consecuencia: tos, hemoptisis, pérdida de peso, síndrome de Horner, metástasis (hueso, cerebro, hígado, suprarrenales) y síndromes paraneoplásicos.",
    ],
    epidemiology:
      "El cáncer de pulmón es la principal causa de muerte por cáncer en Argentina, en varones y cada vez más en mujeres. Alrededor del 85 % de los casos se asocia al tabaco. La mayoría se diagnostica en estadios avanzados; el adenocarcinoma es el tipo más frecuente.",
    management: [
      "Sospecha en fumadores con síntomas respiratorios nuevos, hemoptisis o pérdida de peso.",
      "Imagen, biopsia y estadificación (TNM).",
      "Estadios tempranos: cirugía; avanzados: quimioterapia, terapias dirigidas o inmunoterapia, radioterapia paliativa.",
      "Cuidados paliativos tempranos y cesación tabáquica.",
    ],
    sources: ["Instituto Nacional del Cáncer — Guía de cáncer de pulmón.", "Ley 26.687 de control del tabaco."],
    pearls: ["Fumador + tos nueva + hemoptisis = descartar cáncer.", "Pancoast = Horner + dolor de hombro.", "Paliativos desde el diagnóstico."],
    pitfalls: ["Diagnosticar tuberculosis sin biopsia.", "Esperar con controles."],
    tribunal: [
      qa("¿Qué síndromes paraneoplásicos da el cáncer de pulmón?", "Hipercalcemia por PTHrP (carcinoma escamoso), SIADH y Cushing ectópico (células pequeñas), síndrome miasténico de Lambert-Eaton (células pequeñas), hipocratismo y osteoartropatía hipertrófica, y trombosis (Trousseau)."),
      qa("¿Qué es el síndrome de vena cava superior?", "La obstrucción de la vena cava superior, casi siempre por tumores (cáncer de pulmón, linfoma), con edema de cara, cuello y brazos, circulación colateral en el tórax y disnea; se trata la causa y se considera stent."),
      qa("¿Cómo se comunica una mala noticia (protocolo SPIKES)?", "Preparar el entorno, explorar qué sabe el paciente, preguntar cuánto quiere saber, dar la información en forma clara y gradual, responder a las emociones con empatía y acordar un plan y seguimiento."),
    ],
  },
};
