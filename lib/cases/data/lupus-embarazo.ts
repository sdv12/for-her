import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const lupusEmbarazo: ClinicalCase = {
  id: "lupus-brote-embarazo",
  level: 4,
  area: "Reumatología",
  setting: "Internación",
  patient: { age: 29, ageUnit: "años", sex: "F", context: "Lupus con nefritis hace 4 años, en remisión. Suspendió la hidroxicloroquina al quedar embarazada. Embarazo de 24 semanas." },
  frequency: "poco-frecuente",
  intro: "“Me duelen las articulaciones, se me hincharon las piernas, me salieron manchas en la cara y la orina tiene espuma.”",
  vitals: { TA: "148/94 mmHg", FC: "96 lpm", "T°": "37,6 °C", Peso: "70 kg" },
  anamnesis: [
    act("hcq", "¿Qué medicación tomás?", "clave", "“Dejé la hidroxicloroquina al enterarme del embarazo.”", "Suspenderla aumenta los brotes."),
    act("sintomas", "¿Qué síntomas tenés?", "clave", "“Dolor en las manos, manchas en la cara y piernas hinchadas.”", "Brote multisistémico."),
    act("cefalea", "¿Dolor de cabeza, visión borrosa o dolor en la panza alta?", "clave", "“No.”", "Preeclampsia grave."),
    act("bebe", "¿Cómo se mueve el bebé?", "util", "“Bien.”", "Bienestar fetal."),
    act("ro", "¿Te dijeron que tenías anti-Ro?", "util", "“Sí, positivo.”", "Riesgo de bloqueo cardíaco fetal."),
    act("trabajo", "¿Trabajás?", "neutro", "“Soy diseñadora gráfica.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel y articulaciones", "clave", "Eritema malar, sinovitis de manos.", "Actividad lúpica."),
    act("edemas", "Edemas", "clave", "Edemas hasta las rodillas.", "Proteinuria."),
    act("lcf", "Latidos fetales", "util", "140 lpm regulares.", "Sin bloqueo."),
  ],
  studies: [
    study("Laboratorio", "lab", "Proteinuria, sedimento, creatinina, complemento, anti-ADN", "clave", "Proteinuria 3,2 g/día; hematíes dismórficos y cilindros; C3 y C4 bajos; anti-ADN alto.", "Nefritis lúpica activa."),
    study("Laboratorio", "preeclampsia", "Plaquetas, transaminasas, LDH, ácido úrico", "clave", "Normales.", "Diferencial con preeclampsia."),
    study("Imágenes", "eco", "Ecografía obstétrica con doppler y ecocardiografía fetal", "util", "Crecimiento adecuado, sin bloqueo AV.", "Bienestar."),
    study("Otros", "ciclofosfamida", "Ciclofosfamida", "riesgoso", "No se indicó.", "Teratogénica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("brote-nefritis", "Brote lúpico con nefritis activa en el embarazo, tras suspender hidroxicloroquina", true, "Artritis, eritema malar, proteinuria con sedimento activo, complemento bajo y anti-ADN alto."),
      dx("preeclampsia", "Preeclampsia", false, "Sedimento activo, complemento bajo y anti-ADN alto."),
      dx("hellp", "Síndrome HELLP", false, "Plaquetas y enzimas normales."),
      dx("nefrotico-primario", "Síndrome nefrótico primario", false, "Lupus activo conocido."),
      dx("antifosfolipido", "Síndrome antifosfolipídico catastrófico", false, "Sin trombosis múltiples."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hcq", "Reiniciar hidroxicloroquina", "clave", "Segura y reduce brotes."),
      mg("corticoides", "Corticoides y azatioprina o tacrolimus", "clave", "Inmunosupresores compatibles con el embarazo."),
      mg("aspirina", "Aspirina en dosis baja y control de presión", "clave", "Prevención de preeclampsia."),
      mg("equipo", "Manejo conjunto con obstetricia de alto riesgo y nefrología", "util", "Embarazo de alto riesgo."),
      mg("micofenolato", "Micofenolato", "riesgoso", "Teratogénico."),
      mg("ieca", "IECA para la proteinuria", "riesgoso", "Fetotóxicos."),
    ],
  },
  debrief: {
    diagnosis: "Brote lúpico con nefritis activa en embarazada de 24 semanas tras suspender hidroxicloroquina.",
    pathologies: [
      { name: "Nefritis lúpica en brote", role: "principal", why: "Actividad renal del lupus." },
      { name: "Embarazo de alto riesgo con anti-Ro", role: "asociada", why: "Riesgos maternos y fetales." },
      { name: "Preeclampsia, HELLP", role: "diferencial", why: "Superposición clínica." },
    ],
    reasoning: [
      "Causa: suspensión de la hidroxicloroquina y cambios inmunológicos del embarazo.",
      "Mecanismo: inmunocomplejos que se depositan en el glomérulo con consumo de complemento.",
      "Consecuencia: proteinuria, hipertensión y riesgo de pérdida fetal y preeclampsia.",
    ],
    epidemiology:
      "El lupus afecta sobre todo a mujeres en edad fértil. El embarazo con lupus activo o nefritis reciente tiene más riesgo de brote, preeclampsia y prematurez. Suspender la hidroxicloroquina es un error frecuente.",
    management: [
      "Planificar el embarazo.",
      "No suspender hidroxicloroquina.",
      "Diferenciar de preeclampsia.",
      "Inmunosupresores compatibles.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Lupus y embarazo.", "EULAR — Recommendations for Women's Health and Pregnancy in SLE and APS."],
    pearls: ["No suspender hidroxicloroquina.", "Complemento bajo y sedimento activo: lupus.", "Aspirina."],
    pitfalls: ["Micofenolato.", "IECA."],
    tribunal: [
      qa("¿Cómo distinguís brote lúpico de preeclampsia?", "El brote tiene sedimento activo, complemento bajo y anti-ADN alto; la preeclampsia no."),
      qa("¿Qué inmunosupresores son seguros?", "Hidroxicloroquina, azatioprina, tacrolimus, ciclosporina y corticoides."),
      qa("¿Qué riesgo tiene el anti-Ro?", "Lupus neonatal y bloqueo cardíaco congénito."),
    ],
  },
};
