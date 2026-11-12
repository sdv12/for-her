import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const fracturaCaderaVaron: ClinicalCase = {
  id: "fractura-cadera-varon-anticoagulado",
  level: 2,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 86, ageUnit: "años", sex: "M", context: "Fibrilación auricular con apixabán. EPOC. Vive con la hija." },
  frequency: "muy-frecuente",
  intro: "“Me resbalé en el baño y caí de costado. No me puedo levantar y me duele la cadera derecha.”",
  vitals: { TA: "142/82 mmHg", FC: "98 lpm", FR: "20 rpm", "T°": "36,4 °C", "SatO₂": "93 %" },
  anamnesis: [
    act("caida", "¿Cómo fue? ¿Te mareaste antes?", "clave", "“Me resbalé, sin mareo.”", "Mecánica."),
    act("anticoag", "¿Última dosis del anticoagulante?", "clave", "“Esta mañana.”", "Cirugía."),
    act("cabeza", "¿Te golpeaste la cabeza?", "clave", "“No.”", "TEC."),
    act("funcional", "¿Caminabas solo?", "util", "“Con bastón.”", "Pronóstico."),
    act("cognitivo", "¿Problemas de memoria?", "util", "“Algo.”", "Delirium."),
    act("tango", "¿Qué te gusta?", "neutro", "“El tango.”", "No orienta."),
  ],
  exam: [
    act("miembro", "Miembro inferior", "clave", "Acortado y en rotación externa.", "Fractura."),
    act("neurovascular", "Pulsos", "clave", "Presentes.", "Sin compromiso."),
    act("piel", "Piel y sacro", "util", "Sin escaras.", "Prevención."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de pelvis y cadera", "clave", "Fractura intertrocantérica derecha.", "Diagnóstico."),
    study("Laboratorio", "lab", "Hemograma, función renal, coagulograma, grupo", "clave", "Hb 11,2; creatinina normal.", "Prequirúrgico."),
    study("Electrofisiología", "ecg", "ECG y radiografía de tórax", "util", "FA controlada.", "Riesgo."),
    study("Otros", "esperar-semana", "Esperar una semana para operar", "riesgoso", "No se realizó.", "Más complicaciones."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("fractura", "Fractura intertrocantérica de cadera en adulto mayor anticoagulado", true, "Caída, acortamiento, rotación externa y radiografía."),
      dx("contusion", "Contusión", false, "Hay fractura."),
      dx("pubis", "Fractura de ramas pubianas", false, "Radiografía."),
      dx("luxacion", "Luxación de cadera", false, "Fractura."),
      dx("patologica", "Fractura patológica", false, "Sin datos de tumor."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Cirugía en las primeras 24 a 48 horas, tras suspender apixabán", "clave", "Reduce mortalidad."),
      mg("analgesia", "Bloqueo nervioso y paracetamol", "clave", "Dolor y delirium."),
      mg("ortogeriatria", "Manejo ortogeriátrico, prevenir delirium y escaras", "clave", "Mejora resultados."),
      mg("osteoporosis", "Tratar osteoporosis y prevenir caídas", "clave", "Prevención."),
      mg("benzo", "Benzodiacepinas para dormir", "riesgoso", "Delirium."),
      mg("reposo", "Tratamiento conservador con reposo prolongado", "riesgoso", "Complicaciones."),
    ],
  },
  debrief: {
    diagnosis: "Fractura intertrocantérica de cadera derecha por caída, en varón de 86 años anticoagulado.",
    pathologies: [
      { name: "Fractura de cadera", role: "principal", why: "Fractura por fragilidad." },
      { name: "Osteoporosis y anticoagulación", role: "asociada", why: "Factores." },
      { name: "Contusión, fractura de pubis", role: "diferencial", why: "Otras lesiones." },
    ],
    reasoning: [
      "Causa: caída con hueso frágil.",
      "Mecanismo: trauma de baja energía.",
      "Consecuencia: pérdida de función y alta mortalidad.",
    ],
    epidemiology:
      "Aunque es más frecuente en mujeres, los varones con fractura de cadera tienen más mortalidad. La osteoporosis masculina suele no diagnosticarse. Operar dentro de las 48 horas y el manejo ortogeriátrico reducen la mortalidad.",
    management: [
      "Radiografía.",
      "Cirugía temprana.",
      "Prevenir delirium.",
      "Osteoporosis.",
    ],
    sources: ["Asociación Argentina de Ortopedia y Traumatología — Fractura de cadera.", "NICE — Hip Fracture Guideline."],
    pearls: ["Acortamiento y rotación externa.", "Operar en 48 horas.", "Varón también tiene osteoporosis."],
    pitfalls: ["Demorar.", "No tratar la osteoporosis."],
    tribunal: [
      qa("¿Cómo se clasifican las fracturas de cadera?", "Intracapsulares (cuello femoral) y extracapsulares (intertrocantéricas y subtrocantéricas)."),
      qa("¿Qué complicación tienen las del cuello femoral?", "Necrosis avascular de la cabeza femoral."),
      qa("¿Cuánto esperar con apixabán?", "En general, 24 a 48 horas según función renal y riesgo."),
    ],
  },
};
