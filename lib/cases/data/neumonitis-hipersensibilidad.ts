import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const neumonitisHipersensibilidad: ClinicalCase = {
  id: "neumonitis-hipersensibilidad",
  level: 3,
  area: "Respiratorio",
  setting: "Consultorio",
  patient: { age: 56, ageUnit: "años", sex: "M", context: "Cría palomas mensajeras en el fondo de su casa hace 15 años. No fuma." },
  frequency: "poco-frecuente",
  intro: "“Hace meses tengo tos seca y me falta el aire. Los domingos, después de limpiar el palomar, me agarra fiebre y escalofríos.”",
  vitals: { TA: "128/78 mmHg", FC: "92 lpm", FR: "22 rpm", "T°": "37,6 °C", "SatO₂": "92 %" },
  anamnesis: [
    act("exposicion", "¿Tiene aves, humedad o trabaja con polvos orgánicos?", "clave", "“Tengo palomas, unas cuarenta.”", "Antígeno aviario."),
    act("relacion", "¿Los síntomas empeoran tras la exposición?", "clave", "“Siempre después de limpiar el palomar.”", "Relación temporal."),
    act("peso", "¿Bajó de peso?", "clave", "“Unos cinco kilos.”", "Forma subaguda o crónica."),
    act("tabaco", "¿Fuma o fumó?", "util", "“Nunca.”", "Otras neumopatías."),
    act("farmacos", "¿Toma amiodarona, nitrofurantoína o metotrexato?", "util", "“No.”", "Toxicidad pulmonar."),
    act("equipo", "¿De qué cuadro es?", "neutro", "“De Talleres.”", "No orienta."),
  ],
  exam: [
    act("rales", "Auscultación pulmonar", "clave", "Rales finos bibasales y algunos chillidos inspiratorios (squeaks).", "Compromiso intersticial."),
    act("dedos", "Dedos en palillo de tambor", "clave", "Ausentes.", "Más típico de fibrosis idiopática."),
    act("cardio", "Examen cardiovascular", "util", "Normal.", "Excluye causa cardíaca."),
  ],
  studies: [
    study("Imágenes", "tacar", "TC de tórax de alta resolución", "clave", "Vidrio esmerilado centrolobulillar, atrapamiento aéreo en mosaico en espiración.", "Patrón típico."),
    study("Otros", "espirometria", "Espirometría y DLCO", "clave", "Patrón restrictivo con DLCO disminuida.", "Daño intersticial."),
    study("Otros", "bal", "Lavado broncoalveolar", "util", "Linfocitosis del 45 %.", "Apoya el diagnóstico."),
    study("Laboratorio", "ige", "IgE total y prick test", "innecesario", "No se realizó.", "No es alergia mediada por IgE."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("nh", "Neumonitis por hipersensibilidad subaguda (pulmón del criador de aves)", true, "Exposición a palomas, relación temporal, vidrio esmerilado centrolobulillar con atrapamiento aéreo y linfocitosis."),
      dx("fpi", "Fibrosis pulmonar idiopática", false, "No hay panal ni dedos en palillo, y hay exposición clara."),
      dx("asma", "Asma ocupacional", false, "No es obstructivo."),
      dx("psitacosis", "Psitacosis", false, "Cuadro recurrente con cada exposición y sin neumonía focal."),
      dx("sarcoidosis", "Sarcoidosis", false, "No hay adenopatías hiliares."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("evitar", "Suspender la exposición a las aves", "clave", "Es el tratamiento principal."),
      mg("corticoides", "Corticoides sistémicos si hay compromiso funcional", "clave", "Reducen la inflamación."),
      mg("seguimiento", "Control con espirometría y DLCO", "clave", "Respuesta."),
      mg("vacunas", "Vacunas antigripal y antineumocócica", "util", "Prevención."),
      mg("barbijo-solo", "Seguir criando con un barbijo común", "riesgoso", "No evita la exposición; progresa a fibrosis."),
      mg("antibioticos", "Antibióticos por cada episodio febril", "innecesario", "No es infeccioso."),
    ],
  },
  debrief: {
    diagnosis: "Neumonitis por hipersensibilidad subaguda por antígeno aviario (pulmón del criador de aves), en varón de 56 años.",
    pathologies: [
      { name: "Neumonitis por hipersensibilidad", role: "principal", why: "Respuesta inmune a antígeno inhalado." },
      { name: "Restricción e hipoxemia", role: "asociada", why: "Consecuencia funcional." },
      { name: "Fibrosis idiopática, psitacosis", role: "diferencial", why: "Otras neumopatías." },
    ],
    reasoning: [
      "Causa: proteínas de excrementos y plumas de aves.",
      "Mecanismo: reacción inmune de tipo III y IV en bronquiolos y alvéolos.",
      "Consecuencia: alveolitis linfocitaria y, si persiste, fibrosis.",
    ],
    epidemiology:
      "Es la causa ambiental más frecuente de enfermedad intersticial. En Argentina se ve en criadores de palomas, en trabajadores rurales expuestos a heno húmedo y en ambientes con humedad. La clave es preguntar por la exposición.",
    management: [
      "Identificar el antígeno.",
      "Evitar la exposición.",
      "Corticoides si hace falta.",
      "Seguimiento funcional.",
    ],
    sources: ["Asociación Argentina de Medicina Respiratoria — Enfermedades intersticiales.", "ATS/JRS/ALAT — Hypersensitivity Pneumonitis Guideline."],
    pearls: ["Preguntá por aves y humedad.", "Empeora tras la exposición.", "Mosaico en espiración."],
    pitfalls: ["Tratar como neumonía repetida.", "No suspender la exposición."],
    tribunal: [
      qa("¿Qué otras exposiciones la causan?", "Heno húmedo (pulmón del granjero), hongos de la humedad y humidificadores contaminados."),
      qa("¿Qué muestra el lavado broncoalveolar?", "Linfocitosis marcada, muchas veces mayor del 30 %."),
      qa("¿Cuál es el pronóstico si hay fibrosis?", "Peor: la fibrosis puede progresar aun evitando la exposición."),
    ],
  },
};
