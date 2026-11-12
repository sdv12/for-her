import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const coledocolitiasis: ClinicalCase = {
  id: "coledocolitiasis",
  level: 2,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 47, ageUnit: "años", sex: "F", context: "Cólicos biliares hace un año; no se operó. Obesa, tres hijos." },
  frequency: "frecuente",
  intro: "“Me duele arriba a la derecha, estoy amarilla, la orina parece té y la materia fecal salió clara.”",
  vitals: { TA: "128/80 mmHg", FC: "88 lpm", FR: "18 rpm", "T°": "37,2 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("ictericia", "¿Desde cuándo estás amarilla? ¿Orina y heces?", "clave", "“Dos días; orina oscura y heces claras.”", "Colestasis obstructiva."),
    act("fiebre", "¿Fiebre o escalofríos?", "clave", "“No.”", "Sin colangitis."),
    act("previos", "¿Cálculos conocidos?", "clave", "“Me dijeron que tenía piedras.”", "Litiasis."),
    act("peso", "¿Bajaste de peso? ¿Picazón?", "util", "“No.”", "Cáncer de páncreas."),
    act("alcohol", "¿Alcohol o hepatitis?", "util", "“No.”", "Otras causas."),
    act("hijos", "¿Edades de tus hijos?", "neutro", "“De 10 a 20.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen y Murphy", "clave", "Dolor en hipocondrio derecho, Murphy negativo, sin peritonismo.", "No hay colecistitis."),
    act("piel", "Piel", "clave", "Ictericia.", "Confirma."),
    act("vesicula", "Vesícula palpable", "util", "No palpable.", "Courvoisier negativo."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hepatograma, bilirrubina, amilasa, lipasa, hemograma", "clave", "BT 5,2 (directa 4,1); FAL y GGT altas; lipasa normal.", "Colestasis sin pancreatitis."),
    study("Imágenes", "eco", "Ecografía abdominal", "clave", "Vesícula con cálculos; colédoco de 10 mm.", "Riesgo alto."),
    study("Imágenes", "colangiorm", "ColangioRM", "util", "Cálculo en colédoco distal.", "Confirma si hay dudas."),
    study("Imágenes", "tc", "TC de rutina", "innecesario", "No se realizó.", "No hace falta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("coledoco", "Coledocolitiasis sin colangitis", true, "Ictericia obstructiva, cálculos y colédoco dilatado, sin fiebre."),
      dx("colangitis", "Colangitis aguda", false, "No hay fiebre."),
      dx("pancreas", "Cáncer de páncreas", false, "Dolor, cálculos e ictericia breve."),
      dx("hepatitis", "Hepatitis", false, "Patrón colestásico y dilatación."),
      dx("colecistitis", "Colecistitis", false, "Murphy negativo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cpre", "CPRE con extracción del cálculo", "clave", "Despeja la vía."),
      mg("colecistectomia", "Colecistectomía laparoscópica en la misma internación", "clave", "Previene recurrencias."),
      mg("alarma", "Vigilar fiebre y pancreatitis", "clave", "Complicaciones."),
      mg("analgesia", "Analgesia y ayuno", "util", "Soporte."),
      mg("alta", "Alta con analgésicos", "riesgoso", "Riesgo de colangitis."),
      mg("ursodiol", "Ácido ursodesoxicólico como único tratamiento", "riesgoso", "No resuelve."),
    ],
  },
  debrief: {
    diagnosis: "Coledocolitiasis con ictericia obstructiva sin colangitis, en mujer de 47 años con colelitiasis.",
    pathologies: [
      { name: "Coledocolitiasis", role: "principal", why: "Cálculo en vía biliar principal." },
      { name: "Colelitiasis", role: "asociada", why: "Origen." },
      { name: "Colangitis, cáncer, hepatitis", role: "diferencial", why: "Otras ictericias." },
    ],
    reasoning: [
      "Causa: migración de cálculos de la vesícula.",
      "Mecanismo: obstrucción del flujo biliar.",
      "Consecuencia: ictericia, riesgo de colangitis y pancreatitis.",
    ],
    epidemiology:
      "La litiasis biliar es muy frecuente en Argentina, sobre todo en mujeres con obesidad y embarazos. Una parte desarrolla coledocolitiasis. La colecistectomía tras un cólico previo previene muchas de estas complicaciones.",
    management: [
      "Laboratorio y ecografía.",
      "Estratificar riesgo.",
      "CPRE.",
      "Colecistectomía.",
    ],
    sources: ["Sociedad Argentina de Cirugía Digestiva — Litiasis de la vía biliar.", "ASGE — Guideline on Choledocholithiasis."],
    pearls: ["Ictericia con heces claras: obstrucción.", "Colédoco dilatado.", "CPRE y colecistectomía."],
    pitfalls: ["No operar la vesícula.", "Ignorar la fiebre."],
    tribunal: [
      qa("¿Qué es la tríada de Charcot?", "Fiebre, ictericia y dolor en hipocondrio derecho; sugiere colangitis."),
      qa("¿Qué es el signo de Courvoisier?", "Vesícula palpable e indolora con ictericia, sugiere tumor periampular."),
      qa("¿Qué complicaciones tiene la CPRE?", "Pancreatitis, sangrado, perforación y colangitis."),
    ],
  },
};
