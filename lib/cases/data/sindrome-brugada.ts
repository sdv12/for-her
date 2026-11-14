import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sindromeBrugada: ClinicalCase = {
  id: "sindrome-brugada",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 34, ageUnit: "años", sex: "M", context: "Sano. Un tío murió dormido a los 40. Hoy tiene fiebre por una angina." },
  frequency: "raro",
  intro: "“Estaba con fiebre en la cama y me desmayé de golpe, sin aviso. Mi mujer dice que respiraba raro.”",
  vitals: { TA: "122/76 mmHg", FC: "96 lpm", FR: "18 rpm", "T°": "38,9 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("sincope", "¿Cómo fue el desmayo? ¿Hubo aviso?", "clave", "“Sin aviso, acostado.”", "Síncope sin pródromos: arrítmico."),
    act("familia", "¿Muertes súbitas o jóvenes en la familia?", "clave", "“Mi tío murió dormido a los 40.”", "Antecedente familiar."),
    act("fiebre", "¿Tenía fiebre?", "clave", "“Casi 39.”", "La fiebre desenmascara el Brugada."),
    act("farmacos", "¿Tomó antidepresivos, antiarrítmicos o cocaína?", "util", "“No.”", "Fármacos que lo inducen."),
    act("previos", "¿Palpitaciones o desmayos antes?", "util", "“Nunca.”", "Primer evento."),
    act("trabajo", "¿Trabaja?", "neutro", "“Soy electricista.”", "No orienta."),
  ],
  exam: [
    act("cardio", "Auscultación cardíaca", "clave", "Normal, sin soplos.", "Sin cardiopatía estructural evidente."),
    act("neuro", "Examen neurológico", "clave", "Normal, sin mordedura de lengua.", "No sugiere convulsión."),
    act("faringe", "Faringe", "util", "Amígdalas con exudado.", "Origen de la fiebre."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG con fiebre, incluyendo V1-V2 en segundo y tercer espacio", "clave", "Supradesnivel del ST en V1-V2 de 3 mm con forma de domo (coved) y T negativa.", "Patrón tipo 1."),
    study("Imágenes", "eco", "Ecocardiograma", "clave", "Normal.", "Sin cardiopatía estructural."),
    study("Laboratorio", "lab", "Potasio, calcio, troponina", "util", "Normales.", "Excluye otras causas."),
    study("Otros", "alta-antitermico", "Alta con antitérmico por síncope febril", "riesgoso", "No se hizo.", "Riesgo de muerte súbita."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("brugada", "Síndrome de Brugada con patrón tipo 1 desenmascarado por fiebre y síncope arrítmico", true, "Síncope sin pródromos en reposo, muerte súbita familiar y ECG tipo 1 con fiebre."),
      dx("vasovagal", "Síncope vasovagal por fiebre", false, "Sin pródromos, acostado y ECG tipo 1."),
      dx("iam", "IAM anteroseptal", false, "Troponina normal y patrón típico."),
      dx("convulsion-febril", "Convulsión por fiebre", false, "Adulto sin datos de crisis."),
      dx("bloqueo-rama", "Bloqueo de rama derecha benigno", false, "Morfología coved con supra del ST."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("antitermico", "Bajar la fiebre de forma agresiva con paracetamol", "clave", "La fiebre aumenta el riesgo de arritmia."),
      mg("monitor", "Internación con monitoreo", "clave", "Síncope arrítmico."),
      mg("cdi", "Cardiodesfibrilador implantable", "clave", "Síncope con patrón tipo 1."),
      mg("familia", "ECG y evaluación de familiares de primer grado", "util", "Herencia autosómica dominante."),
      mg("bloqueantes-sodio", "Antiarrítmicos de clase I como flecainida", "riesgoso", "Empeoran el Brugada."),
      mg("alta", "Alta con control", "riesgoso", "Muerte súbita."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de Brugada con patrón tipo 1 desenmascarado por fiebre y síncope arrítmico, en varón de 34 años con muerte súbita familiar.",
    pathologies: [
      { name: "Síndrome de Brugada", role: "principal", why: "Canalopatía del sodio." },
      { name: "Fiebre por faringitis", role: "asociada", why: "Desencadenante." },
      { name: "Vasovagal, IAM", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: mutación del canal de sodio (SCN5A) en muchos casos.",
      "Mecanismo: menor corriente de sodio en el ventrículo derecho, que la fiebre agrava.",
      "Consecuencia: fibrilación ventricular y muerte súbita, sobre todo en reposo o durmiendo.",
    ],
    epidemiology:
      "Es más común en varones jóvenes y explica parte de las muertes súbitas con corazón estructuralmente normal. La fiebre, ciertos fármacos y el alcohol desenmascaran el patrón. Por eso se mira el ECG de todo síncope con fiebre.",
    management: [
      "ECG en todo síncope.",
      "Bajar la fiebre.",
      "CDI si hay síncope.",
      "Estudiar a la familia.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de canalopatías.", "ESC — Ventricular Arrhythmias and Prevention of Sudden Cardiac Death Guidelines."],
    pearls: ["Síncope sin aviso, acostado.", "La fiebre lo destapa.", "Lista de fármacos a evitar."],
    pitfalls: ["Llamarlo vasovagal.", "Bloqueantes de sodio."],
    tribunal: [
      qa("¿Qué es el patrón tipo 1 de Brugada?", "Supradesnivel del ST de 2 mm o más en V1-V2 con morfología cóncava hacia abajo y T negativa."),
      qa("¿Qué fármaco se usa para desenmascararlo?", "Ajmalina o flecainida, en un ámbito controlado."),
      qa("¿Qué consejo le das al alta?", "Tratar siempre la fiebre y evitar fármacos de la lista de Brugada y el exceso de alcohol."),
    ],
  },
};
