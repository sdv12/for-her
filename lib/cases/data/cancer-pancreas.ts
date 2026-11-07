import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cancerPancreas: ClinicalCase = {
  id: "cancer-de-pancreas",
  level: 3,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 68, ageUnit: "años", sex: "M", context: "Tabaquista. Diabetes tipo 2 diagnosticada hace 5 meses. Sin alcohol." },
  frequency: "frecuente",
  intro: "“Estoy amarillo y me pica todo. La orina me sale oscura y la materia fecal, clara. Bajé 10 kilos.”",
  vitals: { TA: "126/78 mmHg", FC: "84 lpm", "T°": "36,7 °C", Peso: "64 kg", Glucemia: "198 mg/dl" },
  anamnesis: [
    act("ictericia", "¿Fue de a poco? ¿Con fiebre o dolor tipo cólico?", "clave", "“De a poco, sin fiebre ni cólicos.”", "Ictericia indolora progresiva: sospecha de tumor."),
    act("dolor", "¿Tenés dolor?", "clave", "“Un dolor sordo arriba, que va a la espalda.”", "Compromiso retroperitoneal."),
    act("diabetes", "¿Cuándo apareció la diabetes? ¿Trombosis?", "clave", "“Hace 5 meses.”", "Diabetes nueva en mayores puede ser una señal."),
    act("factores", "¿Fumás, tuviste pancreatitis, antecedentes en la familia?", "util", "“Fumo; mi hermana, cáncer de páncreas.”", "Factores de riesgo."),
    act("heces", "¿Las heces flotan o son grasosas?", "util", "“Sí.”", "Insuficiencia exocrina."),
    act("barrio", "¿Dónde vivís?", "neutro", "“En Marcos Juárez.”", "No orienta."),
  ],
  exam: [
    act("ictericia-ex", "Piel y mucosas", "clave", "Ictericia marcada, lesiones de rascado.", "Colestasis."),
    act("courvoisier", "Palpación abdominal", "clave", "Vesícula palpable no dolorosa.", "Signo de Courvoisier-Terrier."),
    act("metastasis", "Ganglios, ascitis, venas", "util", "Sin ascitis; sin adenopatías supraclaviculares.", "Busca enfermedad avanzada."),
  ],
  studies: [
    study("Laboratorio", "hepatograma", "Hepatograma y coagulación", "clave", "Bilirrubina directa 14, FAL alta, RIN 1,5.", "Colestasis con déficit de vitamina K."),
    study("Imágenes", "tc", "TC con protocolo de páncreas", "clave", "Masa de 3 cm en cabeza, doble conducto dilatado, sin metástasis, vena mesentérica libre.", "Diagnóstico y resecabilidad."),
    study("Laboratorio", "ca199", "CA 19-9", "util", "880 U/ml.", "Apoya, no diagnostica, y es normal con colestasis alta."),
    study("Imágenes", "ecoendo", "Ecoendoscopía con punción si no se opera de entrada", "util", "Adenocarcinoma.", "No siempre se requiere antes de cirugía."),
    study("Otros", "percutanea", "Biopsia percutánea de rutina en un tumor resecable", "riesgoso", "No se realizó.", "Riesgo de siembra."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pancreas", "Adenocarcinoma de cabeza de páncreas potencialmente resecable", true, "Ictericia indolora, Courvoisier, diabetes nueva, pérdida de peso y masa con doble conducto."),
      dx("coledoco", "Coledocolitiasis", false, "Da dolor cólico, fiebre y sin masa."),
      dx("hepatitis", "Hepatitis", false, "Patrón colestásico con masa."),
      dx("autoinmune", "Pancreatitis autoinmune", false, "Puede simular, pero sin realce difuso e IgG4."),
      dx("ampolla", "Ampuloma", false, "La masa se ubica en la cabeza."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("whipple", "Derivar a centro de alto volumen para evaluar duodenopancreatectomía con quimioterapia", "clave", "Es la única chance de curación."),
      mg("vitk", "Vitamina K, enzimas pancreáticas e insulina", "clave", "Corrige déficit y síntomas."),
      mg("drenaje", "Drenaje biliar solo si hay colangitis o demora la cirugía", "util", "Evita complicaciones."),
      mg("paliativos", "Cuidados paliativos desde el inicio", "clave", "Dolor, nutrición y comunicación."),
      mg("colecistectomia", "Colecistectomía simple", "riesgoso", "No trata la causa."),
      mg("seguimiento", "Control en 3 meses por la diabetes", "riesgoso", "Pierde la oportunidad de resecar."),
    ],
  },
  debrief: {
    diagnosis: "Adenocarcinoma de cabeza de páncreas con ictericia obstructiva, potencialmente resecable, en varón de 68 años tabaquista.",
    pathologies: [
      { name: "Adenocarcinoma de páncreas", role: "principal", why: "Tumor de los conductos." },
      { name: "Colestasis, diabetes nueva, insuficiencia exocrina", role: "asociada", why: "Consecuencias." },
      { name: "Coledocolitiasis, pancreatitis autoinmune, ampuloma", role: "diferencial", why: "Otras causas de ictericia." },
    ],
    reasoning: [
      "Causa: tabaco, diabetes, obesidad, pancreatitis crónica y genética.",
      "Mecanismo: mutaciones como KRAS; tumor que obstruye colédoco y Wirsung.",
      "Consecuencia: ictericia, malabsorción, dolor; diagnóstico tardío con mal pronóstico.",
    ],
    epidemiology:
      "Tiene una de las sobrevidas más bajas entre todos los cánceres, de menos de 10 % a 5 años, y va en aumento. La mayoría se diagnostica avanzado, y solo 15 a 20 % puede operarse. Es más común en mayores de 60 años.",
    management: [
      "Ictericia indolora: TC con protocolo.",
      "Decidir resecabilidad en comité.",
      "Cirugía y quimioterapia.",
      "Paliativos y control de síntomas.",
    ],
    sources: ["Instituto Nacional del Cáncer — Cáncer de páncreas.", "Asociación Argentina de Cirugía — Relato de cáncer de páncreas."],
    pearls: ["Ictericia indolora con vesícula palpable.", "Diabetes nueva + pérdida de peso.", "Doble conducto en la TC."],
    pitfalls: ["Pedir solo CA 19-9.", "Biopsiar de rutina."],
    tribunal: [
      qa("¿Qué es la ley de Courvoisier?", "Una vesícula palpable e indolora con ictericia sugiere obstrucción maligna y no litiasis, en la que suele estar fibrosada."),
      qa("¿Cómo se diferencia ictericia pre, intra y posthepática?", "Prehepática: indirecta, hemólisis. Intrahepática: transaminasas altas. Posthepática: directa, FAL alta, vías dilatadas."),
      qa("¿Qué es el signo de Trousseau?", "Una tromboflebitis migratoria asociada a cánceres como el de páncreas."),
    ],
  },
};
