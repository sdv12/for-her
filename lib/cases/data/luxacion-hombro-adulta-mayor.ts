import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const luxacionHombroAdultaMayor: ClinicalCase = {
  id: "luxacion-hombro-adulta-mayor",
  level: 2,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 74, ageUnit: "años", sex: "F", context: "Se cayó en la vereda con el brazo extendido. Osteoporosis." },
  frequency: "frecuente",
  intro: "“Me caí y no puedo mover el brazo derecho. Siento el hombro raro.”",
  vitals: { TA: "142/82 mmHg", FC: "92 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("mecanismo", "¿Cómo cayó?", "clave", "“Con el brazo estirado.”", "Mecanismo de luxación anterior."),
    act("sensibilidad", "¿Siente el costado del hombro?", "clave", "“Lo tengo dormido.”", "Lesión del nervio axilar."),
    act("previos", "¿Se le salió antes?", "clave", "“Nunca.”", "Primer episodio."),
    act("anticoagulantes", "¿Toma anticoagulantes?", "util", "“No.”", "Hematoma."),
    act("cabeza", "¿Se golpeó la cabeza?", "util", "“No.”", "Lesiones asociadas."),
    act("nietos", "¿Vive sola?", "neutro", "“Con mi hermana.”", "No orienta."),
  ],
  exam: [
    act("hombro", "Inspección", "clave", "Pérdida del contorno (charretera), brazo en abducción y rotación externa.", "Luxación anterior."),
    act("axilar", "Sensibilidad del deltoides y pulsos", "clave", "Hipoestesia en la cara lateral del hombro; pulso radial presente.", "Neuropraxia axilar."),
    act("mano", "Función de la mano", "util", "Normal.", "Sin otras lesiones nerviosas."),
  ],
  studies: [
    study("Imágenes", "rx-pre", "Radiografía antes de reducir (frente y perfil escapular)", "clave", "Luxación anterior con fractura del troquíter no desplazada.", "Lesión asociada."),
    study("Imágenes", "rx-post", "Radiografía después de reducir", "clave", "Reducción completa.", "Control."),
    study("Imágenes", "eco-manguito", "Ecografía del manguito en seguimiento", "util", "Rotura del supraespinoso.", "Frecuente en mayores."),
    study("Otros", "reducir-sin-rx", "Reducir sin radiografía previa", "riesgoso", "No se hizo.", "Puede desplazar una fractura."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("luxacion-anterior", "Luxación glenohumeral anterior con fractura de troquíter y neuropraxia del nervio axilar", true, "Caída con brazo extendido, charretera, radiografía y hipoestesia del deltoides."),
      dx("fractura-cuello", "Fractura del cuello humeral aislada", false, "Hay luxación."),
      dx("posterior", "Luxación posterior", false, "Rotación externa y radiografía anterior."),
      dx("manguito", "Rotura aislada del manguito", false, "Hay luxación."),
      dx("acv", "ACV", false, "Traumatismo con deformidad."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reduccion", "Reducción cerrada con analgesia y sedación", "clave", "Tratamiento."),
      mg("cabestrillo", "Cabestrillo por corto tiempo y movilización temprana", "clave", "En mayores, inmovilización breve evita rigidez."),
      mg("control-nervio", "Control del nervio axilar y ecografía del manguito", "clave", "Lesiones frecuentes a esta edad."),
      mg("osteoporosis", "Evaluar y tratar osteoporosis", "util", "Fractura por fragilidad."),
      mg("inmovilizar-6", "Inmovilizar 6 semanas", "riesgoso", "Hombro rígido en ancianos."),
      mg("hipocratica-fuerza", "Tracción brusca con el pie en la axila", "riesgoso", "Lesión vascular y nerviosa."),
    ],
  },
  debrief: {
    diagnosis: "Luxación glenohumeral anterior con fractura de troquíter y neuropraxia axilar, en mujer de 74 años.",
    pathologies: [
      { name: "Luxación anterior de hombro", role: "principal", why: "La más frecuente." },
      { name: "Fractura de troquíter, nervio axilar y manguito", role: "asociada", why: "Lesiones típicas en mayores." },
      { name: "Fractura de cuello, luxación posterior", role: "diferencial", why: "Otras lesiones." },
    ],
    reasoning: [
      "Causa: caída con brazo en abducción y rotación externa.",
      "Mecanismo: la cabeza humeral sale por delante de la glena.",
      "Consecuencia: dolor, deformidad y lesiones nerviosas y del manguito.",
    ],
    epidemiology:
      "En jóvenes la luxación recidiva; en mayores se asocia a roturas del manguito, fracturas y lesión del nervio axilar. La rigidez es un riesgo si se inmoviliza mucho tiempo.",
    management: [
      "Neurovascular.",
      "Radiografía previa.",
      "Reducción.",
      "Movilización temprana.",
    ],
    sources: ["Asociación Argentina de Ortopedia y Traumatología — Luxación de hombro.", "AAOS — Shoulder Dislocation."],
    pearls: ["Sensibilidad del deltoides antes de reducir.", "Radiografía antes y después.", "En mayores: manguito."],
    pitfalls: ["Reducir sin radiografía.", "Inmovilizar mucho."],
    tribunal: [
      qa("¿Qué nervio se lesiona más?", "El nervio axilar, que inerva el deltoides."),
      qa("¿Qué es la lesión de Hill-Sachs?", "Impactación posterolateral de la cabeza humeral contra la glena."),
      qa("¿Qué es la lesión de Bankart?", "Desinserción del labrum anteroinferior."),
    ],
  },
};
