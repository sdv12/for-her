import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const neumotoraxEspontaneo: ClinicalCase = {
  id: "neumotorax-espontaneo-primario",
  level: 2,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 21, ageUnit: "años", sex: "M", context: "Alto y delgado. Fuma. Juega al vóley." },
  frequency: "frecuente",
  intro: "“Estaba sentado en clase y de golpe me agarró una puntada en el costado derecho, como un cuchillo, y me falta el aire.”",
  vitals: { TA: "122/76 mmHg", FC: "104 lpm", FR: "22 rpm", "T°": "36,5 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("inicio", "¿Empezó de golpe? ¿Estaba haciendo esfuerzo?", "clave", "“De golpe, en reposo.”", "Dolor pleurítico súbito en reposo, en un joven alto y delgado: típico de neumotórax espontáneo primario."),
    act("previos", "¿Le pasó antes? ¿Tiene alguna enfermedad pulmonar?", "clave", "“No, nunca.”", "Sin enfermedad pulmonar es primario; con EPOC, asma o fibrosis quística sería secundario (más grave)."),
    act("tabaco", "¿Fuma? ¿Consume marihuana?", "util", "“Cigarrillos y a veces marihuana.”", "El tabaco multiplica el riesgo de neumotórax y de recurrencia."),
    act("trauma", "¿Tuvo algún golpe?", "util", "“No.”", "Descarta neumotórax traumático."),
    act("viaje", "¿Tiene viajes en avión o buceo programados?", "util", "“Me voy de viaje en avión el fin de semana.”", "No debe volar ni bucear con un neumotórax no resuelto."),
    act("carrera", "¿Qué estudia?", "neutro", "“Arquitectura.”", "No orienta."),
  ],
  exam: [
    act("torax", "Inspección, percusión y auscultación del tórax", "clave", "Hemitórax derecho con menor expansión, timpanismo, murmullo vesicular disminuido, vibraciones vocales abolidas.", "Síndrome de neumotórax."),
    act("tension", "Tráquea, yugulares y estado hemodinámico", "clave", "Tráquea central, yugulares no ingurgitadas, TA normal.", "Descarta neumotórax a tensión."),
    act("habito", "Hábito corporal", "util", "Longilíneo, IMC 18,5.", "Hábito típico del neumotórax primario."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax de frente", "clave", "Neumotórax derecho con línea pleural a 3,5 cm de la pared a nivel del hilio. Sin desviación mediastinal.", "Confirma y estima el tamaño: más de 2 cm a nivel del hilio se considera grande."),
    study("Imágenes", "tc", "Tomografía de tórax de urgencia", "innecesario", "No se realizó.", "No cambia la conducta inicial; se usa en recurrencias o para planear cirugía (bullas)."),
    study("Laboratorio", "dimero", "Dímero D", "innecesario", "No se realizó.", "La radiografía explica el cuadro."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Taquicardia sinusal.", "Descarta otras causas de dolor torácico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ntx", "Neumotórax espontáneo primario derecho grande, sin tensión", true, "Dolor pleurítico súbito en reposo en un joven longilíneo fumador, timpanismo con murmullo disminuido y radiografía con neumotórax > 2 cm, sin signos de tensión."),
      dx("tension", "Neumotórax a tensión", false, "Daría hipotensión, desviación traqueal e ingurgitación yugular."),
      dx("tep", "Tromboembolismo pulmonar", false, "Dolor pleurítico y disnea, pero con examen pulmonar casi normal y sin hallazgos de neumotórax."),
      dx("pericarditis", "Pericarditis", false, "Dolor que mejora al inclinarse hacia adelante, frote, cambios en el ECG."),
      dx("muscular", "Dolor muscular", false, "No explica el timpanismo ni la radiografía."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aspiracion", "Aspiración con aguja o drenaje pleural fino", "clave", "En el neumotórax primario grande o sintomático, la aspiración es la primera opción; si falla, drenaje."),
      mg("oxigeno", "Oxígeno suplementario", "util", "Acelera la reabsorción del aire pleural."),
      mg("tabaco", "Dejar de fumar (tabaco y marihuana)", "clave", "Reduce mucho el riesgo de recurrencia."),
      mg("pautas", "Control con radiografía y pautas de alarma", "clave", "Asegura la resolución y detecta recurrencias."),
      mg("avion", "Autorizarlo a viajar en avión el fin de semana", "riesgoso", "Con la altitud el aire pleural se expande: no debe volar hasta 1–2 semanas después de la resolución radiológica."),
      mg("cirugia", "Videotoracoscopía con pleurodesis de entrada", "innecesario", "Se reserva para recurrencias, fuga persistente o profesiones de riesgo."),
    ],
  },
  debrief: {
    diagnosis: "Neumotórax espontáneo primario derecho grande, sin tensión, en varón de 21 años fumador.",
    pathologies: [
      { name: "Neumotórax espontáneo primario", role: "principal", why: "Sin enfermedad pulmonar previa." },
      { name: "Neumotórax a tensión", role: "diferencial", why: "Complicación que se busca siempre." },
      { name: "Tromboembolismo pulmonar y pericarditis", role: "diferencial", why: "Otras causas de dolor pleurítico." },
    ],
    reasoning: [
      "Causa: ruptura de pequeñas bullas o blebs subpleurales apicales, más frecuentes en jóvenes altos y fumadores.",
      "Mecanismo: el aire pasa del alvéolo al espacio pleural y la presión pleural deja de ser negativa; el pulmón colapsa por su propio retroceso elástico.",
      "Consecuencia: dolor pleurítico súbito, disnea, hipoventilación y timpanismo del lado afectado.",
      "Si el defecto actúa como válvula, la presión aumenta hasta comprimir el mediastino: neumotórax a tensión.",
    ],
    epidemiology:
      "El neumotórax espontáneo primario afecta sobre todo a varones jóvenes (entre 15 y 35 años), altos y delgados: es unas 6 veces más frecuente en varones. El tabaco multiplica el riesgo hasta 20 veces. La recurrencia ronda el 30 % en los primeros años.",
    management: [
      "Radiografía para confirmar y medir.",
      "Pequeño y asintomático: observación con oxígeno y control.",
      "Grande o sintomático: aspiración con aguja o drenaje pleural.",
      "Tensión: descompresión inmediata.",
      "Cirugía (videotoracoscopía) en recurrencias o fuga persistente; dejar de fumar; no volar ni bucear hasta resolver.",
    ],
    sources: ["Asociación Argentina de Medicina Respiratoria — Recomendaciones sobre neumotórax.", "Guía de la British Thoracic Society, adoptada en el país."],
    pearls: ["Joven, alto, delgado, fumador con dolor súbito: neumotórax.", "No volar hasta resolver.", "Dejar de fumar reduce la recurrencia."],
    pitfalls: ["Dejarlo viajar en avión.", "Operar de entrada un primer episodio.", "Pedir tomografía de urgencia."],
  },
};
