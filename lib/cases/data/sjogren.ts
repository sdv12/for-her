import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sjogren: ClinicalCase = {
  id: "sindrome-sjogren",
  level: 2,
  area: "Reumatología",
  setting: "Consultorio",
  patient: { age: 49, ageUnit: "años", sex: "F", context: "Contadora. Tiene hipotiroidismo por Hashimoto." },
  frequency: "frecuente",
  intro: "“Siento arena en los ojos, tengo la boca tan seca que necesito agua para tragar el pan, y se me hincharon las parótidas.”",
  vitals: { TA: "122/76 mmHg", FC: "74 lpm", "T°": "36,6 °C" },
  anamnesis: [
    act("ojos", "¿Cuánto hace que tiene los ojos secos?", "clave", "“Más de un año, uso lágrimas todos los días.”", "Xeroftalmia."),
    act("boca", "¿Necesita líquidos para tragar alimentos secos?", "clave", "“Sí, siempre.”", "Xerostomía."),
    act("parotidas", "¿Se le hinchan las glándulas?", "clave", "“Las de la cara, de los dos lados.”", "Parotidomegalia."),
    act("farmacos", "¿Toma antidepresivos o antihistamínicos?", "util", "“No.”", "Sequedad por fármacos."),
    act("dientes", "¿Caries nuevas?", "util", "“Muchas en el último año.”", "Por falta de saliva."),
    act("hobby", "¿Qué hace para descansar?", "neutro", "“Leo novelas.”", "No orienta."),
  ],
  exam: [
    act("schirmer", "Test de Schirmer", "clave", "3 mm en 5 minutos en ambos ojos.", "Menor de 5: positivo."),
    act("glandulas", "Parótidas y boca", "clave", "Parótidas aumentadas, mucosa seca, caries cervicales.", "Compromiso glandular."),
    act("piel", "Piel y articulaciones", "util", "Púrpura palpable leve en piernas.", "Manifestación extraglandular."),
  ],
  studies: [
    study("Laboratorio", "autoanticuerpos", "FAN, anti-Ro/SSA, anti-La/SSB, factor reumatoideo", "clave", "FAN 1/640 moteado; anti-Ro y anti-La positivos.", "Autoinmunidad."),
    study("Otros", "biopsia-glandula", "Biopsia de glándula salival menor", "util", "Sialoadenitis linfocítica focal.", "Confirma."),
    study("Laboratorio", "lab", "Hemograma, proteinograma, complemento, crioglobulinas", "clave", "Hipergammaglobulinemia; C4 bajo; crioglobulinas positivas.", "Riesgo de linfoma."),
    study("Imágenes", "tc", "TC de cerebro", "innecesario", "No se realizó.", "No hay síntomas neurológicos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("sjogren", "Síndrome de Sjögren primario con vasculitis crioglobulinémica cutánea", true, "Sequedad ocular y oral, Schirmer positivo, anti-Ro y anti-La, biopsia típica y púrpura con C4 bajo."),
      dx("lupus", "Lupus eritematoso sistémico", false, "Sin criterios de lupus y con síndrome seco dominante."),
      dx("hepatitis-c", "Sequedad por hepatitis C", false, "Anti-Ro positivo y biopsia típica."),
      dx("parotiditis", "Parotiditis viral", false, "Crónica y bilateral."),
      dx("igg4", "Enfermedad relacionada con IgG4", false, "Anti-Ro y anti-La positivos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("lagrimas", "Lágrimas artificiales y saliva artificial", "clave", "Síntomas."),
      mg("pilocarpina", "Pilocarpina si hay función glandular residual", "clave", "Estimula la secreción."),
      mg("odontologia", "Control odontológico y flúor", "clave", "Caries."),
      mg("embarazo", "Consejo prenatal por anti-Ro (bloqueo cardíaco congénito)", "util", "Riesgo fetal."),
      mg("anticolinergicos", "Antihistamínicos o antidepresivos tricíclicos", "riesgoso", "Empeoran la sequedad."),
      mg("sin-seguimiento", "Alta sin seguimiento", "riesgoso", "Riesgo de linfoma con crioglobulinas y C4 bajo."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de Sjögren primario con vasculitis crioglobulinémica cutánea, en mujer de 49 años con Hashimoto.",
    pathologies: [
      { name: "Síndrome de Sjögren", role: "principal", why: "Exocrinopatía autoinmune." },
      { name: "Vasculitis crioglobulinémica y riesgo de linfoma", role: "asociada", why: "Manifestación extraglandular." },
      { name: "Lupus, hepatitis C", role: "diferencial", why: "Otras causas de síndrome seco." },
    ],
    reasoning: [
      "Causa: autoinmunidad contra glándulas exocrinas.",
      "Mecanismo: infiltrado linfocitario que destruye glándulas lagrimales y salivales.",
      "Consecuencia: sequedad, caries y activación B que favorece el linfoma.",
    ],
    epidemiology:
      "Afecta sobre todo a mujeres de 40 a 60 años. Se asocia a otras autoinmunes como Hashimoto. Tiene un riesgo de linfoma no Hodgkin varias veces mayor que la población general, más con C4 bajo, crioglobulinas y parótidas grandes.",
    management: [
      "Síntomas.",
      "Pilocarpina.",
      "Odontología.",
      "Vigilar linfoma.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Síndrome de Sjögren.", "EULAR — Recommendations for the Management of Sjögren's Syndrome."],
    pearls: ["Arena en los ojos y pan seco.", "Anti-Ro y anti-La.", "Mirá el riesgo de linfoma."],
    pitfalls: ["Anticolinérgicos.", "No seguirla."],
    tribunal: [
      qa("¿Qué es el bloqueo cardíaco congénito?", "Daño del sistema de conducción fetal por anti-Ro maternos que atraviesan la placenta."),
      qa("¿Qué marcadores predicen linfoma?", "Parótidas grandes persistentes, púrpura, C4 bajo, crioglobulinas y gammapatía monoclonal."),
      qa("¿Qué es el Sjögren secundario?", "Cuando acompaña a otra enfermedad autoinmune como artritis reumatoidea o lupus."),
    ],
  },
};
