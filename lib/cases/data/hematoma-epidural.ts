import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hematomaEpidural: ClinicalCase = {
  id: "tec-grave-hematoma-epidural",
  level: 4,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 19, ageUnit: "años", sex: "M", context: "Repartidor en moto, sin casco. Chocó contra un cordón hace 2 horas." },
  frequency: "frecuente",
  intro: "“Se golpeó la cabeza, quedó desmayado un minuto, después se levantó y hablaba bien. En la ambulancia empezó a ponerse dormido.” (relata el paramédico)",
  vitals: { TA: "168/88 mmHg", FC: "56 lpm", FR: "12 rpm", "T°": "36,4 °C", "SatO₂": "95 %", Glasgow: "9/15" },
  anamnesis: [
    act("intervalo", "¿Perdió el conocimiento? ¿Estuvo bien un rato después?", "clave", "“Un minuto; después habló normal media hora y luego empeoró.”", "Intervalo lúcido: típico del hematoma epidural."),
    act("casco", "¿Usaba casco?", "util", "“No.”", "Factor de gravedad."),
    act("alcohol", "¿Tomó alcohol o drogas?", "util", "“No sabemos.”", "Puede confundir la evaluación."),
    act("anticoag", "¿Toma anticoagulantes?", "util", "No.", "Influye en el sangrado."),
    act("vomitos", "¿Vomitó? ¿Se quejó de dolor de cabeza?", "clave", "“Vomitó dos veces y decía que le dolía mucho la cabeza.”", "Signos de hipertensión endocraneana."),
    act("moto", "¿Qué moto tenía?", "neutro", "“Una 150.”", "No orienta."),
  ],
  exam: [
    act("abcde", "ABCDE con control de columna cervical", "clave", "Vía aérea permeable, respiración lenta, sin otras lesiones graves.", "Atención inicial del trauma."),
    act("pupilas", "Pupilas y foco", "clave", "Midriasis derecha arreactiva, hemiparesia izquierda.", "Herniación uncal por masa derecha."),
    act("cushing", "Signos vitales", "clave", "Hipertensión, bradicardia y bradipnea.", "Tríada de Cushing: hipertensión endocraneana grave."),
    act("craneo", "Inspección de cráneo", "util", "Hematoma en la región temporal derecha.", "Sitio del impacto (arteria meníngea media)."),
  ],
  studies: [
    study("Imágenes", "tc", "Tomografía de cerebro y columna cervical urgente", "clave", "Hematoma biconvexo (lente) temporal derecho de 40 ml con desplazamiento de la línea media de 8 mm; fractura temporal.", "Hematoma epidural con efecto de masa."),
    study("Laboratorio", "lab", "Grupo y factor, coagulograma, hemograma", "clave", "Normales.", "Para la cirugía."),
    study("Imágenes", "rmn", "Resonancia antes de operar", "riesgoso", "No se realizó.", "Demora una cirugía urgente."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("epidural", "Traumatismo craneoencefálico grave con hematoma epidural temporal derecho y herniación uncal", true, "Intervalo lúcido, deterioro con midriasis derecha y hemiparesia izquierda, tríada de Cushing e imagen biconvexa con fractura temporal."),
      dx("subdural", "Hematoma subdural agudo", false, "Sería en semiluna, sin intervalo lúcido típico."),
      dx("contusion", "Contusión cerebral", false, "La tomografía muestra un hematoma extraaxial biconvexo."),
      dx("intoxicacion", "Intoxicación alcohólica", false, "Hay foco y anisocoria."),
      dx("hsa", "Hemorragia subaracnoidea traumática", false, "El hallazgo principal es el hematoma epidural."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Craneotomía y evacuación urgente", "clave", "Hematoma epidural con efecto de masa y deterioro: la cirugía rápida tiene muy buen pronóstico."),
      mg("via-aerea", "Intubación con protección cervical, normoventilación y oxígeno", "clave", "Glasgow menor o igual a 8 o en deterioro."),
      mg("hiperosmolar", "Manitol o salina hipertónica y cabecera a 30° mientras va al quirófano", "clave", "Reduce la presión intracraneana transitoriamente."),
      mg("prevencion", "Promover el uso de casco", "util", "Prevención."),
      mg("hiperventilar", "Hiperventilación prolongada", "riesgoso", "Produce vasoconstricción e isquemia; solo como puente breve ante herniación."),
      mg("observar", "Observación en sala y tomografía de control en 24 h", "riesgoso", "Puede morir en horas."),
    ],
  },
  debrief: {
    diagnosis: "Traumatismo craneoencefálico grave con hematoma epidural temporal derecho, fractura temporal y herniación uncal, en motociclista de 19 años sin casco.",
    pathologies: [
      { name: "Hematoma epidural", role: "principal", why: "Sangrado arterial entre la duramadre y el cráneo." },
      { name: "Herniación uncal", role: "asociada", why: "Compromiso del III par y del tronco." },
      { name: "Subdural, contusión, intoxicación", role: "diferencial", why: "Otras causas de deterioro tras TEC." },
    ],
    reasoning: [
      "Causa: fractura temporal que lesiona la arteria meníngea media.",
      "Mecanismo: sangrado arterial a presión que despega la duramadre y crece rápido.",
      "Consecuencia: intervalo lúcido, deterioro, herniación uncal (midriasis homolateral, hemiparesia contralateral) y muerte si no se evacua.",
    ],
    epidemiology:
      "Los siniestros viales son la principal causa de muerte en menores de 35 años en Argentina, y los motociclistas son una proporción creciente de las víctimas, sobre todo varones jóvenes. El uso de casco reduce mucho la mortalidad y el TEC grave.",
    management: [
      "ABCDE con control cervical.",
      "Glasgow y pupilas seriados; tomografía urgente.",
      "Neurocirugía inmediata ante hematoma con efecto de masa.",
      "Evitar hipoxia e hipotensión.",
    ],
    sources: ["Asociación Argentina de Neurocirugía — Guía de traumatismo craneoencefálico grave.", "Agencia Nacional de Seguridad Vial — Estadísticas de siniestralidad."],
    pearls: ["Intervalo lúcido = epidural.", "Midriasis homolateral + hemiparesia contralateral = herniación.", "Tiempo es cerebro: quirófano."],
    pitfalls: ["Observar a un paciente que se deteriora.", "Hiperventilar de rutina."],
    tribunal: [
      qa("¿Qué diferencia el hematoma epidural del subdural?", "Epidural: arterial (meníngea media), biconvexo, no cruza suturas, con intervalo lúcido, en jóvenes con fractura. Subdural: venoso (venas puente), en semiluna, cruza suturas, en mayores, anticoagulados y alcohólicos; puede ser agudo o crónico."),
      qa("¿Qué es la tríada de Cushing?", "Hipertensión arterial, bradicardia y respiración irregular o lenta: signo tardío de hipertensión endocraneana grave y riesgo de herniación."),
      qa("¿Cómo se clasifica el TEC según el Glasgow?", "Leve 13–15, moderado 9–12 y grave 3–8; con 8 o menos se protege la vía aérea."),
    ],
  },
};
