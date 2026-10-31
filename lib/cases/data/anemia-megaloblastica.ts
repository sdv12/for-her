import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const anemiaMegaloblastica: ClinicalCase = {
  id: "anemia-megaloblastica-b12",
  level: 2,
  area: "Hematología",
  setting: "Consultorio",
  patient: { age: 68, ageUnit: "años", sex: "F", context: "Diabética, toma metformina hace 12 años. Tiene hipotiroidismo." },
  frequency: "frecuente",
  intro: "“Estoy muy cansada, me hormiguean los pies y las manos, y últimamente me tropiezo. Mi hija dice que me olvido de las cosas.”",
  vitals: { TA: "122/74 mmHg", FC: "92 lpm", Peso: "60 kg" },
  anamnesis: [
    act("parestesias", "¿Cómo son los hormigueos? ¿Le cuesta caminar a oscuras?", "clave", "“Hormigueo en los pies y las manos, y a oscuras me caigo para los costados.”", "Parestesias simétricas y ataxia que empeora a oscuras: compromiso de cordones posteriores (degeneración combinada subaguda por déficit de B12)."),
    act("metformina", "¿Desde cuándo toma metformina?", "clave", "“Hace 12 años.”", "La metformina prolongada reduce la absorción de B12."),
    act("dieta", "¿Come carne, huevos, lácteos?", "util", "“Sí, de todo.”", "La dieta vegana estricta es otra causa de déficit de B12."),
    act("autoinmune", "¿Tiene enfermedades autoinmunes (tiroides, vitiligo)?", "clave", "“Hipotiroidismo por Hashimoto.”", "La anemia perniciosa (autoinmune) se asocia a otras autoinmunidades."),
    act("cirugia", "¿Le operaron el estómago o el intestino? ¿Toma omeprazol?", "util", "“Omeprazol hace años.”", "Gastrectomía, resección ileal e IBP crónicos reducen la absorción."),
    act("lengua", "¿Le arde la lengua?", "util", "“Sí, a veces.”", "Glositis atrófica."),
    act("alcohol", "¿Toma alcohol?", "util", "“No.”", "El alcohol causa macrocitosis y déficit de folato."),
    act("tejido", "¿Qué le gusta hacer?", "neutro", "“Tejer.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Sensibilidad vibratoria y propioceptiva, reflejos y Romberg", "clave", "Palestesia y propiocepción disminuidas en los pies, Romberg positivo, reflejos aquilianos disminuidos.", "Compromiso de cordones posteriores y neuropatía periférica."),
    act("lengua", "Lengua y mucosas", "util", "Lengua lisa, roja y depapilada; palidez con tinte ictérico leve.", "Glositis y hemólisis intramedular (ictericia leve)."),
    act("cognitivo", "Evaluación cognitiva breve", "util", "Errores leves de memoria reciente.", "El déficit de B12 es una causa reversible de deterioro cognitivo."),
    act("pies", "Examen de pies (diabética)", "util", "Sin lesiones.", "La neuropatía diabética es un diferencial."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma con frotis y reticulocitos", "clave", "Hb 8,9 g/dl, VCM 116 fl, leucocitos 3.800, plaquetas 128.000. Neutrófilos hipersegmentados, macroovalocitos. Reticulocitos bajos.", "Anemia macrocítica con neutrófilos hipersegmentados y pancitopenia leve: megaloblástica."),
    study("Laboratorio", "b12", "Vitamina B12 y ácido fólico", "clave", "B12 120 pg/ml (baja), folato normal.", "Confirma el déficit de B12."),
    study("Laboratorio", "anticuerpos", "Anticuerpos anti-factor intrínseco y anti-célula parietal", "util", "Anti-factor intrínseco positivo.", "Diagnostican anemia perniciosa."),
    study("Laboratorio", "hemolisis", "LDH y bilirrubina", "util", "LDH muy alta, bilirrubina indirecta 1,8.", "Hemólisis intramedular por eritropoyesis ineficaz."),
    study("Otros", "medula", "Punción de médula ósea", "innecesario", "No se realizó.", "No hace falta con un cuadro típico y B12 baja."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("b12", "Anemia megaloblástica por déficit de B12 (anemia perniciosa, agravada por metformina) con degeneración combinada subaguda", true, "Anemia macrocítica con hipersegmentación, B12 baja, anti-factor intrínseco positivo y compromiso de cordones posteriores."),
      dx("folato", "Déficit de ácido fólico", false, "Da la misma anemia, pero no síntomas neurológicos; el folato es normal."),
      dx("smd", "Síndrome mielodisplásico", false, "Puede dar macrocitosis y citopenias en mayores, pero con B12 normal y displasia en el frotis."),
      dx("hipotiroidismo", "Macrocitosis por hipotiroidismo", false, "Da macrocitosis leve sin hipersegmentación ni déficit de B12."),
      dx("diabetica", "Neuropatía diabética aislada", false, "No explica la anemia ni la ataxia propioceptiva marcada."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("b12-im", "Vitamina B12 (cianocobalamina) intramuscular: dosis de carga y luego mensual de por vida", "clave", "En la anemia perniciosa falta el factor intrínseco: la vía parenteral asegura la reposición."),
      mg("potasio", "Controlar el potasio y los reticulocitos en la primera semana", "util", "Al reponer, la producción de glóbulos rojos consume potasio (hipopotasemia) y los reticulocitos suben en 5–7 días."),
      mg("endoscopia", "Endoscopia digestiva alta", "clave", "La anemia perniciosa aumenta el riesgo de cáncer gástrico y tumores carcinoides."),
      mg("caidas", "Prevención de caídas y kinesiología", "util", "La ataxia aumenta el riesgo de caídas."),
      mg("folico-solo", "Ácido fólico solo", "riesgoso", "Corrige parcialmente la anemia pero deja progresar el daño neurológico."),
      mg("transfusion", "Transfusión de glóbulos rojos", "innecesario", "Anemia crónica bien tolerada: responde a la reposición."),
    ],
  },
  debrief: {
    diagnosis: "Anemia megaloblástica por déficit de vitamina B12 (anemia perniciosa, agravada por metformina), con degeneración combinada subaguda de la médula y deterioro cognitivo leve.",
    pathologies: [
      { name: "Anemia perniciosa", role: "principal", why: "Gastritis atrófica autoinmune sin factor intrínseco." },
      { name: "Degeneración combinada subaguda", role: "asociada", why: "Daño de cordones posteriores y laterales." },
      { name: "Déficit de folato y mielodisplasia", role: "diferencial", why: "Otras anemias macrocíticas." },
    ],
    reasoning: [
      "Causa: anticuerpos contra las células parietales y el factor intrínseco (anemia perniciosa), sumados a la metformina y el omeprazol, que reducen la absorción.",
      "Mecanismo: la B12 es necesaria para la síntesis de ADN y para la mielina; sin ella las células de división rápida maduran mal (megaloblastos) y se daña la mielina de la médula y los nervios.",
      "Consecuencia: anemia macrocítica con citopenias y hemólisis intramedular, glositis, y compromiso neurológico (cordones posteriores, neuropatía, deterioro cognitivo), que puede ser irreversible si se demora.",
    ],
    epidemiology:
      "El déficit de B12 es frecuente en adultos mayores (hasta un 10–15 %), por gastritis atrófica, fármacos (metformina, IBP) y cirugías. La anemia perniciosa es más frecuente en mujeres mayores de 60 años y se asocia a otras enfermedades autoinmunes.",
    management: [
      "Ante macrocitosis: B12, folato, reticulocitos, frotis, función tiroidea y hepática, alcohol.",
      "Déficit de B12: reposición parenteral (u oral en dosis altas si no es perniciosa).",
      "Buscar la causa (anticuerpos, fármacos, cirugías); endoscopia en anemia perniciosa.",
      "Nunca dar folato solo sin descartar déficit de B12.",
    ],
    sources: ["Sociedad Argentina de Hematología — Guías de diagnóstico y tratamiento: anemias megaloblásticas."],
    pearls: ["Macrocitosis + hipersegmentación = megaloblástica.", "B12 da síntomas neurológicos; el folato no.", "Metformina por años: medir B12."],
    pitfalls: ["Dar ácido fólico solo.", "Atribuir los síntomas a la neuropatía diabética."],
    tribunal: [
      qa("¿Cuáles son las causas de anemia macrocítica?", "Megaloblásticas (déficit de B12 o folato, fármacos como metotrexato o hidroxiurea) y no megaloblásticas (alcohol, hepatopatía, hipotiroidismo, reticulocitosis por hemólisis o sangrado, mielodisplasia)."),
      qa("¿Qué es la degeneración combinada subaguda?", "La desmielinización de los cordones posteriores (propiocepción y vibración, ataxia, Romberg positivo) y laterales (debilidad, espasticidad, Babinski) por déficit de B12."),
      qa("¿Cuáles son las causas de déficit de B12?", "Anemia perniciosa, gastrectomía, resección o enfermedad ileal (Crohn), metformina, IBP, dietas veganas estrictas, sobrecrecimiento bacteriano e infestación por Diphyllobothrium."),
    ],
  },
};
