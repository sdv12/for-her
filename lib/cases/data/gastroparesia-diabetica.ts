import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const gastroparesiaDiabetica: ClinicalCase = {
  id: "gastroparesia-diabetica",
  level: 3,
  area: "Gastroenterología",
  setting: "Consultorio",
  patient: { age: 38, ageUnit: "años", sex: "F", context: "Diabética tipo 1 desde los 12. HbA1c 9,8 %. Tiene retinopatía y neuropatía en los pies." },
  frequency: "poco-frecuente",
  intro: "“Me lleno con dos bocados, vomito comida de la noche anterior y las glucemias me bailan.”",
  vitals: { TA: "112/70 mmHg acostada, 90/60 de pie", FC: "96 lpm fija", Peso: "52 kg (bajó 5 kg)" },
  anamnesis: [
    act("saciedad", "¿Se llena rápido?", "clave", "“Con dos o tres bocados.”", "Saciedad precoz: vaciamiento lento."),
    act("vomitos", "¿Qué vomita?", "clave", "“Comida sin digerir de horas antes.”", "Retención gástrica."),
    act("hipoglucemias", "¿Tiene hipoglucemias después de comer?", "clave", "“Sí, a la hora de comer, y después me sube a la noche.”", "La insulina actúa antes de que la comida llegue al intestino."),
    act("neuropatia-auto", "¿Se marea al pararse? ¿Diarrea nocturna o problemas para orinar?", "clave", "“Me mareo al pararme.”", "Neuropatía autonómica asociada."),
    act("medicamentos", "¿Toma algo que enlentezca el estómago, como opioides o semaglutida?", "clave", "“No.”", "Causas farmacológicas."),
    act("serie", "¿Qué serie está viendo?", "neutro", "“Una coreana.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Distendido en epigastrio, bazuqueo gástrico en ayunas.", "Retención gástrica."),
    act("ortostatismo", "Presión acostada y de pie", "clave", "Cae 22 mmHg sin aumento de FC.", "Neuropatía autonómica cardiovascular."),
    act("pies", "Pies", "util", "Hipoestesia en guante y calcetín.", "Neuropatía periférica."),
  ],
  studies: [
    study("Otros", "endoscopia", "Endoscopía digestiva alta primero", "clave", "Restos de comida en ayunas, sin obstrucción ni úlcera.", "Descarta obstrucción mecánica antes del diagnóstico funcional."),
    study("Imágenes", "centellograma", "Centellograma de vaciamiento gástrico de 4 horas", "clave", "Retención del 35 % a las 4 horas (normal menor de 10 %).", "Confirma la gastroparesia."),
    study("Laboratorio", "lab", "HbA1c, ionograma, TSH", "util", "HbA1c 9,8 %, potasio 3,3 mEq/l, TSH normal.", "Control y causas asociadas."),
    study("Imágenes", "tac-urgente", "TC de abdomen urgente", "innecesario", "No se pidió.", "Sin signos de obstrucción ni abdomen agudo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("gastroparesia", "Gastroparesia diabética con neuropatía autonómica", true, "DM1 de larga data mal controlada con complicaciones, saciedad, vómitos de retención, endoscopía sin obstrucción y vaciamiento retardado."),
      dx("obstruccion-pilorica", "Obstrucción pilórica por úlcera", false, "La endoscopía no muestra obstrucción."),
      dx("dispepsia", "Dispepsia funcional", false, "El vaciamiento está objetivamente retardado."),
      dx("anorexia", "Trastorno de la conducta alimentaria", false, "Hay retención gástrica objetiva."),
      dx("cad", "Cetoacidosis diabética", false, "Sin cetosis ni acidosis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("dieta", "Comidas chicas y frecuentes, bajas en grasa y fibra, más líquidas", "clave", "Primera línea."),
      mg("glucemia", "Mejorar la glucemia: la hiperglucemia enlentece más el vaciamiento", "clave", "Círculo vicioso."),
      mg("insulina-despues", "Insulina rápida después de comer o bomba con bolo extendido", "clave", "Evita la hipoglucemia posprandial."),
      mg("metoclopramida", "Metoclopramida en dosis bajas por tiempo limitado", "util", "Proquinético; riesgo de discinesia tardía con uso prolongado."),
      mg("domperidona", "Domperidona como alternativa con ECG previo", "util", "Prolonga el QT."),
      mg("opioides", "Opioides para el dolor epigástrico", "riesgoso", "Enlentecen más el vaciamiento."),
      mg("glp1", "Agregar un análogo de GLP-1 para bajar la HbA1c", "riesgoso", "Retrasan el vaciamiento gástrico."),
    ],
  },
  debrief: {
    diagnosis: "Gastroparesia diabética con neuropatía autonómica cardiovascular, en una mujer de 38 años con DM1 mal controlada.",
    pathologies: [
      { name: "Gastroparesia diabética", role: "principal", why: "Neuropatía vagal y daño de las células intersticiales de Cajal." },
      { name: "Neuropatía autonómica y periférica", role: "asociada", why: "Complicación microvascular de la diabetes." },
      { name: "Obstrucción pilórica", role: "diferencial", why: "Se descarta con endoscopía." },
    ],
    reasoning: [
      "Causa: hiperglucemia crónica que daña el vago y el marcapasos gástrico.",
      "Mecanismo: pérdida de motilidad antral y descoordinación pilórica.",
      "Consecuencia: retención, vómitos, desnutrición y glucemias imprevisibles.",
    ],
    epidemiology:
      "Afecta a alrededor del 5 % de las personas con DM1 y al 1 % con DM2, casi siempre después de 10 años de enfermedad y con otras complicaciones microvasculares. Es más frecuente en mujeres.",
    management: [
      "Endoscopía para descartar obstrucción.",
      "Centellograma.",
      "Dieta y control glucémico.",
      "Proquinéticos por períodos.",
      "Ajustar la insulina a la absorción lenta.",
    ],
    sources: ["Sociedad Argentina de Diabetes — Neuropatía autonómica.", "American College of Gastroenterology — Clinical guideline: gastroparesis."],
    pearls: ["Hipoglucemia posprandial + vómitos de retención.", "Primero descartá obstrucción.", "Ojo con GLP-1 y opioides."],
    pitfalls: ["Metoclopramida por años.", "Agregar GLP-1."],
    tribunal: [
      qa("¿Cómo se confirma la gastroparesia?", "Con un centellograma de vaciamiento de 4 horas que muestre retención mayor del 10 %, después de descartar obstrucción con endoscopía."),
      qa("¿Por qué la gastroparesia da hipoglucemias?", "Porque la insulina prandial actúa antes de que el alimento llegue al intestino y se absorba."),
      qa("¿Cuál es el riesgo de la metoclopramida a largo plazo?", "La discinesia tardía, que puede ser irreversible; por eso se limita su uso a 12 semanas."),
    ],
  },
};
