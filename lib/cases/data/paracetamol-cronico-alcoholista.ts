import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const paracetamolCronicoAlcoholista: ClinicalCase = {
  id: "paracetamol-supraterapeutico-alcoholista",
  level: 3,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 47, ageUnit: "años", sex: "M", context: "Toma alcohol a diario. Hace 5 días toma paracetamol cada 4 horas por un dolor de muelas, sin comer mucho." },
  frequency: "poco-frecuente",
  intro: "“Me duele la panza arriba a la derecha, vomito y me dijeron que estoy amarillo.”",
  vitals: { TA: "108/68 mmHg", FC: "104 lpm", FR: "18 rpm", "T°": "37,2 °C", "SatO₂": "97 %", Glucemia: "62 mg/dl" },
  anamnesis: [
    act("dosis", "¿Cuánto paracetamol tomó por día?", "clave", "“Dos pastillas de 1 gramo cada 4 horas.”", "Más de 10 g por día: supraterapéutico."),
    act("alcohol", "¿Cuánto alcohol?", "clave", "“Un litro de vino por día.”", "Agota glutatión."),
    act("ayuno", "¿Comió?", "clave", "“Poco, por la muela.”", "Ayuno potencia la toxicidad."),
    act("otros", "¿Otros analgésicos o antigripales con paracetamol?", "util", "“Un antigripal también.”", "Dosis oculta."),
    act("intencion", "¿Quiso hacerse daño?", "util", "“No, era por el dolor.”", "Accidental."),
    act("trabajo", "¿Trabaja?", "neutro", "“Soy remisero.”", "No orienta."),
  ],
  exam: [
    act("ictericia", "Piel", "clave", "Ictericia.", "Hepatitis."),
    act("higado", "Hígado", "clave", "Doloroso.", "Daño hepático."),
    act("neuro", "Asterixis", "util", "Ausente.", "Sin encefalopatía."),
  ],
  studies: [
    study("Laboratorio", "hepatograma", "Transaminasas, bilirrubina, RIN, glucemia, lactato", "clave", "ALT 4.200; RIN 2,1; glucemia 62.", "Hepatotoxicidad grave."),
    study("Laboratorio", "paracetamol", "Paracetamolemia", "clave", "Detectable.", "Confirma exposición; el nomograma no aplica."),
    study("Laboratorio", "virus", "Serologías virales y ecografía", "util", "Negativas.", "Excluye otras causas."),
    study("Otros", "nomograma", "Usar el nomograma de Rumack para decidir", "riesgoso", "No se usó.", "No sirve en ingestas repetidas."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("paracetamol-cronico", "Hepatotoxicidad por ingesta supraterapéutica repetida de paracetamol en alcohólico con ayuno", true, "Dosis altas varios días, alcohol y ayuno, transaminasas muy altas, RIN alto y paracetamol detectable."),
      dx("hepatitis-alcoholica", "Hepatitis alcohólica", false, "Transaminasas en miles: típicamente no superan 300 a 400."),
      dx("hepatitis-viral", "Hepatitis viral", false, "Serologías negativas."),
      dx("isquemica", "Hepatitis isquémica", false, "Sin shock."),
      dx("biliar", "Obstrucción biliar", false, "Ecografía normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("nac", "N-acetilcisteína EV de inmediato", "clave", "Indicada aunque haya pasado tiempo."),
      mg("glucosa", "Dextrosa y tiamina", "clave", "Hipoglucemia y alcohol."),
      mg("trasplante", "Contactar centro de trasplante si progresa", "clave", "Fallo hepático."),
      mg("dosis-segura", "Educación sobre dosis máximas", "util", "Prevención."),
      mg("mas-paracetamol", "Seguir con paracetamol para la muela", "riesgoso", "Más daño."),
      mg("aines", "Cambiar a ibuprofeno en dosis altas", "riesgoso", "Riesgo renal y sangrado con coagulopatía."),
    ],
  },
  debrief: {
    diagnosis: "Hepatotoxicidad por ingesta supraterapéutica repetida de paracetamol, en varón de 47 años con alcoholismo y ayuno.",
    pathologies: [
      { name: "Hepatotoxicidad por paracetamol", role: "principal", why: "Necrosis hepatocelular." },
      { name: "Alcoholismo y ayuno", role: "asociada", why: "Agotan glutatión." },
      { name: "Hepatitis alcohólica, viral", role: "diferencial", why: "Otras hepatitis." },
    ],
    reasoning: [
      "Causa: dosis altas repetidas sumadas a alcohol y ayuno.",
      "Mecanismo: el metabolito NAPQI se acumula sin glutatión.",
      "Consecuencia: necrosis centrolobulillar y fallo hepático.",
    ],
    epidemiology:
      "La sobredosis no intencional por paracetamol es frecuente y muchas veces pasa por dosis repetidas y productos combinados. El nomograma solo sirve para una ingesta única con hora conocida. Ante la duda se da N-acetilcisteína.",
    management: [
      "Dosis total diaria.",
      "Hepatograma y nivel.",
      "N-acetilcisteína.",
      "Centro de trasplante si progresa.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de intoxicaciones medicamentosas.", "AASLD — Acute Liver Failure Guidance."],
    pearls: ["Transaminasas en miles: pensá en paracetamol.", "Nomograma solo para ingesta única.", "NAC ante la duda."],
    pitfalls: ["Usar el nomograma.", "Atribuirlo al alcohol."],
    tribunal: [
      qa("¿Qué dosis diaria máxima se recomienda en alcohólicos?", "No más de 2 g por día."),
      qa("¿Qué son los criterios de King's College para paracetamol?", "pH menor de 7,3, o RIN mayor de 6,5 con creatinina mayor de 3,4 y encefalopatía grado III-IV."),
      qa("¿Hasta cuándo sirve la NAC?", "Es más eficaz en las primeras 8 horas, pero se indica también en presentaciones tardías."),
    ],
  },
};
