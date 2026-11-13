import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const estrongiloidiasis: ClinicalCase = {
  id: "estrongiloidiasis-hiperinfeccion",
  level: 4,
  area: "Infectología",
  setting: "Internación",
  patient: { age: 61, ageUnit: "años", sex: "M", context: "Nació en Formosa, trabajó descalzo en el campo. Recibe dexametasona hace 3 semanas por un linfoma." },
  frequency: "raro",
  intro: "Lo llaman de la sala: “Tiene fiebre, tos con algo de sangre, diarrea y le cuesta respirar.”",
  vitals: { TA: "96/58 mmHg", FC: "116 lpm", FR: "28 rpm", "T°": "38,7 °C", "SatO₂": "89 %" },
  anamnesis: [
    act("corticoides", "¿Qué medicación recibe?", "clave", "“Dexametasona en dosis altas.”", "Inmunosupresión celular."),
    act("origen", "¿Dónde vivió y trabajó?", "clave", "“En el campo en Formosa, siempre descalzo.”", "Zona endémica."),
    act("digestivo", "¿Diarrea o dolor abdominal?", "clave", "“Diarrea y dolor desde hace días.”", "Migración larvaria."),
    act("piel", "¿Picazón o ronchas que se mueven?", "util", "“Una roncha en la cola que avanza.”", "Larva currens."),
    act("profilaxis", "¿Le dieron antiparasitarios antes de los corticoides?", "util", "“No.”", "Oportunidad perdida."),
    act("familia", "¿Tiene hijos?", "neutro", "“Tres.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Auscultación", "clave", "Rales difusos y sibilancias.", "Migración pulmonar."),
    act("piel-ex", "Piel", "clave", "Púrpura periumbilical en red.", "Hiperinfección."),
    act("meningeo", "Signos meníngeos", "util", "Negativos por ahora.", "Riesgo de meningitis por gramnegativos."),
  ],
  studies: [
    study("Microbiología", "esputo", "Esputo y materia fecal para larvas", "clave", "Larvas filariformes de Strongyloides en esputo y heces.", "Diagnóstico."),
    study("Microbiología", "hemocultivos", "Hemocultivos", "clave", "Escherichia coli.", "Bacteriemia por translocación."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Infiltrados bilaterales.", "Compromiso pulmonar."),
    study("Laboratorio", "eosinofilos", "Esperar eosinofilia para confirmar", "riesgoso", "No se esperó.", "Con corticoides puede no haber eosinofilia."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hiperinfeccion", "Síndrome de hiperinfección por Strongyloides stercoralis con bacteriemia por gramnegativos", true, "Corticoides, zona endémica, larvas en esputo y heces, púrpura periumbilical y E. coli."),
      dx("neumonia", "Neumonía intrahospitalaria", false, "Larvas en esputo."),
      dx("pneumocystis", "Neumonía por Pneumocystis", false, "Larvas identificadas."),
      dx("progresion", "Progresión del linfoma", false, "Hay infección documentada."),
      dx("loffler", "Síndrome de Löffler simple", false, "Es grave y diseminado."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ivermectina", "Ivermectina diaria hasta negativizar las muestras", "clave", "Tratamiento de elección."),
      mg("atb", "Antibióticos para gramnegativos", "clave", "Bacteriemia."),
      mg("reducir-corticoides", "Reducir los corticoides lo más posible", "clave", "Favorecen la hiperinfección."),
      mg("uti", "Terapia intensiva", "util", "Sepsis e hipoxemia."),
      mg("subir-corticoides", "Aumentar los corticoides por el broncoespasmo", "riesgoso", "Empeora la carga parasitaria."),
      mg("albendazol-dosis-unica", "Albendazol en dosis única", "riesgoso", "Insuficiente en hiperinfección."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de hiperinfección por Strongyloides stercoralis con bacteriemia por E. coli, en varón de 61 años con linfoma tratado con corticoides.",
    pathologies: [
      { name: "Hiperinfección por Strongyloides", role: "principal", why: "Autoinfección masiva." },
      { name: "Bacteriemia por gramnegativos", role: "asociada", why: "Las larvas arrastran bacterias intestinales." },
      { name: "Neumonía, Pneumocystis", role: "diferencial", why: "Otras infecciones del inmunodeprimido." },
    ],
    reasoning: [
      "Causa: infección crónica silenciosa adquirida décadas atrás.",
      "Mecanismo: los corticoides aceleran la autoinfección y aumenta la carga de larvas.",
      "Consecuencia: invasión pulmonar e intestinal y sepsis por gramnegativos.",
    ],
    epidemiology:
      "Strongyloides es endémico en el norte argentino, sobre todo en Salta, Jujuy, Chaco y Formosa. Puede persistir décadas sin síntomas. Antes de dar corticoides o inmunosupresores a alguien de zona endémica conviene estudiarlo o tratarlo con ivermectina.",
    management: [
      "Sospechar.",
      "Ivermectina.",
      "Antibióticos.",
      "Reducir corticoides.",
    ],
    sources: ["Sociedad Argentina de Infectología — Parasitosis en inmunocomprometidos.", "CDC — Strongyloidiasis Resources for Health Professionals."],
    pearls: ["Corticoides más zona endémica: pensá en Strongyloides.", "Sepsis por gramnegativos sin foco.", "Ivermectina preventiva."],
    pitfalls: ["Esperar eosinofilia.", "Subir corticoides."],
    tribunal: [
      qa("¿Qué es la larva currens?", "Lesión urticariana lineal que avanza rápido en la piel por migración larvaria."),
      qa("¿Por qué hay bacteriemia por gramnegativos?", "Las larvas atraviesan la pared intestinal y arrastran bacterias entéricas."),
      qa("¿A quién se le hace tamizaje?", "A personas de zonas endémicas que van a recibir corticoides o inmunosupresores."),
    ],
  },
};
