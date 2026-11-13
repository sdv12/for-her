import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const insuficienciaOvaricaPrematura: ClinicalCase = {
  id: "menopausia-precoz-insuficiencia-ovarica",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 37, ageUnit: "años", sex: "F", context: "Hipotiroidismo por Hashimoto. Sin hijos, quería buscar embarazo." },
  frequency: "poco-frecuente",
  intro: "“Hace ocho meses no menstrúo, tengo sofocones y sequedad vaginal. Pensé que era el estrés.”",
  vitals: { TA: "118/74 mmHg", FC: "76 lpm", "T°": "36,5 °C", Peso: "60 kg" },
  anamnesis: [
    act("amenorrea", "¿Cuándo fue tu última menstruación?", "clave", "“Hace ocho meses.”", "Amenorrea secundaria."),
    act("sintomas", "¿Sofocones, sequedad, cambios de ánimo?", "clave", "“Sofocones de noche y sequedad.”", "Hipoestrogenismo."),
    act("embarazo", "¿Podés estar embarazada?", "clave", "“No creo, pero no me cuido.”", "Descartar primero."),
    act("autoinmune", "¿Otras enfermedades autoinmunes?", "util", "“Hashimoto.”", "Asociación."),
    act("quimio", "¿Quimioterapia, radioterapia o cirugía de ovarios?", "util", "“No.”", "Causas iatrogénicas."),
    act("perro", "¿Tenés mascotas?", "neutro", "“Dos gatos.”", "No orienta."),
  ],
  exam: [
    act("genital", "Examen genital", "clave", "Mucosa vaginal atrófica.", "Hipoestrogenismo."),
    act("tiroides", "Tiroides", "clave", "Normal, en tratamiento.", "Base."),
    act("galactorrea", "Mamas y galactorrea", "util", "Sin galactorrea.", "Hiperprolactinemia."),
  ],
  studies: [
    study("Laboratorio", "bhcg", "Subunidad beta de hCG", "clave", "Negativa.", "Descarta embarazo."),
    study("Laboratorio", "fsh", "FSH y estradiol (dos veces separadas por 4 semanas), prolactina, TSH", "clave", "FSH 68 y 72; estradiol bajo; prolactina y TSH normales.", "Insuficiencia ovárica."),
    study("Laboratorio", "amh", "Hormona antimülleriana, cariotipo y premutación FMR1", "util", "AMH indetectable; cariotipo normal; FMR1 normal.", "Causas."),
    study("Imágenes", "rm", "RM de hipófisis", "innecesario", "No se realizó.", "FSH alta: el problema es ovárico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("iop", "Insuficiencia ovárica prematura (menopausia precoz) de probable origen autoinmune", true, "Amenorrea mayor de 4 meses antes de los 40, FSH alta en dos determinaciones y Hashimoto."),
      dx("hipotalamica", "Amenorrea hipotalámica", false, "FSH alta."),
      dx("sop", "Síndrome de ovario poliquístico", false, "FSH alta y AMH indetectable."),
      dx("prolactinoma", "Prolactinoma", false, "Prolactina normal."),
      dx("embarazo", "Embarazo", false, "Beta negativa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("thr", "Terapia hormonal con estrógenos y progestágeno hasta la edad de menopausia natural", "clave", "Protege hueso y corazón."),
      mg("fertilidad", "Consejería sobre fertilidad y ovodonación", "clave", "Deseo de embarazo."),
      mg("dmo", "Densitometría, calcio y vitamina D", "clave", "Riesgo de osteoporosis."),
      mg("psico", "Apoyo psicológico", "util", "Impacto emocional."),
      mg("sin-tratamiento", "No indicar hormonas por miedo al cáncer", "riesgoso", "El riesgo es el déficit, no el reemplazo a esta edad."),
      mg("anticoncepcion-negar", "Decirle que no puede quedar embarazada nunca", "riesgoso", "Hay ovulaciones esporádicas posibles."),
    ],
  },
  debrief: {
    diagnosis: "Insuficiencia ovárica prematura (menopausia precoz) de probable origen autoinmune, en mujer de 37 años con Hashimoto.",
    pathologies: [
      { name: "Insuficiencia ovárica prematura", role: "principal", why: "Pérdida de función ovárica antes de los 40." },
      { name: "Hashimoto", role: "asociada", why: "Autoinmunidad." },
      { name: "Amenorrea hipotalámica, SOP", role: "diferencial", why: "Otras amenorreas." },
    ],
    reasoning: [
      "Causa: autoinmune, genética o iatrogénica; muchas veces desconocida.",
      "Mecanismo: agotamiento folicular precoz con caída de estrógenos.",
      "Consecuencia: síntomas climatéricos, infertilidad, osteoporosis y riesgo cardiovascular.",
    ],
    epidemiology:
      "Afecta a alrededor del 1 % de las mujeres antes de los 40. Se asocia a otras autoinmunidades y a la premutación del X frágil. La terapia hormonal está indicada hasta los 50 años salvo contraindicaciones.",
    management: [
      "Beta-hCG.",
      "FSH repetida.",
      "Terapia hormonal.",
      "Fertilidad y hueso.",
    ],
    sources: ["Sociedad Argentina de Endocrinología Ginecológica y Reproductiva — Insuficiencia ovárica prematura.", "ESHRE — Guideline on Premature Ovarian Insufficiency."],
    pearls: ["FSH alta antes de los 40.", "Reemplazo hasta los 50.", "Pedí FMR1."],
    pitfalls: ["No reemplazar.", "Atribuirlo al estrés."],
    tribunal: [
      qa("¿Por qué se pide la premutación FMR1?", "Porque causa insuficiencia ovárica y tiene implicancias para la descendencia (X frágil)."),
      qa("¿Qué diferencia hay con la menopausia natural?", "Puede haber ovulaciones esporádicas y embarazos espontáneos ocasionales."),
      qa("¿Qué riesgo tiene no reemplazar?", "Osteoporosis, enfermedad cardiovascular y deterioro cognitivo."),
    ],
  },
};
