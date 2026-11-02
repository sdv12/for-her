import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const toxoplasmosisEmbarazo: ClinicalCase = {
  id: "toxoplasmosis-embarazo",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 26, ageUnit: "años", sex: "F", context: "Embarazo de 20 semanas. En el primer trimestre la IgG para toxoplasmosis fue negativa." },
  frequency: "poco-frecuente",
  intro: "“Vengo con los análisis del segundo trimestre. Me dijeron que la toxoplasmosis salió distinta. Estoy asustada.”",
  vitals: { TA: "110/70 mmHg", FC: "82 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("previa", "¿Cómo dio la toxoplasmosis al principio del embarazo?", "clave", "“Negativa, IgG negativa. Me dieron los consejos.”", "Una IgG negativa previa que pasa a positiva (seroconversión) confirma infección durante el embarazo."),
    act("exposicion", "¿Comiste carne poco cocida, verduras sin lavar o tocaste tierra o arena de gatos?", "clave", "“Comí un asado jugoso hace un par de meses y tengo gatos.”", "Fuentes de infección: quistes en carne y ooquistes en heces de gato y tierra."),
    act("sintomas", "¿Tuviste fiebre, cansancio o ganglios inflamados?", "util", "“Hace un mes tuve como una gripe con ganglios en el cuello.”", "La infección suele ser asintomática o parecida a una mononucleosis."),
    act("eg", "¿De cuántas semanas estás?", "clave", "“De 20.”", "El riesgo de transmisión aumenta con la edad gestacional y la gravedad disminuye."),
    act("vih", "¿Te hiciste los otros análisis?", "util", "“Sí, todos negativos.”", "Descarta inmunosupresión."),
    act("trabajo", "¿Trabajás?", "neutro", "“Soy cajera.”", "No orienta."),
  ],
  exam: [
    act("obstetrico", "Altura uterina y latidos fetales", "clave", "Acordes a 20 semanas, latidos 146 lpm.", "Feto vital, crecimiento acorde."),
    act("ganglios", "Ganglios cervicales", "util", "Pequeñas adenopatías cervicales posteriores, indoloras.", "Compatible con infección reciente."),
    act("fondo-ojo", "Fondo de ojo materno", "innecesario", "No se realizó.", "La coriorretinitis materna es rara en la primoinfección del inmunocompetente."),
  ],
  studies: [
    study("Laboratorio", "igg-igm", "IgG e IgM para toxoplasmosis", "clave", "IgG positiva, IgM positiva.", "Con IgG previa negativa, confirma seroconversión."),
    study("Laboratorio", "avidez", "Test de avidez de IgG", "util", "Avidez baja.", "Una avidez baja indica infección de menos de 3–4 meses; la avidez alta en el primer trimestre la descarta en el embarazo."),
    study("Imágenes", "eco", "Ecografía obstétrica detallada", "clave", "Sin ventriculomegalia, calcificaciones ni hepatomegalia.", "Busca signos de infección fetal."),
    study("Microbiología", "pcr", "PCR en líquido amniótico (amniocentesis desde la semana 18 y 4 semanas después de la infección)", "util", "Pendiente.", "Define si el feto está infectado y cambia el tratamiento."),
    study("Laboratorio", "repetir-solo", "Solo repetir la serología al final del embarazo", "riesgoso", "No se realizó.", "Demora un tratamiento que reduce secuelas."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("aguda", "Toxoplasmosis aguda durante el embarazo (seroconversión) a las 20 semanas", true, "IgG negativa en el primer trimestre que pasa a IgG e IgM positivas con avidez baja, con exposición y cuadro compatible."),
      dx("pasada", "Infección pasada, sin riesgo", false, "La IgG previa era negativa: la infección es actual."),
      dx("congenita", "Toxoplasmosis congénita confirmada", false, "Todavía no se confirmó la infección fetal."),
      dx("igm-residual", "IgM residual de una infección vieja", false, "La IgM puede persistir meses, pero la seroconversión documentada lo descarta."),
      dx("cmv", "Citomegalovirus", false, "Las serologías específicas muestran toxoplasmosis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("espiramicina", "Espiramicina de inmediato", "clave", "Disminuye la transmisión al feto mientras se define si está infectado."),
      mg("amnio", "Amniocentesis para PCR y ecografías seriadas", "clave", "Si el feto está infectado, se cambia a pirimetamina, sulfadiazina y ácido folínico."),
      mg("consejeria", "Consejería y apoyo; explicar riesgos reales", "clave", "La mayoría de los recién nacidos tratados no tiene secuelas graves."),
      mg("rn", "Plan de evaluación del recién nacido al nacer (serología, fondo de ojo, ecografía cerebral)", "util", "Todo hijo de madre con infección aguda se estudia y se sigue."),
      mg("interrumpir", "Indicar la interrupción del embarazo como única opción", "riesgoso", "No es la conducta: hay tratamiento y la mayoría de los fetos no se infecta o no tiene secuelas graves."),
      mg("pirimetamina-ya", "Pirimetamina en el primer trimestre sin confirmar infección fetal", "innecesario", "Es teratogénica en el primer trimestre y se reserva para infección fetal confirmada."),
    ],
  },
  debrief: {
    diagnosis: "Toxoplasmosis aguda (seroconversión) en embarazo de 20 semanas, sin signos ecográficos de infección fetal.",
    pathologies: [
      { name: "Toxoplasmosis aguda en el embarazo", role: "principal", why: "Seroconversión documentada." },
      { name: "Toxoplasmosis congénita", role: "diferencial", why: "Riesgo de transmisión fetal a definir." },
      { name: "Infección pasada, IgM residual", role: "diferencial", why: "Se descartan por la seroconversión." },
    ],
    reasoning: [
      "Causa: Toxoplasma gondii, adquirido por carne poco cocida o ingestión de ooquistes (tierra, verduras, heces de gato).",
      "Mecanismo: en la primoinfección materna, el parásito puede atravesar la placenta; la transmisión es más probable al final del embarazo, pero el daño es mayor al principio.",
      "Consecuencia: aborto, o toxoplasmosis congénita con coriorretinitis, hidrocefalia, calcificaciones cerebrales y convulsiones; muchas veces asintomática al nacer con secuelas oculares después.",
    ],
    epidemiology:
      "En Argentina alrededor del 40 % de las embarazadas tiene anticuerpos (inmunes); el resto es susceptible. La incidencia de toxoplasmosis congénita se estima en 1 cada 1000 a 3000 nacimientos. La Ley 26.279 incluye la pesquisa en el embarazo y el recién nacido.",
    management: [
      "Serología en el primer control; si es negativa, prevención y repetir cada trimestre.",
      "Ante seroconversión o IgM positiva: confirmar (avidez) y empezar espiramicina.",
      "Amniocentesis con PCR; si es positiva, pirimetamina, sulfadiazina y ácido folínico desde la semana 16–18.",
      "Evaluación y seguimiento del recién nacido.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de prevención y tratamiento de las infecciones congénitas y perinatales.", "Sociedad Argentina de Infectología — Consenso de toxoplasmosis congénita."],
    pearls: ["IgG negativa: prevenir y repetir cada trimestre.", "Seroconversión: espiramicina ya.", "Más transmisión al final, más daño al principio."],
    pitfalls: ["Interpretar una IgM aislada sin avidez.", "Esperar al parto para actuar."],
    tribunal: [
      qa("¿Cómo se previene la toxoplasmosis en una embarazada susceptible?", "Comer carne bien cocida, lavar frutas y verduras, usar guantes en el jardín y lavarse las manos, evitar limpiar la arena de gatos (o hacerlo con guantes y a diario), y evitar embutidos crudos y leche sin pasteurizar."),
      qa("¿Qué es la tríada de Sabin?", "La forma clásica de la toxoplasmosis congénita grave: coriorretinitis, hidrocefalia y calcificaciones intracraneales."),
      qa("¿Qué indica una avidez alta de IgG?", "Que la infección tiene más de 3–4 meses; si se obtiene en el primer trimestre, la infección fue previa al embarazo y no hay riesgo fetal."),
    ],
  },
};
