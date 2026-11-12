import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hematomaSubduralCronico: ClinicalCase = {
  id: "hematoma-subdural-cronico",
  level: 2,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 81, ageUnit: "años", sex: "M", context: "Toma aspirina y clopidogrel por un stent. Bebe vino a diario. Se cayó en el patio hace un mes." },
  frequency: "frecuente",
  intro: "“Hace dos semanas está más dormido, se olvida de todo y arrastra la pierna izquierda. Pensamos que era la edad.” (relata la hija)",
  vitals: { TA: "152/86 mmHg", FC: "72 lpm", FR: "16 rpm", "T°": "36,4 °C", "SatO₂": "96 %", Glucemia: "108 mg/dl", Glasgow: "14/15" },
  anamnesis: [
    act("caida", "¿Se golpeó la cabeza en las últimas semanas?", "clave", "“Hace un mes, una caída que parecía leve.”", "Un traumatismo menor basta en mayores."),
    act("antiagregantes", "¿Toma aspirina, clopidogrel o anticoagulantes?", "clave", "“Los dos antiagregantes.”", "Aumentan el riesgo de sangrado."),
    act("evolucion", "¿Los síntomas fueron progresivos o fluctúan?", "clave", "“Van y vienen, pero empeoran.”", "Curso subagudo y fluctuante."),
    act("cefalea", "¿Dolor de cabeza o vómitos?", "util", "“Dolor de cabeza.”", "Hipertensión endocraneana."),
    act("alcohol", "¿Cuánto vino toma?", "util", "“Medio litro por día.”", "Atrofia y caídas."),
    act("cancha", "¿De qué cuadro es?", "neutro", "“De River.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico", "clave", "Hemiparesia izquierda leve, desorientado.", "Foco contralateral."),
    act("pupilas", "Pupilas y fondo de ojo", "clave", "Pupilas iguales, reactivas.", "Sin herniación."),
    act("cabeza", "Cuero cabelludo", "util", "Sin heridas actuales.", "El golpe pudo ser leve."),
  ],
  studies: [
    study("Imágenes", "tc", "TC de cerebro sin contraste", "clave", "Colección hipodensa en semiluna frontoparietal derecha, con desvío de línea media de 8 mm.", "Diagnóstico."),
    study("Laboratorio", "coag", "Hemograma, plaquetas, coagulograma, función renal", "clave", "Plaquetas normales; coagulograma normal.", "Prequirúrgico."),
    study("Laboratorio", "ionograma", "Ionograma y glucemia", "util", "Sodio normal.", "Excluye causas metabólicas."),
    study("Otros", "puncion", "Punción lumbar", "riesgoso", "No se realizó.", "Contraindicada con efecto de masa."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("subdural", "Hematoma subdural crónico con efecto de masa", true, "Caída previa, antiagregantes, deterioro subagudo y semiluna hipodensa."),
      dx("demencia", "Demencia", false, "El curso es de semanas y hay foco."),
      dx("acv", "ACV isquémico", false, "No es súbito y la TC muestra una colección."),
      dx("epidural", "Hematoma epidural", false, "Es agudo, biconvexo y con intervalo lúcido."),
      dx("tumor", "Tumor cerebral", false, "La imagen es extraaxial en semiluna."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Neurocirugía: drenaje por trépanos", "clave", "Síntomas y efecto de masa."),
      mg("antiagregantes", "Suspender antiagregantes evaluando el riesgo del stent con cardiología", "clave", "Balance de riesgos."),
      mg("caidas", "Prevención de caídas y consejo sobre alcohol", "clave", "Evita recurrencias."),
      mg("convulsiones", "Vigilar convulsiones y recurrencia", "util", "Complicaciones."),
      mg("alta", "Alta con diagnóstico de demencia", "riesgoso", "Es tratable y puede empeorar."),
      mg("anticoagular", "Agregar anticoagulante por la hemiparesia", "riesgoso", "Aumenta el sangrado."),
    ],
  },
  debrief: {
    diagnosis: "Hematoma subdural crónico frontoparietal derecho con efecto de masa, en varón de 81 años con doble antiagregación.",
    pathologies: [
      { name: "Hematoma subdural crónico", role: "principal", why: "Colección entre duramadre y aracnoides." },
      { name: "Antiagregación, alcohol y caídas", role: "asociada", why: "Factores de riesgo." },
      { name: "Demencia, ACV, tumor", role: "diferencial", why: "Otras causas de deterioro." },
    ],
    reasoning: [
      "Causa: rotura de venas puente tras un traumatismo menor.",
      "Mecanismo: la atrofia cerebral estira las venas; la colección crece con sangrados repetidos.",
      "Consecuencia: deterioro cognitivo, foco y efecto de masa.",
    ],
    epidemiology:
      "Es frecuente en adultos mayores, sobre todo varones, con atrofia, alcohol y antitrombóticos. La caída inicial muchas veces no se recuerda. Es una causa tratable de deterioro cognitivo, y por eso hay que pensar en ella antes de rotular una demencia.",
    management: [
      "TC ante deterioro subagudo en mayores.",
      "Revisar antitrombóticos.",
      "Drenaje si hay síntomas o efecto de masa.",
      "Prevención de caídas.",
    ],
    sources: ["Sociedad Argentina de Neurocirugía — Hematoma subdural crónico.", "NICE — Head Injury Guideline."],
    pearls: ["Mayor que empeora en semanas: pedí TC.", "Semiluna hipodensa.", "Demencia tratable."],
    pitfalls: ["Atribuirlo a la edad.", "No preguntar por caídas."],
    tribunal: [
      qa("¿Cómo diferenciás hematoma epidural y subdural en la TC?", "Epidural: biconvexo, no cruza suturas. Subdural: en semiluna, cruza suturas."),
      qa("¿Qué vasos sangran en cada uno?", "En el epidural, la arteria meníngea media; en el subdural, las venas puente."),
      qa("¿Por qué es hipodenso el crónico?", "Porque la sangre se degrada con el tiempo; el agudo es hiperdenso."),
    ],
  },
};
