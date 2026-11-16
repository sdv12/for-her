import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const gravesAdolescente: ClinicalCase = {
  id: "graves-adolescente",
  level: 2,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 14, ageUnit: "años", sex: "F", context: "Segundo año del secundario. Bajó notas. La mamá tiene vitiligo." },
  frequency: "poco-frecuente",
  intro: "La mamá: “Está nerviosa, llora por todo, come muchísimo y adelgaza. Las profesoras dicen que no se queda quieta.”",
  vitals: { TA: "128/58 mmHg", FC: "118 lpm", Peso: "43 kg (bajó 5 kg)", "T°": "37,2 °C" },
  anamnesis: [
    act("sintomas", "¿Calor, sudor, palpitaciones, temblor?", "clave", "“Todo eso, y duermo mal.”", "Hipertiroidismo."),
    act("escuela", "¿Cómo va en la escuela?", "clave", "“No me puedo concentrar.”", "Puede confundirse con TDAH o ansiedad."),
    act("menstruacion", "¿Cómo son las menstruaciones?", "util", "“Más escasas.”", "Oligomenorrea."),
    act("ojos", "¿Notaron los ojos distintos?", "util", "“Más saltones, dice mi abuela.”", "Orbitopatía."),
    act("familia", "¿Enfermedades autoinmunes en la familia?", "util", "“Mamá con vitiligo.”", "Autoinmunidad."),
    act("musica", "¿Qué música escuchás?", "neutro", "“K-pop.”", "No orienta."),
  ],
  exam: [
    act("tiroides", "Tiroides", "clave", "Bocio difuso blando con soplo.", "Graves."),
    act("ojos-ex", "Ojos", "clave", "Retracción palpebral, mirada fija.", "Orbitopatía leve."),
    act("manos", "Manos", "util", "Temblor fino, piel caliente.", "Hiperadrenérgico."),
  ],
  studies: [
    study("Laboratorio", "tsh-t4", "TSH, T4 libre y T3", "clave", "TSH suprimida, T4 libre 3,9 ng/dl, T3 alta.", "Hipertiroidismo."),
    study("Laboratorio", "trab", "TRAb", "clave", "Positivos.", "Confirma Graves."),
    study("Laboratorio", "hemograma-hepato", "Hemograma y hepatograma basales", "clave", "Normales.", "Antes del metimazol."),
    study("Imágenes", "centellograma", "Centellograma", "innecesario", "No se pidió.", "TRAb positivos alcanzan."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("graves", "Enfermedad de Graves en una adolescente", true, "Síntomas de tirotoxicosis, bocio difuso con soplo, orbitopatía, TSH suprimida y TRAb positivos."),
      dx("tdah", "TDAH", false, "Hay tirotoxicosis bioquímica."),
      dx("ansiedad", "Trastorno de ansiedad", false, "Bocio y hormonas alteradas."),
      dx("tiroiditis", "Tiroiditis silente", false, "TRAb positivos y soplo."),
      dx("anorexia", "Anorexia nerviosa", false, "Come mucho y tiene hipertiroidismo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("metimazol", "Metimazol por 1–2 años", "clave", "Primera línea en niños y adolescentes."),
      mg("propranolol", "Propranolol hasta normalizar", "clave", "Síntomas."),
      mg("agranulocitosis", "Explicar que consulte con fiebre o dolor de garganta y pedir hemograma", "clave", "Agranulocitosis por metimazol."),
      mg("escuela", "Informe a la escuela", "util", "Rendimiento transitorio."),
      mg("ptu", "Propiltiouracilo de primera línea", "riesgoso", "Hepatotoxicidad grave en niños."),
      mg("iodo-ya", "Iodo radiactivo como primera opción", "innecesario", "En adolescentes se prefiere primero el metimazol."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad de Graves con orbitopatía leve, en una adolescente de 14 años.",
    pathologies: [
      { name: "Enfermedad de Graves", role: "principal", why: "Anticuerpos estimulantes del receptor de TSH." },
      { name: "Bajo rendimiento escolar", role: "asociada", why: "Síntomas neuropsiquiátricos." },
      { name: "TDAH, ansiedad", role: "diferencial", why: "Confusiones frecuentes." },
    ],
    reasoning: [
      "Causa: autoinmunidad tiroidea.",
      "Mecanismo: los TRAb estimulan la síntesis de hormona.",
      "Consecuencia: hipermetabolismo, taquicardia, bajo peso y síntomas conductuales.",
    ],
    epidemiology:
      "Es la causa más frecuente de hipertiroidismo en pediatría, 5 veces más común en niñas y con pico en la adolescencia. La remisión con metimazol en niños es menor que en adultos, por lo que muchos requieren tratamiento definitivo.",
    management: [
      "TSH, T4L y TRAb.",
      "Metimazol y propranolol.",
      "Controlar hemograma y hepatograma.",
      "Tratamiento definitivo si no remite.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Hipertiroidismo en la infancia.", "European Thyroid Association — Guideline for management of pediatric Graves' disease."],
    pearls: ["Adolescente inquieta que adelgaza comiendo.", "Metimazol, no PTU.", "Fiebre + metimazol: hemograma."],
    pitfalls: ["Diagnosticar TDAH sin TSH.", "PTU en niños."],
    tribunal: [
      qa("¿Por qué no se usa propiltiouracilo en niños?", "Por el riesgo de insuficiencia hepática grave; solo se reserva para el primer trimestre del embarazo o tormenta."),
      qa("¿Cuál es el efecto adverso más grave del metimazol?", "La agranulocitosis, que se manifiesta con fiebre y odinofagia; obliga a suspender y pedir hemograma."),
      qa("¿Qué tratamientos definitivos existen?", "Iodo radiactivo, en general después de los 10 años, y tiroidectomía total."),
    ],
  },
};
