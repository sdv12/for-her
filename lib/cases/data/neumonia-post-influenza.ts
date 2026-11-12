import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const neumoniaPostInfluenza: ClinicalCase = {
  id: "neumonia-estafilococica-post-influenza",
  level: 3,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 38, ageUnit: "años", sex: "M", context: "Julio. Gripe hace una semana con mejoría, y recayó. Sin vacuna antigripal." },
  frequency: "frecuente",
  intro: "“Tuve gripe, mejoré y hace dos días me volvió la fiebre muy alta, toso con sangre y me falta el aire.”",
  vitals: { TA: "92/56 mmHg", FC: "124 lpm", FR: "32 rpm", "T°": "39,8 °C", "SatO₂": "86 %" },
  anamnesis: [
    act("bifasico", "¿Mejoró y luego empeoró?", "clave", "“Sí.”", "Sobreinfección bacteriana."),
    act("hemoptisis", "¿Sangre con la tos?", "clave", "“Esputo rojizo.”", "Necrosis."),
    act("vacunas", "¿Vacuna antigripal o antineumocócica?", "clave", "“Ninguna.”", "Prevención."),
    act("piel", "¿Forúnculos o drogas inyectables?", "util", "“Un forúnculo hace un mes.”", "SAMR."),
    act("contactos", "¿Familia con gripe?", "util", "“Los chicos.”", "Brote."),
    act("trabajo", "¿Qué hacés?", "neutro", "“Soy plomero.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Tórax", "clave", "Crepitantes bilaterales.", "Bilateral."),
    act("perfusion", "Perfusión", "clave", "Fría, relleno de 4 segundos.", "Shock."),
    act("piel-ex", "Piel", "util", "Cicatriz de forúnculo.", "Puerta."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía o TC de tórax", "clave", "Consolidaciones bilaterales con cavitaciones.", "Necrotizante."),
    study("Microbiología", "cultivos", "Hemocultivos, esputo y PCR de influenza", "clave", "S. aureus resistente a meticilina de la comunidad; influenza A positiva.", "Etiología."),
    study("Laboratorio", "lab", "Lactato, hemograma, función renal", "clave", "Lactato 4,2; leucopenia.", "Gravedad."),
    study("Otros", "broncoscopia-temprana", "Broncoscopía antes de antibióticos", "riesgoso", "No se realizó.", "Demora en shock."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("nac", "Neumonía necrotizante grave por S. aureus resistente a meticilina tras influenza, con shock séptico", true, "Curso bifásico, cavitaciones, hemoptisis y cultivo."),
      dx("influenza-sola", "Neumonía viral por influenza", false, "Cultivo y cavitación."),
      dx("tbc", "Tuberculosis", false, "Curso agudo."),
      dx("neumococo", "Neumonía neumocócica", false, "Cultivo."),
      dx("tep", "TEP séptico", false, "Sin foco endovascular."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("vanco", "Vancomicina o linezolid más betalactámico hasta el cultivo", "clave", "Cubre SAMR."),
      mg("oseltamivir", "Oseltamivir", "clave", "Influenza grave."),
      mg("uti", "Terapia intensiva, oxígeno, volumen y vasopresores", "clave", "Shock."),
      mg("vacunas", "Vacunas antigripal y antineumocócica al alta", "util", "Prevención."),
      mg("amoxi", "Amoxicilina y alta", "riesgoso", "Grave y no cubre."),
      mg("corticoides-altos", "Corticoides en altas dosis", "riesgoso", "Empeoran la influenza."),
    ],
  },
  debrief: {
    diagnosis: "Neumonía necrotizante por S. aureus resistente a meticilina tras influenza A, con shock séptico, en varón de 38 años.",
    pathologies: [
      { name: "Neumonía de la comunidad grave", role: "principal", why: "Necrotizante." },
      { name: "Influenza", role: "asociada", why: "Predispone." },
      { name: "Influenza sola, TBC, neumococo", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: sobreinfección por S. aureus tras daño del epitelio viral.",
      "Mecanismo: toxinas como la leucocidina de Panton-Valentine destruyen el parénquima.",
      "Consecuencia: cavitación, hemoptisis y shock.",
    ],
    epidemiology:
      "En temporada de gripe, aumentan las neumonías bacterianas graves en jóvenes. El SAMR de la comunidad es frecuente en Argentina y se asocia a infecciones de piel. La vacunación antigripal reduce el riesgo.",
    management: [
      "Sospechar con curso bifásico.",
      "Cubrir SAMR.",
      "Antiviral.",
      "UTI.",
    ],
    sources: ["Sociedad Argentina de Infectología — Neumonía de la comunidad.", "Ministerio de Salud de la Nación — Vigilancia de influenza."],
    pearls: ["Mejora y recae: bacteriana.", "Cavitación en joven: S. aureus.", "Oseltamivir."],
    pitfalls: ["No cubrir SAMR.", "Olvidar el antiviral."],
    tribunal: [
      qa("¿Qué gérmenes complican la influenza?", "S. aureus, neumococo y Haemophilus influenzae."),
      qa("¿A quiénes se vacuna contra la gripe en Argentina?", "Personal de salud, embarazadas, niños de 6 a 24 meses, mayores de 65 y personas con factores de riesgo."),
      qa("¿Qué es la leucocidina de Panton-Valentine?", "Una toxina del S. aureus que destruye leucocitos y tejido."),
    ],
  },
};
