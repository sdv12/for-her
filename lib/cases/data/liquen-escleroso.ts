import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const liquenEscleroso: ClinicalCase = {
  id: "liquen-escleroso",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 63, ageUnit: "años", sex: "F", context: "Posmenopáusica. Hipotiroidismo por Hashimoto. Dos años con 'hongos' que no se curan." },
  frequency: "frecuente",
  intro: "“Me pica mucho la vulva, sobre todo a la noche. Me dieron cremas para hongos varias veces y no pasa.”",
  vitals: { TA: "130/80 mmHg", FC: "72 lpm" },
  anamnesis: [
    act("prurito", "¿Cómo es la picazón?", "clave", "“Intensa, me despierta, me rasco hasta lastimarme.”", "Prurito vulvar crónico intenso: síntoma principal."),
    act("relaciones", "¿Dolor en las relaciones?", "clave", "“Las dejé, me fisuro.”", "Dispareunia por estrechamiento introital."),
    act("tratamientos", "¿Qué le dieron hasta ahora?", "clave", "“Clotrimazol tres veces.”", "Tratamientos antifúngicos repetidos sin diagnóstico."),
    act("autoinmunes", "¿Otras enfermedades autoinmunes?", "util", "“La tiroides.”", "Asociación frecuente."),
    act("flujo", "¿Tiene flujo?", "util", "“No.”", "No es una vaginitis."),
    act("jardineria", "¿Qué hace en su tiempo libre?", "neutro", "“Jardinería.”", "No orienta."),
  ],
  exam: [
    act("vulva", "Inspección vulvar", "clave", "Placas blanco nacaradas en figura de ocho alrededor de vulva y ano, piel fina 'en papel de cigarrillo', fisuras y reabsorción de los labios menores.", "Típico liquen escleroso."),
    act("ulcera", "Lesiones ulceradas o engrosadas", "clave", "No hay áreas engrosadas ni úlceras persistentes.", "Su presencia obliga a biopsiar por riesgo de carcinoma."),
    act("vagina", "Vagina", "util", "Sin lesiones.", "El liquen escleroso no compromete la vagina."),
  ],
  studies: [
    study("Otros", "biopsia", "Biopsia vulvar", "clave", "Hiperqueratosis, epidermis atrófica y banda de colágeno hialinizado en la dermis.", "Confirma, sobre todo si hay dudas o lesiones sospechosas."),
    study("Laboratorio", "tsh", "TSH", "util", "Normal con levotiroxina.", "Comorbilidad autoinmune."),
    study("Microbiología", "cultivo-hongos", "Otro cultivo para hongos", "innecesario", "No se pidió.", "Ya fallaron los antifúngicos y la clínica es otra."),
    study("Laboratorio", "glucemia", "Glucemia", "util", "Normal.", "La diabetes favorece candidiasis y prurito."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("liquen-escleroso", "Liquen escleroso vulvar", true, "Prurito crónico, placas blanco nacaradas en ocho, reabsorción de labios menores y biopsia compatible."),
      dx("candidiasis", "Candidiasis vulvar crónica", false, "Sin flujo y sin respuesta a antifúngicos."),
      dx("atrofia", "Atrofia vulvovaginal posmenopáusica", false, "La atrofia compromete la vagina y no da placas blancas en ocho."),
      dx("vin", "Neoplasia intraepitelial vulvar", false, "La biopsia no muestra displasia."),
      dx("liquen-simple", "Liquen simple crónico", false, "Engrosa la piel; acá está adelgazada."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("clobetasol", "Clobetasol 0,05 % a diario por 1–3 meses y luego mantenimiento", "clave", "Tratamiento de elección."),
      mg("seguimiento", "Control de por vida y biopsia de toda lesión persistente o engrosada", "clave", "Riesgo de carcinoma escamoso vulvar del 2–5 %."),
      mg("emolientes", "Emolientes y evitar jabones", "util", "Cuidado de la piel."),
      mg("autoexamen", "Enseñar el autoexamen con espejo", "util", "Detecta cambios."),
      mg("antifungicos", "Seguir con antifúngicos", "riesgoso", "No trata la enfermedad y la deja progresar."),
      mg("testosterona", "Testosterona tópica", "innecesario", "Ya no se usa: el corticoide es superior."),
    ],
  },
  debrief: {
    diagnosis: "Liquen escleroso vulvar con fisuras y reabsorción de labios menores, en una mujer posmenopáusica de 63 años con Hashimoto.",
    pathologies: [
      { name: "Liquen escleroso vulvar", role: "principal", why: "Dermatosis inflamatoria crónica con cicatrización." },
      { name: "Hipotiroidismo autoinmune", role: "asociada", why: "Autoinmunidad asociada." },
      { name: "Carcinoma escamoso vulvar", role: "diferencial", why: "Complicación a vigilar." },
    ],
    reasoning: [
      "Causa: probablemente autoinmune, con predisposición genética.",
      "Mecanismo: inflamación linfocitaria con esclerosis de la dermis.",
      "Consecuencia: prurito, fisuras, pérdida de la arquitectura vulvar y riesgo de carcinoma.",
    ],
    epidemiology:
      "Afecta a hasta 1 de cada 70 mujeres, con picos en la prepubertad y la posmenopausia. Está subdiagnosticado porque se trata como hongos. Se asocia a otras enfermedades autoinmunes, sobre todo tiroideas.",
    management: [
      "Sospecharlo en todo prurito vulvar crónico.",
      "Biopsia si hay dudas.",
      "Clobetasol.",
      "Seguimiento de por vida.",
    ],
    sources: ["Sociedad Argentina de Patología del Tracto Genital Inferior y Colposcopía — Dermatosis vulvares.", "British Association of Dermatologists — Guidelines for the management of lichen sclerosus."],
    pearls: ["Hongos que no curan: mirá la vulva.", "Figura en ocho.", "Clobetasol y seguimiento de por vida."],
    pitfalls: ["Antifúngicos repetidos.", "No biopsiar lesiones engrosadas."],
    tribunal: [
      qa("¿Qué riesgo oncológico tiene el liquen escleroso?", "Un 2–5 % de carcinoma escamoso vulvar; por eso se sigue de por vida y se biopsia toda lesión persistente."),
      qa("¿Cómo se trata el liquen escleroso vulvar?", "Con corticoides tópicos de alta potencia, como clobetasol, en fase de ataque y luego de mantenimiento."),
      qa("¿Por qué no compromete la vagina?", "Porque afecta la piel queratinizada y no la mucosa vaginal."),
    ],
  },
};
