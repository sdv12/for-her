import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const intoxicacionLitio: ClinicalCase = {
  id: "intoxicacion-cronica-litio",
  level: 3,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 56, ageUnit: "años", sex: "F", context: "Trastorno bipolar con litio hace 15 años. Le agregaron enalapril e hidroclorotiazida hace un mes." },
  frequency: "poco-frecuente",
  intro: "“Hace unos días está temblorosa, se tambalea, habla arrastrado y tuvo diarrea.” (relata el marido)",
  vitals: { TA: "116/70 mmHg", FC: "62 lpm", FR: "16 rpm", "T°": "36,6 °C", "SatO₂": "97 %", Glasgow: "13/15" },
  anamnesis: [
    act("farmacos", "¿Cambios en la medicación?", "clave", "“Enalapril y un diurético.”", "Reducen la eliminación de litio."),
    act("sintomas", "¿Desde cuándo y cómo?", "clave", "“Temblor y torpeza progresivos.”", "Intoxicación crónica."),
    act("hidratacion", "¿Diarrea, vómitos, comió poco?", "clave", "“Diarrea.”", "Deshidratación."),
    act("aines", "¿Antiinflamatorios?", "util", "“Ibuprofeno.”", "Otro agravante."),
    act("tiroides", "¿Controles de tiroides y riñón?", "util", "“Hace tiempo no.”", "Efectos crónicos."),
    act("arte", "¿Qué te gusta?", "neutro", "“Pintar.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico", "clave", "Temblor grueso, ataxia, disartria, mioclonías.", "Toxicidad neurológica."),
    act("hidratacion-ex", "Mucosas", "clave", "Secas.", "Deshidratación."),
    act("tiroides-ex", "Tiroides", "util", "Bocio leve.", "Efecto crónico."),
  ],
  studies: [
    study("Laboratorio", "litemia", "Litemia", "clave", "2,8 mEq/l.", "Tóxica."),
    study("Laboratorio", "lab", "Creatinina, ionograma, calcio, TSH", "clave", "Creatinina 1,9; sodio 146; TSH alta.", "Factores y efectos."),
    study("Electrofisiología", "ecg", "ECG", "clave", "Bradicardia sinusal, T aplanadas.", "Cardiotoxicidad."),
    study("Otros", "carbon", "Carbón activado", "innecesario", "No se realizó.", "No adsorbe litio."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("litio", "Intoxicación crónica por litio por IECA, tiazida y deshidratación", true, "Neurotoxicidad, litemia de 2,8 y fármacos que reducen su eliminación."),
      dx("acv", "ACV cerebeloso", false, "Simétrico, con litemia alta."),
      dx("snm", "Síndrome neuroléptico maligno", false, "Sin fiebre ni rigidez."),
      dx("serotoninergico", "Síndrome serotoninérgico", false, "Sin hipertermia ni hiperreflexia marcada por otro fármaco."),
      dx("psicosis", "Descompensación bipolar", false, "Hay signos neurológicos objetivos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("suspender", "Suspender litio, IECA, tiazida e ibuprofeno", "clave", "Retira la causa."),
      mg("hidratar", "Solución fisiológica", "clave", "Mejora la eliminación."),
      mg("hemodialisis", "Hemodiálisis por síntomas neurológicos e IR", "clave", "Criterios EXTRIP."),
      mg("psiquiatria", "Plan con psiquiatría para el estabilizador", "util", "Evita recaída."),
      mg("carbon-ox", "Carbón activado repetido", "riesgoso", "Inútil y riesgo de aspiración."),
      mg("furosemida", "Furosemida para eliminar", "riesgoso", "Deshidrata y retiene litio."),
    ],
  },
  debrief: {
    diagnosis: "Intoxicación crónica por litio por interacción con IECA y tiazida, deshidratación e IRA, en mujer de 56 años.",
    pathologies: [
      { name: "Intoxicación por litio", role: "principal", why: "Neurotoxicidad." },
      { name: "IRA e hipotiroidismo", role: "asociada", why: "Efectos y causa." },
      { name: "ACV, SNM, serotoninérgico", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: menor eliminación renal por fármacos y deshidratación.",
      "Mecanismo: el litio se reabsorbe junto con el sodio.",
      "Consecuencia: neurotoxicidad, a veces irreversible.",
    ],
    epidemiology:
      "El litio tiene margen terapéutico estrecho. Las intoxicaciones crónicas son más frecuentes que las agudas y se asocian a IECA, ARA II, tiazidas, AINE y deshidratación. Puede quedar daño cerebeloso permanente (SILENT).",
    management: [
      "Litemia.",
      "Suspender.",
      "Hidratar.",
      "Diálisis si corresponde.",
    ],
    sources: ["Centro Nacional de Intoxicaciones (Hospital Posadas) — Intoxicación por litio.", "EXTRIP Workgroup — Recommendations for Lithium Poisoning."],
    pearls: ["IECA, tiazida, AINE: suben el litio.", "Carbón no sirve.", "Diálisis."],
    pitfalls: ["Dar furosemida.", "Pensar en psiquiatría."],
    tribunal: [
      qa("¿Qué efectos crónicos da el litio?", "Hipotiroidismo, diabetes insípida nefrogénica, enfermedad renal crónica e hiperparatiroidismo."),
      qa("¿Cuál es el rango terapéutico?", "Cerca de 0,6 a 1,2 mEq/l, según la fase."),
      qa("¿Qué es el síndrome SILENT?", "Secuelas neurológicas persistentes, sobre todo cerebelosas, tras una intoxicación por litio."),
    ],
  },
};
