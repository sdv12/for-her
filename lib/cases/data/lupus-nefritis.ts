import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const lupusNefritis: ClinicalCase = {
  id: "lupus-nefritis",
  level: 3,
  area: "Reumatología",
  setting: "Guardia",
  patient: { age: 24, ageUnit: "años", sex: "F", context: "Dolores articulares y fotosensibilidad hace un año, sin diagnóstico. Toma anticonceptivos combinados." },
  frequency: "frecuente",
  intro: "“Hace dos semanas se me hincharon la cara y las piernas, orino espumoso y oscuro. Me duelen las articulaciones y me salen manchas con el sol.”",
  vitals: { TA: "158/98 mmHg", FC: "88 lpm", "T°": "37,6 °C", "SatO₂": "97 %", Peso: "62 kg" },
  anamnesis: [
    act("sistemico", "¿Dolor articular, sol, llagas, caída de pelo, Raynaud?", "clave", "“Todo eso, hace un año.”", "Multisistémico."),
    act("orina", "¿Cómo es la orina?", "clave", "“Con espuma, oscura.”", "Proteinuria y hematuria."),
    act("embarazo", "¿Abortos? ¿Embarazo? ¿Anticonceptivos?", "clave", "“Pastillas; un aborto.”", "SAF y método seguro."),
    act("farmacos", "¿Hidralazina, procainamida, AINE?", "util", "“Ibuprofeno.”", "Lupus inducido, daño renal."),
    act("infeccion", "¿Fiebre, anginas?", "util", "“Sin anginas.”", "Glomerulonefritis posinfecciosa."),
    act("trabajo", "¿De qué trabajás?", "neutro", "“En un call center.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel y boca", "clave", "Eritema malar, úlceras orales indoloras.", "Típico."),
    act("edema", "Edemas y presión", "clave", "Edema palpebral y de piernas.", "Compromiso renal."),
    act("articular", "Articulaciones y corazón", "util", "Artritis no erosiva en manos, frote pericárdico.", "Serositis."),
  ],
  studies: [
    study("Laboratorio", "orina", "Sedimento y proteinuria", "clave", "Hematíes dismórficos, cilindros, cociente 2,8 g/g.", "Glomerulonefritis."),
    study("Laboratorio", "autoinmune", "ANA, anti-dsDNA, anti-Sm, complemento y antifosfolípidos", "clave", "ANA 1/640, anti-dsDNA alto, C3 y C4 bajos.", "Actividad."),
    study("Otros", "biopsia", "Biopsia renal", "clave", "Nefritis lúpica clase IV.", "Define el tratamiento."),
    study("Laboratorio", "lab", "Hemograma, función renal, hepatitis, VIH, embarazo", "clave", "Creatinina 1,5, linfopenia, plaquetas 110.000.", "Antes de inmunosuprimir."),
    study("Imágenes", "rmn", "RM de manos", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("lupus", "Lupus eritematoso sistémico con nefritis lúpica proliferativa clase IV", true, "Compromiso multisistémico, autoanticuerpos, complemento bajo y biopsia."),
      dx("posestrep", "Glomerulonefritis posinfecciosa", false, "Sin antecedente, con autoanticuerpos."),
      dx("iga", "Nefropatía por IgA", false, "No explica el cuadro sistémico."),
      dx("nefrotico", "Glomeruloesclerosis focal", false, "Anti-dsDNA positivo, complemento bajo."),
      dx("vasculitis", "Vasculitis ANCA", false, "Anticuerpos y biopsia orientan a lupus."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("induccion", "Inducción con corticoides y micofenolato o ciclofosfamida", "clave", "Preserva el riñón."),
      mg("hidroxicloroquina", "Hidroxicloroquina para todas", "clave", "Reduce brotes."),
      mg("renal", "IECA o ARA II, control de presión y evitar AINE", "clave", "Protege el riñón."),
      mg("anticoncepcion", "Suspender estrógenos; método seguro antes de micofenolato o ciclofosfamida", "clave", "Teratógenos y trombosis."),
      mg("sol", "Protección solar, vacunas y prevención de osteoporosis", "util", "Reduce brotes y complicaciones."),
      mg("aine", "Seguir con ibuprofeno", "riesgoso", "Empeora el riñón."),
    ],
  },
  debrief: {
    diagnosis: "Lupus eritematoso sistémico con nefritis lúpica proliferativa clase IV, en mujer de 24 años.",
    pathologies: [
      { name: "Lupus con nefritis", role: "principal", why: "Autoinmunidad con daño renal." },
      { name: "HTA, plaquetopenia, serositis", role: "asociada", why: "Compromiso sistémico." },
      { name: "Posinfecciosa, IgA, ANCA", role: "diferencial", why: "Otras glomerulopatías." },
    ],
    reasoning: [
      "Causa: susceptibilidad genética, hormonas y sol.",
      "Mecanismo: autoanticuerpos forman inmunocomplejos que activan el complemento.",
      "Consecuencia: inflamación glomerular, HTA y riesgo de insuficiencia renal.",
    ],
    epidemiology:
      "Es nueve veces más frecuente en mujeres en edad fértil, y la nefritis afecta a cerca de la mitad a lo largo de la evolución, con mayor gravedad en mestizas y poblaciones originarias de América. Es una causa importante de enfermedad renal en personas jóvenes.",
    management: [
      "Sedimento y proteinuria en todo lupus.",
      "Biopsia.",
      "Inducción y mantenimiento.",
      "Hidroxicloroquina y planificación de embarazo.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Guías de lupus.", "Grupo Latinoamericano de Estudio de Lupus (GLADEL) — Recomendaciones."],
    pearls: ["Mujer joven con edemas y manos dolorosas: lupus.", "Anti-dsDNA y C3 bajos: actividad.", "Hidroxicloroquina siempre."],
    pitfalls: ["No mirar la orina.", "Usar estrógenos."],
    tribunal: [
      qa("¿Qué anticuerpos son específicos?", "Anti-dsDNA y anti-Sm; ANA es sensible, pero poco específico."),
      qa("¿Qué control exige la hidroxicloroquina?", "Puede dañar la retina: control oftalmológico periódico."),
      qa("¿Qué se usa en lupus y embarazo?", "Hidroxicloroquina, corticoides en dosis bajas y azatioprina; aspirina, y evitar micofenolato."),
    ],
  },
};
