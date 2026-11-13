import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const carcinomaEspinocelular: ClinicalCase = {
  id: "carcinoma-espinocelular-labio",
  level: 2,
  area: "Dermatología",
  setting: "Consultorio",
  patient: { age: 71, ageUnit: "años", sex: "M", context: "Trabajó toda su vida en la cosecha de tabaco en Salta. Fumador de pipa." },
  frequency: "frecuente",
  intro: "“Tengo una lastimadura en el labio de abajo que no se cura hace cuatro meses, sangra y crece.”",
  vitals: { TA: "136/82 mmHg", FC: "76 lpm", "T°": "36,5 °C", Peso: "66 kg" },
  anamnesis: [
    act("evolucion", "¿Cómo empezó?", "clave", "“Primero era el labio seco y con costritas por años, ahora es una herida.”", "Queilitis actínica previa."),
    act("sol", "¿Trabajó al sol?", "clave", "“Toda la vida en el campo.”", "Radiación UV."),
    act("tabaco", "¿Fuma?", "clave", "“Pipa desde los 20.”", "Carcinógeno."),
    act("ganglios", "¿Bultos en el cuello?", "util", "“No noté.”", "Metástasis."),
    act("inmuno", "¿Trasplante o medicación inmunosupresora?", "util", "“No.”", "Mayor agresividad."),
    act("nietos", "¿Vive solo?", "neutro", "“Con mi señora.”", "No orienta."),
  ],
  exam: [
    act("lesion", "Lesión del labio", "clave", "Úlcera indurada de 1,5 cm con bordes elevados y costra en el bermellón inferior.", "Carcinoma."),
    act("ganglios-ex", "Ganglios submentonianos y submandibulares", "clave", "No palpables.", "Estadificación."),
    act("piel", "Piel expuesta", "util", "Queratosis actínicas en cara y dorso de manos.", "Daño solar."),
  ],
  studies: [
    study("Otros", "biopsia", "Biopsia de la lesión", "clave", "Carcinoma espinocelular bien diferenciado invasor.", "Confirma."),
    study("Imágenes", "eco-cuello", "Ecografía de cuello", "util", "Sin adenopatías.", "Estadificación."),
    study("Otros", "dermatoscopia", "Dermatoscopia", "util", "Vasos glomerulares y queratina.", "Orienta."),
    study("Otros", "crema", "Tratar 3 meses con cremas cicatrizantes antes de biopsiar", "riesgoso", "No se hizo.", "Retrasa un cáncer."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ec", "Carcinoma espinocelular de labio inferior sobre queilitis actínica", true, "Úlcera indurada persistente en labio inferior con exposición solar y tabaco, confirmada por biopsia."),
      dx("basocelular", "Carcinoma basocelular", false, "El basocelular casi no aparece en el bermellón y la biopsia es espinocelular."),
      dx("herpes", "Herpes labial", false, "No dura meses."),
      dx("chancro", "Chancro sifilítico", false, "Biopsia de carcinoma."),
      dx("queratoacantoma", "Queratoacantoma", false, "Crecimiento lento de meses e invasión."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Resección quirúrgica con márgenes", "clave", "Tratamiento de elección."),
      mg("seguimiento", "Seguimiento de ganglios cervicales", "clave", "Riesgo de metástasis en labio."),
      mg("proteccion", "Protección solar labial y tratar queratosis actínicas", "clave", "Prevención de nuevos tumores."),
      mg("tabaco", "Dejar de fumar", "util", "Factor de riesgo."),
      mg("crioterapia-sola", "Crioterapia superficial sin biopsia", "riesgoso", "Tumor invasor sin control de márgenes."),
      mg("sin-control", "Alta sin seguimiento", "riesgoso", "Recurrencia y metástasis."),
    ],
  },
  debrief: {
    diagnosis: "Carcinoma espinocelular bien diferenciado del labio inferior sobre queilitis actínica, en varón de 71 años con exposición solar laboral y tabaco.",
    pathologies: [
      { name: "Carcinoma espinocelular", role: "principal", why: "Cáncer de queratinocitos." },
      { name: "Queilitis actínica y queratosis actínicas", role: "asociada", why: "Lesiones precursoras." },
      { name: "Basocelular, queratoacantoma", role: "diferencial", why: "Otros tumores cutáneos." },
    ],
    reasoning: [
      "Causa: radiación UV acumulada y tabaco.",
      "Mecanismo: mutaciones en queratinocitos que progresan de queratosis actínica a carcinoma invasor.",
      "Consecuencia: invasión local y metástasis ganglionares.",
    ],
    epidemiology:
      "Es el segundo cáncer de piel más frecuente. Afecta a trabajadores rurales con mucha exposición solar, sobre todo en el norte argentino. En el labio y en inmunosuprimidos tiene más riesgo de metástasis que en otras zonas.",
    management: [
      "Biopsiar lesiones que no curan.",
      "Cirugía.",
      "Ganglios.",
      "Fotoprotección.",
    ],
    sources: ["Sociedad Argentina de Dermatología — Consenso de carcinoma espinocelular.", "NCCN — Squamous Cell Skin Cancer Guidelines."],
    pearls: ["Herida que no cura en 4 semanas: biopsia.", "Labio inferior y sol.", "Mirá los ganglios."],
    pitfalls: ["Cremas por meses.", "Crioterapia sin biopsia."],
    tribunal: [
      qa("¿Qué es la queratosis actínica?", "Lesión premaligna áspera en piel expuesta al sol que puede evolucionar a espinocelular."),
      qa("¿En qué se diferencia del basocelular en metástasis?", "El espinocelular puede dar metástasis ganglionares; el basocelular casi nunca."),
      qa("¿Qué pacientes tienen tumores más agresivos?", "Los trasplantados y otros inmunosuprimidos."),
    ],
  },
};
