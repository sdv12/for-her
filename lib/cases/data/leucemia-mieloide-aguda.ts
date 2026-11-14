import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const leucemiaMieloideAguda: ClinicalCase = {
  id: "leucemia-mieloide-aguda-adulto",
  level: 4,
  area: "Hematología",
  setting: "Guardia",
  patient: { age: 61, ageUnit: "años", sex: "M", context: "Sano hasta hace un mes. Ex fumador." },
  frequency: "poco-frecuente",
  intro: "“Hace tres semanas estoy muy cansado, me sangran las encías, tengo fiebre y me salieron manchas violetas en las piernas.”",
  vitals: { TA: "112/68 mmHg", FC: "112 lpm", FR: "22 rpm", "T°": "38,6 °C", "SatO₂": "96 %" },
  anamnesis: [
    act("evolucion", "¿Desde cuándo?", "clave", "“Tres semanas, cada vez peor.”", "Agudo."),
    act("sangrado", "¿Dónde sangra?", "clave", "“Encías y nariz.”", "Plaquetopenia o CID."),
    act("infeccion", "¿Fiebre o infecciones?", "clave", "“Fiebre desde ayer.”", "Neutropenia funcional."),
    act("dolor-oseo", "¿Dolor de huesos?", "util", "“En el esternón.”", "Infiltración medular."),
    act("quimio", "¿Recibió quimio o radiación antes?", "util", "“No.”", "LMA secundaria."),
    act("trabajo", "¿Qué hacía?", "neutro", "“Electricista.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel y mucosas", "clave", "Petequias, equimosis y palidez; encías hipertróficas.", "Infiltración monocítica."),
    act("visceras", "Hígado, bazo y ganglios", "clave", "Esplenomegalia leve.", "Infiltración."),
    act("foco", "Búsqueda de foco infeccioso", "util", "Sin foco evidente.", "Neutropenia febril."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma con frotis", "clave", "Leucocitos 48.000 con 70 % de blastos con bastones de Auer; Hb 7,2; plaquetas 18.000.", "Leucemia aguda mieloide."),
    study("Laboratorio", "coagulacion", "Coagulograma, fibrinógeno, dímero D, ácido úrico, LDH, potasio", "clave", "Fibrinógeno normal; ácido úrico alto; LDH alta.", "Lisis tumoral."),
    study("Otros", "medula", "Médula ósea con citometría, citogenética y moleculares", "clave", "LMA con mutación FLT3.", "Clasificación y pronóstico."),
    study("Otros", "transfundir-todo", "Transfundir glóbulos rojos con hiperleucocitosis sin cuidado", "riesgoso", "No se hizo de forma liberal.", "Aumenta la viscosidad."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("lma", "Leucemia mieloide aguda con hiperleucocitosis y neutropenia febril", true, "Blastos con bastones de Auer, citopenias, hipertrofia gingival y médula con LMA."),
      dx("lla", "Leucemia linfoblástica aguda", false, "Bastones de Auer y citometría mieloide."),
      dx("lmc", "Leucemia mieloide crónica", false, "Predominan blastos."),
      dx("mielodisplasia", "Síndrome mielodisplásico", false, "Más de 20 % de blastos."),
      dx("infeccion", "Reacción leucemoide por infección", false, "Blastos y citopenias."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Antibiótico antipseudomonas empírico en menos de una hora", "clave", "Neutropenia febril."),
      mg("lisis", "Hidratación y alopurinol o rasburicasa", "clave", "Prevenir lisis tumoral."),
      mg("hematologia", "Derivación urgente a hematología para inducción", "clave", "Quimioterapia."),
      mg("plaquetas", "Plaquetas si sangra o menos de 10.000", "util", "Soporte."),
      mg("aspirina", "Aspirina", "riesgoso", "Sangrado."),
      mg("esperar-medula", "Esperar la médula para iniciar antibiótico", "riesgoso", "Sepsis."),
    ],
  },
  debrief: {
    diagnosis: "Leucemia mieloide aguda con hiperleucocitosis, citopenias y neutropenia febril, en varón de 61 años.",
    pathologies: [
      { name: "Leucemia mieloide aguda", role: "principal", why: "Proliferación de blastos mieloides." },
      { name: "Neutropenia febril y riesgo de lisis tumoral", role: "asociada", why: "Urgencias." },
      { name: "LLA, mielodisplasia", role: "diferencial", why: "Otras neoplasias hematológicas." },
    ],
    reasoning: [
      "Causa: mutaciones adquiridas en progenitores mieloides.",
      "Mecanismo: los blastos desplazan la hematopoyesis normal.",
      "Consecuencia: anemia, sangrado e infecciones graves.",
    ],
    epidemiology:
      "Es la leucemia aguda más frecuente en adultos, con mediana de edad cercana a 68 años. La LMA promielocítica es una urgencia por la coagulopatía. El pronóstico depende mucho de la genética.",
    management: [
      "Frotis.",
      "Infección y lisis.",
      "Médula.",
      "Inducción.",
    ],
    sources: ["Sociedad Argentina de Hematología — Guías de leucemias agudas.", "ELN — Diagnosis and Management of AML in Adults."],
    pearls: ["Bastones de Auer.", "Fiebre: antibiótico ya.", "Lisis tumoral."],
    pitfalls: ["Esperar para el antibiótico.", "Transfundir de más con hiperleucocitosis."],
    tribunal: [
      qa("¿Qué subtipo de LMA es una urgencia por la coagulación?", "La promielocítica (M3), con CID; se trata con ácido transretinoico de inmediato."),
      qa("¿Qué es la leucostasis?", "Obstrucción de la microcirculación por blastos con síntomas pulmonares y neurológicos."),
      qa("¿Qué es el síndrome de lisis tumoral?", "Hiperpotasemia, hiperfosfatemia, hiperuricemia e hipocalcemia con riesgo de IRA."),
    ],
  },
};
