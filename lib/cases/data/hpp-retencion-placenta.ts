import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hppRetencionPlacenta: ClinicalCase = {
  id: "hemorragia-posparto-retencion-placenta",
  level: 3,
  area: "Ginecología y obstetricia",
  setting: "Internación",
  patient: { age: 31, ageUnit: "años", sex: "F", context: "Tercer parto vaginal hace 40 minutos. Cesárea previa. La placenta aún no salió." },
  frequency: "frecuente",
  intro: "Te llama la partera: “Sigue sangrando bastante, la placenta no sale y está cada vez más pálida”.",
  vitals: { TA: "92/56 mmHg", FC: "122 lpm", FR: "24 rpm", "T°": "36,4 °C", "SatO₂": "97 %", Glasgow: "15/15" },
  anamnesis: [
    act("tiempo", "¿Cuánto hace que nació? ¿Se dio oxitocina?", "clave", "“40 minutos; 10 UI de oxitocina al nacer.”", "Placenta retenida: más de 30 minutos con manejo activo."),
    act("perdida", "¿Cuánta sangre se estima?", "clave", "“Más de un litro.”", "Se subestima a menudo."),
    act("antecedentes", "¿Cesáreas, legrados, placenta previa?", "clave", "“Una cesárea; placenta anterior baja.”", "Riesgo de acretismo."),
    act("coagulacion", "¿Problemas de coagulación?", "util", "“No.”", "Causa posible."),
    act("alergia", "¿Alergias?", "util", "“No.”", "Antes de antibióticos."),
    act("nombre", "¿Cómo se llama el bebé?", "neutro", "“Lautaro.”", "No orienta."),
  ],
  exam: [
    act("utero", "Útero", "clave", "Fondo blando por encima del ombligo, contrae poco.", "Atonía secundaria a placenta retenida."),
    act("canal", "Canal de parto", "clave", "Sin desgarros importantes.", "Excluye trauma."),
    act("shock", "Signos de shock", "clave", "Pálida, fría, índice de shock mayor de 1.", "Hemorragia significativa."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, coagulograma, fibrinógeno, grupo y factor, pruebas cruzadas", "clave", "Hb 8,2, plaquetas 140.000, fibrinógeno 190.", "Fibrinógeno bajo predice hemorragia grave."),
    study("Imágenes", "eco", "Ecografía en sala de parto", "util", "Placenta adherida en cara anterior.", "Sin demorar conducta."),
    study("Laboratorio", "lactato", "Lactato", "util", "3,4.", "Evalúa hipoperfusión."),
    study("Otros", "esperar", "Esperar sin intervenir a que salga sola", "riesgoso", "No se realizó.", "La hemorragia continúa."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hpp-tejido", "Hemorragia posparto por retención placentaria con shock hemorrágico", true, "Placenta retenida a los 40 minutos, sangrado de más de 1 litro, útero blando y shock."),
      dx("desgarro", "Desgarro del canal", false, "Se revisó y no hay desgarros."),
      dx("inversion", "Inversión uterina", false, "El fondo se palpa; no hay masa en vagina."),
      dx("rotura", "Rotura uterina", false, "Sería con dolor intenso y sin fondo uterino identificable."),
      dx("coagulopatia", "Coagulopatía primaria", false, "Puede sumarse, pero la causa es la placenta."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("codigo", "Activar código rojo: ayuda, 2 accesos, cristaloides, calor, oxígeno, sonda", "clave", "Trabajo en equipo y primeras medidas."),
      mg("alumbramiento", "Oxitocina y extracción manual de placenta bajo analgesia", "clave", "Trata la causa."),
      mg("tranexamico", "Ácido tranexámico 1 g EV en las primeras 3 horas", "clave", "Reduce la muerte por sangrado."),
      mg("transfusion", "Transfusión con protocolo masivo y reponer fibrinógeno", "clave", "Previene coagulopatía."),
      mg("atb", "Antibiótico profiláctico, y estar listos para quirófano si hay acretismo", "util", "Previene infección; si no despega, no forzar."),
      mg("forzar", "Tracción fuerte del cordón sin contracción", "riesgoso", "Puede causar inversión uterina."),
    ],
  },
  debrief: {
    diagnosis: "Hemorragia posparto con shock por retención placentaria, en mujer de 31 años con cesárea previa.",
    pathologies: [
      { name: "Hemorragia posparto", role: "principal", why: "Pérdida mayor o igual a 1.000 ml con signos." },
      { name: "Placenta retenida, posible acretismo", role: "asociada", why: "Causa." },
      { name: "Desgarros, inversión, coagulopatía", role: "diferencial", why: "Las otras T." },
    ],
    reasoning: [
      "Causa: la placenta no se desprende, a veces por adherencia anormal por cicatriz.",
      "Mecanismo: el útero no contrae bien y los vasos del lecho siguen abiertos.",
      "Consecuencia: hemorragia, shock, coagulopatía de consumo y muerte.",
    ],
    epidemiology:
      "La hemorragia posparto es una de las primeras causas de muerte materna en Argentina y en el mundo. La atonía es la más frecuente. El manejo activo del alumbramiento con oxitocina previene muchos casos, y aumenta el riesgo de acretismo con cada cesárea.",
    management: [
      "Código rojo con roles definidos.",
      "Las 4 T: tono, tejido, trauma, trombina.",
      "Oxitocina y extracción manual.",
      "Tranexámico, transfusión y cirugía si hace falta.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de hemorragia posparto y código rojo.", "FASGO — Consenso de hemorragia posparto."],
    pearls: ["Las 4 T: tono, tejido, trauma, trombina.", "Tranexámico en las primeras 3 horas.", "Índice de shock mayor de 0,9: alerta."],
    pitfalls: ["Subestimar el sangrado.", "Forzar una placenta acreta."],
    tribunal: [
      qa("¿Qué es el manejo activo del alumbramiento?", "Oxitocina 10 UI IM al nacer, tracción controlada del cordón y masaje uterino tras la salida."),
      qa("¿Qué fármacos uterotónicos hay?", "Oxitocina, ergometrina (contraindicada en HTA), misoprostol, y carboprost donde esté disponible."),
      qa("¿Qué opciones hay si no cede?", "Taponamiento con balón, suturas hemostáticas, ligadura vascular, embolización e histerectomía."),
    ],
  },
};
