import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const fibrosisQuistica: ClinicalCase = {
  id: "fibrosis-quistica",
  level: 3,
  area: "Pediatría",
  setting: "Consultorio",
  patient: { age: 3, ageUnit: "años", sex: "F", context: "Nació en otra provincia, sin datos de pesquisa neonatal. Tres internaciones por neumonía." },
  frequency: "poco-frecuente",
  intro: "“Tiene tos con catarro desde siempre, no aumenta de peso aunque come mucho, y hace caca grasosa y con mal olor. La besé y me pareció salada.” (relata la madre)",
  vitals: { FC: "112 lpm", FR: "32 rpm", "T°": "36,8 °C", "SatO₂": "94 %", Peso: "10,8 kg" },
  anamnesis: [
    act("respiratorio", "¿Cuántas infecciones tuvo? ¿Qué gérmenes?", "clave", "“Tres neumonías, tos crónica.”", "Infecciones respiratorias recurrentes."),
    act("heces", "¿Cómo son las deposiciones?", "clave", "“Grasosas, flotan, muy feas.”", "Insuficiencia pancreática."),
    act("recien", "¿Tuvo íleo al nacer, ictericia prolongada, prolapso rectal?", "clave", "“Tardó en hacer meconio.”", "Íleo meconial: muy específico."),
    act("pesquisa", "¿Se hizo la prueba del talón?", "util", "“No sabemos el resultado.”", "En Argentina incluye fibrosis quística."),
    act("familia", "¿Algún familiar parecido?", "util", "“Un primo que murió chico.”", "Autosómica recesiva."),
    act("juguete", "¿Qué le gusta jugar?", "neutro", "“Muñecas.”", "No orienta."),
  ],
  exam: [
    act("crecimiento", "Peso y talla en percentiles", "clave", "Peso por debajo del percentil 3, talla en percentil 10.", "Falla de crecimiento."),
    act("dedos", "Dedos y tórax", "clave", "Hipocratismo digital, tórax en tonel.", "Enfermedad pulmonar crónica."),
    act("pulmon", "Auscultación", "util", "Rales gruesos, sibilancias.", "Bronquiectasias."),
  ],
  studies: [
    study("Laboratorio", "sudor", "Test del sudor", "clave", "Cloro 92 mEq/l (dos pruebas).", "Mayor o igual a 60: diagnóstico."),
    study("Laboratorio", "elastasa", "Elastasa fecal y estudio genético (CFTR)", "clave", "Elastasa baja; dos mutaciones F508del.", "Confirma insuficiencia pancreática y mutación."),
    study("Microbiología", "cultivo", "Cultivo de secreciones", "clave", "S. aureus y Pseudomonas aeruginosa.", "Gérmenes típicos."),
    study("Imágenes", "tac", "Radiografía o TC de tórax de baja dosis", "util", "Bronquiectasias en lóbulos superiores.", "Evalúa extensión."),
    study("Laboratorio", "asma", "Inmunoglobulina E como único estudio", "innecesario", "Normal.", "No orienta la causa de base."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("fq", "Fibrosis quística con insuficiencia pancreática y enfermedad pulmonar crónica", true, "Neumonías recurrentes, esteatorrea, retraso del crecimiento, piel salada, test del sudor positivo y mutación F508del."),
      dx("asma", "Asma", false, "No explica la esteatorrea, el hipocratismo ni el cloro alto."),
      dx("celiaca", "Celiaquía", false, "No explica el compromiso pulmonar crónico."),
      dx("inmuno", "Inmunodeficiencia", false, "El test del sudor explica el cuadro."),
      dx("ciliar", "Discinesia ciliar primaria", false, "Da otitis y situs inversus, sin insuficiencia pancreática."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("centro", "Derivar a un centro de fibrosis quística", "clave", "El tratamiento multidisciplinario mejora la sobrevida."),
      mg("enzimas", "Enzimas pancreáticas, dieta hipercalórica y vitaminas A, D, E y K", "clave", "Corrige la malabsorción."),
      mg("kinesio", "Kinesioterapia respiratoria y dornasa alfa o solución hipertónica", "clave", "Elimina secreciones."),
      mg("atb", "Erradicar Pseudomonas con antibióticos inhalados y tratar exacerbaciones", "clave", "Retrasa el daño."),
      mg("moduladores", "Evaluar moduladores de CFTR", "util", "Actúan sobre la proteína defectuosa."),
      mg("sin-sal", "Dieta sin sal", "riesgoso", "Pierden sal por el sudor: riesgo de deshidratación hiponatrémica."),
    ],
  },
  debrief: {
    diagnosis: "Fibrosis quística (F508del homocigota) con enfermedad pulmonar crónica e insuficiencia pancreática, en niña de 3 años.",
    pathologies: [
      { name: "Fibrosis quística", role: "principal", why: "Mutación del canal CFTR." },
      { name: "Bronquiectasias, insuficiencia pancreática", role: "asociada", why: "Compromiso multisistémico." },
      { name: "Asma, celiaquía, discinesia ciliar", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: enfermedad autosómica recesiva por mutaciones de CFTR.",
      "Mecanismo: secreciones espesas por fallas en el transporte de cloro.",
      "Consecuencia: obstrucción bronquial y pancreática, infecciones y desnutrición.",
    ],
    epidemiology:
      "Es una de las enfermedades genéticas graves más frecuentes en personas de ascendencia europea. En Argentina se incluye en la pesquisa neonatal por ley. El diagnóstico temprano y los moduladores cambiaron mucho la expectativa de vida.",
    management: [
      "Pesquisa neonatal y test del sudor.",
      "Enzimas y nutrición.",
      "Kinesioterapia y antibióticos.",
      "Moduladores y consejo genético.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Guía de fibrosis quística.", "Ministerio de Salud de la Nación — Programa de fortalecimiento de la detección precoz."],
    pearls: ["Tos crónica + esteatorrea + falla de crecimiento.", "Sudor: cloro de 60 o más.", "Pseudomonas en un niño: pensá en FQ."],
    pitfalls: ["Etiquetarla como asma.", "Reducir la sal."],
    tribunal: [
      qa("¿Qué mide el test del sudor?", "La concentración de cloro: 60 mEq/l o más es diagnóstico, entre 30 y 59 es dudoso, y menor de 30 lo hace improbable."),
      qa("¿Cuál es la herencia?", "Autosómica recesiva, con riesgo de 25 % para cada hijo de dos portadores."),
      qa("¿Por qué pueden ser infértiles los varones?", "Por agenesia bilateral de los conductos deferentes; la producción de espermatozoides se conserva."),
    ],
  },
};
