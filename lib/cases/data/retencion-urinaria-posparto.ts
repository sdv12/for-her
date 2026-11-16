import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const retencionUrinariaPosparto: ClinicalCase = {
  id: "retencion-urinaria-posparto",
  level: 1,
  area: "Ginecología y obstetricia",
  setting: "Internación",
  patient: { age: 34, ageUnit: "años", sex: "F", context: "Primer parto vaginal hace 8 horas, con peridural, fórceps y episiotomía." },
  frequency: "frecuente",
  intro: "La partera: “No orinó desde el parto y se queja de dolor abajo. El útero está alto y desviado.”",
  vitals: { TA: "122/76 mmHg", FC: "92 lpm", "T°": "36,9 °C" },
  anamnesis: [
    act("miccion", "¿Orinó desde el parto?", "clave", "“No pude, tengo ganas pero no sale.”", "Más de 6 horas sin micción espontánea."),
    act("dolor", "¿Dónde le duele?", "util", "“Abajo del ombligo.”", "Vejiga distendida."),
    act("factores", "¿Cómo fue el parto?", "clave", "Peridural, fórceps, episiotomía, expulsivo de 2 horas.", "Factores de riesgo."),
    act("sangrado", "¿Cuánto sangra?", "clave", "“Normal, como una menstruación.”", "La vejiga llena dificulta la retracción uterina."),
    act("fiebre", "¿Fiebre o ardor?", "util", "“No.”", "ITU."),
    act("bebe", "¿Cómo está la beba?", "neutro", "“Prendida a la teta.”", "No orienta."),
  ],
  exam: [
    act("utero", "Útero", "clave", "Fondo uterino por encima del ombligo, desviado a la derecha.", "Desplazado por la vejiga llena."),
    act("globo", "Hipogastrio", "clave", "Globo vesical.", "Retención."),
    act("perine", "Periné", "util", "Episiotomía con edema, sin hematoma.", "Dolor que inhibe la micción."),
  ],
  studies: [
    study("Imágenes", "eco-vesical", "Ecografía vesical (bladder scan)", "clave", "Volumen de 850 ml.", "Confirma."),
    study("Laboratorio", "orina", "Orina completa tras el sondaje", "util", "Normal.", "ITU."),
    study("Imágenes", "tac", "TC de pelvis", "innecesario", "No se pidió.", "La ecografía alcanza."),
    study("Otros", "esperar", "Esperar a que orine sola sin medir", "riesgoso", "No se hizo.", "La sobredistensión daña el detrusor."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("retencion-posparto", "Retención urinaria posparto manifiesta", true, "Sin micción más de 6 horas tras un parto con peridural, fórceps y episiotomía, globo vesical y 850 ml en la ecografía."),
      dx("atonia", "Atonía uterina", false, "Sangrado normal; el útero alto es por la vejiga."),
      dx("hematoma", "Hematoma perineal", false, "Sin hematoma."),
      dx("itu", "Infección urinaria", false, "Orina normal."),
      dx("lesion-vesical", "Lesión vesical", false, "Sin hematuria ni fístula."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("sondaje", "Sondaje vesical evacuador", "clave", "Alivia y protege el detrusor."),
      mg("permanente", "Sonda permanente 24 horas si el volumen supera 700–800 ml", "util", "Reposo vesical."),
      mg("medir", "Medir el residuo posmiccional después de retirarla", "clave", "Confirma la recuperación."),
      mg("analgesia", "Analgesia y frío en el periné", "clave", "El dolor inhibe la micción."),
      mg("explicar", "Explicar que se recupera en la mayoría", "util", "Tranquiliza."),
      mg("betanecol", "Betanecol", "innecesario", "Sin evidencia."),
      mg("presionar", "Maniobra de Credé (presionar el abdomen)", "riesgoso", "Puede causar reflujo y lesionar la vejiga."),
    ],
  },
  debrief: {
    diagnosis: "Retención urinaria posparto manifiesta tras parto instrumental con peridural, en una mujer de 34 años.",
    pathologies: [
      { name: "Retención urinaria posparto", role: "principal", why: "Incapacidad de vaciar la vejiga." },
      { name: "Factores obstétricos", role: "asociada", why: "Peridural, fórceps, episiotomía y expulsivo prolongado." },
      { name: "Atonía uterina", role: "diferencial", why: "La vejiga llena la puede favorecer." },
    ],
    reasoning: [
      "Causa: anestesia, trauma perineal y edema.",
      "Mecanismo: hipoactividad transitoria del detrusor y dolor que inhibe la relajación.",
      "Consecuencia: sobredistensión, daño del detrusor, ITU y hemorragia por útero desplazado.",
    ],
    epidemiology:
      "Ocurre en el 1–5 % de los partos, más con peridural, primer parto, parto instrumental y expulsivo prolongado. Casi siempre se resuelve en días si se detecta y se evita la sobredistensión.",
    management: [
      "Vigilar la primera micción.",
      "Ecografía vesical.",
      "Sondaje.",
      "Residuo posmiccional.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía para la atención del parto normal: puerperio.", "RCOG/NICE — Postnatal care: bladder care after birth."],
    pearls: ["6 horas sin orinar: medir.", "Útero alto y desviado = vejiga llena.", "Evitar la sobredistensión."],
    pitfalls: ["Esperar sin medir.", "Credé."],
    tribunal: [
      qa("¿Qué factores aumentan el riesgo de retención urinaria posparto?", "Primer parto, peridural, parto instrumental, episiotomía o desgarros, expulsivo prolongado y recién nacido grande."),
      qa("¿Por qué la vejiga llena puede aumentar el sangrado posparto?", "Porque desplaza el útero y dificulta su retracción."),
      qa("¿Qué residuo posmiccional se considera normal?", "Menos de 150 ml medidos por ecografía o sondaje después de orinar."),
    ],
  },
};
