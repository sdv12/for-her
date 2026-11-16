import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const noduloPulmonarSolitario: ClinicalCase = {
  id: "nodulo-pulmonar-solitario",
  level: 3,
  area: "Respiratorio",
  setting: "Consultorio",
  patient: { age: 64, ageUnit: "años", sex: "M", context: "Fumó 35 paquetes/año hasta hace 3 años. Le hicieron una tomografía de abdomen por un cólico renal." },
  frequency: "frecuente",
  intro: "“En la tomografía del riñón dice que tengo una mancha en el pulmón. ¿Es cáncer?”",
  vitals: { TA: "132/80 mmHg", FC: "70 lpm", FR: "15 rpm", "SatO₂": "96 %" },
  anamnesis: [
    act("tabaco", "¿Cuánto fumó y cuándo dejó?", "clave", "“Un atado por día 35 años. Dejé hace 3.”", "Principal factor de riesgo de malignidad."),
    act("sintomas", "¿Tos, sangre al toser, pérdida de peso?", "clave", "“No, nada.”", "Asintomático: hallazgo incidental."),
    act("previas", "¿Tiene placas o tomografías viejas?", "clave", "“Nunca me hice.”", "Comparar con imágenes previas puede evitar estudios: estabilidad de 2 años en sólidos sugiere benignidad."),
    act("exposicion", "¿Trabajó con asbesto o vivió en zonas de hongos?", "util", "“Fui albañil, a veces con chapas de fibrocemento.”", "Asbesto: suma riesgo."),
    act("tbc", "¿Tuvo tuberculosis o contacto?", "util", "“No.”", "Los granulomas son la causa benigna más común."),
    act("familia", "¿Algún familiar con cáncer de pulmón?", "util", "“Mi hermano.”", "Suma riesgo."),
  ],
  exam: [
    act("general", "Examen general y adenopatías", "clave", "Sin adenopatías supraclaviculares, sin hipocratismo.", "Busca signos de enfermedad avanzada."),
    act("pulmon", "Auscultación", "util", "Normal.", "Esperable en un nódulo."),
    act("peso", "Peso", "util", "Estable.", "Sin síndrome de impregnación."),
  ],
  studies: [
    study("Imágenes", "tac-torax", "TC de tórax con cortes finos", "clave", "Nódulo sólido de 14 mm en lóbulo superior derecho, de bordes espiculados, sin calcificaciones; sin adenopatías.", "Caracteriza tamaño, densidad, bordes y ubicación."),
    study("Imágenes", "pet", "PET-TC", "clave", "Captación SUV 6,2 en el nódulo, sin captación ganglionar ni a distancia.", "En sólidos mayores de 8 mm con probabilidad intermedia o alta, orienta y estadifica."),
    study("Otros", "biopsia", "Biopsia (transtorácica o broncoscópica) o resección diagnóstica", "clave", "Adenocarcinoma de pulmón.", "Confirmación histológica."),
    study("Laboratorio", "marcadores", "Marcadores tumorales séricos para decidir", "innecesario", "No se pidieron.", "No sirven para diagnosticar un nódulo."),
    study("Imágenes", "rx-control", "Solo radiografía de control en un año", "riesgoso", "No se indicó.", "Nódulo de alta sospecha: esperar demora un cáncer curable."),
  ],
  diagnosis: {
    prompt: "Con la biopsia, ¿cuál es tu diagnóstico?",
    options: [
      dx("adenocarcinoma", "Nódulo pulmonar solitario maligno: adenocarcinoma en estadio temprano", true, "Exfumador mayor, nódulo de 14 mm espiculado en lóbulo superior, PET positivo sin ganglios y biopsia confirmatoria."),
      dx("granuloma", "Granuloma", false, "Suelen estar calcificados, ser pequeños y de bordes lisos."),
      dx("hamartoma", "Hamartoma", false, "Tiene grasa y calcificaciones en palomitas de maíz."),
      dx("metastasis", "Metástasis de otro primario", false, "Las metástasis suelen ser múltiples y periféricas; la histología confirmó un primario pulmonar."),
      dx("tbc", "Tuberculoma", false, "Sin antecedentes ni histología compatible."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ateneo", "Presentar en ateneo multidisciplinario", "clave", "Neumonología, cirugía de tórax y oncología deciden juntos."),
      mg("funcional", "Espirometría y DLCO antes de la cirugía", "clave", "Define si tolera la resección."),
      mg("lobectomia", "Lobectomía con vaciamiento ganglionar", "clave", "Tratamiento curativo del estadio temprano."),
      mg("tabaco", "Sostener la cesación tabáquica", "util", "Mejora resultados."),
      mg("sbrt", "Radioterapia estereotáctica si no es operable", "util", "Alternativa curativa."),
      mg("quimio-sola", "Quimioterapia exclusiva", "riesgoso", "Un estadio temprano operable se cura con cirugía."),
      mg("antibioticos", "Antibióticos y control por si es infeccioso", "innecesario", "No hay clínica infecciosa y la imagen es de alta sospecha."),
    ],
  },
  debrief: {
    diagnosis: "Nódulo pulmonar solitario de 14 mm espiculado en lóbulo superior derecho: adenocarcinoma de pulmón en estadio temprano, en un exfumador de 64 años.",
    pathologies: [
      { name: "Adenocarcinoma de pulmón estadio I", role: "principal", why: "Nódulo sólido maligno sin ganglios." },
      { name: "Tabaquismo y exposición a asbesto", role: "asociada", why: "Factores de riesgo." },
      { name: "Granuloma, hamartoma", role: "diferencial", why: "Causas benignas más frecuentes de nódulo." },
    ],
    reasoning: [
      "Causa: carcinogénesis por tabaco y asbesto.",
      "Mecanismo: crecimiento de un adenocarcinoma periférico, el tipo más común.",
      "Consecuencia: detectado como nódulo incidental, en una etapa curable.",
    ],
    epidemiology:
      "Se encuentra en hasta un tercio de las tomografías de tórax y la mayoría son benignos. La probabilidad de malignidad sube con la edad, el tabaco, el tamaño, los bordes espiculados y la ubicación en lóbulos superiores. En Argentina el cáncer de pulmón es la primera causa de muerte por cáncer.",
    management: [
      "Calcular la probabilidad de malignidad.",
      "Bajo riesgo y menor de 8 mm: control tomográfico.",
      "Mayor de 8 mm y sospechoso: PET y biopsia.",
      "Estadio temprano: cirugía o radioterapia estereotáctica.",
    ],
    sources: ["Asociación Argentina de Medicina Respiratoria — Consenso de nódulo pulmonar.", "Fleischner Society — Guidelines for incidental pulmonary nodules."],
    pearls: ["Buscá imágenes viejas.", "Espiculado + lóbulo superior + fumador = alta sospecha.", "Menos de 6 mm en bajo riesgo: no hace falta control."],
    pitfalls: ["Controlar con radiografía.", "Pedir marcadores tumorales."],
    tribunal: [
      qa("¿Qué es un nódulo pulmonar solitario?", "Una opacidad redondeada de hasta 3 cm rodeada de parénquima, sin atelectasia ni adenopatías asociadas."),
      qa("¿Qué características sugieren malignidad?", "Tamaño mayor, bordes espiculados, lóbulo superior, crecimiento, componente sólido en un subsólido, y paciente mayor y fumador."),
      qa("¿Qué sugiere benignidad en un nódulo sólido?", "Calcificación central, laminar o en palomitas de maíz, grasa en su interior y estabilidad mayor de 2 años."),
    ],
  },
};
