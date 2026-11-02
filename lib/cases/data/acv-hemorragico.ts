import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const acvHemorragico: ClinicalCase = {
  id: "acv-hemorragico-hipertensivo",
  level: 3,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 63, ageUnit: "años", sex: "M", context: "Hipertenso que no toma la medicación. Bebe alcohol a diario." },
  frequency: "frecuente",
  intro: "“Estaba mirando la tele y de golpe se le torció la boca, no podía mover el brazo y la pierna izquierdos y vomitó. Dice que le duele mucho la cabeza.” (relata la esposa, hace 1 hora)",
  vitals: { TA: "212/118 mmHg", FC: "64 lpm", FR: "18 rpm", "T°": "36,6 °C", "SatO₂": "95 %", Glucemia: "128 mg/dl", Glasgow: "13/15" },
  anamnesis: [
    act("hora", "¿A qué hora exacta empezó? ¿Cuándo lo vieron bien por última vez?", "clave", "“Hace una hora, a las 21.”", "La hora de inicio define tratamientos."),
    act("anticoag", "¿Toma anticoagulantes o antiagregantes?", "clave", "“No.”", "Si los tomara, habría que revertirlos."),
    act("cefalea", "¿Tuvo dolor de cabeza y vómitos?", "clave", "“Dolor fuerte de cabeza y vomitó dos veces.”", "Sugiere hemorragia y aumento de la presión intracraneana, aunque solo la imagen lo confirma."),
    act("hta", "¿Toma la medicación de la presión?", "util", "“La dejó hace meses.”", "Principal factor de riesgo."),
    act("trauma", "¿Se golpeó la cabeza?", "util", "“No.”", "Descarta hematoma traumático."),
    act("tele", "¿Qué estaba mirando?", "neutro", "“Un partido.”", "No orienta."),
  ],
  exam: [
    act("nihss", "Escala NIHSS y examen neurológico", "clave", "Hemiparesia izquierda faciobraquiocrural, desviación de la mirada a la derecha, disartria; NIHSS 14.", "Déficit grave por lesión hemisférica derecha."),
    act("conciencia", "Glasgow y pupilas", "clave", "Glasgow 13, pupilas iguales y reactivas.", "Vigilar deterioro."),
    act("meningeo", "Signos meníngeos", "util", "Sin rigidez de nuca.", "Sin inundación subaracnoidea evidente."),
  ],
  studies: [
    study("Imágenes", "tc", "Tomografía de cerebro sin contraste urgente", "clave", "Hematoma intraparenquimatoso de 30 ml en el putamen derecho, sin volcado ventricular.", "Confirma hemorragia: contraindica trombólisis."),
    study("Laboratorio", "lab", "Coagulograma, plaquetas, función renal, glucemia", "clave", "Normales.", "Descarta coagulopatía."),
    study("Imágenes", "angiotc", "Angiotomografía (signo del punto, malformaciones)", "util", "Sin malformaciones; signo del punto negativo.", "Busca causas secundarias y riesgo de expansión."),
    study("Otros", "trombolisis", "Trombólisis por ACV dentro de la ventana", "riesgoso", "No se realizó.", "En una hemorragia la trombólisis es mortal; siempre imagen antes."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hic", "ACV hemorrágico: hematoma intraparenquimatoso putaminal derecho hipertensivo", true, "Déficit focal súbito con cefalea, vómitos y presión muy alta, con hematoma putaminal derecho en la TC en un hipertenso sin tratamiento."),
      dx("isquemico", "ACV isquémico", false, "La tomografía muestra sangre."),
      dx("hsa", "Hemorragia subaracnoidea", false, "La sangre es intraparenquimatosa."),
      dx("tumor", "Tumor con sangrado", false, "Localización típica hipertensiva sin lesión subyacente."),
      dx("hipoglucemia", "Hipoglucemia con déficit focal", false, "Glucemia normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ta", "Bajar la sistólica a alrededor de 140 mmHg en forma controlada (labetalol o nicardipina EV)", "clave", "Reduce la expansión del hematoma, evitando caídas bruscas."),
      mg("unidad", "Internación en unidad de ACV o terapia intensiva, cabecera a 30°, control neurológico frecuente", "clave", "Detecta deterioro y expansión."),
      mg("neurocirugia", "Interconsulta con neurocirugía", "clave", "Por si crece, hay hidrocefalia o deterioro."),
      mg("prevencion", "Prevención de complicaciones (deglución, trombosis con medidas mecánicas, glucemia, fiebre)", "util", "Mejoran el pronóstico."),
      mg("aspirina", "Aspirina por el ACV", "riesgoso", "Aumenta el sangrado."),
      mg("bajar-brusco", "Bajar la presión a 100 de sistólica de inmediato", "riesgoso", "Puede producir isquemia cerebral."),
    ],
  },
  debrief: {
    diagnosis: "ACV hemorrágico por hematoma intraparenquimatoso putaminal derecho de 30 ml, hipertensivo, con NIHSS de 14, en varón de 63 años con hipertensión no tratada y consumo de alcohol.",
    pathologies: [
      { name: "Hemorragia intraparenquimatosa hipertensiva", role: "principal", why: "Rotura de arterias perforantes." },
      { name: "Hipertensión no controlada", role: "asociada", why: "Causa principal." },
      { name: "ACV isquémico, HSA, tumor", role: "diferencial", why: "Se diferencian por la imagen." },
    ],
    reasoning: [
      "Causa: hipertensión crónica que daña las pequeñas arterias perforantes (lipohialinosis, microaneurismas).",
      "Mecanismo: la arteria se rompe y la sangre forma un hematoma que comprime y destruye el tejido, con edema y aumento de la presión intracraneana.",
      "Consecuencia: déficit focal súbito, cefalea, vómitos, deterioro de conciencia; el hematoma puede crecer en las primeras horas.",
    ],
    epidemiology:
      "Las hemorragias intraparenquimatosas son alrededor del 10–15 % de los ACV, pero con mayor mortalidad que los isquémicos. La hipertensión no controlada es la causa principal (ganglios basales, tálamo, protuberancia, cerebelo); en mayores también la angiopatía amiloide (lobares) y los anticoagulantes.",
    management: [
      "Todo déficit focal agudo: tomografía antes de cualquier tratamiento.",
      "Control de la presión, revertir anticoagulación si existe.",
      "Unidad de ACV, neurocirugía según tamaño, localización y evolución.",
      "Rehabilitación y control estricto de la hipertensión.",
    ],
    sources: ["Sociedad Neurológica Argentina — Guía de hemorragia intracerebral.", "Ministerio de Salud de la Nación — Guía de práctica clínica de ACV."],
    pearls: ["Ningún ACV se trata sin imagen.", "Sistólica alrededor de 140.", "Hipertenso + ganglios basales = hemorragia hipertensiva."],
    pitfalls: ["Trombolizar sin tomografía.", "Bajar la presión bruscamente."],
    tribunal: [
      qa("¿Cuándo se opera una hemorragia intraparenquimatosa?", "En hematomas cerebelosos mayores de 3 cm o con compresión del tronco o hidrocefalia, en hematomas lobares superficiales grandes con deterioro, y con drenaje ventricular si hay hidrocefalia; la mayoría de los profundos se tratan médicamente."),
      qa("¿Qué es la angiopatía amiloide?", "El depósito de amiloide en las paredes de arterias corticales en mayores, que causa hemorragias lobares recurrentes y microsangrados; contraindica relativamente los anticoagulantes."),
      qa("¿Qué es la escala NIHSS?", "Una escala de 0 a 42 puntos que mide la gravedad del déficit neurológico en el ACV (conciencia, mirada, campo visual, facial, motor, ataxia, sensibilidad, lenguaje, disartria, negligencia); orienta tratamiento y pronóstico."),
    ],
  },
};
