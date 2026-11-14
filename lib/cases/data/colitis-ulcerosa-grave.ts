import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const colitisUlcerosaGrave: ClinicalCase = {
  id: "colitis-ulcerosa-aguda-grave",
  level: 4,
  area: "Gastroenterología",
  setting: "Internación",
  patient: { age: 22, ageUnit: "años", sex: "M", context: "Diagnosticado de colitis ulcerosa hace un año. Dejó la mesalazina hace tres meses." },
  frequency: "poco-frecuente",
  intro: "“Hago diez veces por día diarrea con sangre, me duele la panza, tengo fiebre y estoy muy débil.”",
  vitals: { TA: "104/62 mmHg", FC: "112 lpm", FR: "20 rpm", "T°": "38,1 °C", "SatO₂": "97 %" },
  anamnesis: [
    act("deposiciones", "¿Cuántas deposiciones con sangre por día?", "clave", "“Diez, con sangre.”", "Criterios de Truelove-Witts."),
    act("adherencia", "¿Tomás la medicación?", "clave", "“La dejé hace tres meses.”", "Desencadenante."),
    act("distension", "¿Se hinchó la panza mucho?", "clave", "“Un poco.”", "Megacolon tóxico."),
    act("antibioticos", "¿Tomaste antibióticos o AINE?", "util", "“Ibuprofeno.”", "Desencadenante."),
    act("viajes", "¿Viajes o contactos con diarrea?", "util", "“No.”", "Infección."),
    act("carrera", "¿Qué estudiás?", "neutro", "“Arquitectura.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Dolor difuso sin peritonitis, levemente distendido.", "Vigilar megacolon."),
    act("volemia", "Volemia", "clave", "Deshidratado, pálido.", "Gravedad."),
    act("articular", "Articulaciones y piel", "util", "Normales.", "Extraintestinal."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, PCR, albúmina, ionograma", "clave", "Hb 9,1; PCR 9; albúmina 2,6; K 3,1.", "Brote grave."),
    study("Microbiología", "cdiff", "Toxina de C. difficile, coprocultivo y CMV", "clave", "Negativos.", "Excluir infecciones."),
    study("Imágenes", "rx", "Radiografía de abdomen", "util", "Colon transverso de 5 cm.", "Sin megacolon."),
    study("Otros", "colonoscopia-completa", "Colonoscopia completa con preparación", "riesgoso", "No se hizo.", "Riesgo de perforación; se hace rectosigmoidoscopia flexible."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cu-grave", "Colitis ulcerosa aguda grave por abandono del tratamiento", true, "Más de 6 deposiciones con sangre, fiebre, taquicardia, anemia y PCR alta, con infecciones descartadas."),
      dx("c-difficile", "Colitis por C. difficile", false, "Toxina negativa."),
      dx("infecciosa", "Colitis infecciosa", false, "Coprocultivo negativo."),
      dx("megacolon", "Megacolon tóxico", false, "Colon de 5 cm."),
      dx("crohn", "Crohn", false, "Diagnóstico previo de CU."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("corticoides", "Metilprednisolona EV", "clave", "Primera línea en brote grave."),
      mg("tromboprofilaxis", "Heparina profiláctica", "clave", "Alto riesgo trombótico pese al sangrado."),
      mg("rescate", "Evaluar al día 3: infliximab o ciclosporina si no responde, y cirugía", "clave", "Rescate."),
      mg("hidratacion", "Hidratación y potasio", "util", "Soporte."),
      mg("antidiarreicos", "Loperamida u opioides", "riesgoso", "Megacolon tóxico."),
      mg("aines", "Seguir con ibuprofeno", "riesgoso", "Empeora el brote."),
    ],
  },
  debrief: {
    diagnosis: "Colitis ulcerosa aguda grave por abandono del tratamiento, en varón de 22 años.",
    pathologies: [
      { name: "Colitis ulcerosa aguda grave", role: "principal", why: "Emergencia médico-quirúrgica." },
      { name: "Riesgo de megacolon y trombosis", role: "asociada", why: "Complicaciones." },
      { name: "C. difficile, infecciosa", role: "diferencial", why: "Otras colitis." },
    ],
    reasoning: [
      "Causa: suspensión de la mesalazina y AINE.",
      "Mecanismo: inflamación mucosa extensa y ulcerada.",
      "Consecuencia: sangrado, deshidratación, megacolon y perforación.",
    ],
    epidemiology:
      "Hasta un cuarto de los pacientes con colitis ulcerosa tiene un brote grave. Un tercio no responde a corticoides y necesita rescate o colectomía. La tromboprofilaxis es obligatoria aunque haya sangrado.",
    management: [
      "Truelove-Witts.",
      "Descartar infecciones.",
      "Corticoides EV.",
      "Rescate al día 3.",
    ],
    sources: ["Sociedad Argentina de Gastroenterología — Colitis ulcerosa.", "ECCO — Guidelines on Therapeutics in Ulcerative Colitis."],
    pearls: ["Más de 6 con sangre y fiebre: grave.", "Heparina aunque sangre.", "Día 3 decide."],
    pitfalls: ["Antidiarreicos.", "Colonoscopia completa."],
    tribunal: [
      qa("¿Qué son los criterios de Truelove-Witts?", "Seis o más deposiciones con sangre más fiebre, taquicardia, anemia o VSG alta."),
      qa("¿Qué es el megacolon tóxico?", "Dilatación del colon mayor de 6 cm con toxicidad sistémica."),
      qa("¿Por qué se pide CMV?", "Porque su reactivación empeora brotes refractarios."),
    ],
  },
};
