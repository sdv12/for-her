import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hipoglucemiaGlibenclamida: ClinicalCase = {
  id: "hipoglucemia-sulfonilurea-adulto-mayor",
  level: 2,
  area: "Endocrinología",
  setting: "Guardia",
  patient: { age: 83, ageUnit: "años", sex: "M", context: "Diabético, con enfermedad renal crónica estadio 4. Toma glibenclamida. Vive con la hija y come poco." },
  frequency: "muy-frecuente",
  intro: "“Lo encontramos sudado, confundido, diciendo cosas raras. A veces le pasa de madrugada.” (relata la hija)",
  vitals: { TA: "148/82 mmHg", FC: "104 lpm", FR: "18 rpm", "T°": "36,1 °C", "SatO₂": "96 %", Glucemia: "34 mg/dl", Glasgow: "12/15" },
  anamnesis: [
    act("medicacion", "¿Qué remedios toma? ¿Cambió la dosis?", "clave", "“Glibenclamida; subió la dosis.”", "Sulfonilurea de larga acción."),
    act("comida", "¿Comió?", "clave", "“Casi nada desde ayer.”", "Bajo aporte."),
    act("renal", "¿Cómo están los riñones?", "clave", "“Dijeron que funcionan al 20 %.”", "Eliminación reducida."),
    act("infeccion", "¿Fiebre o infección?", "util", "“No.”", "Desencadenante."),
    act("alcohol", "¿Toma alcohol?", "util", "“Nada.”", "Otra causa."),
    act("club", "¿De qué club es?", "neutro", "“De Belgrano.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico tras la glucosa", "clave", "Mejora la conciencia, sin foco.", "Descarta ACV."),
    act("autonomo", "Piel", "clave", "Sudoroso, pálido.", "Respuesta adrenérgica."),
    act("trauma", "Buscar caídas", "util", "Sin traumatismos.", "Mayores."),
  ],
  studies: [
    study("Laboratorio", "glucemia", "Glucemia capilar y controles seriados", "clave", "34, y a las 2 horas vuelve a 58.", "Recurre."),
    study("Laboratorio", "lab", "Creatinina, ionograma, HbA1c, hemograma", "clave", "Filtrado 22; HbA1c 6,2 %.", "Control demasiado estricto."),
    study("Imágenes", "tc", "TC si persiste el déficit tras corregir", "util", "No hizo falta.", "ACV."),
    study("Otros", "insulinemia", "Péptido C y test de ayuno prolongado de rutina", "innecesario", "No se realizó.", "La causa está clara."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hipoglucemia", "Hipoglucemia grave por sulfonilurea en insuficiencia renal crónica", true, "Glucemia de 34, tríada de Whipple, glibenclamida, ERC."),
      dx("acv", "ACV", false, "Mejora al corregir la glucosa."),
      dx("delirium", "Delirium infeccioso", false, "No hay infección; responde a glucosa."),
      dx("insulinoma", "Insulinoma", false, "Hay una causa farmacológica clara."),
      dx("demencia", "Demencia", false, "Cuadro agudo reversible."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("dextrosa", "Dextrosa hipertónica EV y luego infusión", "clave", "Tratamiento inmediato."),
      mg("internar", "Internar 24 a 48 horas con controles", "clave", "Efecto prolongado."),
      mg("suspender", "Suspender glibenclamida y cambiar el esquema", "clave", "Contraindicada en ERC."),
      mg("meta", "Metas menos estrictas (HbA1c de 7,5 a 8 %)", "clave", "Adultos mayores frágiles."),
      mg("alta", "Dar jugo y alta", "riesgoso", "Recurre."),
      mg("glucagon-solo", "Solo glucagón sin dextrosa", "riesgoso", "Insuficiente y puede agravar con sulfonilureas."),
    ],
  },
  debrief: {
    diagnosis: "Hipoglucemia grave por glibenclamida en enfermedad renal crónica estadio 4, en varón de 83 años.",
    pathologies: [
      { name: "Hipoglucemia", role: "principal", why: "Neuroglucopenia." },
      { name: "ERC, sobretratamiento", role: "asociada", why: "Factores." },
      { name: "ACV, delirium, insulinoma", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: sulfonilurea de vida media larga.",
      "Mecanismo: secreción de insulina sin relación con la glucemia, con acumulación renal.",
      "Consecuencia: neuroglucopenia, caídas, arritmias.",
    ],
    epidemiology:
      "Las hipoglucemias por fármacos son una causa muy común de consultas en mayores. La glibenclamida sigue muy usada por su bajo costo, pero debe evitarse en adultos mayores y ERC. En estas personas, una HbA1c demasiado baja es un signo de riesgo.",
    management: [
      "Glucemia a toda alteración de conciencia.",
      "Dextrosa e infusión.",
      "Observación prolongada.",
      "Desprescribir.",
    ],
    sources: ["Sociedad Argentina de Diabetes — Diabetes en adultos mayores.", "American Geriatrics Society — Beers Criteria."],
    pearls: ["Toda confusión: glucemia.", "Sulfonilureas: hipoglucemia prolongada.", "Metas menos estrictas."],
    pitfalls: ["Alta temprana.", "Mantener la glibenclamida."],
    tribunal: [
      qa("¿Qué es la tríada de Whipple?", "Síntomas, glucemia baja y mejoría al corregirla."),
      qa("¿Qué fármaco se puede usar además en sulfonilurea refractaria?", "Octreotide, que inhibe la secreción de insulina."),
      qa("¿Qué antidiabéticos no dan hipoglucemia por sí solos?", "Metformina, inhibidores de DPP-4, análogos de GLP-1 e inhibidores de SGLT2."),
    ],
  },
};
