import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sindromeNefroticoAdultoMayor: ClinicalCase = {
  id: "sindrome-nefrotico-adulto-mayor",
  level: 4,
  area: "Nefrourología",
  setting: "Internación",
  patient: { age: 71, ageUnit: "años", sex: "M", context: "Ex fumador. Bajó 5 kilos en 6 meses. No es diabético." },
  frequency: "poco-frecuente",
  intro: "“Se me hincharon las piernas, los párpados y el escroto. La orina hace mucha espuma.”",
  vitals: { TA: "138/84 mmHg", FC: "84 lpm", FR: "18 rpm", "SatO₂": "96 %", Peso: "84 kg (subió 9 kg de líquido)" },
  anamnesis: [
    act("espuma", "¿Desde cuándo la espuma?", "clave", "“Dos meses.”", "Proteinuria importante."),
    act("peso", "¿Por qué bajó de peso antes de hincharse?", "clave", "“No sé, comía menos.”", "Pensar en cáncer asociado."),
    act("tos", "¿Tos, sangre, cambios en el ritmo intestinal?", "clave", "“Tos de fumador.”", "Búsqueda de neoplasia."),
    act("farmacos", "¿AINE u otros medicamentos?", "util", "“Ibuprofeno a veces.”", "Causas secundarias."),
    act("trombosis", "¿Dolor en una pierna o en la cintura?", "util", "“No.”", "Trombosis de vena renal."),
    act("barrio", "¿En qué barrio vive?", "neutro", "“Alberdi.”", "No orienta."),
  ],
  exam: [
    act("edema", "Edemas", "clave", "Edema blando con fóvea hasta muslos, escrotal y palpebral.", "Síndrome nefrótico."),
    act("pulmon", "Pulmones", "util", "Derrame pleural bilateral leve.", "Hipoalbuminemia."),
    act("ganglios", "Ganglios", "util", "Sin adenopatías.", "Linfoma."),
  ],
  studies: [
    study("Laboratorio", "proteinuria", "Proteinuria de 24 horas y albúmina", "clave", "Proteinuria 9 g/día, albúmina 1,9 g/dl, colesterol 340.", "Síndrome nefrótico."),
    study("Laboratorio", "pla2r", "Anticuerpos anti-PLA2R", "clave", "Negativos.", "Membranosa primaria menos probable: pensar en secundaria."),
    study("Otros", "biopsia", "Biopsia renal", "clave", "Glomerulopatía membranosa.", "Diagnóstico."),
    study("Imágenes", "tac", "TC de tórax, abdomen y pelvis", "clave", "Nódulo pulmonar espiculado de 2 cm.", "Membranosa secundaria a neoplasia."),
    study("Laboratorio", "secundarias", "Hepatitis B, C, VIH, FAN, complemento", "util", "Negativos.", "Otras causas."),
    study("Otros", "inmunosupresion-ya", "Inmunosupresión sin buscar cáncer", "riesgoso", "No se hizo.", "En mayores con PLA2R negativo la causa suele ser secundaria."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("membranosa-paraneoplasica", "Síndrome nefrótico por glomerulopatía membranosa secundaria a neoplasia pulmonar", true, "Proteinuria de 9 g, albúmina de 1,9, membranosa con anti-PLA2R negativo y nódulo pulmonar en un exfumador que adelgazó."),
      dx("membranosa-primaria", "Membranosa primaria", false, "Anti-PLA2R negativo y nódulo pulmonar."),
      dx("diabetica", "Nefropatía diabética", false, "No es diabético."),
      dx("amiloidosis", "Amiloidosis", false, "La biopsia muestra membranosa."),
      dx("cambios-minimos", "Enfermedad de cambios mínimos", false, "La biopsia muestra membranosa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cancer", "Estudiar y tratar el nódulo pulmonar", "clave", "Tratar la neoplasia puede remitir el nefrótico."),
      mg("diureticos", "Diuréticos de asa y restricción de sodio", "clave", "Edema."),
      mg("ieca", "IECA o ARA II", "clave", "Reducen la proteinuria."),
      mg("anticoag", "Considerar anticoagulación profiláctica con albúmina menor de 2–2,5", "util", "Alto riesgo trombótico en la membranosa."),
      mg("estatina", "Estatina", "util", "Dislipemia."),
      mg("albumina-sola", "Albúmina endovenosa repetida como tratamiento", "innecesario", "Se pierde por la orina."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome nefrótico por glomerulopatía membranosa paraneoplásica, con nódulo pulmonar sospechoso, en un hombre de 71 años exfumador.",
    pathologies: [
      { name: "Glomerulopatía membranosa secundaria", role: "principal", why: "Depósitos subepiteliales por antígenos tumorales." },
      { name: "Neoplasia pulmonar", role: "asociada", why: "Causa." },
      { name: "Membranosa primaria", role: "diferencial", why: "Asociada a anti-PLA2R." },
    ],
    reasoning: [
      "Causa: antígenos tumorales que forman inmunocomplejos.",
      "Mecanismo: depósitos subepiteliales que dañan los podocitos.",
      "Consecuencia: proteinuria masiva, edema, hipercoagulabilidad y dislipemia.",
    ],
    epidemiology:
      "La membranosa es la causa más común de síndrome nefrótico en adultos mayores no diabéticos. Entre el 10 y el 20 % de las membranosas en mayores de 65 se asocian a cáncer, sobre todo de pulmón, colon, próstata y mama.",
    management: [
      "Proteinuria, albúmina y lípidos.",
      "Anti-PLA2R y biopsia.",
      "Buscar causas secundarias.",
      "Tratamiento de sostén.",
    ],
    sources: ["Sociedad Argentina de Nefrología — Glomerulopatías.", "KDIGO — Clinical Practice Guideline for the Management of Glomerular Diseases."],
    pearls: ["Nefrótico en mayor: buscá cáncer.", "PLA2R negativo = pensá secundaria.", "Membranosa = alto riesgo trombótico."],
    pitfalls: ["Inmunosuprimir sin buscar causa.", "Albúmina repetida."],
    tribunal: [
      qa("¿Qué define el síndrome nefrótico?", "Proteinuria mayor de 3,5 g/día, hipoalbuminemia, edemas e hiperlipidemia."),
      qa("¿Qué es el anticuerpo anti-PLA2R?", "Un anticuerpo contra el receptor de fosfolipasa A2 del podocito, presente en el 70 % de las membranosas primarias."),
      qa("¿Por qué el síndrome nefrótico causa trombosis?", "Por pérdida urinaria de antitrombina y aumento de factores procoagulantes y fibrinógeno."),
    ],
  },
};
