import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const melanoma: ClinicalCase = {
  id: "melanoma-cutaneo",
  level: 2,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 52, ageUnit: "años", sex: "F", context: "Piel clara. Agricultora. Se bronceó muchos años sin protección." },
  frequency: "poco-frecuente",
  intro: "“Tengo un lunar en la pierna que cambió. Se hizo más grande y ahora a veces me sangra.”",
  vitals: { TA: "122/76 mmHg", FC: "76 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("cambio", "¿Cómo cambió? ¿En cuánto tiempo?", "clave", "“En seis meses creció y se oscureció en partes.”", "La evolución es el criterio más importante."),
    act("sol", "¿Cuánta exposición solar tuviste? ¿Quemaduras con ampollas de chica?", "clave", "“Muchas, trabajo al sol.”", "Factor de riesgo principal."),
    act("familia", "¿Algún familiar con melanoma?", "clave", "“Mi hermano.”", "Mayor riesgo."),
    act("nevos", "¿Tenés muchos lunares?", "util", "“Unos cuantos.”", "Muchos nevos aumentan el riesgo."),
    act("sintomas", "¿Bajaste de peso? ¿Bultos en la ingle?", "util", "“No.”", "Busca diseminación."),
    act("animal", "¿Tenés animales en el campo?", "neutro", "“Vacas.”", "No orienta."),
  ],
  exam: [
    act("abcde", "Lesión con criterios ABCDE", "clave", "Lesión de 11 mm, asimétrica, bordes irregulares, varios colores, sobreelevada en un sector.", "Cumple los cinco criterios."),
    act("ganglios", "Ganglios inguinales", "clave", "Sin adenopatías palpables.", "Clínicamente sin ganglios."),
    act("piel", "Revisar toda la piel", "util", "Sin otras lesiones sospechosas.", "Puede haber múltiples lesiones."),
  ],
  studies: [
    study("Otros", "dermatoscopia", "Dermatoscopía", "clave", "Red pigmentaria atípica, velo azul-blanquecino.", "Aumenta la sospecha."),
    study("Otros", "biopsia", "Biopsia excisional con margen de 1 a 3 mm", "clave", "Melanoma de extensión superficial, Breslow 1,6 mm, sin ulceración.", "Permite medir el espesor, el dato pronóstico clave."),
    study("Otros", "centinela", "Biopsia de ganglio centinela", "clave", "Negativo.", "Se indica por el espesor mayor de 0,8 mm."),
    study("Otros", "shave", "Raspado superficial o electrocoagulación de la lesión", "riesgoso", "No se realizó.", "Impide medir el Breslow."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("melanoma", "Melanoma cutáneo de extensión superficial, Breslow 1,6 mm, sin metástasis ganglionar", true, "Lesión con ABCDE positivo, dermatoscopía atípica y biopsia que confirma."),
      dx("nevo", "Nevo displásico", false, "La biopsia muestra melanoma."),
      dx("seborreica", "Queratosis seborreica", false, "Aspecto pegado, sin cambio rápido ni atipia."),
      dx("basocelular", "Carcinoma basocelular pigmentado", false, "Aspecto perlado, con telangiectasias."),
      dx("hematoma", "Hematoma subungueal o traumático", false, "No hay trauma ni evolución compatible."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ampliacion", "Ampliación quirúrgica de márgenes (1 a 2 cm según Breslow)", "clave", "Reduce la recurrencia local."),
      mg("seguimiento", "Control dermatológico periódico y autoexamen", "clave", "Alto riesgo de recurrencia y de nuevos melanomas."),
      mg("prevencion", "Fotoprotección, y evaluar a familiares de primer grado", "clave", "Prevención primaria y secundaria."),
      mg("quimio", "Quimioterapia de rutina en esta etapa", "innecesario", "No está indicada en etapa sin ganglios afectados de bajo riesgo."),
      mg("observar", "Controlar la lesión en un año", "riesgoso", "Demorar empeora mucho el pronóstico."),
      mg("onco", "Discutir en comité oncológico; inmunoterapia si hay enfermedad avanzada", "util", "Cambió el pronóstico de la enfermedad avanzada."),
    ],
  },
  debrief: {
    diagnosis: "Melanoma de extensión superficial en pierna, Breslow 1,6 mm, ganglio centinela negativo, en mujer de 52 años.",
    pathologies: [
      { name: "Melanoma cutáneo", role: "principal", why: "Tumor maligno de melanocitos." },
      { name: "Riesgo de metástasis", role: "asociada", why: "Depende del espesor." },
      { name: "Nevo displásico, queratosis seborreica, basocelular pigmentado", role: "diferencial", why: "Otras lesiones pigmentadas." },
    ],
    reasoning: [
      "Causa: daño por radiación ultravioleta con mutaciones como BRAF.",
      "Mecanismo: proliferación de melanocitos atípicos, primero radial y luego vertical en la dermis.",
      "Consecuencia: la invasión vertical aumenta el riesgo de metástasis linfática y hematógena.",
    ],
    epidemiology:
      "Es menos frecuente que los carcinomas de piel, pero causa la mayoría de las muertes por cáncer cutáneo. Afecta más a personas de piel clara con exposición intermitente intensa y quemaduras. En mujeres es más común en piernas, y en varones, en el tronco.",
    management: [
      "ABCDE y dermatoscopía ante lesiones que cambian.",
      "Biopsia excisional completa, no raspado.",
      "Ampliación de márgenes según Breslow y centinela si corresponde.",
      "Seguimiento, fotoprotección e inmunoterapia en enfermedad avanzada.",
    ],
    sources: ["Sociedad Argentina de Dermatología — Consenso de melanoma.", "Instituto Nacional del Cáncer — Prevención del cáncer de piel."],
    pearls: ["ABCDE: asimetría, bordes, color, diámetro, evolución.", "El Breslow es el principal factor pronóstico.", "Signo del patito feo: la lesión distinta a las demás."],
    pitfalls: ["Hacer shave o electrocoagular.", "Esperar para biopsiar."],
    tribunal: [
      qa("¿Qué mide el índice de Breslow?", "El espesor del tumor en milímetros, desde la capa granulosa hasta el punto más profundo de invasión; es el principal factor pronóstico."),
      qa("¿Qué tipos de melanoma existen?", "Extensión superficial (el más frecuente), nodular (el de mayor crecimiento vertical), lentigo maligno (zonas crónicas de sol) y acral lentiginoso (palmas, plantas, uñas)."),
      qa("¿Cómo diferenciás basocelular de espinocelular?", "El basocelular es perlado con telangiectasias, invade localmente y rara vez da metástasis. El espinocelular es queratósico o ulcerado, y puede dar metástasis."),
    ],
  },
};
