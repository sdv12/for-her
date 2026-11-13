import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cirrosisAscitisDebut: ClinicalCase = {
  id: "cirrosis-esteatohepatitis-ascitis",
  level: 3,
  area: "Gastroenterología",
  setting: "Consultorio",
  patient: { age: 49, ageUnit: "años", sex: "F", context: "Diabética tipo 2 e hipertensa. IMC 36. No toma alcohol." },
  frequency: "frecuente",
  intro: "“Hace un mes se me hinchó la panza, me cuesta abrochar el pantalón y se me hinchan los tobillos.”",
  vitals: { TA: "126/78 mmHg", FC: "84 lpm", "T°": "36,5 °C", Peso: "94 kg" },
  anamnesis: [
    act("alcohol", "¿Toma alcohol?", "clave", "“Nunca tomé.”", "Hepatopatía no alcohólica."),
    act("metabolico", "¿Diabetes, presión, colesterol?", "clave", "“Diabetes y presión hace diez años.”", "Síndrome metabólico."),
    act("hemorragia", "¿Vómitos con sangre o materia fecal negra?", "clave", "“No.”", "Várices."),
    act("confusion", "¿Somnolencia o confusión?", "util", "“No.”", "Encefalopatía."),
    act("virus", "¿Transfusiones, tatuajes, drogas inyectables?", "util", "“No.”", "Hepatitis virales."),
    act("trabajo", "¿Trabaja?", "neutro", "“Soy secretaria.”", "No orienta."),
  ],
  exam: [
    act("ascitis", "Abdomen", "clave", "Matidez desplazable, onda ascítica.", "Ascitis moderada."),
    act("estigmas", "Estigmas de hepatopatía", "clave", "Arañas vasculares, eritema palmar, esplenomegalia.", "Cirrosis con hipertensión portal."),
    act("edemas", "Edemas", "util", "Maleolares bilaterales.", "Retención."),
  ],
  studies: [
    study("Laboratorio", "paracentesis", "Paracentesis diagnóstica con GASA, proteínas, células y cultivo", "clave", "GASA 1,6; proteínas 1,2 g/dl; PMN 80.", "Ascitis por hipertensión portal, sin PBE."),
    study("Laboratorio", "lab", "Hepatograma, albúmina, RIN, plaquetas, serologías", "clave", "Albúmina 3,0; RIN 1,3; plaquetas 92.000; serologías virales y autoinmunes negativas.", "Cirrosis compensada parcialmente, Child B."),
    study("Imágenes", "eco", "Ecografía con Doppler", "util", "Hígado nodular esteatósico, esplenomegalia, porta permeable.", "Cirrosis."),
    study("Laboratorio", "biopsia", "Biopsia hepática de rutina", "innecesario", "No se realizó.", "El diagnóstico es clínico e imagenológico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cirrosis-masld", "Cirrosis por enfermedad hepática esteatósica metabólica con ascitis de debut", true, "Síndrome metabólico sin alcohol, hígado nodular, hipertensión portal y GASA mayor de 1,1."),
      dx("ic", "Insuficiencia cardíaca derecha", false, "Proteínas bajas en ascitis y signos de hepatopatía."),
      dx("carcinomatosis", "Carcinomatosis peritoneal", false, "GASA mayor de 1,1."),
      dx("nefrotico", "Síndrome nefrótico", false, "Hay hipertensión portal."),
      dx("tbc-peritoneal", "Tuberculosis peritoneal", false, "GASA alto y pocas células."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("sodio", "Restricción de sodio", "clave", "Ascitis."),
      mg("diureticos", "Espironolactona con furosemida", "clave", "Ascitis moderada."),
      mg("veda", "Endoscopia para buscar várices", "clave", "Prevención de sangrado."),
      mg("hcc", "Ecografía cada 6 meses para hepatocarcinoma", "util", "Tamizaje."),
      mg("aines", "AINE para dolores", "riesgoso", "Falla renal y resistencia a diuréticos."),
      mg("restriccion-proteica", "Restricción de proteínas", "riesgoso", "Desnutrición y sarcopenia."),
    ],
  },
  debrief: {
    diagnosis: "Cirrosis por enfermedad hepática esteatósica asociada a disfunción metabólica, con ascitis de debut (Child B), en mujer de 49 años.",
    pathologies: [
      { name: "Cirrosis por esteatohepatitis metabólica", role: "principal", why: "Daño hepático crónico por síndrome metabólico." },
      { name: "Ascitis e hipertensión portal", role: "asociada", why: "Descompensación." },
      { name: "Insuficiencia cardíaca, carcinomatosis", role: "diferencial", why: "Otras causas de ascitis." },
    ],
    reasoning: [
      "Causa: obesidad, diabetes e insulinorresistencia.",
      "Mecanismo: esteatosis que progresa a inflamación, fibrosis y cirrosis.",
      "Consecuencia: hipertensión portal con ascitis y riesgo de várices y hepatocarcinoma.",
    ],
    epidemiology:
      "La enfermedad hepática esteatósica metabólica es la hepatopatía crónica más frecuente y una causa creciente de cirrosis y trasplante. Muchas veces se diagnostica recién cuando descompensa. En diabéticos conviene evaluar fibrosis con FIB-4 o elastografía.",
    management: [
      "Paracentesis.",
      "Sodio y diuréticos.",
      "Várices.",
      "Tamizaje de hepatocarcinoma.",
    ],
    sources: ["Asociación Argentina para el Estudio de las Enfermedades del Hígado — Consenso de esteatosis.", "EASL — Clinical Practice Guidelines on Decompensated Cirrhosis."],
    pearls: ["GASA mayor de 1,1: portal.", "Diabética obesa: pensá en el hígado.", "Sin AINE."],
    pitfalls: ["Restringir proteínas.", "No buscar várices."],
    tribunal: [
      qa("¿Qué es el GASA?", "Gradiente de albúmina entre suero y ascitis; mayor de 1,1 indica hipertensión portal."),
      qa("¿Qué es el FIB-4?", "Índice con edad, transaminasas y plaquetas que estima la fibrosis hepática."),
      qa("¿Qué proporción de espironolactona y furosemida se usa?", "100 mg de espironolactona por cada 40 mg de furosemida."),
    ],
  },
};
