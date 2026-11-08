import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const acvCardioembolico: ClinicalCase = {
  id: "acv-isquemico-cardioembolico-fibrilacion",
  level: 3,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 77, ageUnit: "años", sex: "M", context: "Hipertenso, fibrilación auricular. Dejó de tomar el anticoagulante hace 2 meses por un moretón." },
  frequency: "muy-frecuente",
  intro: "“Hace una hora y media desayunando se le cayó la taza, no habla y la cara se le torció.” (relata la esposa)",
  vitals: { TA: "178/96 mmHg", FC: "108 lpm", FR: "18 rpm", "T°": "36,5 °C", "SatO₂": "96 %", Glucemia: "126 mg/dl", Glasgow: "13/15" },
  anamnesis: [
    act("hora", "¿A qué hora estaba bien por última vez?", "clave", "“A las 8, hora y media atrás.”", "Ventana."),
    act("anticoag", "¿Toma anticoagulante? ¿Última dosis?", "clave", "“Lo dejó hace dos meses.”", "Causa y candidato."),
    act("contraindicaciones", "¿Cirugía, ACV o sangrado reciente?", "clave", "“No.”", "Trombólisis."),
    act("glucosa", "¿Hipoglucemia?", "util", "“No.”", "Simulador."),
    act("convulsion", "¿Hubo convulsión?", "util", "“No.”", "Simulador."),
    act("pan", "¿Qué desayunó?", "neutro", "“Mate y tostadas.”", "No orienta."),
  ],
  exam: [
    act("nihss", "NIHSS", "clave", "Afasia, hemiparesia derecha: 16.", "Grave."),
    act("pulso", "Pulso", "clave", "Irregular.", "FA."),
    act("glasgow", "Vía aérea", "util", "Protegida.", "Soporte."),
  ],
  studies: [
    study("Imágenes", "tc", "TC de cerebro sin contraste inmediata", "clave", "Sin sangrado; ASPECTS 9.", "Primer paso."),
    study("Imágenes", "angio", "AngioTC de cuello y cerebro", "clave", "Oclusión de arteria cerebral media izquierda.", "Trombectomía."),
    study("Laboratorio", "lab", "Glucemia, RIN, plaquetas", "clave", "RIN 1,0; plaquetas normales.", "Trombólisis."),
    study("Electrofisiología", "ecg", "ECG", "clave", "FA.", "Causa."),
    study("Imágenes", "rmn-demora", "Pedir RM antes de actuar", "riesgoso", "No se realizó.", "Pierde tiempo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("acv", "ACV isquémico cardioembólico de arteria cerebral media izquierda por FA sin anticoagulación", true, "Déficit súbito, FA, TC sin sangre y oclusión."),
      dx("hemorragico", "ACV hemorrágico", false, "TC sin sangre."),
      dx("todd", "Parálisis de Todd", false, "Sin convulsión."),
      dx("hipoglucemia", "Hipoglucemia", false, "Glucemia normal."),
      dx("migrana", "Migraña con aura", false, "Oclusión demostrada."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("rtpa", "Trombólisis EV dentro de las 4,5 horas", "clave", "Reperfusión."),
      mg("trombectomia", "Trombectomía mecánica", "clave", "Gran vaso."),
      mg("unidad", "Unidad de ACV", "clave", "Reduce mortalidad."),
      mg("anticoag", "Anticoagular según evolución, educar sobre adherencia", "clave", "Prevención."),
      mg("bajar-ta", "Bajar la presión a 120/80 de entrada", "riesgoso", "Reduce la perfusión."),
      mg("aspirina-todo", "Aspirina en las primeras 24 h tras trombolisis", "riesgoso", "Sangrado."),
    ],
  },
  debrief: {
    diagnosis: "ACV isquémico cardioembólico de arteria cerebral media izquierda por FA sin anticoagulación, en varón de 77 años.",
    pathologies: [
      { name: "ACV isquémico", role: "principal", why: "Oclusión arterial." },
      { name: "Fibrilación auricular", role: "asociada", why: "Fuente." },
      { name: "Hemorragia, Todd, hipoglucemia", role: "diferencial", why: "Simuladores." },
    ],
    reasoning: [
      "Causa: trombo auricular por FA.",
      "Mecanismo: embolia y oclusión.",
      "Consecuencia: infarto con penumbra salvable.",
    ],
    epidemiology:
      "El ACV es una de las primeras causas de discapacidad en Argentina. La fibrilación auricular es muy frecuente y da ACV más graves. Los abandonos del anticoagulante por temor a moretones son evitables con buena educación, y las unidades de ACV mejoran el pronóstico.",
    management: [
      "Código ACV.",
      "TC y reperfusión.",
      "Unidad y neurología.",
      "Prevención con anticoagulación.",
    ],
    sources: ["Sociedad Neurológica Argentina — Guías de ACV.", "AHA/ASA — Early Management of Acute Ischemic Stroke."],
    pearls: ["Tiempo es cerebro.", "Última vez que estuvo bien.", "FA más NIHSS alto: gran vaso."],
    pitfalls: ["Bajar la presión.", "Demorar."],
    tribunal: [
      qa("¿Qué presión se tolera antes de trombolizar?", "Por debajo de 185/110 para trombolisis; sin trombolisis, se tolera hasta 220/120."),
      qa("¿Cuáles son las contraindicaciones de trombólisis?", "Sangrado en TC, ACV o trauma reciente, cirugía mayor, plaquetas menores de 100.000 y RIN mayor de 1,7."),
      qa("¿Qué síntomas da la arteria cerebral media izquierda?", "Hemiparesia y hemianestesia derechas a predominio braquiofacial, con afasia."),
    ],
  },
};
