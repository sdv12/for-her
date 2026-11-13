import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hipotiroidismoAdultoMayor: ClinicalCase = {
  id: "hipotiroidismo-adulto-mayor",
  level: 2,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 81, ageUnit: "años", sex: "F", context: "Cardiopatía isquémica con angina estable. La trae el hijo porque “está perdida”." },
  frequency: "frecuente",
  intro: "“Hace meses está lenta, se olvida de todo, tiene frío, está constipada y no quiere salir.” (relata el hijo)",
  vitals: { TA: "146/84 mmHg", FC: "54 lpm", "T°": "35,9 °C", Peso: "64 kg" },
  anamnesis: [
    act("cognitivo", "¿Cómo empezó el olvido?", "clave", "“De a poco, en meses; antes hacía todo sola.”", "Deterioro subagudo."),
    act("frio", "¿Tiene frío, piel seca, se le cae el pelo?", "clave", "“Siempre tiene frío.”", "Hipotiroidismo."),
    act("farmacos", "¿Qué toma? ¿Le controlaron la tiroides alguna vez?", "clave", "“Aspirina y atenolol. Hace años le dijeron que tenía la tiroides un poco baja y no volvió.”", "Hashimoto sin seguimiento."),
    act("animo", "¿Está triste?", "util", "“Apática.”", "Depresión."),
    act("caidas", "¿Se cayó?", "util", "“No.”", "Hematoma subdural."),
    act("barrio", "¿Dónde vive?", "neutro", "“En Alta Córdoba.”", "No orienta."),
  ],
  exam: [
    act("reflejos", "Reflejos aquilianos", "clave", "Fase de relajación lenta.", "Hipotiroidismo."),
    act("piel", "Piel y cara", "clave", "Piel seca y pálida, edema periorbitario.", "Mixedema."),
    act("cognitivo-ex", "MMSE", "util", "21/30 con lentitud.", "Deterioro."),
  ],
  studies: [
    study("Laboratorio", "tsh", "TSH, T4 libre y anticuerpos anti-TPO", "clave", "TSH 38; T4L baja; anti-TPO muy positivos.", "Hipotiroidismo primario autoinmune."),
    study("Laboratorio", "demencia", "B12, calcio, glucemia, sodio, función renal", "clave", "Na 132; resto normal.", "Otras causas reversibles."),
    study("Electrofisiología", "ecg", "ECG", "util", "Bradicardia sinusal, bajo voltaje.", "Efecto cardíaco."),
    study("Imágenes", "pet", "PET cerebral", "innecesario", "No se realizó.", "Causa reversible identificada."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hipotiroidismo", "Hipotiroidismo primario por tiroiditis de Hashimoto con deterioro cognitivo reversible", true, "Síntomas de hipotiroidismo, TSH muy alta, T4L baja y anti-TPO positivos."),
      dx("alzheimer", "Enfermedad de Alzheimer", false, "Hay causa reversible."),
      dx("depresion", "Depresión del adulto mayor", false, "Laboratorio tiroideo explica el cuadro."),
      dx("subclinico", "Hipotiroidismo subclínico", false, "T4L baja."),
      dx("eutiroideo-enfermo", "Síndrome del eutiroideo enfermo", false, "TSH muy alta."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("levo-baja", "Levotiroxina en dosis inicial baja (25 µg) con aumento lento", "clave", "Cardiopatía isquémica."),
      mg("control-tsh", "TSH a las 6 a 8 semanas", "clave", "Ajuste."),
      mg("atenolol", "Revisar el atenolol por la bradicardia", "clave", "Suma bradicardia."),
      mg("reevaluar", "Reevaluar la cognición con eutiroidismo", "util", "Ver si revierte."),
      mg("levo-plena", "Dosis plena de entrada", "riesgoso", "Angina o arritmias."),
      mg("anticolinesterasico", "Iniciar donepecilo", "riesgoso", "No es Alzheimer y empeora la bradicardia."),
    ],
  },
  debrief: {
    diagnosis: "Hipotiroidismo primario por tiroiditis de Hashimoto sin seguimiento, con deterioro cognitivo reversible, en mujer de 81 años con cardiopatía isquémica.",
    pathologies: [
      { name: "Hipotiroidismo primario", role: "principal", why: "Déficit de hormona tiroidea." },
      { name: "Cardiopatía isquémica", role: "asociada", why: "Limita la velocidad del reemplazo." },
      { name: "Alzheimer, depresión", role: "diferencial", why: "Causas de deterioro." },
    ],
    reasoning: [
      "Causa: tiroiditis autoinmune de Hashimoto que destruye la glándula de forma progresiva.",
      "Mecanismo: déficit de hormona que enlentece el metabolismo y la función cerebral.",
      "Consecuencia: deterioro cognitivo, bradicardia, hiponatremia y riesgo de coma mixedematoso.",
    ],
    epidemiology:
      "El hipotiroidismo es frecuente en mujeres mayores y se confunde con envejecimiento o demencia. Un hipotiroidismo subclínico sin seguimiento puede progresar en silencio. Toda evaluación de deterioro cognitivo incluye TSH.",
    management: [
      "TSH.",
      "Levotiroxina en dosis bajas.",
      "Revisar bradicardizantes.",
      "Reevaluar.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Hipotiroidismo.", "ATA — Guidelines for the Treatment of Hypothyroidism."],
    pearls: ["Deterioro: pedí TSH.", "Seguí el subclínico.", "Empezá bajo en el anciano."],
    pitfalls: ["Rotular demencia.", "Dosis plena."],
    tribunal: [
      qa("¿Qué indican los anti-TPO positivos?", "Tiroiditis autoinmune y mayor riesgo de progresar de subclínico a hipotiroidismo franco."),
      qa("¿Cómo se toma la levotiroxina?", "En ayunas, 30 a 60 minutos antes del desayuno, separada del calcio y el hierro."),
      qa("¿Qué demencias reversibles se buscan siempre?", "Hipotiroidismo, déficit de B12, neurosífilis, depresión, hematoma subdural e hidrocefalia normotensiva."),
    ],
  },
};
