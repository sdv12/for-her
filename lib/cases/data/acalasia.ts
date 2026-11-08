import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const acalasia: ClinicalCase = {
  id: "acalasia",
  level: 2,
  area: "Gastroenterología",
  setting: "Consultorio",
  patient: { age: 44, ageUnit: "años", sex: "F", context: "Nacida en Santiago del Estero. Nunca se hizo la serología para Chagas." },
  frequency: "poco-frecuente",
  intro: "“Hace dos años me cuesta tragar, tanto líquidos como sólidos. A la noche me vuelve comida sin digerir a la boca, y bajé 9 kilos.”",
  vitals: { TA: "108/68 mmHg", FC: "76 lpm", "T°": "36,4 °C", "SatO₂": "98 %", Peso: "51 kg" },
  anamnesis: [
    act("disfagia", "¿Te cuesta con sólidos, líquidos o ambos? ¿Desde el principio?", "clave", "“Con los dos, desde el principio.”", "Sólidos y líquidos desde el inicio sugiere trastorno motor."),
    act("regurgitacion", "¿Regurgitás? ¿Con qué aspecto?", "clave", "“Comida entera, sin sabor ácido.”", "Retención en el esófago."),
    act("alarma", "¿Fumás o tomás alcohol? ¿Progresó en meses?", "clave", "“No. Lleva años.”", "Una evolución corta en fumadores orienta a cáncer."),
    act("chagas", "¿Viviste con vinchucas? ¿Tu mamá tiene Chagas?", "util", "“En el rancho de mis abuelos había.”", "En zona endémica, el megaesófago chagásico simula acalasia."),
    act("respiratorio", "¿Tos de noche o neumonías?", "util", "“Tos al acostarme.”", "Aspiración."),
    act("telar", "¿A qué te dedicás?", "neutro", "“Soy costurera.”", "No orienta."),
  ],
  exam: [
    act("nutricion", "Estado nutricional", "clave", "IMC 19, pérdida de masa muscular.", "Repercusión."),
    act("cuello", "Cuello y ganglios", "clave", "Sin adenopatías ni masas.", "Aleja tumor avanzado."),
    act("cardiaco", "Corazón", "util", "Ritmo regular, sin soplos.", "Compromiso chagásico."),
  ],
  studies: [
    study("Otros", "veda", "Videoendoscopía digestiva alta", "clave", "Esófago dilatado con restos; cardias que cede con presión; sin tumor.", "Primero: descarta seudoacalasia por cáncer."),
    study("Otros", "manometria", "Manometría esofágica de alta resolución", "clave", "Relajación incompleta del esfínter y aperistalsis.", "Es el estudio que confirma."),
    study("Imágenes", "seriada", "Seriada esofágica con bario", "clave", "Esófago dilatado con afinamiento en pico de pájaro.", "Clásico; útil para seguimiento."),
    study("Laboratorio", "chagas", "Serología para Chagas y ECG", "clave", "Serología no reactiva; ECG normal.", "Define la causa."),
    study("Imágenes", "pet", "PET-TC sin sospecha tumoral", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("acalasia", "Acalasia primaria", true, "Disfagia para sólidos y líquidos, regurgitación, pico de pájaro, manometría típica y serología negativa."),
      dx("cancer", "Cáncer de esófago", false, "Disfagia progresiva primero a sólidos; endoscopía sin tumor."),
      dx("erge", "Estenosis por reflujo", false, "La manometría muestra un trastorno motor."),
      dx("chagas", "Megaesófago chagásico", false, "Serología no reactiva."),
      dx("eosinofilica", "Esofagitis eosinofílica", false, "Se da con impactación y atopía, con endoscopía distinta."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("definitivo", "Dilatación neumática, miotomía de Heller o POEM", "clave", "Tratamientos eficaces, según el caso y centro."),
      mg("nutricion", "Evaluación nutricional", "clave", "Perdió peso."),
      mg("seguimiento", "Seguimiento endoscópico por riesgo de carcinoma", "clave", "Riesgo aumentado a largo plazo."),
      mg("toxina", "Toxina botulínica si no es candidata a otros tratamientos", "util", "Efecto transitorio."),
      mg("ibp", "IBP y alta", "riesgoso", "No es reflujo y deja sin tratar."),
      mg("sin-endo", "Dilatar sin haber hecho endoscopía", "riesgoso", "Podría haber un tumor."),
    ],
  },
  debrief: {
    diagnosis: "Acalasia primaria con desnutrición leve, en mujer de 44 años.",
    pathologies: [
      { name: "Acalasia", role: "principal", why: "Trastorno motor primario." },
      { name: "Desnutrición, aspiración", role: "asociada", why: "Complicaciones." },
      { name: "Cáncer, Chagas, estenosis", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: pérdida de neuronas inhibitorias del plexo mientérico.",
      "Mecanismo: el esfínter no relaja y el cuerpo pierde peristalsis.",
      "Consecuencia: retención, dilatación, aspiración y desnutrición.",
    ],
    epidemiology:
      "Es poco frecuente, con igual distribución por sexo. En Argentina, ante disfagia con esófago dilatado siempre hay que preguntar por Chagas, porque destruye los mismos plexos y da un cuadro similar. La evolución crónica aumenta el riesgo de carcinoma de esófago.",
    management: [
      "Endoscopía primero.",
      "Manometría.",
      "Serología para Chagas.",
      "Tratamiento y seguimiento.",
    ],
    sources: ["Sociedad Argentina de Gastroenterología — Trastornos motores del esófago.", "American College of Gastroenterology — Diagnosis and Management of Achalasia."],
    pearls: ["Sólidos y líquidos desde el inicio.", "Pico de pájaro.", "En Argentina, preguntá por Chagas."],
    pitfalls: ["Tratarla como reflujo.", "No descartar tumor."],
    tribunal: [
      qa("¿Cómo diferenciás disfagia orgánica de motora?", "Orgánica: progresa de sólidos a líquidos. Motora: compromete ambos desde el inicio."),
      qa("¿Qué es la seudoacalasia?", "Un cuadro idéntico causado por tumor de la unión esofagogástrica."),
      qa("¿Qué tipos describe Chicago?", "Tipo I sin presurización, II con presurización panesofágica y III espástica."),
    ],
  },
};
