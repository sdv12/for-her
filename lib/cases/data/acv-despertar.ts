import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const acvDespertar: ClinicalCase = {
  id: "acv-isquemico-al-despertar",
  level: 3,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 66, ageUnit: "años", sex: "M", context: "Hipertenso, diabético, fumador. Lo vieron bien a las 23 horas; se despertó así a las 7." },
  frequency: "frecuente",
  intro: "“Se despertó y no podía hablar ni mover el brazo derecho. Anoche estaba bien.” (relata la esposa, son las 8)",
  vitals: { TA: "178/96 mmHg", FC: "84 lpm (irregular)", FR: "16 rpm", "T°": "36,4 °C", "SatO₂": "96 %", Glucemia: "142 mg/dl" },
  anamnesis: [
    act("ultima-vez", "¿Cuándo lo vieron bien por última vez?", "clave", "“A las 23 horas, antes de dormir.”", "Hora de inicio desconocida: se toma la última vez visto bien (9 horas)."),
    act("anticoag", "¿Toma anticoagulantes?", "clave", "“No.”", "Condiciona la trombólisis."),
    act("palpitaciones", "¿Le dijeron que tenía el corazón irregular?", "util", "“Nunca se controló.”", "Pulso irregular: posible FA no diagnosticada (embólico)."),
    act("previos", "¿Tuvo síntomas parecidos que se fueron solos?", "util", "“Hace un mes, la mano dormida un rato.”", "AIT previo no consultado."),
    act("cirugias", "¿Cirugías o sangrados recientes?", "util", "“No.”", "Contraindicaciones."),
    act("diario", "¿Qué diario lee?", "neutro", "“La Voz.”", "No orienta."),
  ],
  exam: [
    act("nihss", "NIHSS", "clave", "Afasia global, hemiparesia derecha braquiocrural, hemianopsia; NIHSS 18.", "ACV grave de la arteria cerebral media izquierda: posible oclusión de gran vaso."),
    act("glucemia-ex", "Glucemia capilar", "clave", "142.", "Descarta hipoglucemia."),
    act("pulso", "Pulso", "util", "Irregular.", "Sugiere FA."),
  ],
  studies: [
    study("Imágenes", "tc", "Tomografía de cerebro sin contraste", "clave", "Sin hemorragia; ASPECTS 9.", "Descarta sangrado; poco infarto establecido."),
    study("Imágenes", "angiotc", "Angiotomografía de vasos y perfusión (o resonancia)", "clave", "Oclusión de la arteria cerebral media izquierda (M1) con gran área de penumbra.", "Selecciona pacientes para trombectomía hasta 24 h."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "clave", "Fibrilación auricular.", "Causa embólica."),
    study("Laboratorio", "lab", "Laboratorio (coagulación, plaquetas, función renal)", "util", "Normal.", "Antes de tratamientos."),
    study("Otros", "descartar", "Descartar tratamientos de reperfusión por ser “fuera de ventana”", "riesgoso", "No se realizó.", "Con imágenes de perfusión favorables, la trombectomía beneficia hasta 24 h."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("acv-wake-up", "ACV isquémico al despertar por oclusión de la arteria cerebral media izquierda, cardioembólico (FA), con penumbra en imágenes", true, "Déficit grave de ACM izquierda al despertar, TC sin sangre, angiotomografía con oclusión de M1 y penumbra, ECG con FA."),
      dx("hemorragico", "ACV hemorrágico", false, "La tomografía no muestra sangre."),
      dx("todd", "Parálisis de Todd poscrisis", false, "No hubo convulsión y hay oclusión arterial."),
      dx("hipoglucemia", "Hipoglucemia", false, "Glucemia normal."),
      dx("lacunar", "Infarto lacunar", false, "La afasia y la hemianopsia indican compromiso cortical de gran vaso."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("trombectomia", "Trombectomía mecánica (derivación a centro con hemodinamia)", "clave", "En oclusión de gran vaso con penumbra, beneficia hasta 24 h desde la última vez visto bien."),
      mg("ta", "Presión menor de 185/110 antes y menor de 180/105 después del procedimiento", "clave", "Reduce el riesgo de sangrado."),
      mg("unidad", "Unidad de ACV, evaluar deglución, prevención de complicaciones", "clave", "Reduce mortalidad y dependencia."),
      mg("anticoagulacion", "Anticoagulación por la FA más adelante (días según el tamaño del infarto)", "util", "Prevención secundaria."),
      mg("anticoagular-ya", "Heparina en dosis plenas de inmediato", "riesgoso", "Riesgo de transformación hemorrágica en un infarto extenso agudo."),
      mg("bajar-ta", "Bajar la presión a 120/80 de inmediato", "riesgoso", "Reduce la perfusión de la penumbra."),
    ],
  },
  debrief: {
    diagnosis: "ACV isquémico al despertar (última vez visto bien hace 9 horas) por oclusión de la arteria cerebral media izquierda de origen cardioembólico (FA no diagnosticada), NIHSS 18, con penumbra en las imágenes.",
    pathologies: [
      { name: "ACV isquémico de gran vaso", role: "principal", why: "Oclusión de M1 izquierda." },
      { name: "Fibrilación auricular no diagnosticada", role: "asociada", why: "Fuente embólica." },
      { name: "ACV hemorrágico, Todd, hipoglucemia", role: "diferencial", why: "Simuladores." },
    ],
    reasoning: [
      "Causa: émbolo desde la aurícula izquierda en una FA no diagnosticada.",
      "Mecanismo: oclusión de la arteria cerebral media; alrededor del infarto queda tejido en riesgo (penumbra) que puede salvarse si se reperfunde.",
      "Consecuencia: afasia, hemiparesia y hemianopsia; sin reperfusión, infarto extenso.",
    ],
    epidemiology:
      "El ACV es una de las principales causas de muerte y la primera de discapacidad en adultos en Argentina. Alrededor de un cuarto de los ACV isquémicos se descubre al despertar. La hipertensión, la diabetes, el tabaco y la FA son los principales factores de riesgo; la FA no diagnosticada es frecuente.",
    management: [
      "Código ACV: glucemia, NIHSS, TC sin contraste.",
      "Angiotomografía para buscar oclusión de gran vaso.",
      "Trombólisis dentro de las 4,5 h (o más con imágenes seleccionadas) y trombectomía hasta 24 h en seleccionados.",
      "Unidad de ACV y prevención secundaria.",
    ],
    sources: ["Sociedad Neurológica Argentina — Guía de ACV isquémico agudo.", "Ministerio de Salud de la Nación — Guía de práctica clínica de ACV."],
    pearls: ["Al despertar: última vez visto bien.", "Oclusión de gran vaso = trombectomía hasta 24 h con penumbra.", "Pulso irregular = buscar FA."],
    pitfalls: ["Descartar reperfusión por la hora.", "Bajar la presión bruscamente."],
    tribunal: [
      qa("¿Qué es la penumbra isquémica?", "El tejido cerebral alrededor del núcleo del infarto que recibe flujo reducido, no funciona pero aún está vivo; se puede salvar si se restablece el flujo a tiempo."),
      qa("¿Qué es un AIT y por qué importa?", "Un ataque isquémico transitorio: síntomas neurológicos focales que se resuelven, sin infarto en las imágenes; tiene alto riesgo de ACV en los días siguientes y requiere estudio urgente (escala ABCD2)."),
      qa("¿Cuándo se anticoagula tras un ACV por FA?", "Según el tamaño del infarto: AIT al día 1, ACV leve a los 3 días, moderado a los 6 días y grave a los 12–14 días, con imagen previa que descarte sangrado."),
    ],
  },
};
