import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hepatocarcinoma: ClinicalCase = {
  id: "hepatocarcinoma-cirrosis",
  level: 3,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 63, ageUnit: "años", sex: "M", context: "Cirrosis por hepatitis C y alcohol. Dejó los controles hace dos años." },
  frequency: "poco-frecuente",
  intro: "“Hace un tiempo me duele acá arriba a la derecha, se me hinchó más la panza y estoy cada vez más flaco y cansado.”",
  vitals: { TA: "108/68 mmHg", FC: "88 lpm", "T°": "37,2 °C", Peso: "65 kg" },
  anamnesis: [
    act("cirrosis", "¿Qué sabés de tu hígado? ¿Hiciste tratamiento y ecografías?", "clave", "“Tenía cirrosis y hepatitis C; no la traté ni hice más ecografías.”", "Principal factor de riesgo: sin vigilancia."),
    act("descompensacion", "¿Vómitos con sangre, confusión, más ictericia?", "clave", "“Tengo los ojos más amarillos.”", "Una descompensación en un cirrótico obliga a buscar hepatocarcinoma."),
    act("alcohol", "¿Seguís tomando alcohol?", "clave", "“Dejé hace seis meses.”", "Cofactor de riesgo."),
    act("sangre", "¿Te transfundieron, compartiste agujas, tatuajes?", "util", "“Transfusión en los ochenta.”", "Vía de hepatitis C."),
    act("fiebre", "¿Fiebre sin causa?", "util", "“Febrícula.”", "Puede haber fiebre paraneoplásica."),
    act("trabajo", "¿En qué trabajaste?", "neutro", "“Colectivero.”", "No orienta."),
  ],
  exam: [
    act("estigmas", "Estigmas de hepatopatía", "clave", "Ictericia leve, arañas vasculares, eritema palmar, ginecomastia.", "Cirrosis."),
    act("abdomen", "Abdomen", "clave", "Hígado duro, nodular y doloroso; ascitis moderada.", "Masa y descompensación."),
    act("flapping", "Asterixis y orientación", "util", "Sin flapping, orientado.", "Sin encefalopatía."),
  ],
  studies: [
    study("Imágenes", "tac", "TC o resonancia multifase", "clave", "Masa de 6 cm con realce arterial y lavado venoso; sin invasión portal.", "Patrón típico que diagnostica sin biopsia en un cirrótico."),
    study("Laboratorio", "afp", "Alfafetoproteína y función hepática", "clave", "AFP 850 ng/ml, albúmina 3, bilirrubina 2,1, RIN 1,3.", "Apoya y permite calcular Child-Pugh."),
    study("Otros", "ascitis", "Punción de ascitis", "clave", "GASA 1,6; PMN 80.", "Descarta peritonitis bacteriana y confirma hipertensión portal."),
    study("Otros", "biopsia", "Biopsia de rutina", "innecesario", "No se realizó.", "Con patrón típico no es necesaria, y puede sembrar el trayecto."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("chc", "Carcinoma hepatocelular sobre cirrosis por hepatitis C", true, "Cirrosis sin vigilancia, masa con realce arterial y lavado venoso y AFP muy elevada."),
      dx("metastasis", "Metástasis hepáticas", false, "No hay primario y el patrón vascular es típico de CHC."),
      dx("absceso", "Absceso hepático", false, "No hay fiebre alta y el realce es típico de tumor."),
      dx("hemangioma", "Hemangioma", false, "Tiene relleno centrípeto, sin lavado, y no da AFP alta."),
      dx("hidatidico", "Quiste hidatídico", false, "Es quístico, no una masa sólida hipervascular."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("bclc", "Estadificar con BCLC y derivar a un comité de hígado", "clave", "Define tratamiento según tumor, función hepática y estado físico."),
      mg("locorregional", "Quimioembolización, ablación, resección, trasplante o tratamiento sistémico según el estadio", "clave", "Con tumor grande sin invasión, la quimioembolización suele ser opción."),
      mg("cirrosis", "Tratar la cirrosis: diuréticos, antivirales de acción directa, várices, vacunas", "clave", "La función hepática condiciona todo."),
      mg("paliativos", "Cuidados paliativos en paralelo", "util", "Mejoran síntomas."),
      mg("aine", "AINE para el dolor", "riesgoso", "Riesgo de sangrado y falla renal."),
      mg("alta", "Control en un año", "riesgoso", "Tumor de progresión rápida."),
    ],
  },
  debrief: {
    diagnosis: "Carcinoma hepatocelular de 6 cm sobre cirrosis por hepatitis C y alcohol, con ascitis, en varón de 63 años.",
    pathologies: [
      { name: "Carcinoma hepatocelular", role: "principal", why: "Tumor primario hepático más frecuente." },
      { name: "Cirrosis descompensada", role: "asociada", why: "Sustrato y causa de descompensación." },
      { name: "Metástasis, absceso, hemangioma", role: "diferencial", why: "Otras lesiones hepáticas." },
    ],
    reasoning: [
      "Causa: inflamación crónica por hepatitis C, alcohol, hepatitis B o hígado graso metabólico.",
      "Mecanismo: ciclos de daño y regeneración acumulan mutaciones hasta que aparece el carcinoma.",
      "Consecuencia: masa hipervascular, dolor, descompensación, trombosis portal y metástasis.",
    ],
    epidemiology:
      "Es la causa más frecuente de muerte en pacientes con cirrosis compensada y predomina en varones. Crece asociado a hígado graso metabólico. Las personas con cirrosis deben hacerse ecografía cada 6 meses, con o sin AFP.",
    management: [
      "Vigilancia con ecografía semestral en cirrosis.",
      "Diagnóstico por imagen multifase.",
      "Estadificación BCLC.",
      "Tratamiento según estadio y función hepática.",
    ],
    sources: ["Asociación Argentina para el Estudio de las Enfermedades del Hígado — Recomendaciones de carcinoma hepatocelular.", "Barcelona Clinic Liver Cancer — Estadificación."],
    pearls: ["Cirrosis: ecografía cada 6 meses.", "Realce arterial + lavado venoso = CHC.", "Descompensación nueva: buscalo."],
    pitfalls: ["Biopsiar sin necesidad.", "Olvidar la vigilancia."],
    tribunal: [
      qa("¿Cuáles son los criterios de Milán?", "Una lesión de hasta 5 cm o hasta 3 lesiones de hasta 3 cm, sin invasión vascular ni extrahepática; permiten indicar trasplante."),
      qa("¿Qué es la clasificación de Child-Pugh?", "Evalúa la función hepática con bilirrubina, albúmina, RIN, ascitis y encefalopatía: A, B o C."),
      qa("¿Qué hepatitis se asocian con cáncer sin cirrosis?", "La hepatitis B: puede causar hepatocarcinoma aun sin cirrosis, por integración del virus."),
    ],
  },
};
