import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const piernasInquietas: ClinicalCase = {
  id: "sindrome-piernas-inquietas",
  level: 1,
  area: "Neurología",
  setting: "Consultorio",
  patient: { age: 58, ageUnit: "años", sex: "F", context: "Menstruaciones abundantes hasta hace 2 años. Toma sertralina." },
  frequency: "frecuente",
  intro: "“A la noche siento algo feo en las piernas, como hormigas, y tengo que levantarme a caminar. No duermo.”",
  vitals: { TA: "124/76 mmHg", FC: "74 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("necesidad", "¿Siente necesidad de moverlas?", "clave", "“Sí, me alivia caminar.”", "Criterio diagnóstico."),
    act("horario", "¿Cuándo empeora?", "clave", "“A la tarde y de noche, acostada.”", "Patrón circadiano."),
    act("farmacos", "¿Qué medicación toma?", "clave", "“Sertralina y a veces un antialérgico para dormir.”", "Fármacos que empeoran."),
    act("hierro", "¿Tuvo anemia?", "util", "“Sí, por las menstruaciones.”", "Déficit de hierro."),
    act("calambres", "¿Son calambres?", "util", "“No, es inquietud.”", "Diferencial."),
    act("hobby", "¿Qué le gusta?", "neutro", "“El tejido.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico", "clave", "Normal, reflejos y sensibilidad conservados.", "Sin neuropatía."),
    act("vascular", "Pulsos y várices", "clave", "Pulsos presentes, sin edema.", "Excluye vascular."),
    act("palidez", "Mucosas", "util", "Levemente pálidas.", "Déficit de hierro."),
  ],
  studies: [
    study("Laboratorio", "ferritina", "Ferritina y saturación de transferrina", "clave", "Ferritina 22 ng/ml.", "Menor de 75: reponer."),
    study("Laboratorio", "lab", "Función renal, glucemia, B12", "util", "Normales.", "Causas secundarias."),
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Criterios cumplidos.", "No requiere más."),
    study("Otros", "polisomnografia", "Polisomnografía de rutina", "innecesario", "No se realizó.", "Solo si hay dudas."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("spi", "Síndrome de piernas inquietas asociado a ferropenia y fármacos", true, "Necesidad de mover las piernas, empeora en reposo y de noche, mejora con el movimiento, ferritina baja."),
      dx("neuropatia", "Neuropatía periférica", false, "Examen sensitivo normal y alivio con el movimiento."),
      dx("calambres", "Calambres nocturnos", false, "No son contracturas dolorosas."),
      dx("acatisia", "Acatisia", false, "No toma antipsicóticos y es nocturno."),
      dx("insomnio-primario", "Insomnio primario", false, "La causa son las piernas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hierro", "Hierro oral o EV hasta ferritina mayor de 75", "clave", "Mejora los síntomas."),
      mg("antihistaminicos", "Suspender antihistamínicos sedantes", "clave", "Empeoran el cuadro."),
      mg("habitos", "Higiene del sueño, evitar alcohol y cafeína", "clave", "Base."),
      mg("gabapentinoides", "Gabapentina o pregabalina si persiste", "util", "Primera línea farmacológica actual."),
      mg("dopaminergicos-altos", "Agonistas dopaminérgicos en dosis crecientes", "riesgoso", "Aumentación."),
      mg("benzo", "Clonazepam de rutina", "riesgoso", "Dependencia en adultos mayores."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de piernas inquietas asociado a ferropenia y antihistamínicos, en mujer de 58 años.",
    pathologies: [
      { name: "Síndrome de piernas inquietas", role: "principal", why: "Trastorno sensitivo-motor." },
      { name: "Ferropenia y fármacos", role: "asociada", why: "Factores agravantes." },
      { name: "Neuropatía, calambres", role: "diferencial", why: "Otras molestias nocturnas." },
    ],
    reasoning: [
      "Causa: alteración dopaminérgica y déficit de hierro cerebral.",
      "Mecanismo: urgencia sensitiva para moverse en reposo, de predominio nocturno.",
      "Consecuencia: insomnio y fatiga.",
    ],
    epidemiology:
      "Afecta a 5 a 10 % de los adultos, más a mujeres. Es frecuente en embarazo, insuficiencia renal y ferropenia. Antihistamínicos, antidepresivos y antieméticos lo empeoran.",
    management: [
      "Criterios clínicos.",
      "Ferritina.",
      "Revisar fármacos.",
      "Tratamiento escalonado.",
    ],
    sources: ["Sociedad Neurológica Argentina — Trastornos del sueño.", "AASM — Clinical Practice Guideline for Restless Legs Syndrome."],
    pearls: ["Peor de noche, mejor caminando.", "Ferritina mayor de 75.", "Ojo con antihistamínicos."],
    pitfalls: ["Benzodiacepinas.", "No pedir ferritina."],
    tribunal: [
      qa("¿Qué es la aumentación?", "Empeoramiento de los síntomas, que aparecen más temprano, por agonistas dopaminérgicos."),
      qa("¿En qué situaciones es más frecuente?", "Embarazo, insuficiencia renal, ferropenia y neuropatías."),
      qa("¿Qué criterios lo definen?", "Necesidad de mover las piernas, empeora en reposo, mejora con movimiento y predomina de tarde o noche."),
    ],
  },
};
