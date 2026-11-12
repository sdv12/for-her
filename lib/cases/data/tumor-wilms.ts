import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tumorWilms: ClinicalCase = {
  id: "tumor-de-wilms-nefroblastoma",
  level: 2,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 3, ageUnit: "años", sex: "F", context: "Sana. La trae la mamá al control." },
  frequency: "poco-frecuente",
  intro: "“Bañándola, le noté la panza dura e hinchada de un lado. No le duele y juega como siempre.”",
  vitals: { TA: "118/76 mmHg", FC: "106 lpm", FR: "24 rpm", "T°": "36,7 °C", Peso: "14 kg" },
  anamnesis: [
    act("masa", "¿Desde cuándo? ¿Creció?", "clave", "“Lo noté esta semana.”", "Masa asintomática."),
    act("orina", "¿Orina con sangre?", "clave", "“Una vez, rosada.”", "Hematuria."),
    act("sistemico", "¿Fiebre, pérdida de peso, dolor de huesos?", "clave", "“No.”", "Neuroblastoma suele ser sistémico."),
    act("sindromes", "¿Asimetría corporal, ausencia de iris, problemas genitales?", "util", "“No.”", "Síndromes asociados."),
    act("familia", "¿Cáncer en la familia?", "util", "“No.”", "Herencia."),
    act("juego", "¿Qué le gusta?", "neutro", "“Las muñecas.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Palpación abdominal suave", "clave", "Masa en flanco derecho, lisa, que no cruza la línea media.", "Palpar con cuidado: riesgo de rotura."),
    act("presion", "Presión arterial", "clave", "Elevada para la edad.", "Renina."),
    act("general", "Iris, extremidades y genitales", "util", "Normales.", "Síndromes."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía abdominal", "clave", "Masa sólida del riñón derecho.", "Primer paso."),
    study("Imágenes", "tc", "TC o RM de abdomen y TC de tórax", "clave", "Masa renal sin calcificaciones; trombo en vena renal; tórax limpio.", "Estadificación."),
    study("Laboratorio", "lab", "Hemograma, función renal, orina, catecolaminas urinarias", "clave", "Microhematuria; catecolaminas normales.", "Excluye neuroblastoma."),
    study("Otros", "biopsia-percutanea", "Biopsia percutánea de rutina", "riesgoso", "No se realizó.", "Puede diseminar; se decide en centro especializado."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("wilms", "Tumor de Wilms (nefroblastoma)", true, "Masa renal en niña de 3 años, sin cruzar la línea media, HTA y hematuria."),
      dx("neuroblastoma", "Neuroblastoma", false, "Suele cruzar la línea, calcificarse y elevar catecolaminas."),
      dx("hidronefrosis", "Hidronefrosis", false, "Es sólida."),
      dx("hepatoblastoma", "Hepatoblastoma", false, "Es renal."),
      dx("fecaloma", "Fecaloma", false, "Masa sólida renal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("derivar", "Derivar a oncología pediátrica", "clave", "Tratamiento multidisciplinario."),
      mg("cirugia", "Nefrectomía y quimioterapia según protocolo", "clave", "Alta tasa de curación."),
      mg("palpar", "Evitar palpaciones repetidas", "clave", "Riesgo de rotura."),
      mg("hta", "Tratar la hipertensión", "util", "Renina."),
      mg("esperar", "Controlar en 6 meses", "riesgoso", "Crece."),
      mg("biopsia", "Biopsia percutánea en el consultorio", "riesgoso", "Disemina."),
    ],
  },
  debrief: {
    diagnosis: "Tumor de Wilms del riñón derecho con trombo en vena renal, HTA y hematuria, en niña de 3 años.",
    pathologies: [
      { name: "Tumor de Wilms", role: "principal", why: "Tumor renal más frecuente en niños." },
      { name: "HTA y hematuria", role: "asociada", why: "Manifestaciones." },
      { name: "Neuroblastoma, hidronefrosis", role: "diferencial", why: "Otras masas." },
    ],
    reasoning: [
      "Causa: restos embrionarios renales con mutaciones como WT1.",
      "Mecanismo: proliferación de tejido nefrogénico.",
      "Consecuencia: masa abdominal, hematuria, HTA y metástasis pulmonares.",
    ],
    epidemiology:
      "Es el tumor renal más frecuente en la infancia, con pico entre los 2 y 5 años. Se descubre a menudo por los padres al bañar al niño. La supervivencia supera el 90 % en estadios tempranos con tratamiento en centros de referencia.",
    management: [
      "Ecografía.",
      "TC y tórax.",
      "Derivar.",
      "Cirugía y quimioterapia.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Tumores sólidos en pediatría.", "SIOP — Renal Tumour Study Group Protocols."],
    pearls: ["Masa que no cruza la línea media.", "No palpar repetido.", "Pronóstico muy bueno."],
    pitfalls: ["Biopsia percutánea.", "Esperar."],
    tribunal: [
      qa("¿Cómo diferenciás Wilms y neuroblastoma?", "Wilms: renal, no cruza la línea media, sin calcificaciones. Neuroblastoma: suprarrenal, cruza la línea, calcifica y eleva catecolaminas."),
      qa("¿Qué síndromes se asocian a Wilms?", "WAGR, Denys-Drash y Beckwith-Wiedemann."),
      qa("¿Dónde metastatiza?", "Sobre todo al pulmón."),
    ],
  },
};
