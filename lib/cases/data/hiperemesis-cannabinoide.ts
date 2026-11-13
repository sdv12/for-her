import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hiperemesisCannabinoide: ClinicalCase = {
  id: "sindrome-hiperemesis-cannabinoide",
  level: 2,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 24, ageUnit: "años", sex: "M", context: "Fuma marihuana varias veces por día desde hace 4 años. Tercera consulta por vómitos en el año." },
  frequency: "frecuente",
  intro: "“Otra vez vomito sin parar desde ayer y me duele la panza. Lo único que me alivia es bañarme con agua caliente.”",
  vitals: { TA: "118/74 mmHg", FC: "104 lpm", FR: "18 rpm", "T°": "36,7 °C", "SatO₂": "99 %" },
  anamnesis: [
    act("cannabis", "¿Cuánto y desde cuándo consume marihuana?", "clave", "“Todos los días, varias veces, hace cuatro años.”", "Uso crónico intenso."),
    act("banos", "¿Algo lo alivia?", "clave", "“Las duchas calientes, me baño seis veces por día.”", "Signo muy característico."),
    act("episodios", "¿Cómo son los episodios?", "clave", "“Vienen cada tantos meses y duran unos días.”", "Patrón cíclico."),
    act("sangre", "¿Vómitos con sangre o materia fecal negra?", "util", "“No.”", "Complicaciones."),
    act("otros", "¿Alcohol u otras drogas?", "util", "“Poco alcohol.”", "Otras causas."),
    act("hobby", "¿Qué hace?", "neutro", "“Toco la batería.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Dolor difuso leve, sin defensa ni rebote.", "Sin abdomen agudo."),
    act("hidratacion", "Hidratación", "clave", "Mucosas secas, taquicardia leve.", "Deshidratación."),
    act("piel", "Piel", "util", "Normal.", "Base."),
  ],
  studies: [
    study("Laboratorio", "lab", "Ionograma, función renal, lipasa, hepatograma", "clave", "K 3,2; creatinina 1,3; lipasa normal.", "Hipopotasemia y prerrenal."),
    study("Laboratorio", "embarazo-tox", "Glucemia y orina completa", "util", "Normales.", "Excluye cetoacidosis e infección."),
    study("Imágenes", "eco", "Ecografía abdominal", "util", "Normal.", "Excluye causa biliar."),
    study("Imágenes", "tc-repetida", "TC de abdomen en cada consulta", "innecesario", "No se realizó.", "Radiación sin beneficio en cuadro conocido."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hiperemesis", "Síndrome de hiperemesis cannabinoide", true, "Uso crónico diario de cannabis, vómitos cíclicos y alivio con duchas calientes, sin otra causa."),
      dx("vomitos-ciclicos", "Síndrome de vómitos cíclicos", false, "El uso crónico de cannabis y el alivio con agua caliente orientan al cannabinoide."),
      dx("pancreatitis", "Pancreatitis", false, "Lipasa normal."),
      dx("gastroenteritis", "Gastroenteritis", false, "Es recurrente y sin diarrea."),
      dx("abstinencia", "Abstinencia de cannabis", false, "Aparece con el consumo activo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hidratacion", "Hidratación y reposición de potasio", "clave", "Deshidratación e hipopotasemia."),
      mg("haloperidol", "Haloperidol en dosis bajas o capsaicina tópica", "clave", "Más eficaces que los antieméticos habituales."),
      mg("suspender", "Suspender el cannabis y explicar que es la causa", "clave", "Único tratamiento definitivo."),
      mg("consumo", "Derivación a tratamiento de consumo problemático", "util", "Sostener la abstinencia."),
      mg("opioides", "Opioides para el dolor", "riesgoso", "Empeoran las náuseas y generan dependencia."),
      mg("cannabis-tto", "Recomendar cannabis medicinal para las náuseas", "riesgoso", "Es la causa del cuadro."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de hiperemesis cannabinoide con deshidratación e hipopotasemia, en varón de 24 años con uso diario de cannabis.",
    pathologies: [
      { name: "Hiperemesis cannabinoide", role: "principal", why: "Vómitos cíclicos por uso crónico de cannabis." },
      { name: "Consumo problemático de cannabis", role: "asociada", why: "Causa de fondo." },
      { name: "Vómitos cíclicos, pancreatitis", role: "diferencial", why: "Otras causas de vómitos recurrentes." },
    ],
    reasoning: [
      "Causa: uso crónico e intenso de cannabis.",
      "Mecanismo: desregulación de receptores cannabinoides y de la termorregulación hipotalámica.",
      "Consecuencia: vómitos incoercibles, deshidratación y consultas repetidas.",
    ],
    epidemiology:
      "Con el aumento del consumo de cannabis más potente, se volvió una causa frecuente de vómitos recurrentes en guardia. Suele pasar años sin diagnóstico y con estudios repetidos. Los antieméticos comunes funcionan poco.",
    management: [
      "Preguntar por cannabis.",
      "Hidratación.",
      "Haloperidol o capsaicina.",
      "Suspender el consumo.",
    ],
    sources: ["SEDRONAR — Abordaje del consumo problemático de sustancias.", "American Gastroenterological Association — Clinical Practice Update on Cannabinoid Hyperemesis Syndrome."],
    pearls: ["Duchas calientes compulsivas.", "Antieméticos comunes fallan.", "Solo se cura dejando."],
    pitfalls: ["TC en cada consulta.", "Opioides."],
    tribunal: [
      qa("¿Por qué alivian las duchas calientes?", "Se cree que actúan sobre la termorregulación hipotalámica alterada por el cannabis."),
      qa("¿Cuánto tarda en resolverse tras suspender?", "Días a semanas, pero puede recurrir si se retoma el consumo."),
      qa("¿Qué complicación electrolítica es frecuente?", "Hipopotasemia y alcalosis metabólica por los vómitos."),
    ],
  },
};
