import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const silicosis: ClinicalCase = {
  id: "silicosis",
  level: 3,
  area: "Respiratorio",
  setting: "Consultorio",
  patient: { age: 54, ageUnit: "años", sex: "M", context: "Trabajó 25 años en una cantera de granito en Córdoba sin protección respiratoria. No fuma." },
  frequency: "poco-frecuente",
  intro: "“Hace dos años me falta el aire cada vez más y toso seco. En la cantera muchos compañeros están igual.”",
  vitals: { TA: "128/78 mmHg", FC: "88 lpm", FR: "22 rpm", "T°": "36,6 °C", "SatO₂": "92 %" },
  anamnesis: [
    act("exposicion", "¿Dónde trabajó y con qué protección?", "clave", "“Cantera de granito, 25 años, casi sin barbijo.”", "Sílice cristalina."),
    act("disnea", "¿Cómo progresó la falta de aire?", "clave", "“Cada año peor.”", "Fibrosis progresiva."),
    act("tbc", "¿Tuvo tuberculosis, fiebre o sudor nocturno?", "clave", "“No.”", "La silicosis aumenta el riesgo de TBC."),
    act("companeros", "¿Compañeros enfermos?", "util", "“Varios con lo mismo.”", "Enfermedad profesional."),
    act("tabaco", "¿Fuma?", "util", "“Nunca.”", "Otras causas."),
    act("hobby", "¿Qué hace ahora?", "neutro", "“Cuido la huerta.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Auscultación", "clave", "Rales escasos en vértices.", "Compromiso de lóbulos superiores."),
    act("dedos", "Dedos", "clave", "Sin hipocratismo.", "Base."),
    act("cor", "Signos de cor pulmonale", "util", "Ausentes.", "Gravedad."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Nódulos pequeños múltiples en lóbulos superiores y adenopatías hiliares con calcificación en cáscara de huevo.", "Silicosis."),
    study("Otros", "espirometria", "Espirometría y DLCO", "clave", "Patrón mixto, DLCO baja.", "Daño funcional."),
    study("Laboratorio", "igra", "PPD o IGRA y baciloscopia", "util", "IGRA positivo; baciloscopia negativa.", "Infección tuberculosa latente."),
    study("Otros", "biopsia", "Biopsia pulmonar de entrada", "innecesario", "No se realizó.", "Historia laboral e imágenes alcanzan."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("silicosis", "Silicosis crónica con infección tuberculosa latente", true, "Exposición a sílice por décadas, nódulos en lóbulos superiores, calcificación en cáscara de huevo e IGRA positivo."),
      dx("sarcoidosis", "Sarcoidosis", false, "La exposición explica todo y hay calcificación en cáscara."),
      dx("tbc-activa", "Tuberculosis activa", false, "Baciloscopia negativa y sin síntomas sistémicos."),
      dx("fpi", "Fibrosis pulmonar idiopática", false, "Predominio superior y exposición clara."),
      dx("epoc", "EPOC", false, "No fuma y hay nódulos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("exposicion", "Cortar la exposición y notificar enfermedad profesional a la ART", "clave", "Derecho laboral y prevención."),
      mg("tbc-latente", "Tratamiento de la infección tuberculosa latente", "clave", "Alto riesgo de TBC activa."),
      mg("vacunas", "Vacunas antigripal y antineumocócica, rehabilitación respiratoria", "clave", "Soporte."),
      mg("companeros", "Sugerir control de los compañeros expuestos", "util", "Prevención."),
      mg("corticoides", "Corticoides crónicos", "riesgoso", "Sin beneficio y aumentan el riesgo de TBC."),
      mg("seguir", "Seguir trabajando con barbijo común", "riesgoso", "Progresa."),
    ],
  },
  debrief: {
    diagnosis: "Silicosis crónica con infección tuberculosa latente, en varón de 54 años con exposición laboral en cantera.",
    pathologies: [
      { name: "Silicosis", role: "principal", why: "Neumoconiosis por sílice." },
      { name: "Infección tuberculosa latente", role: "asociada", why: "Riesgo aumentado de TBC." },
      { name: "Sarcoidosis, TBC activa", role: "diferencial", why: "Otras enfermedades nodulares." },
    ],
    reasoning: [
      "Causa: inhalación de sílice cristalina en canteras, minería, arenado o marmolería.",
      "Mecanismo: los macrófagos fagocitan la sílice, mueren y estimulan fibrosis nodular.",
      "Consecuencia: fibrosis progresiva, insuficiencia respiratoria y mayor riesgo de TBC y cáncer.",
    ],
    epidemiology:
      "Es una enfermedad profesional prevenible, todavía presente en canteras y marmolerías. Puede progresar aun después de dejar la exposición. La asociación con tuberculosis es clásica.",
    management: [
      "Historia laboral.",
      "Cortar la exposición.",
      "TBC latente.",
      "Notificar y prevenir.",
    ],
    sources: ["Superintendencia de Riesgos del Trabajo — Enfermedades profesionales.", "OIT/OMS — Global Programme for the Elimination of Silicosis."],
    pearls: ["Preguntá en qué trabajó.", "Cáscara de huevo.", "Buscá TBC."],
    pitfalls: ["No notificar.", "Corticoides."],
    tribunal: [
      qa("¿Qué ocupaciones tienen riesgo de silicosis?", "Canteras, minería, arenado, marmolería, cerámica y fundición."),
      qa("¿Qué es la silicosis aguda?", "Forma rápida tras exposición masiva, con proteinosis alveolar."),
      qa("¿Qué cáncer se asocia a la sílice?", "El cáncer de pulmón, sobre todo en fumadores."),
    ],
  },
};
