import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const aaaRoto: ClinicalCase = {
  id: "aneurisma-aorta-abdominal-roto",
  level: 4,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 74, ageUnit: "años", sex: "M", context: "Fumador de toda la vida, hipertenso. Le dijeron hace años que tenía “la aorta un poco ancha” y no volvió a control." },
  frequency: "raro",
  intro: "“Me agarró un dolor terrible en la cintura y la panza, de golpe, que va hacia la ingle. Me mareé y casi me desmayo.”",
  vitals: { TA: "84/52 mmHg", FC: "124 lpm", FR: "24 rpm", "T°": "36,0 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("dolor", "¿Cómo empezó el dolor y a dónde va?", "clave", "“De golpe, en la panza y la espalda, va a la ingle izquierda.”", "Dolor abdominal o lumbar súbito con síncope en un fumador mayor: rotura de aneurisma."),
    act("aorta", "¿Te dijeron alguna vez que tenías la aorta dilatada?", "clave", "“Hace años, y no seguí.”", "Aneurisma conocido no controlado."),
    act("sincope", "¿Te desmayaste?", "util", "“Casi.”", "Hipovolemia."),
    act("colico", "¿Tuviste cálculos en los riñones?", "util", "“Nunca.”", "El cólico renal es el error diagnóstico más frecuente en esta edad."),
    act("anticoag", "¿Tomás anticoagulantes?", "util", "“No.”", "Importa para la cirugía."),
    act("club", "¿De qué cuadro sos?", "neutro", "“Racing.”", "No orienta."),
  ],
  exam: [
    act("masa", "Palpación abdominal", "clave", "Masa pulsátil y dolorosa periumbilical.", "Aneurisma de aorta abdominal."),
    act("perfusion", "Perfusión", "clave", "Pálido, frío, sudoroso, relleno 4 s.", "Shock hemorrágico."),
    act("pulsos", "Pulsos femorales", "util", "Presentes, débiles.", "Perfusión de miembros."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía en la cama (POCUS)", "clave", "Aorta abdominal de 7 cm con hematoma retroperitoneal.", "Confirma en minutos en el paciente inestable."),
    study("Laboratorio", "lab", "Grupo y factor, pruebas cruzadas, hemograma, coagulograma", "clave", "Hb 9,1, grupo A positivo.", "Preparar transfusión masiva."),
    study("Imágenes", "angiotc", "Angiotomografía si se estabiliza y se planifica reparación endovascular", "util", "Rotura retroperitoneal izquierda.", "Define la anatomía para endoprótesis."),
    study("Otros", "esperar-lab", "Esperar todos los resultados antes de llamar a cirugía", "riesgoso", "No se realizó.", "La rotura de un aneurisma requiere quirófano inmediato."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("aaa", "Rotura de aneurisma de aorta abdominal con shock hemorrágico", true, "Dolor abdominal y lumbar súbito con síncope, masa pulsátil, hipotensión y aorta de 7 cm con hematoma retroperitoneal en un fumador hipertenso de 74 años."),
      dx("colico", "Cólico renal", false, "Error frecuente: no da masa pulsátil ni shock."),
      dx("diverticulitis", "Diverticulitis perforada", false, "Sin fiebre y con aneurisma roto en la imagen."),
      dx("iam", "IAM inferior", false, "Hay masa pulsátil y sangrado retroperitoneal."),
      dx("pancreatitis", "Pancreatitis", false, "La imagen muestra hematoma por aneurisma."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("quirofano", "Llamar a cirugía vascular y trasladar a quirófano (reparación abierta o endovascular) de inmediato", "clave", "Sin cirugía, la mortalidad es casi total."),
      mg("hipotension", "Hipotensión permisiva (sistólica 70–90) con transfusión, evitando grandes volúmenes de cristaloides", "clave", "Subir mucho la presión aumenta el sangrado."),
      mg("transfusion", "Activar el protocolo de transfusión masiva y dos vías gruesas", "clave", "Shock hemorrágico."),
      mg("familia", "Hablar con la familia sobre el riesgo", "util", "Alta mortalidad."),
      mg("cristaloides", "Tres litros de solución fisiológica para normalizar la presión", "riesgoso", "Diluye los factores y aumenta el sangrado."),
      mg("analgesia-alta", "Analgesia y alta como cólico renal", "riesgoso", "Error mortal."),
    ],
  },
  debrief: {
    diagnosis: "Rotura de aneurisma de aorta abdominal infrarrenal de 7 cm con hematoma retroperitoneal y shock hemorrágico, en varón de 74 años fumador e hipertenso sin seguimiento.",
    pathologies: [
      { name: "Aneurisma de aorta abdominal roto", role: "principal", why: "Rotura con hemorragia retroperitoneal." },
      { name: "Tabaquismo e hipertensión", role: "asociada", why: "Factores de riesgo." },
      { name: "Cólico renal, diverticulitis, IAM", role: "diferencial", why: "Simuladores." },
    ],
    reasoning: [
      "Causa: degeneración de la pared aórtica por tabaco, hipertensión, edad y genética.",
      "Mecanismo: la aorta se dilata progresivamente (ley de Laplace: más radio, más tensión) hasta romperse.",
      "Consecuencia: hemorragia retroperitoneal o libre, shock y muerte.",
    ],
    epidemiology:
      "Los aneurismas de aorta abdominal afectan a alrededor del 4–8 % de los varones mayores de 65 años fumadores. El riesgo de rotura aumenta mucho por encima de 5,5 cm. La rotura tiene una mortalidad global de alrededor del 80 %.",
    management: [
      "Rastreo con ecografía en varones de 65 a 75 años que fumaron.",
      "Control según diámetro; cirugía electiva con 5,5 cm o más o crecimiento rápido.",
      "Rotura: hipotensión permisiva, transfusión y cirugía inmediata.",
      "Dejar de fumar y controlar la presión.",
    ],
    sources: ["Colegio Argentino de Cirujanos Cardiovasculares — Recomendaciones sobre aneurisma de aorta abdominal.", "Guías de la Sociedad Europea de Cirugía Vascular."],
    pearls: ["Mayor fumador + dolor lumbar súbito + hipotensión = aneurisma roto.", "Masa pulsátil.", "Hipotensión permisiva y quirófano."],
    pitfalls: ["Diagnosticar cólico renal.", "Reponer muchos cristaloides."],
    tribunal: [
      qa("¿A quién se le hace rastreo de aneurisma de aorta abdominal?", "A varones de 65 a 75 años que fumaron alguna vez, con una ecografía abdominal única; se considera en otros grupos con antecedentes familiares."),
      qa("¿Cuándo se opera un aneurisma no roto?", "Con un diámetro de 5,5 cm o más en varones (5 cm en mujeres), crecimiento mayor de 1 cm por año o síntomas."),
      qa("¿Qué es la hipotensión permisiva?", "Mantener una presión menor de lo normal (sistólica de 70–90, o la necesaria para conservar la conciencia) en hemorragias no controladas hasta la cirugía, para no aumentar el sangrado ni diluir los factores de coagulación."),
    ],
  },
};
