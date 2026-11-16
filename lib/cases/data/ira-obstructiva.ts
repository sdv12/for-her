import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const iraObstructiva: ClinicalCase = {
  id: "ira-obstructiva",
  level: 2,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 78, ageUnit: "años", sex: "M", context: "Hiperplasia prostática sin tratamiento. Hace meses orina 'por goteo'. Lo trae el hijo." },
  frequency: "frecuente",
  intro: "El hijo: “Está confundido, no come y la panza está hinchada. Hace días que orina gotitas todo el tiempo.”",
  vitals: { TA: "164/92 mmHg", FC: "92 lpm", FR: "20 rpm", "T°": "36,8 °C" },
  anamnesis: [
    act("goteo", "¿Cómo orina?", "clave", "“Gotitas todo el día, se moja.”", "Incontinencia por rebosamiento."),
    act("tiempo", "¿Desde cuándo?", "clave", "“Meses, y peor esta semana.”", "Retención crónica."),
    act("farmacos", "¿Toma antigripales, antihistamínicos o algo nuevo?", "clave", "“Un antigripal la semana pasada.”", "Anticolinérgicos y simpaticomiméticos precipitan retención."),
    act("aines", "¿Antiinflamatorios?", "util", "“Ibuprofeno por la rodilla.”", "Nefrotóxico."),
    act("fiebre", "¿Fiebre?", "util", "“No.”", "Infección."),
    act("tango", "¿Le gusta el tango?", "neutro", "“Mucho.”", "No orienta."),
  ],
  exam: [
    act("globo", "Hipogastrio", "clave", "Globo vesical que llega al ombligo.", "Retención."),
    act("tacto", "Tacto rectal", "clave", "Próstata aumentada, lisa, elástica.", "Hiperplasia."),
    act("volemia", "Volemia", "util", "Edemas leves.", "Sobrecarga."),
  ],
  studies: [
    study("Laboratorio", "renal", "Creatinina, urea, ionograma", "clave", "Creatinina 4,2 (basal 1,1), K 5,8.", "IRA con hiperpotasemia."),
    study("Imágenes", "eco", "Ecografía renal y vesical", "clave", "Hidronefrosis bilateral, vejiga con 1.400 ml.", "Obstrucción infravesical."),
    study("Electrofisiología", "ecg", "ECG", "clave", "T picudas leves.", "Hiperpotasemia."),
    study("Laboratorio", "psa", "PSA en la urgencia", "innecesario", "No se pidió.", "Se eleva por la retención; se mide después."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ira-posrenal", "Insuficiencia renal aguda posrenal por retención urinaria crónica con hiperplasia prostática", true, "Incontinencia por rebosamiento, globo vesical, hidronefrosis bilateral y creatinina de 4,2."),
      dx("prerrenal", "IRA prerrenal", false, "Hay hidronefrosis y globo."),
      dx("nta", "Necrosis tubular aguda", false, "Obstrucción evidente."),
      dx("cancer-prostata", "Cáncer de próstata con compresión", false, "Próstata lisa y elástica."),
      dx("ira-aines", "Nefritis por AINE", false, "Hay obstrucción que la explica."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("sonda", "Sonda vesical", "clave", "Desobstruye."),
      mg("potasio", "Tratar la hiperpotasemia", "clave", "Riesgo arrítmico."),
      mg("poliuria", "Vigilar la poliuria posobstructiva y reponer", "clave", "Puede orinar litros."),
      mg("suspender", "Suspender antigripal e ibuprofeno", "clave", "Precipitantes."),
      mg("alfabloq", "Tamsulosina y urología", "util", "Tratamiento a futuro."),
      mg("pinzar", "Pinzar la sonda cada 200 ml", "innecesario", "No previene la hematuria ex vacuo y retrasa."),
      mg("dialisis-ya", "Diálisis urgente antes de sondar", "riesgoso", "La causa se resuelve con la sonda."),
    ],
  },
  debrief: {
    diagnosis: "Insuficiencia renal aguda posrenal con hiperpotasemia por retención urinaria crónica agudizada, en un hombre de 78 años con hiperplasia prostática.",
    pathologies: [
      { name: "IRA posrenal", role: "principal", why: "Obstrucción infravesical bilateral." },
      { name: "Hiperplasia prostática", role: "asociada", why: "Causa." },
      { name: "IRA prerrenal y por AINE", role: "diferencial", why: "Contribuyentes." },
    ],
    reasoning: [
      "Causa: obstrucción prostática con precipitante farmacológico.",
      "Mecanismo: aumento de presión retrógrada que reduce el filtrado.",
      "Consecuencia: IRA, hiperpotasemia, uremia y confusión.",
    ],
    epidemiology:
      "La obstrucción causa alrededor del 10 % de las IRA y más en varones mayores. La hiperplasia prostática es la causa principal. Suele ser reversible si se desobstruye a tiempo.",
    management: [
      "Ecografía en toda IRA.",
      "Sonda.",
      "Hiperpotasemia y poliuria.",
      "Retirar fármacos.",
    ],
    sources: ["Sociedad Argentina de Nefrología — Insuficiencia renal aguda.", "KDIGO — Clinical Practice Guideline for Acute Kidney Injury."],
    pearls: ["Toda IRA: ecografía.", "Goteo constante = rebosamiento.", "Antigripal en prostático: retención."],
    pitfalls: ["Diálisis antes de sondar.", "No vigilar la poliuria."],
    tribunal: [
      qa("¿Qué es la poliuria posobstructiva?", "La diuresis intensa tras desobstruir, por eliminación de sobrecarga y defecto de concentración tubular; requiere reposición."),
      qa("¿Por qué se pide ecografía en toda insuficiencia renal aguda?", "Para descartar obstrucción, una causa reversible."),
      qa("¿Qué es la incontinencia por rebosamiento?", "Escape continuo de orina por una vejiga sobredistendida que no se vacía."),
    ],
  },
};
