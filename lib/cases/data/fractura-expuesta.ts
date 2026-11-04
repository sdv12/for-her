import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const fracturaExpuesta: ClinicalCase = {
  id: "fractura-expuesta-tibia",
  level: 3,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 24, ageUnit: "años", sex: "M", context: "Motociclista. Chocó contra un auto hace 1 hora. Usaba casco." },
  frequency: "frecuente",
  intro: "“Choqué con la moto y se me dobló la pierna. Me sale el hueso por una herida y me duele muchísimo.”",
  vitals: { TA: "118/72 mmHg", FC: "112 lpm", FR: "22 rpm", "T°": "36,4 °C", "SatO₂": "97 %", Glasgow: "15/15" },
  anamnesis: [
    act("mecanismo", "¿Cómo fue el choque?", "clave", "“A 60 km/h contra un auto que dobló.”", "Alta energía: buscar otras lesiones."),
    act("vacuna", "¿Vacuna antitetánica?", "clave", "“No sé.”", "Herida contaminada: profilaxis antitetánica."),
    act("otras", "¿Te duele otra parte? ¿Golpe en la cabeza o el abdomen?", "clave", "“Solo la pierna.”", "Evaluación de lesiones asociadas."),
    act("alergias", "¿Alergias, medicación, última comida?", "util", "“Ninguna; comí hace 3 horas.”", "Para la cirugía."),
    act("sensibilidad", "¿Sentís el pie?", "util", "“Sí.”", "Función nerviosa."),
    act("moto", "¿Para qué usás la moto?", "neutro", "“Delivery.”", "No orienta."),
  ],
  exam: [
    act("abcde", "Evaluación primaria (ABCDE)", "clave", "Estable, sin otras lesiones evidentes.", "Primero descartar lesiones que amenacen la vida."),
    act("herida", "Herida y miembro", "clave", "Herida de 6 cm en la cara anterior de la pierna con exposición ósea, contaminada con tierra; deformidad.", "Fractura expuesta (Gustilo IIIA probable)."),
    act("neurovascular", "Pulsos pedios, relleno, sensibilidad y compartimentos", "clave", "Pulsos presentes, sensibilidad conservada, compartimentos blandos.", "Sin lesión vascular ni síndrome compartimental por ahora."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de pierna con rodilla y tobillo", "clave", "Fractura conminuta de diáfisis de tibia y peroné.", "Define la fractura."),
    study("Laboratorio", "lab", "Hemograma, grupo y factor, coagulograma", "util", "Hb 13.", "Para cirugía."),
    study("Imágenes", "efast", "eFAST por mecanismo de alta energía", "util", "Negativo.", "Descarta líquido libre."),
    study("Microbiología", "cultivo", "Cultivo de la herida al ingreso", "innecesario", "No se realizó.", "No predice la infección."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("expuesta", "Fractura expuesta conminuta de tibia y peroné (Gustilo IIIA probable), sin lesión vascular", true, "Herida de 6 cm con exposición ósea y contaminación, fractura conminuta, pulsos presentes."),
      dx("cerrada", "Fractura cerrada con herida superficial", false, "La herida comunica con el hueso."),
      dx("compartimental", "Síndrome compartimental", false, "Compartimentos blandos y sin dolor desproporcionado; vigilar."),
      dx("vascular", "Fractura con lesión vascular (IIIC)", false, "Pulsos presentes."),
      dx("contusion", "Contusión de partes blandas", false, "Hay fractura expuesta."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Antibiótico EV en la primera hora (cefazolina, más gentamicina por la contaminación) y profilaxis antitetánica", "clave", "Reduce la infección y la osteomielitis."),
      mg("cubrir", "Cubrir la herida con gasa estéril húmeda, alinear e inmovilizar con férula, analgesia", "clave", "Protege y alivia."),
      mg("quirofano", "Lavado y desbridamiento quirúrgico con estabilización (fijador externo o enclavado) urgente", "clave", "Previene la infección y estabiliza."),
      mg("compartimental", "Vigilar el síndrome compartimental", "util", "Puede aparecer aun en fracturas expuestas."),
      mg("reintroducir", "Reintroducir el hueso en la guardia", "riesgoso", "Lleva contaminación a la profundidad."),
      mg("cerrar-guardia", "Suturar la herida en la guardia", "riesgoso", "Cierra una herida contaminada sin desbridar."),
    ],
  },
  debrief: {
    diagnosis: "Fractura expuesta conminuta de tibia y peroné (Gustilo IIIA probable) por siniestro vial en motociclista de 24 años, sin lesión vascular.",
    pathologies: [
      { name: "Fractura expuesta de tibia", role: "principal", why: "Fractura comunicada con el exterior." },
      { name: "Riesgo de infección y síndrome compartimental", role: "asociada", why: "Complicaciones." },
      { name: "Lesión vascular, compartimental", role: "diferencial", why: "Se vigilan." },
    ],
    reasoning: [
      "Causa: traumatismo de alta energía.",
      "Mecanismo: el hueso se rompe y perfora la piel, con contaminación del foco.",
      "Consecuencia: riesgo de infección, osteomielitis, falta de consolidación y síndrome compartimental.",
    ],
    epidemiology:
      "Los siniestros viales en moto son la principal causa de fracturas expuestas en Argentina, con predominio de varones jóvenes, muchos trabajadores de reparto. La tibia es el hueso largo que más se expone por su escasa cobertura de partes blandas.",
    management: [
      "ABCDE y luego el miembro.",
      "Antibiótico precoz, antitetánica, cobertura estéril e inmovilización.",
      "Lavado, desbridamiento y estabilización quirúrgica urgente.",
      "Vigilancia neurovascular y compartimental.",
    ],
    sources: ["Asociación Argentina de Ortopedia y Traumatología — Recomendaciones de fracturas expuestas.", "Agencia Nacional de Seguridad Vial."],
    pearls: ["Antibiótico en la primera hora.", "No reintroducir el hueso.", "Quirófano para lavar y estabilizar."],
    pitfalls: ["Suturar en la guardia.", "Olvidar la antitetánica."],
    tribunal: [
      qa("¿Qué es la clasificación de Gustilo-Anderson?", "Clasifica las fracturas expuestas: I herida menor de 1 cm limpia; II 1–10 cm sin gran daño de partes blandas; III herida extensa con gran daño, contaminación o alta energía (IIIA cobertura posible, IIIB requiere colgajo, IIIC lesión vascular que requiere reparación)."),
      qa("¿Qué es el síndrome compartimental?", "El aumento de presión en un compartimento muscular que compromete la perfusión: dolor desproporcionado que aumenta con el estiramiento pasivo, tensión, parestesias; los pulsos pueden estar presentes. Requiere fasciotomía urgente."),
      qa("¿Qué antibióticos se usan en fracturas expuestas?", "Cefazolina para todas; en las tipo III se suma un aminoglucósido, y en contaminación con tierra o agua estancada se considera penicilina o cobertura de anaerobios."),
    ],
  },
};
