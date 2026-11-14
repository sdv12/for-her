import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hemorroideTrombosada: ClinicalCase = {
  id: "hemorroide-externa-trombosada",
  level: 1,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 45, ageUnit: "años", sex: "M", context: "Viajó 14 horas manejando ayer. Constipado." },
  frequency: "muy-frecuente",
  intro: "“Me salió un bulto muy doloroso en el ano, duro y violeta, desde ayer. No me puedo sentar.”",
  vitals: { TA: "132/82 mmHg", FC: "88 lpm", "T°": "36,6 °C" },
  anamnesis: [
    act("inicio", "¿Cuándo apareció?", "clave", "“Ayer, después de hacer fuerza.”", "Menos de 72 horas."),
    act("dolor", "¿Cómo es el dolor?", "clave", "“Constante, muy fuerte.”", "Trombosis externa."),
    act("fiebre", "¿Fiebre o supuración?", "clave", "“No.”", "Absceso."),
    act("sangre", "¿Sangra?", "util", "“Un poco.”", "Base."),
    act("habito", "¿Cómo va de cuerpo?", "util", "“Duro, cada dos días.”", "Constipación."),
    act("ruta", "¿A dónde viajó?", "neutro", "“A Mendoza.”", "No orienta."),
  ],
  exam: [
    act("ano", "Inspección anal", "clave", "Nódulo azulado de 1,5 cm, tenso y doloroso, en el borde anal.", "Hemorroide externa trombosada."),
    act("fluctuacion", "Fluctuación o celulitis", "clave", "Ausentes.", "No es absceso."),
    act("tacto", "Tacto rectal", "util", "Diferido por dolor.", "Base."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Típico.", "No requiere estudios."),
    study("Otros", "anoscopia", "Anoscopia diferida", "util", "Hemorroides internas grado I.", "Completar."),
    study("Imágenes", "eco", "Ecografía endoanal", "innecesario", "No se realizó.", "No aporta."),
    study("Otros", "colonoscopia-urgente", "Colonoscopia urgente", "innecesario", "No se realizó.", "Sin alarma."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("trombosis", "Trombosis hemorroidal externa de menos de 72 horas", true, "Nódulo azulado, tenso y doloroso en el borde anal, de inicio tras esfuerzo."),
      dx("absceso", "Absceso perianal", false, "Sin fiebre, fluctuación ni celulitis."),
      dx("fisura", "Fisura anal", false, "Hay un nódulo trombosado."),
      dx("prolapso", "Prolapso hemorroidal interno estrangulado", false, "Es externo, cubierto de piel."),
      dx("cancer", "Cáncer anal", false, "Inicio agudo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("escision", "Escisión del trombo con anestesia local (menos de 72 horas)", "clave", "Alivio rápido."),
      mg("fibra", "Fibra, agua y ablandador", "clave", "Evitar esfuerzo."),
      mg("banos", "Baños de asiento y analgesia", "clave", "Síntomas."),
      mg("conservador-tarde", "Si tuviera más de 72 horas, manejo conservador", "util", "Ya empieza a resolverse."),
      mg("incision-simple", "Solo incisión puntual del trombo", "riesgoso", "Recidiva frecuente."),
      mg("corticoide-cronico", "Cremas con corticoide por meses", "riesgoso", "Atrofia de la piel perianal."),
    ],
  },
  debrief: {
    diagnosis: "Trombosis hemorroidal externa de menos de 72 horas, en varón de 45 años.",
    pathologies: [
      { name: "Hemorroide externa trombosada", role: "principal", why: "Coágulo en el plexo externo." },
      { name: "Constipación y sedestación prolongada", role: "asociada", why: "Desencadenantes." },
      { name: "Absceso, fisura", role: "diferencial", why: "Otros dolores anales." },
    ],
    reasoning: [
      "Causa: esfuerzo defecatorio y aumento de presión venosa.",
      "Mecanismo: trombosis del plexo hemorroidal externo.",
      "Consecuencia: nódulo muy doloroso que se resuelve en semanas.",
    ],
    epidemiology:
      "Es una consulta frecuente en guardia. Dentro de las primeras 72 horas la escisión alivia más rápido; después, el dolor empieza a ceder solo. La constipación es el factor modificable.",
    management: [
      "Clínica.",
      "Escisión si es temprana.",
      "Fibra y baños.",
      "Prevenir.",
    ],
    sources: ["Sociedad Argentina de Coloproctología — Enfermedad hemorroidal.", "ASCRS — Clinical Practice Guidelines for the Management of Hemorrhoids."],
    pearls: ["Nódulo azul doloroso.", "72 horas.", "Escisión, no incisión."],
    pitfalls: ["Incisión simple.", "Corticoides crónicos."],
    tribunal: [
      qa("¿Qué diferencia hay entre hemorroides internas y externas?", "Las internas están sobre la línea pectínea, sangran y no duelen; las externas debajo, cubiertas por piel y duelen al trombosarse."),
      qa("¿Cómo se clasifican las internas?", "Grados I a IV según el prolapso y su reducción."),
      qa("¿Qué tratamiento tienen las internas grado II?", "Ligadura con bandas elásticas."),
    ],
  },
};
