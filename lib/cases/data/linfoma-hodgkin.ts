import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const linfomaHodgkin: ClinicalCase = {
  id: "linfoma-de-hodgkin",
  level: 3,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 19, ageUnit: "años", sex: "F", context: "Estudiante. Tuvo mononucleosis a los 15." },
  frequency: "poco-frecuente",
  intro: "“Hace dos meses tengo un bulto en el cuello que no se va y está creciendo. Me pica todo el cuerpo, sudo mucho de noche y bajé de peso.”",
  vitals: { TA: "112/70 mmHg", FC: "92 lpm", "T°": "37,8 °C", Peso: "52 kg" },
  anamnesis: [
    act("ganglio", "¿Desde cuándo y cómo cambió el bulto?", "clave", "“Dos meses, cada vez más grande, no duele.”", "Adenopatía persistente, indolora y en crecimiento: requiere estudio."),
    act("sintomas-b", "¿Fiebre, sudores nocturnos o pérdida de peso?", "clave", "“Sudores que mojan la sábana, fiebre a la tarde y bajé 6 kilos.”", "Síntomas B: más del 10 % de peso, fiebre y sudores."),
    act("alcohol", "¿Te duele el bulto cuando tomás alcohol?", "util", "“A veces sí.”", "Dato clásico (raro) del Hodgkin."),
    act("respiratorio", "¿Tos, falta de aire, hinchazón de la cara?", "clave", "“Tos seca.”", "Buscar masa mediastinal."),
    act("infeccion", "¿Tuviste dolor de garganta, contacto con TBC o gatos?", "util", "“No.”", "Diferenciales de adenopatías."),
    act("carrera", "¿Qué estudiás?", "neutro", "“Arquitectura.”", "No orienta."),
  ],
  exam: [
    act("ganglios", "Ganglios", "clave", "Adenopatías supraclaviculares y cervicales izquierdas de 3 cm, duras, elásticas, indoloras, adheridas.", "Características de sospecha."),
    act("bazo", "Hígado y bazo", "util", "Sin visceromegalias.", "Estadificación."),
    act("piel", "Piel", "util", "Lesiones de rascado.", "Prurito."),
  ],
  studies: [
    study("Otros", "biopsia", "Biopsia escisional del ganglio", "clave", "Linfoma de Hodgkin clásico, esclerosis nodular, con células de Reed-Sternberg.", "Diagnóstico (la punción con aguja fina no alcanza)."),
    study("Imágenes", "pet", "PET-TC (o tomografía de cuello, tórax, abdomen y pelvis)", "clave", "Masa mediastinal anterior y ganglios cervicales; sin compromiso infradiafragmático.", "Estadificación (estadio II con síntomas B)."),
    study("Laboratorio", "lab", "Hemograma, VSG, LDH, albúmina, VIH, hepatitis", "util", "VSG 70, LDH alta.", "Pronóstico y antes de la quimioterapia."),
    study("Otros", "atb-probar", "Dar antibióticos dos meses para ver si baja", "riesgoso", "No se realizó.", "Retrasa el diagnóstico de una adenopatía con signos de alarma."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hodgkin", "Linfoma de Hodgkin clásico, esclerosis nodular, estadio IIB con masa mediastinal", true, "Adenopatías cervicales y supraclaviculares duras, síntomas B, prurito, masa mediastinal y biopsia con células de Reed-Sternberg."),
      dx("mono", "Mononucleosis", false, "Ya la tuvo; las adenopatías persistentes con síntomas B y masa mediastinal orientan a linfoma."),
      dx("tbc", "Tuberculosis ganglionar", false, "La biopsia muestra linfoma."),
      dx("no-hodgkin", "Linfoma no Hodgkin", false, "Las células de Reed-Sternberg definen el Hodgkin."),
      dx("toxoplasmosis", "Toxoplasmosis ganglionar", false, "Adenopatías blandas sin síntomas B ni masa mediastinal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("oncohematologia", "Derivar a oncohematología para quimioterapia (ABVD o similar) con o sin radioterapia", "clave", "Tiene más del 80–90 % de curación."),
      mg("fertilidad", "Ofrecer preservación de la fertilidad antes de la quimioterapia", "clave", "La quimioterapia puede afectar la fertilidad."),
      mg("vacunas", "Vacunas y evaluación cardíaca y pulmonar antes del tratamiento", "util", "La doxorrubicina y la bleomicina son tóxicas para corazón y pulmón."),
      mg("seguimiento", "Seguimiento a largo plazo por efectos tardíos", "util", "Segundos cánceres y cardiopatía."),
      mg("corticoides-ya", "Corticoides antes de la biopsia", "riesgoso", "Pueden alterar el diagnóstico histológico."),
      mg("paaf", "Conformarse con una punción con aguja fina", "innecesario", "No alcanza para clasificar el linfoma."),
    ],
  },
  debrief: {
    diagnosis: "Linfoma de Hodgkin clásico, esclerosis nodular, estadio IIB con masa mediastinal anterior, en mujer de 19 años.",
    pathologies: [
      { name: "Linfoma de Hodgkin", role: "principal", why: "Neoplasia linfoide con células de Reed-Sternberg." },
      { name: "Síntomas B y masa mediastinal", role: "asociada", why: "Factores pronósticos." },
      { name: "Mononucleosis, TBC, no Hodgkin", role: "diferencial", why: "Otras causas de adenopatías." },
    ],
    reasoning: [
      "Causa: proliferación clonal de linfocitos B (células de Reed-Sternberg), a veces asociada al virus de Epstein-Barr.",
      "Mecanismo: las células tumorales reclutan un infiltrado inflamatorio y se diseminan por contigüidad ganglionar.",
      "Consecuencia: adenopatías, masa mediastinal, síntomas B y prurito; muy curable con tratamiento.",
    ],
    epidemiology:
      "El linfoma de Hodgkin tiene un pico en adolescentes y adultos jóvenes (15 a 35 años) y otro después de los 55. La forma de esclerosis nodular es la más frecuente en mujeres jóvenes. Es uno de los cánceres más curables.",
    management: [
      "Adenopatía de más de 2 cm, dura, persistente más de 4–6 semanas, supraclavicular o con síntomas B: biopsia escisional.",
      "Estadificación con PET-TC.",
      "Quimioterapia con o sin radioterapia.",
      "Preservación de la fertilidad y seguimiento de efectos tardíos.",
    ],
    sources: ["Sociedad Argentina de Hematología — Guías de linfoma de Hodgkin.", "Instituto Nacional del Cáncer."],
    pearls: ["Adenopatía supraclavicular = siempre estudiar.", "Biopsia escisional.", "Síntomas B."],
    pitfalls: ["Antibióticos de prueba prolongados.", "Corticoides antes de biopsiar."],
    tribunal: [
      qa("¿Qué características de una adenopatía sugieren malignidad?", "Tamaño mayor de 2 cm, consistencia dura, adherida, indolora, localización supraclavicular, crecimiento progresivo, persistencia de más de 4–6 semanas y síntomas generales."),
      qa("¿Qué son los síntomas B?", "Fiebre mayor de 38 °C sin causa, sudoración nocturna profusa y pérdida de más del 10 % del peso en 6 meses; empeoran el pronóstico de los linfomas."),
      qa("¿Qué es la clasificación de Ann Arbor (Lugano)?", "La estadificación de los linfomas: I una región ganglionar, II dos o más del mismo lado del diafragma, III ambos lados del diafragma, IV compromiso extraganglionar difuso; con A o B según los síntomas."),
    ],
  },
};
