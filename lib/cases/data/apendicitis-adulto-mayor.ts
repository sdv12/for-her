import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const apendicitisAdultoMayor: ClinicalCase = {
  id: "apendicitis-adulto-mayor",
  level: 3,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 76, ageUnit: "años", sex: "M", context: "Diabético e hipertenso, toma aspirina. Consultó hace dos días y lo mandaron con antiespasmódicos." },
  frequency: "frecuente",
  intro: "“Hace tres días me duele la panza abajo a la derecha, no tengo hambre, y me siento muy decaído. Casi no tuve fiebre.”",
  vitals: { TA: "108/66 mmHg", FC: "104 lpm", FR: "22 rpm", "T°": "37,4 °C", "SatO₂": "96 %", Glucemia: "242 mg/dl" },
  anamnesis: [
    act("dolor", "¿Dónde empezó y cómo cambió?", "clave", "“En toda la panza, después bajó a la derecha.”", "Migración típica, aunque puede faltar."),
    act("intestino", "¿Vómitos, gases, deposiciones?", "clave", "“Algo de vómito, no largo gases.”", "Puede simular obstrucción; íleo por perforación."),
    act("anticoag", "¿Aspirina o anticoagulantes?", "clave", "“Aspirina.”", "Importante para la cirugía."),
    act("urinario", "¿Ardor al orinar?", "util", "“No.”", "Diferencial."),
    act("colon", "¿Cambios en el ritmo evacuatorio, sangre, baja de peso, última colonoscopía?", "util", "“No, y nunca me la hice.”", "En mayores, un tumor puede presentarse como apendicitis."),
    act("oficio", "¿A qué te dedicaste?", "neutro", "“Tornero.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Dolor en fosa ilíaca derecha, defensa, Blumberg positivo y masa empastada.", "Irritación peritoneal y plastrón."),
    act("general", "Hidratación y perfusión", "clave", "Deshidratado, taquicárdico.", "Compromiso sistémico."),
    act("tacto", "Tacto rectal", "util", "Dolor a la derecha.", "Apoyo clínico."),
  ],
  studies: [
    study("Imágenes", "tac", "TC de abdomen con contraste", "clave", "Apéndice perforado con absceso de 4 cm; sin tumor evidente.", "En mayores, la TC evita errores y ve complicaciones."),
    study("Laboratorio", "lab", "Hemograma, PCR, función renal, ionograma", "clave", "Leucocitos 15.000, PCR 210, creatinina 1,5.", "Los leucocitos pueden ser normales en mayores."),
    study("Electrofisiología", "ecg", "ECG y evaluación prequirúrgica", "util", "Sin isquemia.", "Infarto inferior como diferencial."),
    study("Otros", "antiespasmodico", "Repetir antiespasmódico y control en 48 horas", "riesgoso", "No se realizó.", "Ya fue un error de diagnóstico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("perforada", "Apendicitis aguda perforada con absceso", true, "Dolor en FID, irritación peritoneal, PCR alta y TC con apéndice perforado y absceso."),
      dx("diverticulitis", "Diverticulitis derecha", false, "Es rara, y la TC muestra el apéndice."),
      dx("colon", "Cáncer de ciego perforado", false, "La TC no muestra tumor, aunque se debe estudiar luego."),
      dx("mesenterica", "Isquemia mesentérica", false, "Sería dolor desproporcionado, con lactato alto."),
      dx("itu", "Infección urinaria", false, "Sin síntomas ni foco."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("resucitar", "Hidratación EV, control de glucemia, ayuno", "clave", "Optimiza antes de intervenir."),
      mg("atb", "Antibióticos para gram negativos y anaerobios", "clave", "Trata la infección intraabdominal."),
      mg("drenaje", "Drenaje percutáneo del absceso, o cirugía si hay peritonitis o falla", "clave", "Control del foco."),
      mg("colono", "Colonoscopía a las 6 semanas", "clave", "Excluye tumor en mayores de 40-50 años."),
      mg("aines", "AINE y alta", "riesgoso", "Enmascara el cuadro."),
      mg("laxante", "Laxantes por la falta de gases", "riesgoso", "Riesgo en abdomen agudo."),
    ],
  },
  debrief: {
    diagnosis: "Apendicitis aguda perforada con absceso, de presentación tardía, en varón de 76 años con diabetes.",
    pathologies: [
      { name: "Apendicitis perforada", role: "principal", why: "Inflamación apendicular complicada." },
      { name: "Absceso periapendicular", role: "asociada", why: "Complicación local." },
      { name: "Cáncer de ciego, diverticulitis, isquemia mesentérica", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: obstrucción de la luz por fecalito, o tumor en personas mayores.",
      "Mecanismo: distensión, isquemia, necrosis y perforación, más rápida por menor irrigación.",
      "Consecuencia: absceso o peritonitis, sepsis y más mortalidad.",
    ],
    epidemiology:
      "Aunque es más común en jóvenes, en mayores de 65 años se perfora hasta en la mitad de los casos, porque consultan tarde, con pocos síntomas y a menudo sin fiebre. Es la causa de una parte importante del abdomen agudo quirúrgico en esa edad.",
    management: [
      "Bajo umbral para TC en mayores.",
      "Hidratación y antibióticos.",
      "Cirugía o drenaje según el cuadro.",
      "Colonoscopía posterior.",
    ],
    sources: ["Asociación Argentina de Cirugía — Relatos de abdomen agudo.", "Guías de Jerusalén — Apendicitis aguda."],
    pearls: ["En personas mayores el abdomen agudo engaña: poca fiebre y leucocitos normales.", "Siempre descartá tumor.", "No uses antiespasmódicos sin diagnóstico."],
    pitfalls: ["Descartar por falta de fiebre.", "No hacer TC."],
    tribunal: [
      qa("¿Qué es la escala de Alvarado?", "Migración, anorexia, náuseas, dolor en FID, rebote, fiebre, leucocitosis y desviación a la izquierda; ayuda a estratificar."),
      qa("¿Qué es un plastrón apendicular?", "Una masa inflamatoria que engloba apéndice, epiplón y asas. Suele manejarse con antibióticos y luego evaluación diferida."),
      qa("¿Cuáles son los signos de apendicitis?", "McBurney, Blumberg, Rovsing, psoas y obturador."),
    ],
  },
};
