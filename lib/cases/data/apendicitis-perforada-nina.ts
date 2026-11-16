import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const apendicitisPerforadaNina: ClinicalCase = {
  id: "apendicitis-perforada-nina",
  level: 3,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 10, ageUnit: "años", sex: "F", context: "Hace 3 días la vieron en otra guardia y le dijeron que era una gastroenteritis." },
  frequency: "frecuente",
  intro: "La mamá: “Le duele toda la panza, tiene fiebre alta y no se quiere mover. Primero fue como un dolor de estómago.”",
  vitals: { FC: "132 lpm", FR: "28 rpm", "T°": "39 °C", TA: "98/58 mmHg", Peso: "32 kg" },
  anamnesis: [
    act("migracion", "¿Dónde empezó el dolor y adónde fue?", "clave", "“Alrededor del ombligo, después abajo a la derecha, y desde ayer toda la panza.”", "Migración típica y luego generalización: perforación."),
    act("diarrea", "¿Cómo es la diarrea?", "clave", "“Pocas veces, líquida y poquita.”", "La irritación pélvica da diarrea escasa: confunde con gastroenteritis."),
    act("comida", "¿Come?", "util", "“Nada desde hace 3 días.”", "Anorexia."),
    act("vomitos", "¿Vomitó?", "util", "“Varias veces.”", "Íleo."),
    act("orina", "¿Le arde al hacer pis?", "util", "“Un poco.”", "Puede haber leucocituria por contigüidad."),
    act("escuela", "¿Faltó a la escuela?", "neutro", "“Desde el lunes.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Defensa generalizada, rebote positivo, máximo en fosa ilíaca derecha.", "Peritonitis."),
    act("hidratacion", "Hidratación", "clave", "Mucosas secas, relleno de 3 segundos.", "Deshidratación."),
    act("pulmon", "Pulmones", "util", "Normales.", "Descarta neumonía basal."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, PCR, ionograma", "clave", "Leucocitos 22.000, PCR 180.", "Inflamación intensa."),
    study("Imágenes", "eco", "Ecografía abdominal", "clave", "Apéndice no compresible de 11 mm con apendicolito, líquido libre en fosa ilíaca derecha y pelvis con detritos.", "Apendicitis perforada."),
    study("Laboratorio", "orina", "Orina completa", "util", "Leucocituria leve sin bacterias.", "Piuria estéril por contigüidad."),
    study("Imágenes", "tac", "TC con contraste de rutina", "innecesario", "No se pidió.", "La ecografía fue concluyente."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("apendicitis-perforada", "Apendicitis aguda perforada con peritonitis", true, "Dolor migratorio que se generaliza a los 3 días, fiebre alta, peritonismo y ecografía con apéndice y líquido con detritos."),
      dx("gastroenteritis", "Gastroenteritis", false, "Hay peritonitis."),
      dx("adenitis", "Adenitis mesentérica", false, "No da peritonitis ni apéndice engrosado."),
      dx("itu", "Pielonefritis", false, "Piuria estéril y abdomen quirúrgico."),
      dx("torsion", "Torsión ovárica", false, "Apéndice patológico y fiebre."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hidratar", "Reanimación con cristaloides", "clave", "Antes de la cirugía."),
      mg("atb", "Antibióticos endovenosos (ceftriaxona + metronidazol o piperacilina-tazobactam)", "clave", "Peritonitis."),
      mg("cirugia", "Apendicectomía urgente (laparoscópica) con lavado", "clave", "Control del foco."),
      mg("analgesia", "Analgesia con opioides", "clave", "No enmascara el diagnóstico."),
      mg("atb-post", "Antibióticos posoperatorios por días según evolución", "util", "Peritonitis."),
      mg("alta-gastro", "Rehidratación oral y alta", "riesgoso", "Segundo error diagnóstico."),
      mg("sin-analgesia", "No dar analgesia hasta que la vea el cirujano", "riesgoso", "Mito: no oculta el diagnóstico."),
    ],
  },
  debrief: {
    diagnosis: "Apendicitis aguda perforada con peritonitis, en una niña de 10 años con diagnóstico inicial erróneo de gastroenteritis.",
    pathologies: [
      { name: "Apendicitis perforada", role: "principal", why: "Obstrucción por apendicolito con perforación." },
      { name: "Peritonitis", role: "asociada", why: "Contaminación de la cavidad." },
      { name: "Gastroenteritis", role: "diferencial", why: "El error diagnóstico más común en pediatría." },
    ],
    reasoning: [
      "Causa: apendicolito que obstruye la luz.",
      "Mecanismo: distensión, isquemia y perforación en 48–72 horas.",
      "Consecuencia: peritonitis, sepsis y abscesos.",
    ],
    epidemiology:
      "Es la urgencia quirúrgica más frecuente en niños. En menores de 5 años más del 50 % llega perforada, y en escolares un tercio, muchas veces después de una consulta con diagnóstico de gastroenteritis. Vómitos y diarrea escasa no la descartan.",
    management: [
      "Sospechar con dolor que migra.",
      "Ecografía.",
      "Hidratación y antibióticos.",
      "Cirugía.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Abdomen agudo en pediatría.", "World Society of Emergency Surgery — Jerusalem guidelines for acute appendicitis."],
    pearls: ["Gastroenteritis sin diarrea abundante: mirá el abdomen.", "Analgesia no enmascara.", "Leucocituria por contigüidad."],
    pitfalls: ["Alta con diagnóstico de gastroenteritis.", "Negar analgesia."],
    tribunal: [
      qa("¿Por qué la apendicitis se perfora más en niños pequeños?", "Por el epiplón corto que no la contiene, la pared fina y la consulta y el diagnóstico tardíos."),
      qa("¿Qué es la escala de Alvarado pediátrica (PAS)?", "Un puntaje con migración del dolor, anorexia, náuseas, fiebre, dolor en fosa ilíaca derecha, dolor al toser o saltar, leucocitosis y neutrofilia."),
      qa("¿Por qué una apendicitis puede dar leucocituria?", "Porque el apéndice inflamado contacta el uréter o la vejiga y produce piuria estéril."),
    ],
  },
};
