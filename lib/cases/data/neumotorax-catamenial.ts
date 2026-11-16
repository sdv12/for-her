import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const neumotoraxCatamenial: ClinicalCase = {
  id: "neumotorax-catamenial",
  level: 3,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 34, ageUnit: "años", sex: "F", context: "No fuma. Endometriosis diagnosticada por laparoscopía. Es su tercer neumotórax derecho." },
  frequency: "raro",
  intro: "“Otra vez el dolor del costado derecho y me falta el aire. Siempre me pasa cuando estoy menstruando.”",
  vitals: { TA: "118/74 mmHg", FC: "102 lpm", FR: "24 rpm", "SatO₂": "94 %", "T°": "36,6 °C" },
  anamnesis: [
    act("ciclo", "¿Cuándo le pasaron los episodios en relación con la menstruación?", "clave", "“Los tres, al segundo o tercer día de menstruar.”", "Dentro de las 72 horas de la menstruación: catamenial."),
    act("lado", "¿Siempre del mismo lado?", "clave", "“Siempre el derecho.”", "Más del 90 % son derechos."),
    act("endometriosis", "¿Tiene endometriosis?", "clave", "“Sí, me operaron hace 2 años.”", "Endometriosis torácica."),
    act("tabaco", "¿Fuma?", "util", "“No.”", "Factor de neumotórax primario."),
    act("hombro", "¿Le duele el hombro derecho con la menstruación?", "util", "“Sí, a veces.”", "Endometriosis diafragmática."),
    act("perfume", "¿Qué perfume usa?", "neutro", "“Uno de vainilla.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Tórax", "clave", "Hipoventilación e hipersonoridad derecha.", "Neumotórax."),
    act("traquea", "Tráquea y hemodinamia", "clave", "Tráquea central, estable.", "Sin hipertensivo."),
    act("abdomen", "Abdomen", "util", "Dolor leve pélvico.", "Endometriosis."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Neumotórax derecho de 3 cm en el ápex.", "Grande."),
    study("Imágenes", "tac", "TC de tórax", "util", "Pequeñas perforaciones diafragmáticas, sin bullas.", "Sospecha de endometriosis diafragmática."),
    study("Laboratorio", "beta", "Subunidad beta", "util", "Negativa.", "Antes de tratamiento hormonal."),
    study("Otros", "espirometria-aguda", "Espirometría en la urgencia", "riesgoso", "No se hizo.", "Contraindicada con neumotórax."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("catamenial", "Neumotórax catamenial recurrente derecho por endometriosis torácica", true, "Tres neumotórax derechos en los primeros días de la menstruación en una mujer con endometriosis, con defectos diafragmáticos."),
      dx("primario", "Neumotórax espontáneo primario", false, "Relación con la menstruación y endometriosis."),
      dx("lam", "Linfangioleiomiomatosis", false, "Sin quistes difusos."),
      dx("tep", "TEP", false, "Hay aire pleural."),
      dx("hipertensivo", "Neumotórax hipertensivo", false, "Estable, tráquea central."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("drenaje", "Drenaje pleural o aspiración según tamaño y síntomas", "clave", "Neumotórax grande y sintomático."),
      mg("vats", "Videotoracoscopía: reparación diafragmática, resección de implantes y pleurodesis", "clave", "Recurrente: tratamiento definitivo."),
      mg("hormonal", "Supresión hormonal posoperatoria (análogos de GnRH o progestágenos)", "clave", "Reduce las recurrencias."),
      mg("gineco", "Seguimiento conjunto con ginecología", "util", "Endometriosis."),
      mg("observacion-sola", "Solo observación y alta", "riesgoso", "Grande, sintomático y recurrente."),
      mg("avion", "Puede volar al día siguiente", "riesgoso", "No volar hasta resolución confirmada."),
    ],
  },
  debrief: {
    diagnosis: "Neumotórax catamenial recurrente derecho por endometriosis torácica, en una mujer de 34 años.",
    pathologies: [
      { name: "Neumotórax catamenial", role: "principal", why: "Relacionado con la menstruación." },
      { name: "Endometriosis torácica y diafragmática", role: "asociada", why: "Causa." },
      { name: "Neumotórax espontáneo primario", role: "diferencial", why: "Más frecuente en general." },
    ],
    reasoning: [
      "Causa: implantes de endometrio en pleura y diafragma.",
      "Mecanismo: los implantes sangran y se necrosan con la menstruación; perforaciones diafragmáticas dejan pasar aire.",
      "Consecuencia: neumotórax recurrentes casi siempre derechos.",
    ],
    epidemiology:
      "Representa hasta un tercio de los neumotórax espontáneos en mujeres operadas, aunque está subdiagnosticado. Afecta a mujeres de 30 a 40 años. Más del 90 % es derecho, por el flujo peritoneal en sentido horario.",
    management: [
      "Preguntar por la menstruación en toda mujer con neumotórax.",
      "Drenaje.",
      "VATS con reparación diafragmática.",
      "Supresión hormonal.",
    ],
    sources: ["Sociedad Argentina de Cirugía Torácica — Neumotórax.", "Visouli AN et al. — Catamenial pneumothorax (J Thorac Dis)."],
    pearls: ["Mujer + neumotórax derecho + menstruación.", "Endometriosis torácica.", "Cirugía más hormonas."],
    pitfalls: ["No preguntar por el ciclo.", "Tratarlo como primario y que recurra."],
    tribunal: [
      qa("¿Qué es el neumotórax catamenial?", "El que ocurre dentro de las 72 horas del inicio de la menstruación, casi siempre por endometriosis torácica."),
      qa("¿Por qué es casi siempre derecho?", "Por la circulación del líquido peritoneal en sentido horario hacia el diafragma derecho y la protección del lado izquierdo por el ligamento frenocólico."),
      qa("¿Qué otras formas tiene la endometriosis torácica?", "Hemotórax catamenial, hemoptisis catamenial y nódulos pulmonares."),
    ],
  },
};
