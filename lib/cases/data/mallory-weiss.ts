import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const malloryWeiss: ClinicalCase = {
  id: "sindrome-mallory-weiss",
  level: 2,
  area: "Gastroenterología",
  setting: "Guardia",
  patient: { age: 21, ageUnit: "años", sex: "M", context: "Volvió de una fiesta de egresados con mucho alcohol." },
  frequency: "frecuente",
  intro: "“Vomité muchas veces toda la noche y en los últimos vómitos salió sangre roja.”",
  vitals: { TA: "122/76 mmHg", FC: "96 lpm", FR: "18 rpm", "T°": "36,6 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("secuencia", "¿La sangre salió desde el primer vómito o después de varios?", "clave", "“Después de vomitar como diez veces.”", "Arcadas previas: típico."),
    act("cantidad", "¿Cuánta sangre?", "clave", "“Unas estrías y medio vaso.”", "Cuantía."),
    act("melena", "¿Materia fecal negra o mareos al pararse?", "clave", "“No.”", "Gravedad."),
    act("aines", "¿Tomó ibuprofeno o aspirina?", "util", "“Un ibuprofeno para la cabeza.”", "Úlcera."),
    act("higado", "¿Toma alcohol seguido?", "util", "“Solo en fiestas.”", "Várices poco probables."),
    act("carrera", "¿Qué va a estudiar?", "neutro", "“Arquitectura.”", "No orienta."),
  ],
  exam: [
    act("hemodinamia", "Hemodinamia y ortostatismo", "clave", "Sin cambios ortostáticos.", "Estable."),
    act("estigmas", "Estigmas de hepatopatía", "clave", "Ausentes.", "No sugiere várices."),
    act("abdomen", "Abdomen", "util", "Blando, epigastrio levemente doloroso.", "Base."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma, urea y coagulograma", "clave", "Hb 14,2; urea normal.", "Sangrado menor."),
    study("Otros", "glasgow-blatchford", "Score de Glasgow-Blatchford", "clave", "1 punto.", "Bajo riesgo."),
    study("Otros", "veda", "Endoscopia alta (no urgente si sigue estable)", "util", "Desgarro lineal de 1 cm en la unión gastroesofágica, sin sangrado activo.", "Confirma."),
    study("Imágenes", "tc", "TC de abdomen con contraste", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("mallory-weiss", "Síndrome de Mallory-Weiss", true, "Hematemesis después de vómitos repetidos, estable, y desgarro en la unión gastroesofágica."),
      dx("boerhaave", "Síndrome de Boerhaave", false, "No hay dolor torácico intenso, enfisema ni sepsis."),
      dx("varices", "Várices esofágicas", false, "Sin hepatopatía."),
      dx("ulcera", "Úlcera péptica", false, "La endoscopia muestra desgarro."),
      dx("epistaxis", "Sangre deglutida por epistaxis", false, "Sin sangrado nasal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("antiemetico", "Antiemético", "clave", "Evitar nuevas arcadas."),
      mg("ibp", "Inhibidor de bomba de protones", "clave", "Favorece la cicatrización."),
      mg("observacion", "Observación y alta con pautas si sigue estable", "clave", "Bajo riesgo."),
      mg("alcohol", "Consejería sobre consumo de alcohol", "util", "Prevención."),
      mg("sengstaken", "Balón de Sengstaken", "riesgoso", "Puede agravar el desgarro."),
      mg("transfusion", "Transfusión con Hb normal", "innecesario", "Sin indicación."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de Mallory-Weiss tras vómitos repetidos por intoxicación alcohólica, en varón de 21 años, de bajo riesgo.",
    pathologies: [
      { name: "Síndrome de Mallory-Weiss", role: "principal", why: "Desgarro mucoso por arcadas." },
      { name: "Consumo episódico excesivo de alcohol", role: "asociada", why: "Causa de los vómitos." },
      { name: "Boerhaave, várices", role: "diferencial", why: "Otras lesiones esofágicas." },
    ],
    reasoning: [
      "Causa: vómitos y arcadas repetidos.",
      "Mecanismo: aumento brusco de presión que desgarra la mucosa de la unión gastroesofágica.",
      "Consecuencia: hematemesis que en la mayoría cede sola.",
    ],
    epidemiology:
      "Explica alrededor del 5 al 10 % de las hemorragias digestivas altas. Se asocia al consumo excesivo de alcohol, la hiperemesis y la bulimia. Más del 80 % se detiene espontáneamente.",
    management: [
      "Estratificar el riesgo.",
      "Antiemético e IBP.",
      "Endoscopia si persiste.",
      "Consejería.",
    ],
    sources: ["Sociedad Argentina de Gastroenterología — Hemorragia digestiva alta no variceal.", "ESGE — Non-variceal Upper Gastrointestinal Hemorrhage Guideline."],
    pearls: ["Sangre después de muchas arcadas.", "Diferenciá de Boerhaave.", "Casi siempre cede sola."],
    pitfalls: ["No buscar Boerhaave.", "Balón."],
    tribunal: [
      qa("¿Qué diferencia hay con el Boerhaave?", "Boerhaave es una ruptura transmural con dolor torácico, enfisema y mediastinitis."),
      qa("¿Qué hace la endoscopia si sangra activamente?", "Hemostasia con clips, adrenalina o ligadura con bandas."),
      qa("¿Qué evalúa el score de Glasgow-Blatchford?", "El riesgo de necesitar intervención con urea, hemoglobina, TA, FC, melena, síncope y comorbilidades."),
    ],
  },
};
