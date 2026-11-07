import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const anemiaHemolitica: ClinicalCase = {
  id: "anemia-hemolitica-autoinmune",
  level: 3,
  area: "Hematología",
  setting: "Guardia",
  patient: { age: 35, ageUnit: "años", sex: "F", context: "Con diagnóstico reciente de lupus; comenzó ceftriaxona hace 4 días por una infección urinaria." },
  frequency: "poco-frecuente",
  intro: "“En una semana me puse muy pálida y amarilla, orino oscuro y me agito al caminar. Me late fuerte el corazón.”",
  vitals: { TA: "108/62 mmHg", FC: "122 lpm", FR: "24 rpm", "T°": "37,5 °C", "SatO₂": "96 %" },
  anamnesis: [
    act("orina", "¿Cómo es la orina? ¿Te duele al orinar?", "clave", "“Oscura; sin dolor.”", "Hemoglobinuria o bilirrubina."),
    act("farmacos", "¿Qué medicamentos empezaste?", "clave", "“Ceftriaxona hace 4 días; hidroxicloroquina.”", "Fármacos: causa posible."),
    act("autoinmune", "¿Lupus, linfoma, otras enfermedades?", "clave", "“Lupus.”", "Causa secundaria."),
    act("sangrado", "¿Sangrás? ¿Menstruaciones abundantes?", "util", "“No.”", "Distingue pérdida de destrucción."),
    act("frio", "¿Empeora con frío? ¿Dedos azules?", "util", "“No.”", "Anticuerpos fríos."),
    act("hobby", "¿Qué hacés para relajarte?", "neutro", "“Yoga.”", "No orienta."),
  ],
  exam: [
    act("palidez", "Palidez e ictericia", "clave", "Palidez intensa e ictericia leve.", "Hemólisis."),
    act("bazo", "Bazo y ganglios", "clave", "Polo de bazo palpable, sin adenopatías.", "Destrucción esplénica."),
    act("cardio", "Corazón", "util", "Soplo sistólico funcional, taquicardia.", "Anemia sintomática."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma, reticulocitos y frotis", "clave", "Hb 5,8, VCM 104, reticulocitos 14 %, esferocitos; plaquetas normales.", "Hemólisis regenerativa."),
    study("Laboratorio", "hemolisis", "LDH, haptoglobina, bilirrubina", "clave", "LDH alta, haptoglobina indetectable, bilirrubina indirecta alta.", "Confirma hemólisis."),
    study("Laboratorio", "coombs", "Coombs directo", "clave", "Positivo para IgG.", "Mecanismo inmune."),
    study("Laboratorio", "causas", "Función renal, VIH, hepatitis, ANA", "util", "ANA positivo.", "Busca causa."),
    study("Otros", "biopsia", "Punción de médula ósea de rutina", "innecesario", "No se realizó.", "No hace falta con la hemólisis clara."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ahai", "Anemia hemolítica autoinmune por anticuerpos calientes, asociada a lupus", true, "Anemia con reticulocitos altos, LDH alta, haptoglobina baja, esferocitos y Coombs positivo."),
      dx("microangiopatia", "Microangiopatía (PTT, SUH)", false, "Daría esquistocitos y plaquetas bajas con Coombs negativo."),
      dx("ferropenica", "Anemia ferropénica", false, "Es microcítica con reticulocitos bajos."),
      dx("megaloblastica", "Anemia megaloblástica", false, "No tiene reticulocitos altos."),
      dx("hereditaria", "Esferocitosis hereditaria", false, "Coombs negativo y antecedentes familiares."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("corticoide", "Corticoides (prednisona o metilprednisolona)", "clave", "Primera línea."),
      mg("farmaco", "Suspender ceftriaxona y cambiar antibiótico", "clave", "Posible desencadenante."),
      mg("transfusion", "Transfundir si hay inestabilidad, sin demorar por el Coombs", "clave", "Con síntomas graves no se debe demorar."),
      mg("soporte", "Ácido fólico y profilaxis de trombosis", "util", "Por consumo y riesgo trombótico."),
      mg("rituximab", "Rituximab o esplenectomía si no responde", "util", "Segunda línea."),
      mg("hierro", "Hierro EV para corregir la anemia", "riesgoso", "No hay déficit: no sirve y puede dañar."),
    ],
  },
  debrief: {
    diagnosis: "Anemia hemolítica autoinmune por anticuerpos calientes asociada a lupus, con posible gatillo por ceftriaxona, en mujer de 35 años.",
    pathologies: [
      { name: "Anemia hemolítica autoinmune", role: "principal", why: "Anticuerpos contra glóbulos rojos." },
      { name: "Lupus", role: "asociada", why: "Causa secundaria." },
      { name: "Microangiopatía, esferocitosis, megaloblástica", role: "diferencial", why: "Otras anemias." },
    ],
    reasoning: [
      "Causa: autoinmunidad, a veces por fármacos o linfoma.",
      "Mecanismo: IgG opsoniza hematíes, que el bazo destruye, y deja esferocitos.",
      "Consecuencia: anemia, ictericia, esplenomegalia, cálculos pigmentarios y trombosis.",
    ],
    epidemiology:
      "Se presenta en 1 a 3 de cada 100.000 adultos por año. La mitad es secundaria a lupus, linfomas, infecciones o fármacos. La ceftriaxona y otras cefalosporinas son causas conocidas de hemólisis inmune, aunque poco frecuente.",
    management: [
      "Confirmar hemólisis y Coombs.",
      "Buscar causa.",
      "Corticoides y transfusión si hace falta.",
      "Segunda línea si no responde.",
    ],
    sources: ["Sociedad Argentina de Hematología — Guías de anemias hemolíticas.", "Sociedad Argentina de Reumatología — Recomendaciones de lupus."],
    pearls: ["LDH alta, haptoglobina baja, reticulocitos altos.", "Coombs directo positivo: inmune.", "Si hay esquistocitos: pensá en PTT."],
    pitfalls: ["Dar hierro de rutina.", "No transfundir por miedo con síntomas graves."],
    tribunal: [
      qa("¿Qué diferencia los Coombs?", "El directo detecta anticuerpos unidos al hematíe; el indirecto, anticuerpos libres en suero."),
      qa("¿Cómo se clasifican las anemias por VCM?", "Microcíticas (ferropenia, talasemia), normocíticas (enfermedad crónica, hemólisis aguda), macrocíticas (B12, folato, alcohol)."),
      qa("¿Qué son los anticuerpos fríos?", "IgM que actúan a baja temperatura, con acrocianosis; se asocian a Mycoplasma, mononucleosis y linfomas; responden mal a corticoides."),
    ],
  },
};
