import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const candidiasisRecurrenteDiabetica: ClinicalCase = {
  id: "candidiasis-vulvovaginal-recurrente-diabetes",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 46, ageUnit: "años", sex: "F", context: "Diabetes tipo 2 mal controlada. Empezó dapagliflozina hace 3 meses." },
  frequency: "frecuente",
  intro: "“Me pica y arde la vulva, tengo flujo blanco como ricota. Es la quinta vez este año.”",
  vitals: { TA: "128/80 mmHg", FC: "76 lpm", "T°": "36,5 °C", Glucemia: "236 mg/dl" },
  anamnesis: [
    act("episodios", "¿Cuántos episodios al año?", "clave", "“Cinco.”", "Recurrente."),
    act("diabetes", "¿Cómo está la diabetes? ¿Medicación nueva?", "clave", "“Mal; empecé dapagliflozina.”", "Glucosuria."),
    act("antibioticos", "¿Antibióticos, corticoides?", "clave", "“No.”", "Otros factores."),
    act("pareja", "¿Pareja con síntomas?", "util", "“No.”", "No es ITS habitual."),
    act("olor", "¿Mal olor o flujo grisáceo?", "util", "“No.”", "Vaginosis."),
    act("trabajo", "¿Qué hacés?", "neutro", "“Soy secretaria.”", "No orienta."),
  ],
  exam: [
    act("vulva", "Vulva", "clave", "Eritema, fisuras y edema.", "Candidiasis."),
    act("especulo", "Especuloscopía", "clave", "Flujo grumoso blanco.", "Típico."),
    act("ph", "pH vaginal", "util", "4,2.", "Normal en candidiasis."),
  ],
  studies: [
    study("Microbiología", "cultivo", "Cultivo con tipificación de especie", "clave", "Candida albicans.", "Recurrente: cultivar."),
    study("Laboratorio", "hba1c", "HbA1c", "clave", "9,8 %.", "Control."),
    study("Laboratorio", "vih", "VIH", "util", "Negativo.", "Inmunosupresión."),
    study("Otros", "pareja-tratar", "Tratar a la pareja asintomática de rutina", "innecesario", "No se realizó.", "No reduce recurrencias."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cvv-r", "Candidiasis vulvovaginal recurrente asociada a diabetes descompensada e iSGLT2", true, "Cuatro o más episodios, cultivo, glucemia alta y glucosuria por dapagliflozina."),
      dx("vaginosis", "Vaginosis bacteriana", false, "pH normal, sin olor."),
      dx("tricomonas", "Tricomoniasis", false, "Flujo grumoso."),
      dx("liquen", "Liquen escleroso", false, "Hay infección clara."),
      dx("dermatitis", "Dermatitis de contacto", false, "Cultivo positivo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("induccion", "Fluconazol de inducción y luego semanal por 6 meses", "clave", "Supresión."),
      mg("glucemia", "Mejorar el control glucémico", "clave", "Factor."),
      mg("isglt2", "Revisar el iSGLT2 e higiene genital", "clave", "Factor."),
      mg("ropa", "Ropa de algodón y evitar duchas vaginales", "util", "Prevención."),
      mg("pareja", "Tratar siempre a la pareja", "innecesario", "No sirve."),
      mg("corticoide-solo", "Corticoide tópico solo", "riesgoso", "Empeora."),
    ],
  },
  debrief: {
    diagnosis: "Candidiasis vulvovaginal recurrente por C. albicans asociada a diabetes descompensada y dapagliflozina, en mujer de 46 años.",
    pathologies: [
      { name: "Candidiasis recurrente", role: "principal", why: "Cuatro o más episodios por año." },
      { name: "Diabetes e iSGLT2", role: "asociada", why: "Factores." },
      { name: "Vaginosis, tricomoniasis", role: "diferencial", why: "Otras vaginitis." },
    ],
    reasoning: [
      "Causa: Candida favorecida por glucosa.",
      "Mecanismo: la glucosuria y la hiperglucemia favorecen al hongo.",
      "Consecuencia: vulvovaginitis repetidas.",
    ],
    epidemiology:
      "La candidiasis es muy frecuente; una minoría tiene formas recurrentes. Los iSGLT2 aumentan las infecciones genitales por la glucosuria. La higiene y el control metabólico son claves.",
    management: [
      "Cultivo.",
      "Inducción y mantenimiento.",
      "Control de diabetes.",
      "Revisar fármacos.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de infecciones del tracto genital.", "CDC — Vulvovaginal Candidiasis Treatment Guidelines."],
    pearls: ["Cuatro o más por año: recurrente.", "iSGLT2.", "Cultivar."],
    pitfalls: ["Tratar a la pareja.", "No mirar la glucemia."],
    tribunal: [
      qa("¿Cómo diferenciás las vaginitis?", "Candida: pH normal, grumoso. Vaginosis: pH mayor de 4,5, olor a pescado. Tricomonas: espumoso, verdoso."),
      qa("¿Qué efectos adversos tienen los iSGLT2?", "Infecciones genitales, cetoacidosis euglucémica y deshidratación."),
      qa("¿Qué hacer si la especie no es albicans?", "Usar otro tratamiento como ácido bórico, porque puede ser resistente a azoles."),
    ],
  },
};
