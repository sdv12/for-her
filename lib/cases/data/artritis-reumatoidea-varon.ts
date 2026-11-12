import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const artritisReumatoideaVaron: ClinicalCase = {
  id: "artritis-reumatoidea-varon-fumador",
  level: 2,
  area: "Reumatología",
  setting: "Consultorio",
  patient: { age: 55, ageUnit: "años", sex: "M", context: "Fumador de 30 paquetes/año. Tornero." },
  frequency: "frecuente",
  intro: "“Hace tres meses me duelen y se hinchan los nudillos y las muñecas, a la mañana están duras más de una hora.”",
  vitals: { TA: "128/80 mmHg", FC: "78 lpm", "T°": "36,8 °C", Peso: "74 kg" },
  anamnesis: [
    act("rigidez", "¿Cuánto dura la rigidez matinal?", "clave", "“Más de una hora.”", "Inflamatoria."),
    act("distribucion", "¿Qué articulaciones?", "clave", "“Nudillos y muñecas, de ambos lados.”", "Simétrica."),
    act("tabaco", "¿Fumás?", "clave", "“Un atado.”", "Factor de riesgo y gravedad."),
    act("pulmon", "¿Tos o falta de aire?", "util", "“Me canso al subir.”", "Compromiso pulmonar."),
    act("psoriasis", "¿Psoriasis o diarrea?", "util", "“No.”", "Otras artritis."),
    act("torno", "¿Qué fabricás?", "neutro", "“Piezas de autos.”", "No orienta."),
  ],
  exam: [
    act("manos", "Manos", "clave", "Sinovitis en metacarpofalángicas e interfalángicas proximales y muñecas.", "Poliartritis."),
    act("nodulos", "Codos", "clave", "Nódulo reumatoideo.", "Seropositivo."),
    act("pulmon-ex", "Pulmón", "util", "Crepitantes bibasales finos.", "Intersticial."),
  ],
  studies: [
    study("Laboratorio", "anticuerpos", "FR y anti-CCP", "clave", "Ambos positivos altos.", "Diagnóstico y pronóstico."),
    study("Laboratorio", "reactantes", "VSG, PCR, hemograma, hepatograma", "clave", "VSG 58.", "Actividad."),
    study("Imágenes", "rx", "Radiografía de manos y pies", "clave", "Erosiones tempranas.", "Daño."),
    study("Imágenes", "tc-pulmon", "TC de alta resolución", "util", "Enfermedad intersticial leve.", "Compromiso pulmonar."),
    study("Otros", "corticoide-solo", "Corticoides solos a largo plazo", "riesgoso", "No se realizó.", "No frena el daño."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ar", "Artritis reumatoidea seropositiva con erosiones y enfermedad intersticial, en fumador", true, "Poliartritis simétrica, rigidez, FR y anti-CCP, erosiones."),
      dx("artrosis", "Artrosis", false, "Inflamatoria y en metacarpofalángicas."),
      dx("psoriasica", "Artritis psoriásica", false, "Sin psoriasis."),
      dx("gota", "Gota poliarticular", false, "Anti-CCP."),
      dx("lupus", "Lupus", false, "Erosiones y anti-CCP."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("metotrexato", "Metotrexato con ácido fólico, evaluando el pulmón", "clave", "Fármaco ancla."),
      mg("tabaco", "Dejar de fumar", "clave", "Empeora la AR y el pulmón."),
      mg("puente", "Corticoide en dosis bajas como puente", "util", "Síntomas."),
      mg("vacunas", "Vacunas y tamizaje de TBC y hepatitis antes de biológicos", "clave", "Seguridad."),
      mg("aines-solos", "Solo AINE", "riesgoso", "No frena el daño."),
      mg("esperar", "Esperar un año", "riesgoso", "Daño irreversible."),
    ],
  },
  debrief: {
    diagnosis: "Artritis reumatoidea seropositiva erosiva con enfermedad intersticial leve, en varón de 55 años fumador.",
    pathologies: [
      { name: "Artritis reumatoidea", role: "principal", why: "Poliartritis autoinmune." },
      { name: "Tabaquismo y pulmón", role: "asociada", why: "Gravedad." },
      { name: "Artrosis, psoriásica, gota", role: "diferencial", why: "Otras artritis." },
    ],
    reasoning: [
      "Causa: autoinmunidad gatillada por el tabaco en predispuestos.",
      "Mecanismo: citrulinación de proteínas y sinovitis.",
      "Consecuencia: erosiones, discapacidad y compromiso extraarticular.",
    ],
    epidemiology:
      "Es más frecuente en mujeres, pero en varones fumadores es más grave y con más compromiso extraarticular. El tratamiento en la ventana de oportunidad evita daño. La enfermedad pulmonar intersticial es una de las principales causas de muerte.",
    management: [
      "Sospechar.",
      "Anticuerpos.",
      "Metotrexato temprano.",
      "Dejar de fumar.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Guías de artritis reumatoidea.", "EULAR — Recommendations for the Management of RA."],
    pearls: ["Rigidez de más de una hora.", "Anti-CCP.", "Fumar empeora."],
    pitfalls: ["Solo AINE.", "No revisar el pulmón."],
    tribunal: [
      qa("¿Qué manifestaciones extraarticulares tiene?", "Nódulos, enfermedad intersticial, vasculitis, Sjögren, anemia y Felty."),
      qa("¿Qué toxicidad tiene el metotrexato?", "Hepática, medular, pulmonar y teratogenicidad."),
      qa("¿Qué es la ventana de oportunidad?", "Los primeros meses de enfermedad, cuando el tratamiento previene daño irreversible."),
    ],
  },
};
