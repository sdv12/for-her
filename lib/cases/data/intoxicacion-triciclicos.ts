import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const intoxicacionTriciclicos: ClinicalCase = {
  id: "intoxicacion-triciclicos",
  level: 4,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 36, ageUnit: "años", sex: "F", context: "Toma amitriptilina por fibromialgia. La encontró la hermana con la caja vacía." },
  frequency: "poco-frecuente",
  intro: "La hermana: “Faltan como 30 pastillas de amitriptilina. La encontré dormida y no se despertaba bien.”",
  vitals: { TA: "88/52 mmHg", FC: "128 lpm", FR: "14 rpm", "SatO₂": "95 %", "T°": "37,8 °C", Glucemia: "112 mg/dl" },
  anamnesis: [
    act("cantidad", "¿Cuántas, de cuánto y cuándo?", "clave", "“Treinta de 25 mg, hace unas dos horas.”", "750 mg: más de 10 mg/kg es potencialmente letal."),
    act("otras", "¿Tomó algo más, alcohol?", "clave", "“Había una botella de vino abierta.”", "Coingestión."),
    act("intencion", "¿Dejó alguna nota o dijo algo?", "clave", "“Estaba muy triste por la separación.”", "Intento de suicidio."),
    act("convulsion", "¿Convulsionó?", "util", "“No vi.”", "Complicación."),
    act("antecedentes", "¿Problemas del corazón?", "util", "“No.”", "Basal."),
    act("mascota", "¿Quién cuida al perro?", "neutro", "“Yo.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Neurológico", "clave", "Glasgow 10, pupilas midriáticas, mioclonías.", "Depresión del sensorio con síndrome anticolinérgico."),
    act("anticolinergico", "Piel, mucosas, abdomen, vejiga", "clave", "Piel seca y caliente, mucosas secas, ruidos disminuidos, globo vesical.", "Toxíndrome anticolinérgico."),
    act("via-aerea", "Vía aérea", "util", "Protege, sin vómito.", "Vigilar."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG de 12 derivaciones", "clave", "Taquicardia sinusal, QRS 130 ms, R en aVR de 4 mm, QTc 510 ms.", "QRS mayor de 100 ms: riesgo de convulsiones; mayor de 160, de arritmias ventriculares."),
    study("Laboratorio", "gases", "Gases arteriales", "clave", "pH 7,28, bicarbonato 18.", "Acidosis: empeora la toxicidad."),
    study("Laboratorio", "paracetamol", "Paracetamolemia y alcoholemia", "clave", "Paracetamol negativo; alcohol 0,9 g/l.", "Coingestiones ocultas."),
    study("Laboratorio", "niveles", "Esperar niveles de amitriptilina para decidir", "riesgoso", "No se esperó.", "Se maneja por la clínica y el ECG."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("atc", "Intoxicación grave por antidepresivos tricíclicos (amitriptilina) con cardiotoxicidad", true, "Ingesta de 750 mg, coma, toxíndrome anticolinérgico, hipotensión y QRS ancho con R en aVR."),
      dx("bzd", "Intoxicación por benzodiacepinas", false, "No daría QRS ancho ni anticolinérgico."),
      dx("serotoninergico", "Síndrome serotoninérgico", false, "Daría diaforesis e hiperreflexia, no piel seca."),
      dx("alcohol", "Intoxicación alcohólica", false, "La alcoholemia es baja para el cuadro."),
      dx("opioides", "Intoxicación por opioides", false, "Pupilas midriáticas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("bicarbonato", "Bicarbonato de sodio 1–2 mEq/kg en bolo y repetir hasta acortar el QRS (pH 7,45–7,55)", "clave", "Antídoto de la cardiotoxicidad: sodio y alcalinización."),
      mg("via-aerea-iot", "Intubar si no protege la vía aérea, con hiperventilación", "clave", "Protección y alcalinización."),
      mg("carbon", "Carbón activado si la vía aérea está protegida", "util", "Dentro de las primeras horas."),
      mg("convulsiones", "Benzodiacepinas para las convulsiones", "clave", "Tratamiento de elección."),
      mg("uti", "Terapia intensiva con monitoreo", "clave", "Arritmias tardías."),
      mg("flumazenil", "Flumazenil para despertarla", "riesgoso", "Precipita convulsiones con tricíclicos."),
      mg("fisostigmina", "Fisostigmina para el anticolinérgico", "riesgoso", "Puede causar asistolia con tricíclicos."),
    ],
  },
  debrief: {
    diagnosis: "Intoxicación grave por amitriptilina con coma, toxíndrome anticolinérgico y cardiotoxicidad (QRS ancho), en un intento de suicidio en una mujer de 36 años.",
    pathologies: [
      { name: "Intoxicación por antidepresivos tricíclicos", role: "principal", why: "Bloqueo de canales de sodio, muscarínico, alfa e histamínico." },
      { name: "Intento de suicidio", role: "asociada", why: "Requiere evaluación de salud mental." },
      { name: "Síndrome serotoninérgico", role: "diferencial", why: "Otra intoxicación por antidepresivos." },
    ],
    reasoning: [
      "Causa: ingesta masiva de amitriptilina.",
      "Mecanismo: bloqueo de canales de sodio cardíacos (QRS ancho), muscarínico (anticolinérgico) y alfa (hipotensión).",
      "Consecuencia: arritmias ventriculares, convulsiones, hipotensión y coma.",
    ],
    epidemiology:
      "Aunque se usan menos como antidepresivos, los tricíclicos siguen indicándose para dolor crónico, migraña e insomnio, y son una de las causas más letales de intoxicación medicamentosa. Las mujeres jóvenes con intento de suicidio son el grupo más afectado.",
    management: [
      "ABC y ECG inmediato.",
      "Bicarbonato si QRS mayor de 100 ms.",
      "Benzodiacepinas para convulsiones.",
      "Terapia intensiva.",
      "Salud mental.",
    ],
    sources: ["Centro Nacional de Intoxicaciones (Hospital Posadas) — Antidepresivos tricíclicos.", "Goldfrank's Toxicologic Emergencies — Cyclic antidepressants."],
    pearls: ["QRS ancho + R en aVR.", "Bicarbonato es el antídoto.", "Nada de flumazenil ni fisostigmina."],
    pitfalls: ["Dar flumazenil.", "Esperar niveles."],
    tribunal: [
      qa("¿Por qué el bicarbonato trata la cardiotoxicidad por tricíclicos?", "Porque el sodio supera el bloqueo de los canales y la alcalinización reduce la unión del fármaco al canal."),
      qa("¿Qué hallazgo del ECG predice convulsiones y arritmias?", "Un QRS mayor de 100 ms predice convulsiones y mayor de 160 ms, arritmias ventriculares; también una R en aVR mayor de 3 mm."),
      qa("¿Por qué está contraindicado el flumazenil en coingestión con tricíclicos?", "Porque al revertir la benzodiacepina se desenmascaran las convulsiones por el tricíclico."),
    ],
  },
};
