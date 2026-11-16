import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const fracturaClavicula: ClinicalCase = {
  id: "fractura-clavicula",
  level: 1,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 24, ageUnit: "años", sex: "M", context: "Ciclista de ruta. Se cayó de la bici sobre el hombro izquierdo." },
  frequency: "muy-frecuente",
  intro: "“Me caí de costado y me duele el hombro. Siento como que algo cruje.”",
  vitals: { TA: "128/78 mmHg", FC: "92 lpm", FR: "18 rpm", "SatO₂": "98 %" },
  anamnesis: [
    act("mecanismo", "¿Cómo cayó?", "clave", "“Directo sobre el hombro, a 30 km/h.”", "Caída sobre el hombro: mecanismo típico."),
    act("casco", "¿Tenía casco, se golpeó la cabeza?", "clave", "“Casco sí, no me desmayé.”", "Descarta TEC."),
    act("respirar", "¿Le cuesta respirar o le duele el pecho?", "clave", "“No.”", "Descarta neumotórax."),
    act("mano", "¿Siente y mueve bien la mano?", "clave", "“Sí.”", "Lesión neurovascular."),
    act("dominante", "¿Es diestro?", "util", "“Sí.”", "Importa para la decisión."),
    act("carrera", "¿Tenía una carrera pronto?", "neutro", "“En un mes.”", "Expectativa, pero no cambia el diagnóstico."),
  ],
  exam: [
    act("deformidad", "Inspección y palpación de la clavícula", "clave", "Deformidad y crepitación en tercio medio, piel indemne.", "Fractura cerrada."),
    act("neurovascular", "Pulso radial y sensibilidad", "clave", "Conservados.", "Sin lesión neurovascular."),
    act("pulmon", "Auscultación", "clave", "Murmullo simétrico.", "Sin neumotórax."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de clavícula de frente y con inclinación cefálica", "clave", "Fractura de tercio medio con desplazamiento de medio cuerpo, sin acortamiento.", "Define el tratamiento."),
    study("Imágenes", "rx-torax", "Radiografía de tórax", "util", "Sin neumotórax ni fracturas costales.", "Lesiones asociadas."),
    study("Imágenes", "tac", "TC de hombro", "innecesario", "No se pidió.", "La radiografía alcanza."),
    study("Imágenes", "rmn", "Resonancia", "innecesario", "No se pidió.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("fx-clavicula", "Fractura cerrada del tercio medio de la clavícula izquierda, poco desplazada", true, "Caída sobre el hombro, deformidad y radiografía con fractura del tercio medio sin acortamiento."),
      dx("acromioclavicular", "Luxación acromioclavicular", false, "La lesión está en el tercio medio, no en la articulación."),
      dx("luxacion-hombro", "Luxación glenohumeral", false, "Hombro con relieve conservado."),
      dx("fx-humero", "Fractura de húmero proximal", false, "Radiografía sin fractura humeral."),
      dx("contusion", "Contusión", false, "Hay fractura."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cabestrillo", "Cabestrillo por 2–4 semanas y movilización progresiva", "clave", "Tratamiento de la mayoría."),
      mg("analgesia", "Analgesia", "clave", "Dolor."),
      mg("control-rx", "Control radiográfico", "clave", "Vigila desplazamiento."),
      mg("bici", "Volver a la bici cuando consolide (6–12 semanas)", "util", "Evita refractura."),
      mg("cirugia-indicacion", "Cirugía si es expuesta, compromete la piel, acorta más de 2 cm o es muy desplazada", "util", "Indicaciones."),
      mg("ocho", "Vendaje en ocho ajustado", "innecesario", "No es superior al cabestrillo y es incómodo."),
      mg("cirugia-todos", "Placa a todos los deportistas", "riesgoso", "Riesgos quirúrgicos sin necesidad en una poco desplazada."),
    ],
  },
  debrief: {
    diagnosis: "Fractura cerrada poco desplazada del tercio medio de la clavícula izquierda, en un ciclista de 24 años.",
    pathologies: [
      { name: "Fractura de clavícula", role: "principal", why: "Fractura del tercio medio por caída sobre el hombro." },
      { name: "Neumotórax, lesión neurovascular", role: "diferencial", why: "Complicaciones a descartar." },
      { name: "Luxación acromioclavicular", role: "diferencial", why: "Otra lesión por el mismo mecanismo." },
    ],
    reasoning: [
      "Causa: caída directa sobre el hombro.",
      "Mecanismo: la fuerza axial rompe el punto más débil, el tercio medio.",
      "Consecuencia: dolor y deformidad; la mayoría consolida con tratamiento ortopédico.",
    ],
    epidemiology:
      "Representa entre el 2 y el 5 % de todas las fracturas del adulto y es más frecuente en varones jóvenes por deportes y accidentes. El 80 % es del tercio medio.",
    management: [
      "Examen neurovascular y pulmonar.",
      "Radiografía.",
      "Cabestrillo.",
      "Cirugía según criterios.",
    ],
    sources: ["Sociedad Argentina de Ortopedia y Traumatología — Fracturas de clavícula.", "AAOS — Clavicle fractures."],
    pearls: ["Tercio medio, el más frecuente.", "Cabestrillo alcanza.", "Revisá pulso y pulmón."],
    pitfalls: ["Operar a todos.", "No revisar la piel."],
    tribunal: [
      qa("¿Cuándo se opera una fractura de clavícula?", "Si es expuesta, amenaza la piel, tiene lesión neurovascular, acortamiento mayor de 2 cm, gran desplazamiento o hombro flotante."),
      qa("¿Qué estructuras pueden lesionarse?", "La arteria y vena subclavias, el plexo braquial y la cúpula pleural."),
      qa("¿Por qué el tercio medio es el más afectado?", "Porque es el punto de transición de la curvatura y no tiene inserciones ligamentarias que lo refuercen."),
    ],
  },
};
