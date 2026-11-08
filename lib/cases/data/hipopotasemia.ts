import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hipopotasemia: ClinicalCase = {
  id: "hipopotasemia-diureticos-vomitos",
  level: 2,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 64, ageUnit: "años", sex: "F", context: "Hipertensa, toma hidroclorotiazida y digoxina por fibrilación auricular. Laxantes a diario. Dos días con vómitos." },
  frequency: "muy-frecuente",
  intro: "“Tengo las piernas sin fuerza, calambres y el corazón me salta. Estuve vomitando y tomo laxantes para ir de cuerpo.”",
  vitals: { TA: "118/70 mmHg", FC: "62 lpm", FR: "18 rpm", "T°": "36,4 °C", "SatO₂": "97 %", Peso: "63 kg" },
  anamnesis: [
    act("farmacos", "¿Qué diurético, cuántos laxantes, tomás digoxina?", "clave", "“Tiazida, digoxina, y dos laxantes por día.”", "Pérdidas y mayor toxicidad digitálica."),
    act("perdidas", "¿Cuántos vómitos o diarrea?", "clave", "“Muchos vómitos, diarrea por el laxante.”", "Pérdidas digestivas."),
    act("digital", "¿Ves amarillo, náuseas, confusión?", "clave", "“Veo un poco amarillo.”", "Intoxicación digitálica favorecida por el potasio bajo."),
    act("regaliz", "¿Sal, regaliz o HTA difícil?", "util", "“No.”", "Hiperaldosteronismo."),
    act("alimentacion", "¿Qué comés?", "util", "“Poco.”", "Bajo aporte."),
    act("nieto", "¿Tenés nietos?", "neutro", "“Cuatro.”", "No orienta."),
  ],
  exam: [
    act("neuromuscular", "Fuerza y reflejos", "clave", "Debilidad proximal 4/5, hiporreflexia.", "Efecto neuromuscular."),
    act("cardiaco", "Pulso y corazón", "clave", "Irregular, con extrasístoles.", "Arritmias."),
    act("abdomen", "Abdomen y volemia", "util", "Distendido, ruidos disminuidos, mucosas secas.", "Íleo por hipopotasemia."),
  ],
  studies: [
    study("Laboratorio", "iono", "Potasio, magnesio, creatinina, gases", "clave", "K 2,4; Mg 1,3; alcalosis metabólica.", "Corregir magnesio es indispensable."),
    study("Electrofisiología", "ecg", "ECG", "clave", "Ondas U, T aplanadas, QT prolongado, extrasístoles.", "Define la urgencia."),
    study("Laboratorio", "digoxina", "Digoxinemia", "clave", "2,6 ng/ml.", "Toxicidad."),
    study("Laboratorio", "orina", "Potasio y cloro urinario", "util", "Potasio urinario alto.", "Orienta el origen."),
    study("Imágenes", "tc", "TC de abdomen por distensión", "innecesario", "No se realizó.", "El íleo se explica por el potasio."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hipopotasemia", "Hipopotasemia grave con cambios electrocardiográficos por tiazida, vómitos y laxantes, con toxicidad digitálica", true, "K de 2,4 con ondas U, debilidad, pérdidas, y digoxinemia alta."),
      dx("hiperaldo", "Hiperaldosteronismo primario", false, "Hay causas evidentes y volemia baja."),
      dx("guillain", "Guillain-Barré", false, "El potasio explica la debilidad."),
      dx("paralisis", "Parálisis periódica", false, "No es episódica en joven ni familiar."),
      dx("iam", "Síndrome coronario", false, "Los cambios se explican por electrolitos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ev", "Cloruro de potasio EV diluido, con monitor y a velocidad segura", "clave", "K menor de 2,5 con cambios en el ECG."),
      mg("magnesio", "Reponer magnesio", "clave", "Sin magnesio, el potasio no se corrige."),
      mg("suspender", "Suspender digoxina, tiazida y laxantes", "clave", "Retira las causas."),
      mg("fab", "Evaluar anticuerpos antidigoxina si hay arritmia grave", "util", "Antídoto."),
      mg("bolo", "Bolo rápido de potasio EV sin diluir", "riesgoso", "Puede causar paro cardíaco."),
      mg("glucosa", "Hidratar solo con dextrosa", "riesgoso", "La insulina mete potasio en las células."),
    ],
  },
  debrief: {
    diagnosis: "Hipopotasemia grave por tiazida, vómitos y abuso de laxantes, con hipomagnesemia y toxicidad digitálica, en mujer de 64 años.",
    pathologies: [
      { name: "Hipopotasemia", role: "principal", why: "Potasio menor de 3,5 mEq/l." },
      { name: "Hipomagnesemia y toxicidad digitálica", role: "asociada", why: "Agravan el riesgo arrítmico." },
      { name: "Hiperaldosteronismo, parálisis periódica", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: pérdidas renales y digestivas.",
      "Mecanismo: la falta de potasio hiperpolariza y altera la repolarización; aumenta la unión de la digoxina a la bomba.",
      "Consecuencia: debilidad, íleo y arritmias.",
    ],
    epidemiology:
      "Es el trastorno electrolítico más frecuente junto con la hiponatremia en pacientes internados. Los diuréticos y las pérdidas digestivas son las causas más comunes. En quienes toman digoxina o tienen cardiopatía, incluso valores moderados elevan mucho el riesgo de arritmias.",
    management: [
      "ECG y monitor.",
      "Reponer potasio y magnesio.",
      "Corregir la causa.",
      "Controles seriados.",
    ],
    sources: ["Sociedad Argentina de Nefrología — Trastornos del potasio.", "KDIGO — Controversies Conference on Potassium Disorders."],
    pearls: ["Ondas U.", "Sin magnesio no sube.", "Potasio bajo aumenta toxicidad digitálica."],
    pitfalls: ["Reposición rápida.", "No preguntar por laxantes."],
    tribunal: [
      qa("¿A qué velocidad se repone el potasio EV?", "En general hasta 10 mEq/h por vía periférica y hasta 20 mEq/h por vía central con monitorización."),
      qa("¿Cómo orienta el potasio urinario?", "Menor de 20 mEq/l sugiere pérdida digestiva o bajo aporte; mayor sugiere causa renal."),
      qa("¿Qué dan los diuréticos de asa y tiazidas?", "Hipopotasemia, alcalosis metabólica; las tiazidas además hiponatremia e hipercalcemia."),
    ],
  },
};
