import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const amenazaAborto: ClinicalCase = {
  id: "amenaza-de-aborto",
  level: 1,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 28, ageUnit: "años", sex: "F", context: "Embarazo buscado, 8 semanas por fecha de última menstruación. Primera consulta." },
  frequency: "muy-frecuente",
  intro: "“Estoy embarazada y desde hoy tengo un poco de sangrado, como manchado, y dolor leve abajo. Estoy muy asustada.”",
  vitals: { TA: "116/72 mmHg", FC: "82 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("sangrado", "¿Cuánto sangrado? ¿Coágulos o restos?", "clave", "“Poco, sin coágulos.”", "Sangrado escaso orienta a amenaza."),
    act("dolor", "¿Cómo es el dolor? ¿De un lado? ¿Hombro, mareos?", "clave", "“Leve, central; sin mareos.”", "Dolor lateral, de hombro o mareos sugieren ectópico."),
    act("riesgo", "¿Embarazo ectópico previo, EPI, DIU, cirugía de trompas?", "clave", "“No.”", "Factores de riesgo de ectópico."),
    act("factor", "¿Conocés tu grupo y factor?", "util", "“Soy A negativo.”", "Rh negativo: profilaxis anti-D."),
    act("fiebre", "¿Fiebre o flujo con mal olor?", "util", "“No.”", "Aborto séptico."),
    act("nombre", "¿Tienen nombres pensados?", "neutro", "“Todavía no.”", "No orienta."),
  ],
  exam: [
    act("especulo", "Especuloscopía", "clave", "Sangrado escaso por orificio cerrado, sin restos, cuello sano.", "Orificio cerrado: amenaza."),
    act("tacto", "Tacto bimanual", "clave", "Útero acorde a 8 semanas, cuello cerrado, sin dolor anexial.", "Aleja ectópico."),
    act("abdomen", "Abdomen", "util", "Blando, sin defensa.", "Sin irritación peritoneal."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía transvaginal", "clave", "Saco intrauterino, embrión de 8 semanas con latidos, pequeño hematoma.", "Confirma embarazo intrauterino viable y descarta ectópico."),
    study("Laboratorio", "hcg", "Beta-hCG cuantitativa", "util", "Acorde.", "Útil si la ecografía no es concluyente."),
    study("Laboratorio", "grupo", "Grupo y factor, hemograma", "clave", "A Rh negativo; Hb 12,4.", "Define profilaxis."),
    study("Otros", "reposo", "Dosaje de progesterona seriado de rutina", "innecesario", "No se realizó.", "No cambia la conducta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("amenaza", "Amenaza de aborto con embarazo intrauterino viable", true, "Sangrado escaso, orificio cerrado, embrión con latidos en el útero."),
      dx("incompleto", "Aborto incompleto", false, "Hay orificio abierto con restos."),
      dx("ectopico", "Embarazo ectópico", false, "El embarazo está en el útero."),
      dx("diferido", "Aborto diferido", false, "El embrión tiene latidos."),
      dx("mola", "Enfermedad trofoblástica", false, "Imagen normal, sin vesículas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("expectante", "Conducta expectante y control ecográfico en 1 a 2 semanas", "clave", "La mayoría continúa con buena evolución."),
      mg("anti-d", "Evaluar profilaxis anti-D por ser Rh negativo, según protocolo", "clave", "Previene la isoinmunización."),
      mg("alarma", "Pautas de alarma: sangrado abundante, dolor intenso, fiebre, mareos", "clave", "Detecta complicaciones."),
      mg("control", "Iniciar control prenatal: ácido fólico, laboratorio, vacunas", "clave", "Oportunidad para empezar."),
      mg("reposo", "Reposo absoluto", "innecesario", "No mejora el pronóstico, y genera culpa."),
      mg("legrado", "Legrado preventivo", "riesgoso", "Termina un embarazo viable."),
    ],
  },
  debrief: {
    diagnosis: "Amenaza de aborto a las 8 semanas con embarazo intrauterino viable, en mujer de 28 años Rh negativa.",
    pathologies: [
      { name: "Amenaza de aborto", role: "principal", why: "Sangrado con cuello cerrado y embrión vivo." },
      { name: "Rh negativo", role: "asociada", why: "Riesgo de isoinmunización." },
      { name: "Ectópico, aborto incompleto y diferido, mola", role: "diferencial", why: "Otras causas de sangrado." },
    ],
    reasoning: [
      "Causa: muchas veces no identificable; a veces hematoma subcoriónico.",
      "Mecanismo: el sangrado de la interfase decidua-corion se exterioriza con el cuello cerrado.",
      "Consecuencia: la mayoría sigue su curso; una parte evoluciona a aborto.",
    ],
    epidemiology:
      "Cerca de 1 de cada 4 embarazos tiene sangrado en el primer trimestre, y alrededor de la mitad continúa. Con latidos a las 8 semanas, las probabilidades de continuar son altas. Siempre hay que excluir ectópico, una de las causas de muerte materna en el primer trimestre.",
    management: [
      "Ecografía para ubicar el embarazo.",
      "Especuloscopía: orificio.",
      "Grupo y factor.",
      "Expectante, pautas de alarma y acompañamiento.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de control prenatal.", "FASGO — Recomendaciones de sangrado del primer trimestre."],
    pearls: ["Sangrado en el primer trimestre: ectópico hasta demostrar lo contrario.", "Orificio cerrado + latidos: amenaza.", "Rh negativo: pensá en anti-D."],
    pitfalls: ["Indicar reposo absoluto como si curara.", "Olvidar el factor."],
    tribunal: [
      qa("¿Cómo se clasifican los abortos?", "Amenaza (orificio cerrado, feto vivo), inevitable (orificio abierto), incompleto (restos), completo (útero vacío), diferido (embrión sin latido, orificio cerrado), séptico (infectado)."),
      qa("¿Cuál es el nivel discriminatorio de beta-hCG?", "Con 1.500 a 3.500 mUI/ml debería verse un saco intrauterino por ecografía transvaginal."),
      qa("¿Cuándo se indica la profilaxis anti-D?", "En Rh negativas no sensibilizadas: semanas 28-32, posparto con recién nacido Rh positivo, y eventos como aborto, ectópico o procedimientos invasivos."),
    ],
  },
};
