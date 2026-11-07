import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const prostatitisAguda: ClinicalCase = {
  id: "prostatitis-aguda",
  level: 2,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 58, ageUnit: "años", sex: "M", context: "Diabético. Hace 10 días le hicieron una biopsia de próstata." },
  frequency: "frecuente",
  intro: "“Tengo fiebre, escalofríos y me arde al orinar. Me duele entre las piernas y casi no me sale la orina.”",
  vitals: { TA: "106/66 mmHg", FC: "112 lpm", FR: "22 rpm", "T°": "39,3 °C", "SatO₂": "97 %", Glucemia: "242 mg/dl" },
  anamnesis: [
    act("procedimiento", "¿Biopsia o sonda reciente?", "clave", "“Biopsia hace 10 días.”", "Riesgo y gérmenes resistentes."),
    act("orina", "¿Chorro, urgencia, dolor perineal?", "clave", "“Fino, y duele el periné.”", "Inflamación."),
    act("alarma", "¿Dolor en lumbar, confusión o sin orinar?", "clave", "“Hace 8 horas casi no orino.”", "Retención."),
    act("atb", "¿Antibióticos previos?", "util", "“Ciprofloxacina al biopsiar.”", "Resistencia."),
    act("sexo", "¿Secreción o parejas nuevas?", "util", "“No.”", "ITS."),
    act("trabajo", "¿A qué te dedicás?", "neutro", "“Soy contador.”", "No orienta."),
  ],
  exam: [
    act("tacto", "Tacto rectal suave", "clave", "Próstata tensa, caliente, muy dolorosa. Sin masaje.", "Diagnóstico; no masajear."),
    act("globo", "Abdomen", "clave", "Globo vesical.", "Retención."),
    act("escroto", "Testículos y ángulo costovertebral", "util", "Sin dolor.", "Otros focos."),
  ],
  studies: [
    study("Laboratorio", "orina", "Orina y urocultivo, hemocultivos", "clave", "Piuria, E. coli productora de BLEE.", "Identifica germen."),
    study("Laboratorio", "lab", "Hemograma, función renal, lactato", "clave", "Leucocitos 19.000, lactato 2,5.", "Gravedad."),
    study("Imágenes", "eco", "Ecografía o TC si no mejora", "util", "Sin absceso.", "Busca absceso."),
    study("Laboratorio", "psa", "PSA durante el episodio", "innecesario", "No se realizó.", "Está elevado por inflamación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("prostatitis", "Prostatitis aguda bacteriana tras biopsia, con retención y sepsis", true, "Fiebre, dolor perineal, retención, próstata caliente."),
      dx("pielo", "Pielonefritis", false, "Sin dolor lumbar."),
      dx("cancer", "Cáncer de próstata", false, "No explica la fiebre aguda."),
      dx("hpb", "Hiperplasia prostática", false, "Es crónica, sin fiebre."),
      dx("epididimitis", "Orquiepididimitis", false, "Testículos sin dolor."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Carbapenem u otro según resistencia por riesgo posbiopsia", "clave", "Cubre BLEE."),
      mg("sonda", "Drenaje con sonda suprapúbica o uretral fina", "clave", "Resuelve retención."),
      mg("internar", "Internación, líquidos y control de glucemia", "clave", "Sepsis."),
      mg("duracion", "Tratar 2 a 4 semanas, ajustando por cultivo", "util", "Evita prostatitis crónica."),
      mg("masaje", "Masaje prostático para muestra", "riesgoso", "Puede provocar bacteriemia."),
      mg("amoxi", "Amoxicilina y alta", "riesgoso", "Insuficiente en sepsis."),
    ],
  },
  debrief: {
    diagnosis: "Prostatitis aguda bacteriana post-biopsia por E. coli BLEE, con retención y sepsis, en varón de 58 años diabético.",
    pathologies: [
      { name: "Prostatitis aguda", role: "principal", why: "Infección de la próstata." },
      { name: "Sepsis y retención urinaria", role: "asociada", why: "Complicaciones." },
      { name: "Pielonefritis, HPB", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: bacterias intestinales, por biopsia transrectal.",
      "Mecanismo: la infección inflama y obstruye el flujo.",
      "Consecuencia: fiebre, retención, bacteriemia, absceso.",
    ],
    epidemiology:
      "Las infecciones tras biopsia transrectal son una complicación frecuente, con aumento de gérmenes resistentes a quinolonas. La vía transperineal reduce este riesgo. La diabetes empeora el pronóstico y aumenta la posibilidad de abscesos.",
    management: [
      "Tacto suave.",
      "Cultivos y antibiótico amplio.",
      "Drenar la vejiga.",
      "Buscar absceso si falla.",
    ],
    sources: ["Sociedad Argentina de Urología — Infecciones urinarias.", "European Association of Urology — Guía de infecciones."],
    pearls: ["Fiebre con dolor perineal: prostatitis.", "No masajear.", "Pensá BLEE si hay biopsia reciente."],
    pitfalls: ["No descartar retención.", "Pedir PSA en agudo."],
    tribunal: [
      qa("¿Qué tipos de prostatitis hay?", "Aguda bacteriana, crónica bacteriana, dolor pélvico crónico y asintomática."),
      qa("¿Por qué se usa quinolona o TMS?", "Tienen buena penetración en la próstata."),
      qa("¿Cuándo sospechar absceso?", "Si persiste fiebre 48 a 72 horas o hay fluctuación."),
    ],
  },
};
