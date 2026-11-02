import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const mastitis: ClinicalCase = {
  id: "mastitis-puerperal",
  level: 1,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 28, ageUnit: "años", sex: "F", context: "Puérpera de 3 semanas; amamanta a su primer bebé." },
  frequency: "frecuente",
  intro: "“Tengo el pecho derecho rojo, duro y me duele mucho. Ayer a la noche tuve fiebre con escalofríos. Me dijeron que deje de dar la teta.”",
  vitals: { TA: "112/70 mmHg", FC: "98 lpm", FR: "16 rpm", "T°": "38,6 °C" },
  anamnesis: [
    act("lactancia", "¿Cómo está dando la teta? ¿Le duelen los pezones? ¿El bebé se prende bien?", "clave", "“Me duelen y tengo grietas. A veces lo dejo pasar muchas horas porque duerme.”", "Las grietas y el vaciamiento incompleto son la causa principal."),
    act("tiempo", "¿Desde cuándo y cómo empezó?", "clave", "“Un bulto doloroso hace dos días, ayer se puso rojo y vino la fiebre.”", "Estasis láctea que evoluciona a mastitis."),
    act("bebe", "¿Cómo está el bebé? ¿Sube de peso?", "util", "“Bien, aumentó en el control.”", "La lactancia es eficaz; se puede seguir."),
    act("alergia", "¿Sos alérgica a algún antibiótico?", "clave", "“No.”", "Define el antibiótico."),
    act("cesarea", "¿Tuviste parto o cesárea? ¿Cómo está la herida o los loquios?", "util", "“Parto normal, todo bien.”", "Descarta otras fuentes de fiebre puerperal (endometritis)."),
    act("piernas", "¿Te duelen las piernas o te cuesta respirar?", "util", "“No.”", "Descarta trombosis venosa en el puerperio."),
    act("barrio", "¿Dónde vivís?", "neutro", "“En Villa Allende.”", "No orienta."),
  ],
  exam: [
    act("mama", "Examen mamario", "clave", "Cuadrante superoexterno derecho eritematoso, caliente, indurado y doloroso; sin fluctuación.", "Mastitis sin absceso clínico."),
    act("pezon", "Pezones", "clave", "Grietas bilaterales.", "Puerta de entrada del Staphylococcus aureus."),
    act("toma", "Observar una toma", "util", "Prendida superficial, sin boca bien abierta.", "Corregir la técnica previene recurrencias."),
    act("utero", "Útero y loquios", "util", "Útero involucionado, loquios normales.", "Descarta endometritis."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía mamaria", "util", "Sin colecciones.", "Indicada si no mejora en 48 h o hay fluctuación, para descartar absceso."),
    study("Microbiología", "cultivo", "Cultivo de leche", "innecesario", "No se realizó.", "Se reserva para casos graves, recurrentes o sin respuesta."),
    study("Imágenes", "mamografia", "Mamografía", "innecesario", "No se realizó.", "No está indicada en la mastitis puerperal."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("mastitis", "Mastitis puerperal aguda sin absceso", true, "Puérpera que amamanta con grietas y vaciamiento irregular, con área mamaria roja, caliente e indurada y fiebre, sin fluctuación."),
      dx("absceso", "Absceso mamario", false, "No hay fluctuación ni colección en la ecografía."),
      dx("congestion", "Congestión mamaria", false, "Es bilateral, difusa y sin fiebre alta."),
      dx("inflamatorio", "Cáncer de mama inflamatorio", false, "Se piensa si no mejora con el tratamiento; acá el contexto es típico de mastitis."),
      dx("endometritis", "Endometritis puerperal", false, "Útero y loquios normales."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("seguir", "Seguir amamantando y vaciar bien la mama afectada (empezar por ese lado o extraer leche)", "clave", "El vaciamiento es la base del tratamiento; la leche no daña al bebé."),
      mg("atb", "Antibiótico activo contra estafilococo (cefalexina o amoxicilina-clavulánico) por 10–14 días", "clave", "Con fiebre y signos de infección se indica antibiótico."),
      mg("analgesia", "Ibuprofeno o paracetamol, y frío local entre tomas", "clave", "Alivian el dolor y la inflamación; son compatibles con la lactancia."),
      mg("tecnica", "Corregir la prendida y control en 48 h", "util", "Previene recurrencias y detecta abscesos."),
      mg("suspender", "Suspender la lactancia", "riesgoso", "Empeora la estasis, favorece el absceso y priva al bebé de la leche materna."),
      mg("cabergolina", "Inhibir la lactancia con cabergolina", "riesgoso", "No hay indicación."),
    ],
  },
  debrief: {
    diagnosis: "Mastitis puerperal aguda de la mama derecha sin absceso, en puérpera de 3 semanas con grietas y vaciamiento irregular.",
    pathologies: [
      { name: "Mastitis puerperal", role: "principal", why: "Inflamación infecciosa de la mama durante la lactancia." },
      { name: "Grietas del pezón y prendida incorrecta", role: "asociada", why: "Causas a corregir." },
      { name: "Absceso, congestión, cáncer inflamatorio", role: "diferencial", why: "Se descartan por la clínica y la evolución." },
    ],
    reasoning: [
      "Causa: estasis de leche por vaciamiento incompleto y entrada de Staphylococcus aureus por las grietas.",
      "Mecanismo: la leche retenida inflama el tejido y favorece la proliferación bacteriana.",
      "Consecuencia: dolor, eritema, induración y fiebre; si no se trata, absceso.",
    ],
    epidemiology:
      "La mastitis afecta a entre el 3 y el 20 % de las mujeres que amamantan, sobre todo en las primeras seis semanas. Es una causa frecuente de abandono innecesario de la lactancia, que es clave para la salud del bebé y de la madre.",
    management: [
      "Vaciamiento frecuente y eficaz; continuar la lactancia.",
      "Analgesia, antiinflamatorios y frío local.",
      "Antibiótico antiestafilocócico si hay fiebre, síntomas por más de 24 h o grietas infectadas.",
      "Ecografía si no mejora en 48–72 h: un absceso requiere drenaje (punción o cirugía).",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de lactancia materna.", "Sociedad Argentina de Pediatría — Recomendaciones sobre lactancia."],
    pearls: ["En la mastitis se sigue amamantando.", "Estafilococo: cefalexina.", "Sin mejoría en 48 h: buscar absceso."],
    pitfalls: ["Indicar suspender la lactancia.", "No revisar la técnica."],
    tribunal: [
      qa("¿Cuándo se contraindica la lactancia materna?", "Muy pocas veces: VIH en Argentina (se recomienda no amamantar), HTLV-1 y 2, galactosemia clásica en el bebé, algunos fármacos (quimioterápicos, radiofármacos) y consumo activo de drogas. La mastitis, la mayoría de las infecciones y casi todos los fármacos son compatibles."),
      qa("¿Qué diferencia la congestión mamaria de la mastitis?", "La congestión es bilateral, difusa, aparece en los primeros días por la bajada de la leche y no da fiebre alta; la mastitis suele ser unilateral, localizada, con eritema y fiebre."),
      qa("¿Qué beneficios tiene la lactancia materna?", "Para el bebé: menos infecciones (diarrea, respiratorias, otitis), menos muerte súbita, obesidad y diabetes; para la madre: menos cáncer de mama y de ovario y menos diabetes. Se recomienda exclusiva hasta los 6 meses y complementada hasta los 2 años o más."),
    ],
  },
};
