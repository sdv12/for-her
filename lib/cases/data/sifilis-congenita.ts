import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sifilisCongenita: ClinicalCase = {
  id: "sifilis-congenita",
  level: 2,
  area: "Pediatría",
  setting: "Internación",
  patient: { age: 2, ageUnit: "días", sex: "F", context: "Madre de 19 años con un solo control prenatal; VDRL reactiva en el parto. La pareja nunca fue tratada." },
  frequency: "frecuente",
  intro: "“Me dijeron que tengo sífilis y que hay que estudiar a la beba. Se la ve bien, toma el pecho.” (relata la madre)",
  vitals: { FC: "140 lpm", FR: "42 rpm", "T°": "36,8 °C", Peso: "2,6 kg" },
  anamnesis: [
    act("tratamiento-madre", "¿Recibiste tratamiento para la sífilis en el embarazo? ¿Cuándo?", "clave", "“No, me enteré en el parto.”", "Madre no tratada: el recién nacido se trata como sífilis congénita probable."),
    act("pareja", "¿Tu pareja se trató?", "clave", "“No.”", "Riesgo de reinfección."),
    act("controles", "¿Cuántos controles tuviste?", "util", "“Uno solo.”", "Control prenatal insuficiente: la principal falla."),
    act("vih", "¿Te hicieron el test de VIH?", "util", "“Sí, negativo en el parto.”", "Coinfecciones."),
    act("prematurez", "¿De cuántas semanas nació?", "util", "“De 37.”", "Bajo peso."),
    act("nombre", "¿Cómo se llama?", "neutro", "“Luana.”", "No orienta."),
  ],
  exam: [
    act("rn", "Examen del recién nacido", "clave", "Bajo peso, sin hepatoesplenomegalia, sin lesiones cutáneas ni rinitis.", "La mayoría de los recién nacidos infectados son asintomáticos al nacer."),
    act("piel", "Piel, palmas y plantas", "clave", "Sin lesiones.", "Las lesiones ampollares palmoplantares sugieren sífilis congénita sintomática."),
    act("ictericia", "Ictericia y palidez", "util", "Leve ictericia.", "Puede haber hepatitis o anemia."),
  ],
  studies: [
    study("Laboratorio", "vdrl-rn", "VDRL cuantitativa en sangre del recién nacido (no del cordón) comparada con la materna", "clave", "RN 1/16, madre 1/32.", "Un título del RN 4 veces mayor que el materno confirma; si no, se maneja según el tratamiento materno."),
    study("Laboratorio", "hemograma", "Hemograma, hepatograma", "clave", "Hb 13, plaquetas 140.000, transaminasas levemente altas.", "Evaluación de compromiso."),
    study("Otros", "lcr", "Punción lumbar con VDRL en LCR", "clave", "VDRL negativa, citoquímico normal.", "Descarta neurosífilis."),
    study("Imágenes", "rx", "Radiografía de huesos largos", "util", "Sin osteocondritis.", "Busca lesiones óseas."),
    study("Otros", "esperar", "Esperar a ver si aparecen síntomas para tratar", "riesgoso", "No se realizó.", "La sífilis congénita no tratada causa secuelas graves."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("probable", "Sífilis congénita probable en recién nacida asintomática de madre no tratada", true, "Madre con VDRL reactiva sin tratamiento, recién nacida con VDRL reactiva sin signos clínicos, LCR normal."),
      dx("pasiva", "Anticuerpos maternos pasivos sin infección", false, "Con madre no tratada no se puede asumir; se trata."),
      dx("sintomatica", "Sífilis congénita sintomática", false, "No tiene signos clínicos."),
      dx("neurosifilis", "Neurosífilis congénita", false, "LCR normal."),
      dx("ictericia", "Ictericia fisiológica sola", false, "Hay serología reactiva y madre no tratada."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("penicilina", "Penicilina G sódica EV por 10 días", "clave", "Tratamiento de la sífilis congénita probable."),
      mg("madre-pareja", "Tratar a la madre y a su pareja con penicilina benzatínica", "clave", "Corta la transmisión."),
      mg("notificar", "Notificar el caso", "clave", "Evento de notificación obligatoria."),
      mg("seguimiento", "Seguimiento con VDRL a los 3, 6 y 12 meses, y evaluación auditiva y oftalmológica", "util", "Confirma la respuesta y detecta secuelas."),
      mg("lactancia", "Continuar la lactancia", "util", "No está contraindicada si no hay lesiones en las mamas."),
      mg("benzatinica-dosis", "Una sola dosis de penicilina benzatínica al RN", "riesgoso", "No alcanza niveles en el LCR: insuficiente si la madre no fue tratada."),
    ],
  },
  debrief: {
    diagnosis: "Sífilis congénita probable en recién nacida asintomática de 2 días, hija de madre adolescente con sífilis no tratada y control prenatal insuficiente.",
    pathologies: [
      { name: "Sífilis congénita", role: "principal", why: "Transmisión vertical del Treponema pallidum." },
      { name: "Sífilis materna no tratada", role: "asociada", why: "Falla del control prenatal." },
      { name: "Anticuerpos pasivos, neurosífilis", role: "diferencial", why: "Se evalúan con serologías y LCR." },
    ],
    reasoning: [
      "Causa: sífilis materna no tratada.",
      "Mecanismo: el treponema atraviesa la placenta en cualquier momento del embarazo.",
      "Consecuencia: aborto, muerte fetal, prematurez, sífilis congénita temprana (rinitis, pénfigo palmoplantar, hepatoesplenomegalia, osteocondritis) o tardía (dientes de Hutchinson, sordera, queratitis).",
    ],
    epidemiology:
      "La sífilis congénita aumentó en Argentina en los últimos años junto con la sífilis en jóvenes, con miles de casos de sífilis en embarazadas por año. Es una enfermedad totalmente prevenible con un test en cada trimestre y una dosis de penicilina.",
    management: [
      "VDRL a toda embarazada en cada trimestre y en el parto.",
      "Tratar a la madre y su pareja con penicilina benzatínica.",
      "Evaluar a todo recién nacido de madre con sífilis según el tratamiento materno.",
      "Tratamiento y seguimiento del recién nacido; notificación.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de prevención de la transmisión vertical de sífilis, VIH, hepatitis B y Chagas.", "Estrategia ETMI-Plus (OPS)."],
    pearls: ["Madre no tratada = tratar al RN.", "Penicilina G EV 10 días.", "Tratar a la pareja."],
    pitfalls: ["Usar sangre de cordón.", "Una sola dosis de benzatínica."],
    tribunal: [
      qa("¿Cuándo se considera adecuado el tratamiento materno?", "Penicilina benzatínica en dosis correspondiente al estadio, completada al menos 30 días antes del parto, con descenso documentado de los títulos y pareja tratada."),
      qa("¿Qué es la estrategia ETMI-Plus?", "La iniciativa de la OPS para eliminar la transmisión materno-infantil del VIH, la sífilis, la hepatitis B y el Chagas mediante rastreo, tratamiento y seguimiento en el embarazo y el recién nacido."),
      qa("¿Qué signos tiene la sífilis congénita tardía?", "Dientes de Hutchinson, molares en mora, queratitis intersticial, sordera (tríada de Hutchinson), nariz en silla de montar, tibias en sable y frente olímpica."),
    ],
  },
};
