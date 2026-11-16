import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const menopausiaQuirurgica: ClinicalCase = {
  id: "menopausia-quirurgica",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 42, ageUnit: "años", sex: "F", context: "Hace 2 meses le sacaron útero y ambos ovarios por endometriosis grave. No tiene antecedente de cáncer." },
  frequency: "frecuente",
  intro: "“Tengo calores todo el día, no duermo, estoy irritable y las relaciones me duelen.”",
  vitals: { TA: "124/78 mmHg", FC: "80 lpm", Peso: "64 kg" },
  anamnesis: [
    act("sofocos", "¿Cuántos sofocos por día?", "clave", "“Más de quince, me despiertan.”", "Síntomas vasomotores intensos."),
    act("cirugia", "¿Qué le sacaron exactamente?", "clave", "“Útero y los dos ovarios.”", "Menopausia quirúrgica: caída brusca de estrógenos."),
    act("contraindicaciones", "¿Trombosis, cáncer de mama, hígado, migraña con aura?", "clave", "“Nada de eso.”", "Contraindicaciones de la terapia hormonal."),
    act("sexual", "¿Sequedad vaginal?", "util", "“Mucha.”", "Síndrome genitourinario."),
    act("endometriosis-residual", "¿Le dejaron endometriosis?", "util", "“Me dijeron que se sacó casi todo.”", "Importa para elegir el esquema."),
    act("deporte", "¿Hace deporte?", "neutro", "“Pilates.”", "No orienta."),
  ],
  exam: [
    act("general", "Examen general y mamario", "clave", "Normal.", "Basal antes de hormonas."),
    act("vulva", "Genitales", "util", "Mucosa vaginal pálida y seca.", "Atrofia."),
    act("ta", "Presión", "util", "Normal.", "Basal."),
  ],
  studies: [
    study("Imágenes", "mamografia", "Mamografía", "clave", "BI-RADS 1.", "Antes de la terapia hormonal."),
    study("Laboratorio", "lipidos", "Perfil lipídico y glucemia", "util", "Normales.", "Basal."),
    study("Imágenes", "densitometria", "Densitometría basal", "util", "Normal.", "Riesgo de osteoporosis precoz."),
    study("Laboratorio", "fsh", "FSH para confirmar la menopausia", "innecesario", "No se pidió.", "Sin ovarios, el diagnóstico es obvio."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("menopausia-quirurgica", "Menopausia quirúrgica precoz con síntomas vasomotores y genitourinarios intensos", true, "Ooforectomía bilateral a los 42 con sofocos, insomnio, irritabilidad y sequedad."),
      dx("hipertiroidismo", "Hipertiroidismo", false, "Hay una causa clara de hipoestrogenismo."),
      dx("depresion", "Depresión mayor", false, "Los síntomas son vasomotores y de inicio brusco tras la cirugía."),
      dx("ansiedad", "Trastorno de ansiedad", false, "Hay déficit hormonal."),
      dx("perimenopausia", "Perimenopausia natural", false, "Es quirúrgica y brusca."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("thm", "Terapia hormonal con estrógenos hasta la edad de la menopausia natural (51 años)", "clave", "En menopausia precoz el beneficio supera claramente el riesgo."),
      mg("progestageno", "Agregar progestágeno por la endometriosis previa", "util", "Evita reactivar focos residuales."),
      mg("transdermico", "Preferir la vía transdérmica", "util", "Menos riesgo trombótico."),
      mg("hueso", "Calcio, vitamina D y ejercicio", "clave", "Protección ósea."),
      mg("seguimiento", "Control anual", "util", "Seguimiento."),
      mg("sin-hormonas", "Evitar hormonas por miedo al cáncer", "riesgoso", "Sin tratamiento aumentan el riesgo cardiovascular, óseo y cognitivo."),
      mg("bzd", "Clonazepam para dormir", "riesgoso", "No trata la causa y genera dependencia."),
    ],
  },
  debrief: {
    diagnosis: "Menopausia quirúrgica precoz a los 42 años tras histerectomía y anexectomía bilateral por endometriosis, con síntomas intensos.",
    pathologies: [
      { name: "Menopausia quirúrgica precoz", role: "principal", why: "Cese brusco de la función ovárica." },
      { name: "Síndrome genitourinario", role: "asociada", why: "Hipoestrogenismo." },
      { name: "Endometriosis residual", role: "asociada", why: "Condiciona el esquema hormonal." },
    ],
    reasoning: [
      "Causa: extirpación de ambos ovarios.",
      "Mecanismo: caída brusca de estrógenos, más intensa que en la menopausia natural.",
      "Consecuencia: síntomas intensos y más riesgo cardiovascular, de osteoporosis y deterioro cognitivo.",
    ],
    epidemiology:
      "La menopausia antes de los 45 años aumenta el riesgo de enfermedad cardiovascular, osteoporosis y mortalidad. Las sociedades recomiendan terapia hormonal hasta los 50–51 años si no hay contraindicaciones.",
    management: [
      "Evaluar contraindicaciones.",
      "Estrógenos, idealmente transdérmicos.",
      "Progestágeno si hubo endometriosis.",
      "Hueso y riesgo cardiovascular.",
    ],
    sources: ["Asociación Argentina para el Estudio del Climaterio — Consenso de terapia hormonal.", "The Menopause Society — Hormone therapy position statement."],
    pearls: ["Menopausia precoz: hormonas hasta los 51.", "Endometriosis: sumar progestágeno.", "Transdérmico."],
    pitfalls: ["Negar hormonas por miedo.", "Benzodiacepinas."],
    tribunal: [
      qa("¿Cuáles son las contraindicaciones de la terapia hormonal?", "Cáncer de mama o endometrio, trombosis previa, enfermedad hepática activa, sangrado genital no estudiado y enfermedad coronaria o ACV."),
      qa("¿Por qué se trata la menopausia precoz?", "Porque la falta de estrógenos a edad temprana aumenta el riesgo cardiovascular, de osteoporosis, cognitivo y la mortalidad."),
      qa("¿Por qué se prefiere la vía transdérmica?", "Porque evita el primer paso hepático y no aumenta el riesgo de trombosis."),
    ],
  },
};
