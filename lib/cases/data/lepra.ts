import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const lepra: ClinicalCase = {
  id: "lepra-multibacilar",
  level: 3,
  area: "Infectología",
  setting: "Consultorio",
  patient: { age: 46, ageUnit: "años", sex: "M", context: "Vive en Chaco. Su madre recibió tratamiento por lepra hace años." },
  frequency: "raro",
  intro: "“Tengo manchas en la piel que no pican y no siento nada en esa zona. Me quemé la mano con la pava y no me di cuenta.”",
  vitals: { TA: "128/80 mmHg", FC: "76 lpm", "T°": "36,6 °C" },
  anamnesis: [
    act("manchas", "¿Desde cuándo tiene las manchas?", "clave", "“Hace dos años, cada vez más.”", "Lesiones crónicas."),
    act("sensibilidad", "¿Siente en las manchas y en las manos?", "clave", "“No siento ni el calor.”", "Anestesia: clave de la lepra."),
    act("contacto", "¿Alguien en la familia tuvo lepra?", "clave", "“Mi mamá.”", "Contacto conviviente."),
    act("nariz", "¿Nariz tapada o sangrado?", "util", "“Se me tapa mucho.”", "Compromiso nasal."),
    act("ojos", "¿Problemas en los ojos?", "util", "“No cierro bien un ojo.”", "Lagoftalmos."),
    act("trabajo", "¿Trabaja?", "neutro", "“En el algodón.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel", "clave", "Múltiples placas hipopigmentadas e infiltradas, simétricas, más de cinco.", "Multibacilar."),
    act("nervios", "Nervios periféricos", "clave", "Engrosamiento de cubitales y peroneos; anestesia en manos.", "Neuropatía leprosa."),
    act("mano", "Mano", "util", "Quemadura indolora, garra cubital leve.", "Discapacidad."),
  ],
  studies: [
    study("Laboratorio", "baciloscopia", "Baciloscopia de linfa (orejas, codos)", "clave", "Índice bacteriológico 3+.", "Multibacilar."),
    study("Otros", "biopsia", "Biopsia de piel", "clave", "Granulomas con bacilos ácido-alcohol resistentes en nervios.", "Confirma."),
    study("Otros", "discapacidad", "Evaluación del grado de discapacidad", "util", "Grado 2 en manos.", "Pronóstico y seguimiento."),
    study("Microbiología", "cultivo", "Cultivo de Mycobacterium leprae", "innecesario", "No se realizó.", "No crece en medios."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("lepra-mb", "Lepra multibacilar con neuropatía y discapacidad grado 2", true, "Lesiones anestésicas múltiples, nervios engrosados, baciloscopia positiva y contacto conviviente."),
      dx("vitiligo", "Vitiligo", false, "Las manchas del vitiligo tienen sensibilidad normal."),
      dx("pitiriasis", "Pitiriasis versicolor", false, "Hay anestesia y nervios engrosados."),
      dx("diabetes", "Neuropatía diabética", false, "Lesiones cutáneas y bacilos."),
      dx("tbc-cutanea", "Tuberculosis cutánea", false, "Patrón neural típico de lepra."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("pqt", "Poliquimioterapia con rifampicina, dapsona y clofazimina por 12 meses", "clave", "Esquema multibacilar."),
      mg("contactos", "Examinar contactos y profilaxis con rifampicina", "clave", "Cortar la transmisión."),
      mg("prevencion-discapacidad", "Autocuidado de manos, pies y ojos", "clave", "Evitar lesiones."),
      mg("notificar", "Notificación", "util", "Vigilancia."),
      mg("aislamiento", "Aislamiento social del paciente", "riesgoso", "Estigma; con tratamiento deja de contagiar rápido."),
      mg("monoterapia", "Solo dapsona", "riesgoso", "Resistencia."),
    ],
  },
  debrief: {
    diagnosis: "Lepra multibacilar con neuropatía periférica y discapacidad grado 2, en varón de 46 años de Chaco.",
    pathologies: [
      { name: "Lepra multibacilar", role: "principal", why: "Infección por Mycobacterium leprae." },
      { name: "Neuropatía y discapacidad", role: "asociada", why: "Daño de nervios periféricos." },
      { name: "Vitiligo, pitiriasis", role: "diferencial", why: "Manchas hipopigmentadas." },
    ],
    reasoning: [
      "Causa: Mycobacterium leprae por contacto prolongado.",
      "Mecanismo: invasión de células de Schwann y piel con respuesta inmune variable.",
      "Consecuencia: anestesia, lesiones indoloras, deformidades y discapacidad.",
    ],
    epidemiology:
      "Argentina sigue teniendo casos nuevos, sobre todo en el NEA (Chaco, Formosa, Corrientes, Misiones). Se transmite con contacto prolongado y la mayoría de la gente es resistente. El diagnóstico temprano evita la discapacidad.",
    management: [
      "Sensibilidad en las manchas.",
      "Baciloscopia y biopsia.",
      "Poliquimioterapia.",
      "Contactos y autocuidado.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía para el control de la lepra.", "OMS — Guidelines for the Diagnosis, Treatment and Prevention of Leprosy."],
    pearls: ["Mancha que no siente: lepra.", "Palpá los nervios.", "NEA."],
    pitfalls: ["Llamarlo vitiligo.", "Estigmatizar."],
    tribunal: [
      qa("¿Qué son las reacciones lepróticas?", "Episodios inflamatorios inmunes (tipo 1 y eritema nudoso leproso) que dañan nervios y se tratan con corticoides o talidomida."),
      qa("¿Cómo se clasifica para el tratamiento?", "Paucibacilar con hasta cinco lesiones y baciloscopia negativa; multibacilar si hay más o baciloscopia positiva."),
      qa("¿Qué efecto da la clofazimina?", "Pigmentación rojiza o parda de la piel, reversible."),
    ],
  },
};
