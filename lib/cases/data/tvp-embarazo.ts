import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tvpEmbarazo: ClinicalCase = {
  id: "tvp-embarazo",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 31, ageUnit: "años", sex: "F", context: "Embarazo de 29 semanas. Segunda gesta. IMC 33." },
  frequency: "frecuente",
  intro: "“Hace dos días se me hinchó la pierna izquierda entera y me duele al caminar.”",
  vitals: { TA: "112/70 mmHg", FC: "92 lpm", FR: "18 rpm", "T°": "36,8 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("pierna", "¿Qué pierna y desde cuándo?", "clave", "“La izquierda, de golpe hace dos días.”", "Izquierda: típica del embarazo."),
    act("disnea", "¿Falta de aire, dolor de pecho o tos con sangre?", "clave", "“No.”", "TEP."),
    act("antecedentes", "¿Trombosis previas o en la familia?", "clave", "“Mi hermana tuvo una trombosis con las pastillas.”", "Trombofilia posible."),
    act("trauma", "¿Golpe o picadura?", "util", "“No.”", "Celulitis o hematoma."),
    act("embarazo-actual", "¿Cómo viene el embarazo?", "util", "“Bien.”", "Preeclampsia."),
    act("hijo", "¿Cuántos años tiene tu hijo?", "neutro", "“Cuatro.”", "No orienta."),
  ],
  exam: [
    act("pierna-ex", "Miembro inferior izquierdo", "clave", "Edema hasta la ingle, 4 cm más de diámetro en el muslo, dolor en el trayecto venoso.", "TVP proximal."),
    act("piel", "Piel", "clave", "Sin eritema ni calor localizado.", "No es celulitis."),
    act("ta", "Presión y proteinuria", "util", "Normales.", "Sin preeclampsia."),
  ],
  studies: [
    study("Imágenes", "doppler", "Ecografía Doppler venosa con compresión, incluyendo ilíacas", "clave", "Trombosis de vena femoral común e ilíaca externa izquierda.", "Confirma."),
    study("Laboratorio", "lab", "Hemograma, plaquetas, coagulograma, función renal", "clave", "Normales.", "Base para anticoagular."),
    study("Laboratorio", "trombofilia", "Estudio de trombofilia diferido", "util", "Pendiente.", "Antecedente familiar."),
    study("Laboratorio", "dimero", "Dímero D para descartar", "innecesario", "No se realizó.", "En el embarazo está elevado y la sospecha es alta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tvp", "Trombosis venosa profunda iliofemoral izquierda en el embarazo", true, "Edema de toda la pierna izquierda, dolor y Doppler con trombo iliofemoral."),
      dx("edema-fisiologico", "Edema fisiológico del embarazo", false, "Es unilateral y hay trombo."),
      dx("celulitis", "Celulitis", false, "Sin eritema ni calor."),
      dx("baker", "Quiste de Baker roto", false, "El trombo es proximal."),
      dx("preeclampsia", "Preeclampsia", false, "Presión y proteinuria normales."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hbpm", "Heparina de bajo peso molecular en dosis terapéutica", "clave", "No atraviesa la placenta."),
      mg("duracion", "Continuar hasta 6 semanas posparto y al menos 3 meses en total", "clave", "Riesgo persistente."),
      mg("parto", "Planificar el parto con suspensión de la heparina 24 horas antes de la peridural", "clave", "Anestesia neuroaxial."),
      mg("media", "Medias de compresión y deambulación", "util", "Síntomas."),
      mg("warfarina", "Warfarina", "riesgoso", "Teratogénica."),
      mg("doac", "Rivaroxabán o apixabán", "riesgoso", "No recomendados en el embarazo."),
    ],
  },
  debrief: {
    diagnosis: "Trombosis venosa profunda iliofemoral izquierda en embarazada de 29 semanas con obesidad y posible trombofilia familiar.",
    pathologies: [
      { name: "TVP en el embarazo", role: "principal", why: "Estado protrombótico gestacional." },
      { name: "Obesidad y antecedente familiar", role: "asociada", why: "Factores de riesgo." },
      { name: "Edema fisiológico, celulitis", role: "diferencial", why: "Otras causas de pierna hinchada." },
    ],
    reasoning: [
      "Causa: hipercoagulabilidad del embarazo, estasis y obesidad.",
      "Mecanismo: compresión de la vena ilíaca izquierda por la arteria ilíaca derecha y el útero.",
      "Consecuencia: TVP proximal con riesgo de TEP.",
    ],
    epidemiology:
      "El embarazo multiplica varias veces el riesgo de tromboembolismo, y es mayor en el puerperio. Casi el 90 % de las TVP del embarazo son del lado izquierdo. El TEP es una causa importante de muerte materna.",
    management: [
      "Doppler.",
      "Heparina de bajo peso.",
      "Plan del parto.",
      "Posparto.",
    ],
    sources: ["Sociedad Argentina de Hematología — Trombosis y embarazo.", "ASH — Guidelines for Management of Venous Thromboembolism in Pregnancy."],
    pearls: ["Izquierda y proximal.", "Heparina, no warfarina.", "Seguir en el puerperio."],
    pitfalls: ["Dímero D.", "Anticoagulantes orales."],
    tribunal: [
      qa("¿Por qué no se usa warfarina en el embarazo?", "Atraviesa la placenta y produce embriopatía y sangrado fetal."),
      qa("¿Es compatible la heparina con la lactancia?", "Sí, y también la warfarina después del parto."),
      qa("¿Qué es el síndrome de May-Thurner?", "Compresión de la vena ilíaca izquierda por la arteria ilíaca derecha."),
    ],
  },
};
