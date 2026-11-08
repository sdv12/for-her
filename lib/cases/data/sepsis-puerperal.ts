import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sepsisPuerperal: ClinicalCase = {
  id: "sepsis-puerperal-endometritis",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 24, ageUnit: "años", sex: "F", context: "Cesárea de urgencia hace 5 días, tras una rotura prolongada de membranas. Embarazo con pocos controles." },
  frequency: "frecuente",
  intro: "“Tengo fiebre, escalofríos, me duele la panza y la pérdida tiene olor feo.”",
  vitals: { TA: "86/48 mmHg", FC: "128 lpm", FR: "28 rpm", "T°": "39,4 °C", "SatO₂": "95 %", Glasgow: "14/15" },
  anamnesis: [
    act("loquios", "¿Cómo es la pérdida?", "clave", "“Marrón, con olor.”", "Endometritis."),
    act("parto", "¿Cuánto duró con bolsa rota? ¿Restos?", "clave", "“Más de 24 horas.”", "Factor principal."),
    act("foco", "¿Herida, mamas, orina, tos?", "clave", "“Herida bien; ardor.”", "Otros focos."),
    act("orina-cant", "¿Orinás menos?", "util", "“Muy poco.”", "Hipoperfusión."),
    act("alergias", "¿Alergia a antibióticos?", "util", "“No.”", "Empírico."),
    act("hijo", "¿Quién cuida al bebé?", "neutro", "“Mi mamá.”", "No orienta."),
  ],
  exam: [
    act("utero", "Útero", "clave", "Subinvolucionado, muy doloroso, loquios fétidos.", "Foco."),
    act("herida", "Herida y mamas", "clave", "Sin colección; mamas normales.", "Excluye."),
    act("perfusion", "Perfusión", "util", "Fría, relleno de 4 segundos.", "Shock."),
  ],
  studies: [
    study("Laboratorio", "cultivos", "Hemocultivos, cultivo uterino y urocultivo", "clave", "E. coli, anaerobios.", "Antes del antibiótico, sin demorarlo."),
    study("Laboratorio", "lab", "Lactato, hemograma, función renal, coagulación", "clave", "Lactato 4,8; creatinina 1,7; plaquetas 92.000.", "Disfunción."),
    study("Imágenes", "eco", "Ecografía o TC de abdomen y pelvis", "clave", "Restos, sin absceso.", "Busca foco a drenar."),
    study("Imágenes", "rx-rutina", "Radiografía de columna", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("sepsis", "Shock séptico puerperal por endometritis poscesárea", true, "Fiebre, útero doloroso, loquios fétidos, hipotensión y lactato."),
      dx("itu", "Pielonefritis", false, "El foco es uterino."),
      dx("mastitis", "Mastitis", false, "Mamas normales."),
      dx("tep", "TEP", false, "Fiebre alta y foco claro."),
      dx("hemorragia", "Hemorragia posparto", false, "Sin sangrado."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Clindamicina y gentamicina, o piperacilina-tazobactam, en la primera hora", "clave", "Reduce la mortalidad."),
      mg("reanimar", "Cristaloides 30 ml/kg y noradrenalina si persiste", "clave", "Metas de perfusión."),
      mg("foco", "Control del foco, con evacuación de restos", "clave", "Sin esto no mejora."),
      mg("uti", "Terapia intensiva", "clave", "Disfunción."),
      mg("oral", "Antibióticos orales y control", "riesgoso", "Shock."),
      mg("sin-foco", "Solo antibióticos sin buscar foco", "riesgoso", "Puede requerir cirugía."),
    ],
  },
  debrief: {
    diagnosis: "Shock séptico puerperal por endometritis polimicrobiana poscesárea con restos retenidos, en mujer de 24 años.",
    pathologies: [
      { name: "Sepsis materna", role: "principal", why: "Disfunción por infección." },
      { name: "Endometritis y restos", role: "asociada", why: "Foco." },
      { name: "Pielonefritis, TEP", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: flora vaginal e intestinal tras una cesárea con bolsa rota.",
      "Mecanismo: infección ascendente con respuesta desregulada.",
      "Consecuencia: disfunción, shock, posible histerectomía.",
    ],
    epidemiology:
      "La sepsis es una de las principales causas de muerte materna en el mundo. La cesárea, sobre todo de urgencia, es el principal factor de riesgo. La profilaxis antibiótica y la detección temprana con la escala omqSOFA son medidas que pueden salvar vidas.",
    management: [
      "Identificar sepsis.",
      "Antibiótico y volumen.",
      "Control del foco.",
      "UTI y control.",
    ],
    sources: ["FASGO — Consenso de sepsis puerperal.", "Organización Mundial de la Salud — Infecciones maternas y sepsis."],
    pearls: ["Fiebre posparto con útero doloroso.", "Controlar el foco.", "Sepsis-3."],
    pitfalls: ["No buscar restos.", "Antibiótico tardío."],
    tribunal: [
      qa("¿Qué es la definición Sepsis-3?", "Disfunción orgánica con riesgo de vida por una respuesta desregulada a la infección, con aumento de 2 puntos de SOFA."),
      qa("¿Qué define shock séptico?", "Necesidad de vasopresores para PAM de 65 y lactato mayor de 2 pese a volumen."),
      qa("¿Qué antibiótico previene la endometritis?", "Cefazolina antes de la incisión de la cesárea."),
    ],
  },
};
