import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const quemaduraNaftaAdolescente: ClinicalCase = {
  id: "quemadura-nafta-adolescente",
  level: 3,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 17, ageUnit: "años", sex: "M", context: "Pesa 65 kg. Intentó avivar un fuego con nafta en un asado. Hace 1 hora." },
  frequency: "frecuente",
  intro: "“Tiré nafta y me explotó en la cara y los brazos. Me arde muchísimo.”",
  vitals: { TA: "128/80 mmHg", FC: "118 lpm", FR: "22 rpm", "SatO₂": "97 %", "T°": "36,8 °C" },
  anamnesis: [
    act("cerrado", "¿Estaba en un lugar cerrado? ¿Respiró humo?", "clave", "“Al aire libre.”", "Menos riesgo de inhalación, igual se evalúa."),
    act("voz", "¿Cambió la voz? ¿Le cuesta tragar o respirar?", "clave", "“No.”", "Signos de compromiso de vía aérea."),
    act("hora", "¿A qué hora fue?", "clave", "“Hace una hora.”", "La reposición se calcula desde el momento de la quemadura."),
    act("agua", "¿Qué le pusieron?", "util", "“Agua fría y pasta dental.”", "La pasta dental no se recomienda."),
    act("vacuna", "¿Vacuna antitetánica?", "util", "“La de los 11 años.”", "Al día."),
    act("asado", "¿Qué estaban asando?", "neutro", "“Vacío.”", "No orienta."),
  ],
  exam: [
    act("extension", "Superficie quemada por regla de los 9", "clave", "Cara (4,5 %), ambos antebrazos y manos (9 %) y parte anterior de tórax (5 %): 18,5 %.", "Más del 15 % en adolescente: reposición endovenosa."),
    act("profundidad", "Profundidad", "clave", "Ampollas y lecho rosado doloroso en cara y tórax; zonas blanquecinas indoloras en antebrazos.", "AB superficial y AB profunda/B."),
    act("via-aerea", "Vía aérea", "clave", "Vibrisas chamuscadas, sin hollín en boca, sin estridor.", "Vigilar."),
    act("circular", "Quemaduras circulares", "util", "Antebrazo derecho casi circular, pulsos presentes.", "Riesgo de compromiso circulatorio."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, ionograma, función renal, CPK, gases con carboxihemoglobina", "clave", "Hto 48 %, COHb 2 %.", "Basal."),
    study("Otros", "diuresis", "Sonda vesical y diuresis horaria", "clave", "0,6 ml/kg/h.", "Guía la reposición."),
    study("Otros", "laringoscopia", "Laringoscopía si hay dudas en la vía aérea", "util", "Sin edema.", "Evalúa la necesidad de intubar."),
    study("Imágenes", "tac", "TC de cuerpo entero", "innecesario", "No se pidió.", "Sin trauma asociado."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("quemadura-grave", "Quemadura térmica por llama del 18,5 % de superficie corporal, AB superficial y profunda, en zonas especiales (cara y manos)", true, "Superficie mayor del 15 %, profundidad mixta y compromiso de cara y manos."),
      dx("leve", "Quemadura leve ambulatoria", false, "Extensión y zonas especiales requieren internación."),
      dx("inhalatoria", "Lesión inhalatoria grave", false, "Al aire libre, sin hollín ni estridor; igual se vigila."),
      dx("quimica", "Quemadura química", false, "Es por llama, aunque haya combustible."),
      dx("electrica", "Quemadura eléctrica", false, "No hubo corriente."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("parkland", "Ringer lactato según Parkland: 4 ml × kg × % SCQ, la mitad en las primeras 8 horas desde la quemadura", "clave", "Unos 4.800 ml en 24 horas, ajustando por diuresis."),
      mg("analgesia", "Analgesia con opioides", "clave", "Dolor intenso."),
      mg("derivar", "Derivar a un centro de quemados", "clave", "Cara, manos y más del 10–15 %."),
      mg("curacion", "Curación con apósitos limpios, sin pasta dental", "clave", "Evita infección."),
      mg("circular-vigilar", "Vigilar pulsos y considerar escarotomía en la quemadura circular", "util", "Síndrome compartimental."),
      mg("hielo", "Hielo directo", "riesgoso", "Profundiza la lesión e hipotermia."),
      mg("atb-profilactico", "Antibióticos sistémicos profilácticos", "innecesario", "No reducen la infección y seleccionan resistencias."),
    ],
  },
  debrief: {
    diagnosis: "Quemadura por llama del 18,5 % de superficie, de profundidad mixta, con compromiso de cara y manos, en un adolescente de 17 años.",
    pathologies: [
      { name: "Quemadura térmica extensa", role: "principal", why: "Requiere reposición y centro especializado." },
      { name: "Riesgo de lesión inhalatoria", role: "asociada", why: "Vibrisas chamuscadas." },
      { name: "Síndrome compartimental por escara circular", role: "asociada", why: "Antebrazo." },
    ],
    reasoning: [
      "Causa: deflagración de nafta.",
      "Mecanismo: daño térmico con aumento de permeabilidad capilar y pérdida de plasma.",
      "Consecuencia: shock hipovolémico si no se repone, infección y secuelas funcionales.",
    ],
    epidemiology:
      "Las quemaduras por combustible al encender fuegos son una causa frecuente en varones jóvenes en Argentina, sobre todo en asados y fogatas. Cara y manos son zonas especiales por el riesgo funcional y estético.",
    management: [
      "ABC y vía aérea.",
      "Calcular superficie y profundidad.",
      "Parkland y diuresis.",
      "Analgesia, curación y derivación.",
    ],
    sources: ["Asociación Argentina de Quemaduras — Guía de manejo inicial del quemado.", "American Burn Association — Advanced Burn Life Support."],
    pearls: ["Regla de los 9.", "Parkland desde la hora de la quemadura.", "Diuresis 0,5–1 ml/kg/h."],
    pitfalls: ["Hielo o pasta dental.", "Calcular desde la llegada al hospital."],
    tribunal: [
      qa("¿Qué es la fórmula de Parkland?", "4 ml de Ringer lactato por kg por % de superficie quemada en 24 horas, la mitad en las primeras 8 horas desde la quemadura."),
      qa("¿Qué es la clasificación de Benaim?", "Clasifica la profundidad en A (superficial), AB (intermedia) y B (profunda)."),
      qa("¿Qué signos sugieren lesión inhalatoria?", "Lugar cerrado, quemaduras faciales, vibrisas chamuscadas, hollín, esputo carbonáceo, disfonía y estridor."),
    ],
  },
};
