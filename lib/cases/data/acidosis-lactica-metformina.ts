import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const acidosisLacticaMetformina: ClinicalCase = {
  id: "acidosis-metabolica-lactica-metformina",
  level: 3,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 71, ageUnit: "años", sex: "M", context: "Diabético e hipertenso, con enfermedad renal crónica. Toma metformina 2.550 mg, enalapril y furosemida. Tres días de diarrea." },
  frequency: "poco-frecuente",
  intro: "“Hace tres días tengo diarrea y vómitos. Seguí tomando las pastillas. Respiro agitado, estoy muy flojo y me duele la panza.”",
  vitals: { TA: "92/54 mmHg", FC: "116 lpm", FR: "34 rpm", "T°": "35,9 °C", "SatO₂": "96 %", Glucemia: "132 mg/dl", Glasgow: "14/15" },
  anamnesis: [
    act("farmacos", "¿Qué medicación tomás? ¿La siguió tomando con la diarrea?", "clave", "“Metformina, enalapril y furosemida; todo igual.”", "En deshidratación estos fármacos deben pausarse."),
    act("orina", "¿Orinás menos?", "clave", "“Casi nada desde ayer.”", "IRA: la metformina se acumula."),
    act("toxicos", "¿Alcohol, anticongelante, muchas aspirinas?", "clave", "“No.”", "Otras causas de anión gap aumentado."),
    act("infeccion", "¿Fiebre, tos, ardor al orinar?", "util", "“No.”", "Sepsis."),
    act("insulina", "¿Usás insulina? ¿Te faltó?", "util", "“No uso.”", "Cetoacidosis."),
    act("campo", "¿Vive en el campo o la ciudad?", "neutro", "“En la ciudad.”", "No orienta."),
  ],
  exam: [
    act("kussmaul", "Respiración", "clave", "Respiración profunda y rápida de Kussmaul, sin aliento cetónico.", "Compensación respiratoria."),
    act("volemia", "Mucosas y perfusión", "clave", "Secas, frialdad, relleno de 4 segundos.", "Hipovolemia y shock."),
    act("abdomen", "Abdomen", "util", "Doloroso difuso, sin peritonismo.", "Puede simular abdomen agudo."),
  ],
  studies: [
    study("Laboratorio", "gases", "Gases, lactato y anión gap", "clave", "pH 6,96; HCO₃ 6; pCO₂ 20; lactato 16 mmol/l; Na 138; Cl 98.", "Anión gap de 34: acidosis metabólica con gap elevado."),
    study("Laboratorio", "lab", "Creatinina, urea, potasio, cetonemia", "clave", "Creatinina 5,8 (basal 1,7); K 6,1; cetonas mínimas.", "IRA con hiperpotasemia, sin cetoacidosis."),
    study("Electrofisiología", "ecg", "ECG", "clave", "Ondas T picudas.", "Hiperpotasemia con repercusión."),
    study("Imágenes", "cinta", "Radiografía de abdomen seriada antes de reanimar", "innecesario", "No se realizó.", "No cambia la conducta inicial."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("lactica", "Acidosis metabólica láctica con anión gap aumentado asociada a metformina, con IRA prerrenal e hiperpotasemia", true, "Gap alto, lactato de 16, sin cetonas, con metformina en insuficiencia renal aguda."),
      dx("cad", "Cetoacidosis diabética", false, "Glucemia de 132 y cetonas mínimas; aunque hay formas euglucémicas, no toma iSGLT2."),
      dx("etilenglicol", "Intoxicación por etilenglicol", false, "No hay ingesta y el lactato explica el gap."),
      dx("diarrea", "Acidosis hiperclorémica por diarrea", false, "La diarrea da gap normal; aquí el gap es 34."),
      dx("sepsis", "Shock séptico", false, "No hay foco ni fiebre, aunque debe buscarse."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("suspender", "Suspender metformina, IECA y diurético", "clave", "Retira las causas."),
      mg("volumen", "Reanimación con cristaloides y control de hemodinamia", "clave", "Mejora la perfusión y el aclaramiento."),
      mg("dialisis", "Hemodiálisis urgente", "clave", "Elimina la metformina y corrige acidosis grave, lactato alto e hiperpotasemia."),
      mg("potasio", "Tratar la hiperpotasemia: calcio EV, insulina con glucosa", "clave", "Hay cambios en el ECG."),
      mg("bicarbonato-solo", "Dar bicarbonato y alta si mejora el pH", "riesgoso", "No trata la causa y requiere internación crítica."),
      mg("seguir", "Mantener metformina porque la glucemia es buena", "riesgoso", "Perpetúa la acidosis."),
    ],
  },
  debrief: {
    diagnosis: "Acidosis láctica asociada a metformina con anión gap aumentado, IRA prerrenal e hiperpotasemia, por gastroenteritis y mantenimiento de fármacos, en varón de 71 años.",
    pathologies: [
      { name: "Acidosis metabólica láctica", role: "principal", why: "Acumulación de ácido láctico." },
      { name: "Insuficiencia renal aguda, hiperpotasemia", role: "asociada", why: "Causa y complicación." },
      { name: "Cetoacidosis, tóxicos, sepsis", role: "diferencial", why: "Otras causas de gap aumentado." },
    ],
    reasoning: [
      "Causa: gastroenteritis con deshidratación y fármacos mantenidos.",
      "Mecanismo: la IRA acumula metformina, que inhibe el metabolismo mitocondrial y la neoglucogénesis desde lactato.",
      "Consecuencia: acidosis grave, shock, arritmias.",
    ],
    epidemiology:
      "Es una complicación rara, pero tiene mortalidad elevada. Aparece casi siempre con IRA, shock o sepsis, no con dosis ajustadas y función renal normal. En días de enfermedad con vómitos o diarrea, se aconseja suspender metformina, IECA, diuréticos e iSGLT2.",
    management: [
      "Gases, lactato y anión gap sistemáticos.",
      "Reanimar.",
      "Suspender fármacos.",
      "Diálisis según criterios.",
    ],
    sources: ["Sociedad Argentina de Nefrología — Recomendaciones sobre injuria renal aguda.", "EXTRIP Workgroup — Tratamiento extracorpóreo en intoxicación por metformina."],
    pearls: ["MUDPILES y sistemática.", "Días de enfermedad: suspender metformina, IECA, diuréticos.", "Metformina no da hipoglucemia: la glucemia normal no tranquiliza."],
    pitfalls: ["No calcular el anión gap.", "Atribuir el pH a la diarrea."],
    tribunal: [
      qa("¿Cómo se calcula el anión gap?", "Sodio menos la suma de cloro y bicarbonato; normal cerca de 12, corregido por albúmina."),
      qa("¿Qué es la fórmula de Winter?", "pCO₂ esperada = 1,5 × HCO₃ + 8 ± 2; sirve para ver si la compensación es adecuada."),
      qa("¿Hasta qué filtrado se usa la metformina?", "Se reduce la dosis con filtrado menor de 45 y se contraindica por debajo de 30 ml/min."),
    ],
  },
};
