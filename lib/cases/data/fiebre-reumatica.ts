import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const fiebreReumatica: ClinicalCase = {
  id: "fiebre-reumatica-carditis",
  level: 2,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 11, ageUnit: "años", sex: "F", context: "Vive en una casa de dos ambientes con ocho personas. Tuvo anginas hace 3 semanas, sin antibiótico." },
  frequency: "poco-frecuente",
  intro: "“Le duelen las rodillas, un día una y al otro día otra. Tiene fiebre y se cansa mucho.”",
  vitals: { TA: "100/60 mmHg", FC: "128 lpm", FR: "26 rpm", "T°": "38,3 °C", "SatO₂": "97 %", Peso: "34 kg" },
  anamnesis: [
    act("angina", "¿Tuvo dolor de garganta? ¿Se trató?", "clave", "“Hace 3 semanas; se le pasó solo.”", "Faringitis estreptocócica no tratada."),
    act("migratoria", "¿El dolor se muda de articulación?", "clave", "“Sí, va saltando.”", "Poliartritis migratoria."),
    act("corea", "¿Movimientos raros, llora sin motivo, le cambió la letra?", "clave", "“No.”", "Corea de Sydenham."),
    act("disnea", "¿Falta de aire?", "util", "“Cuando corre.”", "Carditis."),
    act("familia", "¿Alguien más con reuma en casa?", "util", "“No sé.”", "Contexto."),
    act("materia", "¿Qué materia le gusta?", "neutro", "“Plástica.”", "No orienta."),
  ],
  exam: [
    act("articular", "Articulaciones", "clave", "Rodilla izquierda caliente y muy dolorosa.", "Artritis migratoria."),
    act("cardiaco", "Corazón", "clave", "Soplo holosistólico apical, nuevo; taquicardia.", "Carditis."),
    act("piel", "Piel", "util", "Eritema marginado en tronco; nódulos subcutáneos.", "Criterios mayores."),
  ],
  studies: [
    study("Laboratorio", "aslo", "ASLO y exudado de fauces", "clave", "ASLO alto.", "Evidencia de estreptococo."),
    study("Laboratorio", "reactantes", "ERS y PCR", "clave", "ERS 88; PCR alta.", "Criterio menor."),
    study("Imágenes", "eco", "Ecocardiograma Doppler y ECG", "clave", "Insuficiencia mitral moderada; PR prolongado.", "Carditis."),
    study("Otros", "biopsia", "Biopsia sinovial", "innecesario", "No se realizó.", "No sirve."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("fr", "Fiebre reumática aguda con carditis", true, "Faringitis previa, 3 criterios mayores y ASLO alto (Jones)."),
      dx("septica", "Artritis séptica", false, "Es monoarticular persistente, no migratoria."),
      dx("lupus", "Lupus", false, "Hay antecedente estreptocócico y soplo."),
      dx("kawasaki", "Kawasaki", false, "Faltan conjuntivitis, labios y lengua; afecta a menores."),
      dx("endocarditis", "Endocarditis", false, "La carditis se explica por fiebre reumática."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("penicilina", "Penicilina benzatínica para erradicar", "clave", "Elimina el estreptococo."),
      mg("aspirina", "Aspirina o naproxeno para la artritis", "clave", "Tratamiento sintomático."),
      mg("carditis", "Reposo, tratamiento de IC y corticoides si hay carditis grave", "clave", "Reduce síntomas."),
      mg("profilaxis", "Profilaxis secundaria con penicilina benzatínica prolongada", "clave", "Previene nuevos episodios y daño valvular."),
      mg("sin-seguimiento", "Una dosis y alta sin seguimiento", "riesgoso", "Alto riesgo de recurrencia."),
      mg("corticoide-todos", "Corticoides sin antibiótico", "riesgoso", "No erradica."),
    ],
  },
  debrief: {
    diagnosis: "Fiebre reumática aguda con carditis y poliartritis migratoria, en niña de 11 años, tras faringitis estreptocócica no tratada.",
    pathologies: [
      { name: "Fiebre reumática aguda", role: "principal", why: "Complicación inmunológica." },
      { name: "Carditis e insuficiencia mitral", role: "asociada", why: "Riesgo de valvulopatía." },
      { name: "Artritis séptica, lupus, Kawasaki", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: faringitis por Streptococcus pyogenes.",
      "Mecanismo: mimetismo molecular entre antígenos estreptocócicos y tejidos.",
      "Consecuencia: pancarditis, artritis, corea y daño valvular crónico.",
    ],
    epidemiology:
      "Afecta a niños de 5 a 15 años, y persiste asociada a pobreza y hacinamiento en distintos sectores. Es la causa más frecuente de valvulopatía adquirida en muchas regiones del mundo. Tratar la faringitis por estreptococo a tiempo la previene, y no hay que tomar la angina como algo sin importancia.",
    management: [
      "Criterios de Jones.",
      "Erradicación.",
      "Tratamiento antiinflamatorio.",
      "Profilaxis prolongada.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Fiebre reumática.", "American Heart Association — Revised Jones Criteria."],
    pearls: ["Artritis que salta.", "Carditis mitral.", "Profilaxis larga."],
    pitfalls: ["No tratar la faringitis.", "Olvidar la profilaxis."],
    tribunal: [
      qa("¿Cuáles son los criterios mayores de Jones?", "Carditis, poliartritis, corea, eritema marginado y nódulos subcutáneos."),
      qa("¿Cuánto dura la profilaxis secundaria?", "Depende del daño: 5 años o hasta los 21 si no hay carditis; 10 años o más si hay; hasta 40 años o de por vida si hay valvulopatía."),
      qa("¿Qué valvulopatía deja a largo plazo?", "Sobre todo estenosis mitral, también insuficiencia mitral y aórtica."),
    ],
  },
};
