import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cancerEsofago: ClinicalCase = {
  id: "cancer-esofago-epidermoide",
  level: 2,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 64, ageUnit: "años", sex: "M", context: "Fuma desde los 15, bebe vino a diario. Toma mate muy caliente." },
  frequency: "frecuente",
  intro: "“Hace tres meses se me traba la comida. Primero la carne, ahora también el puré. Bajé 12 kilos.”",
  vitals: { TA: "116/72 mmHg", FC: "86 lpm", "T°": "36,5 °C", Peso: "56 kg" },
  anamnesis: [
    act("disfagia", "¿Con qué empezó y cómo progresó?", "clave", "“Primero sólidos, ahora purés.”", "Progresiva: orgánica."),
    act("peso", "¿Cuánto bajaste?", "clave", "“Doce kilos.”", "Alarma."),
    act("riesgo", "¿Tabaco, alcohol, mate caliente?", "clave", "“Todo.”", "Factores del epidermoide."),
    act("voz", "¿Ronquera o tos al tragar?", "util", "“Tos al tomar líquidos.”", "Fístula o recurrente."),
    act("reflujo", "¿Acidez crónica?", "util", "“No.”", "Adenocarcinoma por Barrett."),
    act("ocio", "¿Qué te gusta?", "neutro", "“Las bochas.”", "No orienta."),
  ],
  exam: [
    act("nutricion", "Estado nutricional", "clave", "Caquexia.", "Desnutrición."),
    act("ganglios", "Ganglios supraclaviculares", "clave", "Ganglio izquierdo duro.", "Extensión."),
    act("boca", "Boca y cuello", "util", "Sin lesiones.", "Segundo primario."),
  ],
  studies: [
    study("Otros", "veda", "Endoscopía con biopsia", "clave", "Lesión estenosante en tercio medio; carcinoma epidermoide.", "Diagnóstico."),
    study("Imágenes", "tc", "TC de tórax y abdomen, y PET", "clave", "Adenopatías mediastínicas; sin metástasis a distancia.", "Estadificación."),
    study("Laboratorio", "lab", "Albúmina, hemograma, función hepática", "clave", "Albúmina 2,8.", "Nutrición."),
    study("Otros", "bronco", "Broncoscopía por tos al beber", "util", "Sin fístula.", "Evalúa vía aérea."),
    study("Otros", "ibp-empirico", "IBP empírico 3 meses sin endoscopía", "riesgoso", "No se realizó.", "Demora un cáncer."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("epidermoide", "Carcinoma epidermoide de esófago localmente avanzado", true, "Disfagia progresiva, pérdida de peso, factores y biopsia."),
      dx("acalasia", "Acalasia", false, "Progresión de sólidos a líquidos y biopsia."),
      dx("estenosis-peptica", "Estenosis péptica", false, "Sin reflujo, biopsia maligna."),
      dx("adeno", "Adenocarcinoma por Barrett", false, "Tercio medio y epidermoide."),
      dx("chagas", "Megaesófago chagásico", false, "Biopsia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("comite", "Comité: quimiorradioterapia y cirugía según estadio", "clave", "Plan."),
      mg("nutricion", "Soporte nutricional con sonda o yeyunostomía", "clave", "Desnutrición."),
      mg("tabaco", "Dejar alcohol y tabaco", "clave", "Pronóstico."),
      mg("stent", "Stent si la disfagia es completa", "util", "Paliación."),
      mg("dieta-solida", "Seguir con dieta sólida", "riesgoso", "Impactación."),
      mg("esperar", "Esperar a ver si mejora", "riesgoso", "Progresa."),
    ],
  },
  debrief: {
    diagnosis: "Carcinoma epidermoide de esófago del tercio medio, localmente avanzado, con desnutrición, en varón de 64 años.",
    pathologies: [
      { name: "Cáncer de esófago", role: "principal", why: "Tumor maligno." },
      { name: "Desnutrición", role: "asociada", why: "Consecuencia." },
      { name: "Acalasia, estenosis péptica", role: "diferencial", why: "Otras disfagias." },
    ],
    reasoning: [
      "Causa: tabaco, alcohol y bebidas muy calientes.",
      "Mecanismo: daño crónico del epitelio escamoso.",
      "Consecuencia: obstrucción progresiva y diseminación.",
    ],
    epidemiology:
      "El epidermoide se asocia a tabaco, alcohol y bebidas muy calientes; en el noreste argentino, el mate caliente se relacionó con más riesgo. El adenocarcinoma se asocia a reflujo y Barrett. Suele diagnosticarse tarde, con mal pronóstico.",
    management: [
      "Disfagia de alarma: endoscopía.",
      "Estadificar.",
      "Nutrición.",
      "Tratamiento multimodal.",
    ],
    sources: ["Instituto Nacional del Cáncer — Cáncer de esófago.", "NCCN — Esophageal and Esophagogastric Junction Cancers."],
    pearls: ["Disfagia de sólidos a líquidos.", "Pérdida de peso.", "Mate muy caliente."],
    pitfalls: ["IBP empírico.", "Olvidar la nutrición."],
    tribunal: [
      qa("¿Qué signos de alarma tiene la dispepsia o disfagia?", "Pérdida de peso, disfagia, anemia, vómitos persistentes, sangrado y edad mayor de 60."),
      qa("¿Cómo diferenciás epidermoide de adenocarcinoma?", "Epidermoide: tercios medio y superior, tabaco y alcohol. Adenocarcinoma: tercio inferior, reflujo y Barrett."),
      qa("¿Qué es el esófago de Barrett?", "Metaplasia intestinal del esófago distal por reflujo crónico."),
    ],
  },
};
