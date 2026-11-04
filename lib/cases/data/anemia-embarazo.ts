import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const anemiaEmbarazo: ClinicalCase = {
  id: "anemia-ferropenica-embarazo",
  level: 1,
  area: "Ginecología y obstetricia",
  setting: "CAPS",
  patient: { age: 29, ageUnit: "años", sex: "F", context: "Cuarto embarazo, 26 semanas. El último hijo tiene 14 meses. No toma suplementos." },
  frequency: "muy-frecuente",
  intro: "“Estoy muy cansada, me agito al subir la escalera y tengo ganas de comer hielo. Pensé que era normal del embarazo.”",
  vitals: { TA: "104/64 mmHg", FC: "96 lpm", "T°": "36,4 °C", Peso: "62 kg" },
  anamnesis: [
    act("intervalo", "¿Cuánto tiempo pasó desde el último parto? ¿Estás amamantando?", "clave", "“Un año y medio; dejé de amamantar hace poco.”", "Intervalo intergenésico corto y lactancia: depósitos de hierro agotados."),
    act("suplementos", "¿Tomás hierro y ácido fólico?", "clave", "“No, me daban náuseas.”", "Sin suplementación."),
    act("pica", "¿Tenés ganas de comer hielo o tierra?", "util", "“Hielo, mucho.”", "Pica: típica de ferropenia."),
    act("dieta", "¿Qué comés? ¿Carne?", "util", "“Poca carne, mucho mate.”", "El mate (taninos) reduce la absorción de hierro."),
    act("sangrados", "¿Tuviste sangrado o hemorroides?", "util", "“No.”", "Descarta pérdidas."),
    act("hijos", "¿Cómo se llaman tus hijos?", "neutro", "“Mateo, Uma y Valentín.”", "No orienta."),
  ],
  exam: [
    act("palidez", "Palidez cutáneo-mucosa", "clave", "Palidez de conjuntivas y palmas.", "Anemia."),
    act("cardio", "Auscultación", "util", "Taquicardia, soplo sistólico suave.", "Soplo funcional por anemia y embarazo."),
    act("obstetrico", "Altura uterina y latidos fetales", "clave", "Acordes a 26 semanas, 144 lpm.", "Crecimiento fetal adecuado."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma", "clave", "Hb 8,9 g/dl, VCM 70, RDW alto.", "Anemia microcítica moderada."),
    study("Laboratorio", "ferritina", "Ferritina", "clave", "6 ng/ml.", "Confirma ferropenia."),
    study("Laboratorio", "ptog", "PTOG de las 24–28 semanas", "util", "Normal.", "Control habitual del embarazo."),
    study("Otros", "medula", "Punción de médula ósea", "innecesario", "No se realizó.", "No hay indicación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ferropenica", "Anemia ferropénica moderada del embarazo", true, "Hb de 8,9 en el segundo trimestre con microcitosis, RDW alto y ferritina baja, en multípara con intervalo corto y sin suplementos."),
      dx("fisiologica", "Anemia fisiológica por hemodilución", false, "La hemodilución no baja la Hb a 8,9 ni da microcitosis con ferritina baja."),
      dx("talasemia", "Rasgo talasémico", false, "Ferritina baja y RDW alto."),
      dx("megaloblastica", "Anemia megaloblástica", false, "El VCM está bajo."),
      dx("hemolitica", "Anemia hemolítica", false, "Sin ictericia ni reticulocitosis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hierro", "Hierro oral 60–120 mg de hierro elemental por día (o día por medio si da náuseas), con ácido fólico", "clave", "Tratamiento de la anemia moderada."),
      mg("alimentacion", "Alimentos ricos en hierro y separar el mate y el té de las comidas", "clave", "Mejora la absorción."),
      mg("control", "Control de hemoglobina en 2–4 semanas", "clave", "Debe subir alrededor de 1 g/dl."),
      mg("ev", "Hierro endovenoso si no tolera o no responde, o en el tercer trimestre avanzado", "util", "Alternativa."),
      mg("anticoncepcion", "Consejería en anticoncepción posparto y espaciamiento de los embarazos", "util", "Previene la recurrencia."),
      mg("transfusion", "Transfusión de rutina", "riesgoso", "No indicada en una anemia moderada estable."),
    ],
  },
  debrief: {
    diagnosis: "Anemia ferropénica moderada (Hb 8,9) en embarazo de 26 semanas, en multípara con intervalo intergenésico corto y sin suplementación.",
    pathologies: [
      { name: "Anemia ferropénica del embarazo", role: "principal", why: "Déficit de hierro con anemia." },
      { name: "Intervalo intergenésico corto", role: "asociada", why: "Depósitos agotados." },
      { name: "Hemodilución, talasemia, megaloblástica", role: "diferencial", why: "Otras causas de Hb baja en el embarazo." },
    ],
    reasoning: [
      "Causa: necesidades de hierro aumentadas por el feto y la expansión de la volemia, con depósitos previos agotados.",
      "Mecanismo: sin hierro suficiente, la médula produce glóbulos rojos pequeños y pobres en hemoglobina.",
      "Consecuencia: cansancio, mayor riesgo de prematurez, bajo peso al nacer, mala tolerancia a la hemorragia posparto y anemia en el bebé.",
    ],
    epidemiology:
      "La anemia afecta a alrededor de un tercio de las embarazadas en Argentina, sobre todo en el tercer trimestre, en multíparas, adolescentes y mujeres de bajos recursos. La suplementación universal con hierro y ácido fólico es una política nacional.",
    management: [
      "Hemograma en el primer control y en el tercer trimestre.",
      "Suplementación con hierro y ácido fólico a todas las embarazadas.",
      "Tratamiento según gravedad y control de la respuesta.",
      "Espaciar los embarazos.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía para la atención del embarazo (suplementación con hierro y ácido fólico).", "OMS — Recomendaciones de suplementación en el embarazo."],
    pearls: ["En el embarazo, anemia es Hb menor de 11 (10,5 en el segundo trimestre).", "Hierro y fólico a todas.", "Mate lejos de las comidas."],
    pitfalls: ["Atribuirlo a hemodilución.", "No suplementar por náuseas sin buscar alternativas."],
    tribunal: [
      qa("¿Por qué baja la hemoglobina en el embarazo?", "Porque el volumen plasmático aumenta más (alrededor de 50 %) que la masa de glóbulos rojos (alrededor de 30 %), lo que produce una hemodilución fisiológica; además aumentan las necesidades de hierro."),
      qa("¿Qué es el intervalo intergenésico y por qué importa?", "El tiempo entre un parto y el siguiente embarazo; menos de 18 meses aumenta el riesgo de anemia, prematurez, bajo peso y mortalidad materna y perinatal."),
      qa("¿Qué otros micronutrientes importan en el embarazo?", "Ácido fólico (defectos del tubo neural), yodo (desarrollo neurológico), calcio (prevención de preeclampsia en poblaciones con baja ingesta) y vitamina D."),
    ],
  },
};
