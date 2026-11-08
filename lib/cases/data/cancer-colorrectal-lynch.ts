import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cancerColorrectalLynch: ClinicalCase = {
  id: "cancer-colorrectal-sindrome-lynch",
  level: 3,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 41, ageUnit: "años", sex: "F", context: "Madre con cáncer de colon a los 46; tía con cáncer de endometrio a los 50." },
  frequency: "poco-frecuente",
  intro: "“Hace tres meses tengo anemia, me canso y hay sangre mezclada en la materia fecal. Me dijeron que eran hemorroides.”",
  vitals: { TA: "112/70 mmHg", FC: "94 lpm", "T°": "36,6 °C", "SatO₂": "98 %", Peso: "60 kg" },
  anamnesis: [
    act("familia", "¿Quiénes tuvieron cáncer y a qué edad?", "clave", "“Madre y tía, jóvenes.”", "Criterios de Ámsterdam."),
    act("sangre", "¿Cómo es el sangrado? ¿Cambió el ritmo?", "clave", "“Mezclado; alterna diarrea y constipación.”", "Colon."),
    act("gineco", "¿Sangrado uterino, último PAP?", "clave", "“PAP normal, sangrado normal.”", "Endometrio."),
    act("peso", "¿Bajaste de peso?", "util", "“Cuatro kilos.”", "Sistémico."),
    act("dieta", "¿Carne roja, alcohol, tabaco?", "util", "“Carne.”", "Otros."),
    act("pasatiempo", "¿Qué hacés los fines de semana?", "neutro", "“Pinto cuadros.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Masa en fosa ilíaca derecha.", "Tumor."),
    act("rectal", "Tacto rectal", "clave", "Sin masa, con sangre oscura.", "Más proximal."),
    act("palidez", "Palidez y piel", "util", "Palidez.", "Anemia."),
  ],
  studies: [
    study("Otros", "colono", "Colonoscopía completa con biopsia", "clave", "Tumor de ciego; adenocarcinoma.", "Diagnóstico."),
    study("Otros", "inmunohisto", "Inmunohistoquímica de proteínas MMR e inestabilidad microsatelital", "clave", "Ausencia de MSH2/MSH6.", "Sospecha de Lynch."),
    study("Laboratorio", "genetica", "Test genético y asesoramiento", "clave", "Mutación de MSH2.", "Confirma."),
    study("Imágenes", "tc", "TC de tórax, abdomen, pelvis y CEA", "clave", "Sin metástasis.", "Estadificación."),
    study("Otros", "sin-estudiar", "Tratar como hemorroides sin estudiar", "riesgoso", "No se realizó.", "Ya es lo que demoró."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("lynch", "Cáncer colorrectal de colon derecho en contexto de síndrome de Lynch", true, "Edad joven, antecedentes y déficit de MMR con mutación."),
      dx("hemorroides", "Hemorroides", false, "Sangre mezclada, masa y anemia."),
      dx("pap", "Poliposis adenomatosa familiar", false, "Sin cientos de pólipos."),
      dx("crohn", "Crohn", false, "La biopsia es un adenocarcinoma."),
      dx("esporadico", "Cáncer esporádico", false, "Familia y déficit MMR."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Colectomía, considerando extensión por Lynch", "clave", "Curación y riesgo."),
      mg("comite", "Comité oncológico con estadificación", "clave", "Plan."),
      mg("familia", "Estudio genético en familiares", "clave", "Prevención."),
      mg("gineco", "Vigilancia y cirugía profiláctica ginecológica al terminar su paridad", "clave", "Riesgo de endometrio y ovario."),
      mg("sin-colono", "Sin vigilancia familiar", "riesgoso", "Se pierde prevención."),
      mg("ibp", "IBP y crema para hemorroides", "riesgoso", "Demora."),
    ],
  },
  debrief: {
    diagnosis: "Adenocarcinoma de ciego en el contexto de síndrome de Lynch por mutación de MSH2, en mujer de 41 años.",
    pathologies: [
      { name: "Cáncer colorrectal", role: "principal", why: "Tumor maligno." },
      { name: "Síndrome de Lynch", role: "asociada", why: "Riesgo familiar." },
      { name: "Hemorroides, PAF, Crohn", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: mutación de genes de reparación.",
      "Mecanismo: errores no reparados, inestabilidad de microsatélites.",
      "Consecuencia: cánceres tempranos en colon, endometrio y otros.",
    ],
    epidemiology:
      "Es el síndrome hereditario de cáncer colorrectal más común y explica cerca del 3 % de los casos. Se recomienda inmunohistoquímica de rutina en cáncer colorrectal. En Argentina, el cáncer colorrectal es uno de los más frecuentes, y una rectorragia con anemia nunca debe atribuirse a hemorroides sin estudiar.",
    management: [
      "Colonoscopía.",
      "Inmunohistoquímica.",
      "Genética.",
      "Vigilancia.",
    ],
    sources: ["Instituto Nacional del Cáncer — Programa de cáncer colorrectal.", "NCCN — Genetic/Familial High-Risk Assessment: Colorectal."],
    pearls: ["Regla 3-2-1.", "Colon derecho: anemia.", "Colonoscopía cada 1 a 2 años en Lynch."],
    pitfalls: ["Decir que son hemorroides.", "No revisar la familia."],
    tribunal: [
      qa("¿Qué dicen los criterios de Ámsterdam?", "Tres familiares afectados, dos generaciones consecutivas, uno antes de los 50, y se excluye PAF."),
      qa("¿Cómo se presenta el cáncer de colon derecho e izquierdo?", "Derecho: anemia y masa. Izquierdo: obstrucción y cambios del ritmo."),
      qa("¿Qué tumores cursan con inestabilidad y buena respuesta a inmunoterapia?", "Los tumores con déficit de reparación, sobre todo en enfermedad avanzada."),
    ],
  },
};
