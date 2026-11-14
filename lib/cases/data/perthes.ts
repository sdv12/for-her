import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const perthes: ClinicalCase = {
  id: "enfermedad-perthes",
  level: 2,
  area: "Traumatología",
  setting: "Consultorio",
  patient: { age: 6, ageUnit: "años", sex: "M", context: "Muy activo. Estatura baja para la edad." },
  frequency: "poco-frecuente",
  intro: "“Hace dos meses renguea de a ratos, más después de jugar, y a veces dice que le duele el muslo.”",
  vitals: { FC: "92 lpm", "T°": "36,5 °C", Peso: "19 kg" },
  anamnesis: [
    act("evolucion", "¿Desde cuándo?", "clave", "“Dos meses, va y viene.”", "Subagudo."),
    act("fiebre", "¿Fiebre?", "clave", "“No.”", "No infeccioso."),
    act("dolor", "¿Dónde le duele?", "clave", "“Muslo y rodilla.”", "Dolor referido."),
    act("trauma", "¿Golpes?", "util", "“No.”", "Fractura."),
    act("previos", "¿Tuvo sinovitis antes?", "util", "“No.”", "Antecedente."),
    act("deporte", "¿Qué juega?", "neutro", "“Fútbol.”", "No orienta."),
  ],
  exam: [
    act("cadera", "Movilidad de cadera", "clave", "Limitación de la abducción y rotación interna derecha.", "Compromiso de cadera."),
    act("marcha", "Marcha", "clave", "Cojera antiálgica, Trendelenburg positivo.", "Debilidad del glúteo medio."),
    act("muslo", "Trofismo", "util", "Leve atrofia del muslo.", "Cronicidad."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de cadera frente y Lauenstein", "clave", "Epífisis femoral derecha aplanada, esclerosa y fragmentada.", "Perthes."),
    study("Laboratorio", "lab", "Hemograma y VSG", "util", "Normales.", "Excluye infección."),
    study("Imágenes", "rm", "RM de cadera", "util", "Necrosis del 50 % de la epífisis.", "Extensión."),
    study("Otros", "artroscopia", "Artroscopia diagnóstica", "riesgoso", "No se realizó.", "Innecesaria."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("perthes", "Enfermedad de Legg-Calvé-Perthes", true, "Varón de 6 años con cojera subaguda, limitación de abducción y rotación interna y epífisis fragmentada."),
      dx("sinovitis", "Sinovitis transitoria", false, "Es crónica con cambios radiológicos."),
      dx("epifisiolisis", "Epifisiólisis", false, "Edad y radiografía distintas."),
      dx("artritis-septica", "Artritis séptica", false, "Sin fiebre y laboratorio normal."),
      dx("tumor", "Tumor óseo", false, "Lesión epifisaria típica de necrosis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ortopedia", "Derivación a ortopedia infantil", "clave", "Plan de contención."),
      mg("movilidad", "Mantener la movilidad con kinesiología", "clave", "Preserva la esfericidad."),
      mg("actividad", "Evitar saltos e impacto en fase activa", "clave", "Protege la cabeza femoral."),
      mg("cirugia", "Osteotomía de contención en mayores de 6 o compromiso extenso", "util", "Según el caso."),
      mg("inmovilizar", "Inmovilización rígida prolongada", "riesgoso", "Rigidez."),
      mg("atb", "Antibióticos", "riesgoso", "No es infeccioso."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad de Legg-Calvé-Perthes de cadera derecha, en niño de 6 años.",
    pathologies: [
      { name: "Enfermedad de Perthes", role: "principal", why: "Necrosis avascular de la epífisis femoral." },
      { name: "Riesgo de artrosis precoz", role: "asociada", why: "Deformidad residual." },
      { name: "Sinovitis, epifisiólisis", role: "diferencial", why: "Otras causas de cojera." },
    ],
    reasoning: [
      "Causa: interrupción de la irrigación de la cabeza femoral.",
      "Mecanismo: necrosis, fragmentación y remodelación.",
      "Consecuencia: deformidad de la cabeza y artrosis si no se contiene.",
    ],
    epidemiology:
      "Afecta a niños de 4 a 8 años, más a varones bajos y activos. El pronóstico es mejor cuanto menor es la edad al inicio. El dolor referido a la rodilla retrasa el diagnóstico.",
    management: [
      "Radiografía.",
      "Ortopedia.",
      "Movilidad.",
      "Contención.",
    ],
    sources: ["Sociedad Argentina de Ortopedia y Traumatología Infantil — Perthes.", "POSNA — Legg-Calvé-Perthes Disease."],
    pearls: ["Cojera crónica entre 4 y 8 años.", "Abducción limitada.", "Rodilla que es cadera."],
    pitfalls: ["Llamarlo sinovitis repetida.", "Inmovilizar."],
    tribunal: [
      qa("¿Qué es el signo de Trendelenburg?", "Caída de la pelvis contralateral al apoyar en la pierna afectada por debilidad del glúteo medio."),
      qa("¿Qué factor pronóstico es el más importante?", "La edad de inicio: menores de 6 años tienen mejor evolución."),
      qa("¿Qué fases tiene?", "Necrosis, fragmentación, reosificación y remodelación."),
    ],
  },
};
