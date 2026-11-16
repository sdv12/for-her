import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const lesionMenisco: ClinicalCase = {
  id: "lesion-menisco",
  level: 2,
  area: "Traumatología",
  setting: "Consultorio",
  patient: { age: 32, ageUnit: "años", sex: "M", context: "Juega al fútbol 5 dos veces por semana. Hace 3 semanas giró con el pie apoyado." },
  frequency: "muy-frecuente",
  intro: "“Me duele la rodilla por adentro y a veces se me traba. Tengo que moverla para que se destrabe.”",
  vitals: { TA: "124/78 mmHg", FC: "68 lpm" },
  anamnesis: [
    act("mecanismo", "¿Cómo se lesionó?", "clave", "“Giré con el pie clavado y sentí un dolor por dentro.”", "Torsión en carga: mecanismo meniscal."),
    act("bloqueo", "¿Se le traba la rodilla?", "clave", "“Sí, se queda sin poder estirarla un rato.”", "Bloqueo mecánico."),
    act("hinchazon", "¿Se hinchó? ¿Rápido o al día siguiente?", "clave", "“Al día siguiente.”", "Derrame tardío: menisco. El inmediato sugiere hemartrosis por LCA."),
    act("inestabilidad", "¿Se le va la rodilla?", "clave", "“No.”", "Hace menos probable lesión del LCA."),
    act("cuclillas", "¿Puede ponerse en cuclillas?", "util", "“Me duele mucho.”", "Típico."),
    act("posicion", "¿De qué juega?", "neutro", "“Arquero.”", "No orienta."),
  ],
  exam: [
    act("interlinea", "Palpación de la interlínea articular", "clave", "Dolor en la interlínea interna.", "Signo sensible."),
    act("mcmurray", "McMurray y Thessaly", "clave", "Positivos con chasquido doloroso medial.", "Sugieren rotura del menisco interno."),
    act("lachman", "Lachman y cajón anterior", "clave", "Negativos.", "LCA íntegro."),
    act("derrame", "Derrame", "util", "Leve.", "Compatible."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de rodilla", "util", "Normal.", "Descarta fractura y artrosis."),
    study("Imágenes", "rmn", "Resonancia magnética de rodilla", "clave", "Rotura en asa de balde del menisco interno.", "Confirma el tipo de lesión."),
    study("Otros", "artroscopia-diagnostica", "Artroscopía solo para diagnosticar", "innecesario", "No se hizo.", "La resonancia es suficiente."),
    study("Laboratorio", "lab", "Laboratorio inflamatorio", "innecesario", "No se pidió.", "Lesión mecánica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("menisco", "Rotura en asa de balde del menisco interno con bloqueos", true, "Torsión en carga, dolor en la interlínea interna, bloqueos, McMurray positivo y resonancia confirmatoria."),
      dx("lca", "Rotura del LCA", false, "Lachman negativo y sin inestabilidad."),
      dx("lli", "Esguince del ligamento lateral interno", false, "El valgo forzado no reproduce y hay bloqueos."),
      dx("condromalacia", "Condromalacia rotuliana", false, "Dolor anterior, sin bloqueos."),
      dx("baker", "Quiste de Baker", false, "Es posterior y no da bloqueos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("artroscopia", "Artroscopía con sutura meniscal (o meniscectomía parcial si no es reparable)", "clave", "El asa de balde con bloqueo es indicación quirúrgica; en jóvenes se intenta reparar."),
      mg("kinesio", "Rehabilitación posquirúrgica", "clave", "Recuperar fuerza y movilidad."),
      mg("hielo", "Hielo y analgesia mientras tanto", "util", "Síntomas."),
      mg("deporte", "Evitar el fútbol hasta la cirugía", "util", "Previene más daño."),
      mg("meniscectomia-total", "Meniscectomía total", "riesgoso", "Lleva a artrosis precoz."),
      mg("infiltrar", "Infiltración con corticoide", "innecesario", "No resuelve un bloqueo mecánico."),
    ],
  },
  debrief: {
    diagnosis: "Rotura en asa de balde del menisco interno con bloqueos, en un hombre de 32 años.",
    pathologies: [
      { name: "Rotura meniscal en asa de balde", role: "principal", why: "Fragmento desplazado que bloquea la articulación." },
      { name: "Lesión del LCA", role: "diferencial", why: "Asociada con frecuencia." },
      { name: "Esguince del LLI", role: "diferencial", why: "Dolor interno." },
    ],
    reasoning: [
      "Causa: torsión con la rodilla flexionada y el pie apoyado.",
      "Mecanismo: el menisco queda atrapado entre fémur y tibia y se rompe.",
      "Consecuencia: dolor, derrame tardío y bloqueos; a largo plazo, artrosis.",
    ],
    epidemiology:
      "Las lesiones meniscales son de las más frecuentes de la rodilla. En jóvenes son traumáticas y deportivas; en mayores de 40 suelen ser degenerativas y muchas veces no requieren cirugía. El menisco interno se lesiona más que el externo.",
    management: [
      "Examen físico.",
      "Resonancia.",
      "Artroscopía si hay bloqueo o lesión reparable.",
      "Preservar el menisco.",
    ],
    sources: ["Asociación Argentina de Artroscopía — Lesiones meniscales.", "ESSKA — Meniscus Consensus."],
    pearls: ["Torsión + bloqueo = menisco.", "Derrame tardío.", "Preservá el menisco."],
    pitfalls: ["Meniscectomía total.", "Operar roturas degenerativas sin síntomas mecánicos."],
    tribunal: [
      qa("¿Qué diferencia el derrame de una lesión meniscal del de una lesión del LCA?", "El meniscal aparece en horas o al día siguiente; el del LCA es inmediato y hemático."),
      qa("¿Por qué se intenta reparar el menisco en jóvenes?", "Porque reparte cargas y protege el cartílago; extirparlo lleva a artrosis precoz."),
      qa("¿Qué es la tríada de O'Donoghue?", "Lesión combinada de LCA, ligamento lateral interno y menisco interno."),
    ],
  },
};
