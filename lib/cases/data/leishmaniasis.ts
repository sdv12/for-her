import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const leishmaniasis: ClinicalCase = {
  id: "leishmaniasis-cutanea",
  level: 2,
  area: "Infectología",
  setting: "Consultorio",
  patient: { age: 32, ageUnit: "años", sex: "M", context: "Trabajó dos meses en un desmonte en Salta. Volvió hace tres meses." },
  frequency: "poco-frecuente",
  intro: "“Me salió una llaga en la pierna que no cierra. Empezó como un granito y ahora es una úlcera redonda, no duele.”",
  vitals: { TA: "120/76 mmHg", FC: "72 lpm", "T°": "36,6 °C" },
  anamnesis: [
    act("viaje", "¿Dónde estuviste? ¿Selva o desmonte?", "clave", "“En Salta, desmontando.”", "Zona endémica."),
    act("evolucion", "¿Cómo empezó?", "clave", "“Pápula que se ulceró.”", "Típico."),
    act("mucosas", "¿Nariz tapada o sangrado nasal?", "clave", "“No.”", "Forma mucosa."),
    act("dolor", "¿Duele?", "util", "“No.”", "Indolora."),
    act("tbc", "¿Tos o contacto con TBC?", "util", "“No.”", "Diferencial."),
    act("compas", "¿Con quién trabajaste?", "neutro", "“Con mi cuñado.”", "No orienta."),
  ],
  exam: [
    act("ulcera", "Úlcera", "clave", "Redondeada de 3 cm, bordes elevados, fondo granuloso, indolora.", "Úlcera típica."),
    act("ganglios", "Ganglios", "clave", "Linfangitis nodular regional.", "Diseminación."),
    act("nariz", "Mucosa nasal", "util", "Normal.", "Sin forma mucosa."),
  ],
  studies: [
    study("Laboratorio", "frotis", "Frotis del borde y PCR", "clave", "Amastigotes; Leishmania braziliensis.", "Confirma."),
    study("Otros", "biopsia", "Biopsia", "util", "Granulomas con amastigotes.", "Si el frotis es negativo."),
    study("Laboratorio", "lab", "Hemograma, función renal y hepática, ECG", "clave", "Normales.", "Antes de antimoniales."),
    study("Otros", "antibiotico", "Cefalexina para la úlcera", "riesgoso", "No se realizó.", "No trata y demora."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("leish", "Leishmaniasis cutánea por L. braziliensis", true, "Desmonte en zona endémica, úlcera indolora de bordes elevados y amastigotes."),
      dx("piodermitis", "Piodermitis", false, "Crónica, indolora, amastigotes."),
      dx("esporotricosis", "Esporotricosis", false, "Amastigotes."),
      dx("venosa", "Úlcera venosa", false, "Joven, sin insuficiencia venosa."),
      dx("carcinoma", "Carcinoma espinocelular", false, "Frotis positivo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("antimonial", "Antimoniales pentavalentes con ECG", "clave", "Tratamiento sistémico por riesgo mucoso."),
      mg("notificar", "Notificar", "clave", "Vigilancia."),
      mg("seguimiento", "Seguimiento por años para detectar forma mucosa", "clave", "Riesgo de lesión mucosa."),
      mg("prevencion", "Repelente, mangas largas, mosquiteros", "util", "Prevención."),
      mg("solo-local", "Solo curaciones locales", "riesgoso", "Riesgo de forma mucosa."),
      mg("corticoide", "Corticoide tópico", "riesgoso", "Empeora."),
    ],
  },
  debrief: {
    diagnosis: "Leishmaniasis cutánea por Leishmania braziliensis adquirida en desmonte en Salta, en varón de 32 años.",
    pathologies: [
      { name: "Leishmaniasis cutánea", role: "principal", why: "Parasitosis transmitida por flebótomos." },
      { name: "Riesgo de forma mucosa", role: "asociada", why: "Complicación tardía." },
      { name: "Piodermitis, esporotricosis", role: "diferencial", why: "Otras úlceras." },
    ],
    reasoning: [
      "Causa: picadura de flebótomo infectado.",
      "Mecanismo: el parásito se multiplica en macrófagos de la piel.",
      "Consecuencia: úlcera crónica y posible destrucción mucosa.",
    ],
    epidemiology:
      "Es endémica en el norte argentino (Salta, Jujuy, Tucumán, Chaco, Misiones), con brotes asociados a desmonte. L. braziliensis puede dar forma mucosa años después. La notificación es obligatoria.",
    management: [
      "Sospecha epidemiológica.",
      "Frotis y PCR.",
      "Antimoniales.",
      "Seguimiento.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de leishmaniasis.", "OPS — Manual de leishmaniasis en las Américas."],
    pearls: ["Úlcera indolora de bordes elevados tras viaje.", "Forma mucosa tardía.", "ECG con antimoniales."],
    pitfalls: ["Antibióticos.", "No preguntar dónde estuvo."],
    tribunal: [
      qa("¿Qué formas clínicas tiene la leishmaniasis?", "Cutánea, mucocutánea y visceral."),
      qa("¿Qué toxicidad dan los antimoniales?", "Prolongación del QT, pancreatitis, hepatitis y artralgias."),
      qa("¿Qué vector transmite la enfermedad?", "Flebótomos del género Lutzomyia."),
    ],
  },
};
