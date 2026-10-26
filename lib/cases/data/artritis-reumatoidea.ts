import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const artritisReumatoidea: ClinicalCase = {
  id: "artritis-reumatoidea-temprana",
  level: 2,
  area: "Reumatología",
  setting: "Consultorio",
  patient: { age: 45, ageUnit: "años", sex: "F", context: "Costurera. Fumadora." },
  frequency: "frecuente",
  intro: "“Hace dos meses me duelen e hinchan las manos, las dos. A la mañana las tengo tan duras que no puedo agarrar la pava por más de una hora.”",
  vitals: { TA: "124/78 mmHg", FC: "80 lpm", "T°": "36,8 °C" },
  anamnesis: [
    act("rigidez", "¿Cuánto le dura la rigidez de la mañana?", "clave", "“Más de una hora, a veces hasta el mediodía.”", "Una rigidez matinal de más de una hora es típica de las artritis inflamatorias; en la artrosis dura minutos."),
    act("articulaciones", "¿Qué articulaciones le duelen?", "clave", "“Los nudillos y los dedos de las dos manos, las muñecas y los pies.”", "Poliartritis simétrica de pequeñas articulaciones (MCF, IFP, muñecas, MTF): patrón característico de la artritis reumatoidea."),
    act("tiempo", "¿Desde cuándo?", "clave", "“Dos meses.”", "Más de 6 semanas descarta la mayoría de las artritis virales autolimitadas."),
    act("sistemicos", "¿Tiene cansancio, fiebre o bajó de peso?", "util", "“Mucho cansancio.”", "Síntomas generales por la inflamación sistémica."),
    act("otros", "¿Tiene la boca o los ojos secos, manchas en la piel, sensibilidad al sol o lesiones de psoriasis?", "util", "“Los ojos un poco secos. Lo demás no.”", "Orienta al diferencial con lupus, Sjögren o artritis psoriásica."),
    act("tabaco", "¿Fuma?", "util", "“Medio atado por día.”", "El tabaco es el principal factor de riesgo ambiental y empeora el pronóstico."),
    act("viajes", "¿Hace cuánto que no se toma vacaciones?", "neutro", "“Años.”", "No orienta."),
  ],
  exam: [
    act("manos", "Examen de manos y muñecas", "clave", "Tumefacción blanda en 2.ª y 3.ª MCF e IFP de ambas manos y en las muñecas; dolor a la compresión lateral de las MCF.", "Sinovitis simétrica de pequeñas articulaciones."),
    act("pies", "Compresión de las metatarsofalángicas", "util", "Dolor bilateral a la compresión.", "Las MTF se afectan temprano y suman en los criterios."),
    act("nodulos", "Buscar nódulos reumatoideos y deformidades", "util", "Sin nódulos ni deformidades.", "Las deformidades (cuello de cisne, ráfaga cubital) aparecen en la enfermedad avanzada."),
    act("heberden", "Buscar nódulos de Heberden y Bouchard", "util", "Ausentes; las interfalángicas distales están respetadas.", "La artrosis de manos afecta las IFD y da nódulos óseos duros."),
  ],
  studies: [
    study("Laboratorio", "fr", "Factor reumatoideo y anticuerpos anti-péptido citrulinado (anti-CCP)", "clave", "FR positivo 98 UI/ml; anti-CCP positivo alto.", "El anti-CCP es muy específico y predice enfermedad erosiva; suma puntos en los criterios ACR/EULAR 2010."),
    study("Laboratorio", "reactantes", "Eritrosedimentación y PCR", "clave", "ERS 48 mm/h, PCR 22 mg/l.", "Reactantes altos: suman en los criterios y sirven para seguir la actividad."),
    study("Imágenes", "rx", "Radiografía de manos y pies", "clave", "Osteopenia yuxtaarticular, sin erosiones.", "Basal para comparar; las erosiones definen daño estructural."),
    study("Laboratorio", "basal", "Hemograma, hepatograma, función renal y serologías de hepatitis B, C y VIH", "util", "Hb 11,5; resto normal. Serologías negativas.", "Necesarias antes de empezar metotrexato."),
    study("Laboratorio", "ana", "Anticuerpos antinucleares", "util", "Negativos.", "Ayudan a descartar lupus."),
    study("Laboratorio", "uricemia", "Ácido úrico", "innecesario", "Normal.", "La gota no da poliartritis simétrica de manos en una mujer de 45 años."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ar", "Artritis reumatoidea temprana", true, "Poliartritis simétrica de pequeñas articulaciones de más de 6 semanas, rigidez matinal prolongada, FR y anti-CCP positivos y reactantes altos: cumple los criterios ACR/EULAR 2010."),
      dx("artrosis", "Artrosis de manos", false, "Afecta IFD e IFP con nódulos óseos, rigidez breve y dolor mecánico, sin reactantes ni anticuerpos."),
      dx("lupus", "Lupus eritematoso sistémico", false, "Artritis no erosiva con manifestaciones cutáneas, serositis, citopenias y ANA positivos."),
      dx("viral", "Artritis viral (parvovirus, chikungunya)", false, "Es autolimitada en semanas; en Argentina la chikungunya puede dar artralgias prolongadas, pero no con anti-CCP positivo."),
      dx("psoriasica", "Artritis psoriásica", false, "Asimétrica, con compromiso de IFD, dactilitis y psoriasis cutánea o ungueal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("derivar", "Derivación temprana a reumatología (ventana de oportunidad)", "clave", "Tratar en los primeros meses cambia la evolución: menos erosiones y discapacidad."),
      mg("mtx", "Metotrexato semanal con ácido fólico", "clave", "Fármaco modificador de primera línea."),
      mg("puente", "Corticoide en dosis bajas por un tiempo corto como puente, y AINE para los síntomas", "util", "Controlan la inflamación mientras actúa el metotrexato (que tarda semanas)."),
      mg("tabaco", "Cesación tabáquica y vacunas antes de inmunosuprimir", "clave", "El tabaco empeora la enfermedad; vacunas (gripe, neumococo, hepatitis B) antes del tratamiento."),
      mg("corticoide-largo", "Corticoides en dosis altas como único tratamiento a largo plazo", "riesgoso", "No frenan el daño articular y causan osteoporosis, diabetes, infecciones y riesgo cardiovascular."),
      mg("mtx-diario", "Metotrexato diario", "riesgoso", "El metotrexato para AR es semanal: tomarlo a diario causa toxicidad grave (pancitopenia, mucositis), un error de medicación frecuente."),
      mg("aines-solos", "AINE solos y control en un año", "innecesario", "Calman el dolor pero no frenan la enfermedad: se pierde la ventana de oportunidad."),
    ],
  },
  debrief: {
    diagnosis: "Artritis reumatoidea temprana seropositiva (FR y anti-CCP), sin erosiones, en mujer de 45 años fumadora.",
    pathologies: [
      { name: "Artritis reumatoidea", role: "principal", why: "Poliartritis simétrica con autoanticuerpos." },
      { name: "Anemia de procesos crónicos", role: "asociada", why: "Hb 11,5 por la inflamación." },
      { name: "Artrosis de manos", role: "diferencial", why: "La causa más común de dolor en manos." },
      { name: "Lupus y artritis psoriásica", role: "diferencial", why: "Otras poliartritis inflamatorias." },
      { name: "Artritis viral", role: "diferencial", why: "Autolimitada en semanas." },
    ],
    reasoning: [
      "Causa: predisposición genética (HLA-DR4, epítope compartido) y factores ambientales, sobre todo el tabaco, que favorece la citrulinación de proteínas.",
      "Mecanismo: se pierde la tolerancia y aparecen anticuerpos contra proteínas citrulinadas. La sinovial se inflama y prolifera (pannus) con linfocitos, macrófagos y citoquinas (TNF, IL-6).",
      "Consecuencia: sinovitis simétrica de pequeñas articulaciones con rigidez matinal; el pannus erosiona cartílago y hueso → deformidades y discapacidad. Las citoquinas dan cansancio, anemia y más riesgo cardiovascular.",
      "El daño más rápido ocurre en los primeros dos años: por eso el tratamiento temprano es la clave.",
    ],
    epidemiology:
      "La artritis reumatoidea afecta a cerca del 0,5–1 % de la población; en la Argentina los estudios de prevalencia muestran cifras similares. Es 3 veces más frecuente en mujeres, con un pico entre los 30 y los 50 años. El tabaco es el principal factor de riesgo ambiental.",
    management: [
      "Sospechar ante artritis de más de 6 semanas en más de 3 articulaciones, de manos o con rigidez matinal prolongada: derivar en forma temprana.",
      "Laboratorio: FR, anti-CCP, reactantes y estudios previos al tratamiento; radiografía de manos y pies.",
      "Metotrexato semanal con ácido fólico como primera línea; corticoides en dosis bajas como puente.",
      "Objetivo de remisión o baja actividad (estrategia “treat to target”); biológicos si no se alcanza.",
      "Cesación tabáquica, vacunas, control del riesgo cardiovascular y de la osteoporosis.",
    ],
    sources: [
      "Sociedad Argentina de Reumatología — Guías de práctica clínica en el tratamiento de la artritis reumatoidea.",
      "Criterios de clasificación ACR/EULAR 2010.",
    ],
    pearls: [
      "Rigidez matinal > 1 h + poliartritis simétrica de manos: pensá en AR.",
      "Anti-CCP: el anticuerpo más específico.",
      "Metotrexato: una vez por semana, nunca a diario.",
    ],
    pitfalls: ["Esperar a que aparezcan deformidades para derivar.", "Corticoides como tratamiento único.", "Confundir AR con artrosis."],
  },
};
