import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const colicoRenalAdultoMayor: ClinicalCase = {
  id: "colico-renal-adulto-mayor",
  level: 4,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 81, ageUnit: "años", sex: "M", context: "EPOC, exfumador. Tuvo un cálculo renal hace 30 años. Lo vieron hace una hora en otra guardia y le dieron diclofenac por 'cólico renal'." },
  frequency: "poco-frecuente",
  intro: "“Me duele la cintura izquierda que va a la ingle, fuertísimo. Me dijeron que era una piedra, pero no se me pasa.”",
  vitals: { TA: "98/60 mmHg", FC: "118 lpm", FR: "22 rpm", "SatO₂": "96 %", "T°": "36,4 °C" },
  anamnesis: [
    act("previos", "¿Tuvo cálculos antes?", "clave", "“Uno hace 30 años, pero este dolor es distinto.”", "Un antecedente lejano no descarta: cólico después de los 60, pensar en aneurisma."),
    act("dolor", "¿Cómo empezó?", "clave", "“De golpe, desgarrante, y me mareé.”", "Dolor brusco con mareo."),
    act("sincope", "¿Se desmayó?", "clave", "“Casi, al pararme.”", "Hipotensión."),
    act("tabaco", "¿Fumó?", "util", "“Cuarenta años, dejé hace diez.”", "Factor de riesgo de aneurisma."),
    act("orina", "¿Sangre en la orina?", "util", "“No vi.”", "La hematuria puede estar en ambos."),
    act("hobby", "¿Tiene algún hobby?", "neutro", "“El bochas.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Masa pulsátil periumbilical dolorosa.", "Aneurisma."),
    act("pulsos", "Pulsos femorales", "clave", "Débiles.", "Compromiso."),
    act("perfusion", "Perfusión", "clave", "Palidez, frialdad, relleno lento.", "Shock."),
  ],
  studies: [
    study("Imágenes", "eco-fast", "Ecografía a la cabecera", "clave", "Aorta abdominal de 7 cm con hematoma retroperitoneal.", "Diagnóstico en minutos."),
    study("Imágenes", "angiotac", "Angiotomografía si está estable", "util", "Aneurisma infrarrenal roto con hematoma retroperitoneal izquierdo.", "Planifica la reparación."),
    study("Laboratorio", "lab", "Grupo, factor, hemograma, coagulación", "clave", "Hb 9,8.", "Transfusión masiva."),
    study("Laboratorio", "orina", "Orina para confirmar el cálculo antes de seguir", "riesgoso", "No se esperó.", "Pierde minutos en una rotura."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("aaa-roto", "Aneurisma de aorta abdominal roto que simula un cólico renal", true, "'Cólico' distinto a su cálculo de hace 30 años en un exfumador mayor, con hipotensión, masa pulsátil y aorta de 7 cm con hematoma."),
      dx("colico-renal", "Cólico renal", false, "El antecedente lejano confunde, pero hay shock y aneurisma."),
      dx("diseccion", "Disección aórtica", false, "Hay aneurisma abdominal con hematoma."),
      dx("isquemia-mesenterica", "Isquemia mesentérica", false, "Masa pulsátil y hematoma retroperitoneal."),
      dx("diverticulitis", "Diverticulitis", false, "Sin fiebre y con shock hemorrágico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Activar cirugía vascular: reparación endovascular o abierta inmediata", "clave", "La única chance de sobrevida."),
      mg("hipotension-permisiva", "Hipotensión permisiva (sistólica 70–90)", "clave", "Evita aumentar el sangrado."),
      mg("transfusion", "Protocolo de transfusión masiva", "clave", "Hemorragia."),
      mg("vias", "Dos vías gruesas", "util", "Reanimación."),
      mg("cristaloides", "Cristaloides a chorro hasta normalizar la presión", "riesgoso", "Aumenta el sangrado."),
      mg("analgesia-alta", "Más analgesia y alta con alfa-bloqueante", "riesgoso", "Error fatal."),
    ],
  },
  debrief: {
    diagnosis: "Aneurisma de aorta abdominal infrarrenal roto, inicialmente diagnosticado como cólico renal, en un hombre de 81 años exfumador con EPOC.",
    pathologies: [
      { name: "Aneurisma de aorta abdominal roto", role: "principal", why: "Rotura con hematoma retroperitoneal." },
      { name: "Tabaquismo y EPOC", role: "asociada", why: "Factores de riesgo." },
      { name: "Cólico renal", role: "diferencial", why: "Simulador clásico." },
    ],
    reasoning: [
      "Causa: degeneración de la pared aórtica por tabaco, edad y HTA.",
      "Mecanismo: la rotura retroperitoneal irrita el uréter y da dolor lumbar irradiado a la ingle.",
      "Consecuencia: shock hemorrágico con mortalidad mayor del 80 %.",
    ],
    epidemiology:
      "El aneurisma de aorta abdominal afecta al 4–8 % de los varones mayores de 65 fumadores. El cólico renal es el diagnóstico erróneo más frecuente en la rotura, en hasta un tercio de los casos. Por eso se recomienda pesquisa con ecografía en varones de 65–75 años que fumaron.",
    management: [
      "Sospechar en todo 'cólico' de mayor de 60 sin antecedentes.",
      "Ecografía a la cabecera.",
      "Hipotensión permisiva y transfusión.",
      "Cirugía inmediata.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de patología de la aorta.", "ESVS — Guidelines on the management of abdominal aorto-iliac artery aneurysms."],
    pearls: ["Primer cólico renal después de los 60: pensá en la aorta.", "Eco a la cabecera.", "Hipotensión permisiva."],
    pitfalls: ["Diagnosticar cólico sin examen.", "Cristaloides a chorro."],
    tribunal: [
      qa("¿Por qué la rotura de un aneurisma aórtico puede simular un cólico renal?", "Porque el hematoma retroperitoneal irrita el uréter y la raíz nerviosa, con dolor lumbar irradiado a la ingle e incluso hematuria."),
      qa("¿A quiénes se hace pesquisa de aneurisma aórtico abdominal?", "A varones de 65 a 75 años que alguna vez fumaron, con una ecografía abdominal."),
      qa("¿Cuándo se opera un aneurisma no roto?", "Con 5,5 cm o más en varones, 5 cm en mujeres, crecimiento mayor de 1 cm por año o síntomas."),
    ],
  },
};
