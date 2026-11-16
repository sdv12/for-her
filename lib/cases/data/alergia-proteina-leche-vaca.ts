import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const alergiaProteinaLecheVaca: ClinicalCase = {
  id: "alergia-proteina-leche-vaca",
  level: 2,
  area: "Pediatría",
  setting: "Consultorio",
  patient: { age: 2, ageUnit: "meses", sex: "F", context: "Lactancia materna exclusiva. Buen aumento de peso. La mamá toma mucha leche y yogur." },
  frequency: "frecuente",
  intro: "La mamá: “Hace una semana tiene caca con hilitos de sangre y moco. Por lo demás está bárbara.”",
  vitals: { FC: "138 lpm", "T°": "36,7 °C", Peso: "5,2 kg (percentil 50)" },
  anamnesis: [
    act("sangre", "¿Cómo es la sangre?", "clave", "“Hilitos rojos mezclados con moco.”", "Proctocolitis: sangre roja y moco en un bebé sano."),
    act("estado", "¿Cómo come, duerme, sube de peso?", "clave", "“Come bien, duerme y sube bien.”", "Buen estado general: proctocolitis benigna."),
    act("dieta-madre", "¿Qué come usted?", "clave", "“Mucha leche, queso y yogur.”", "La proteína de leche pasa a la leche materna."),
    act("vomitos", "¿Vómitos o diarrea?", "util", "“No.”", "Descarta enterocolitis o enteropatía."),
    act("atopia", "¿Alergias en la familia?", "util", "“El papá tiene asma.”", "Atopia familiar."),
    act("vitamina-k", "¿Recibió vitamina K al nacer?", "clave", "“Sí, en la nursery.”", "Descarta enfermedad hemorrágica tardía."),
  ],
  exam: [
    act("general", "Estado general", "clave", "Activa, rosada, bien hidratada.", "Bebé sano."),
    act("abdomen", "Abdomen", "util", "Blando, sin distensión.", "Descarta enterocolitis necrotizante o invaginación."),
    act("perianal", "Región perianal", "clave", "Sin fisuras.", "La fisura anal es el principal diferencial."),
    act("piel", "Piel", "util", "Leve eccema en mejillas.", "Atopia."),
  ],
  studies: [
    study("Otros", "eliminacion", "Dieta de eliminación de lácteos de la madre por 2–4 semanas", "clave", "La sangre desapareció en 10 días.", "Es la prueba diagnóstica."),
    study("Laboratorio", "ige", "IgE específica o prick test", "innecesario", "No se pidió.", "La proctocolitis no está mediada por IgE."),
    study("Laboratorio", "hemograma", "Hemograma", "util", "Normal.", "Descarta anemia."),
    study("Otros", "colonoscopia", "Rectosigmoidoscopía", "riesgoso", "No se hizo.", "Invasiva e innecesaria."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("aplv-proctocolitis", "Proctocolitis alérgica inducida por proteína de leche de vaca (no IgE)", true, "Lactante sano con sangre y moco en heces, madre con alto consumo de lácteos y resolución con la dieta de eliminación."),
      dx("fisura", "Fisura anal", false, "No hay fisura."),
      dx("invaginacion", "Invaginación", false, "Buen estado, sin dolor ni masa."),
      dx("enterocolitis", "Enterocolitis necrotizante", false, "Término, sano, sin distensión."),
      dx("infecciosa", "Diarrea infecciosa", false, "Sin fiebre ni diarrea."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("seguir-lactancia", "Seguir con la lactancia materna", "clave", "No hay que suspenderla."),
      mg("dieta-madre", "Dieta materna sin lácteos (y sin soja) con calcio y vitamina D para la madre", "clave", "Trata la causa."),
      mg("reintroducir", "Reintroducir la leche a los 9–12 meses con supervisión", "clave", "La mayoría tolera al año."),
      mg("nutricionista", "Apoyo de nutrición para la madre", "util", "Dieta segura."),
      mg("formula-soja", "Pasar a fórmula de soja", "riesgoso", "Suspende la lactancia y hay reacción cruzada frecuente."),
      mg("suspender-lactancia", "Suspender la lactancia y dar fórmula hidrolizada", "innecesario", "No hace falta si la madre hace la dieta."),
    ],
  },
  debrief: {
    diagnosis: "Proctocolitis alérgica por proteína de leche de vaca no mediada por IgE, en una lactante de 2 meses con lactancia exclusiva.",
    pathologies: [
      { name: "Alergia a la proteína de leche de vaca (proctocolitis)", role: "principal", why: "Inflamación del recto por proteína que pasa a la leche materna." },
      { name: "Dermatitis atópica leve", role: "asociada", why: "Terreno atópico." },
      { name: "Fisura anal", role: "diferencial", why: "Causa más común de sangre en heces del lactante." },
    ],
    reasoning: [
      "Causa: sensibilización a proteínas de la leche de vaca que llegan por la leche materna.",
      "Mecanismo: reacción celular no IgE en la mucosa rectal con eosinófilos.",
      "Consecuencia: sangre y moco en heces en un bebé sano; resuelve con la dieta.",
    ],
    epidemiology:
      "La alergia a la proteína de leche de vaca afecta al 2–3 % de los lactantes y es la alergia alimentaria más frecuente en el primer año. La proctocolitis aparece entre las 2 y 8 semanas, incluso con lactancia exclusiva, y la mayoría se resuelve antes del año.",
    management: [
      "Descartar fisura y causas graves.",
      "Dieta de eliminación materna.",
      "Mantener la lactancia.",
      "Reintroducción programada.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Guía de alergia a la proteína de la leche de vaca.", "ESPGHAN — Diagnosis and management of cow's milk protein allergy."],
    pearls: ["Bebé sano con hilitos de sangre: pensá en APLV.", "La prueba es la dieta.", "No suspender la lactancia."],
    pitfalls: ["Pasar a fórmula de soja.", "Pedir IgE."],
    tribunal: [
      qa("¿Qué formas clínicas tiene la alergia a la proteína de leche de vaca?", "Mediadas por IgE (urticaria, anafilaxia), no mediadas (proctocolitis, enteropatía, enterocolitis por proteínas) y mixtas (esofagitis eosinofílica, dermatitis)."),
      qa("¿Qué fórmula se usa si el bebé no tiene leche materna?", "Una fórmula extensamente hidrolizada; si no responde o es grave, una fórmula de aminoácidos."),
      qa("¿Cómo se confirma el diagnóstico?", "Con la mejoría al eliminar la proteína y, en general, la reaparición al reintroducirla."),
    ],
  },
};
