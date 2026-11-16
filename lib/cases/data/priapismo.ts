import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const priapismo: ClinicalCase = {
  id: "priapismo",
  level: 2,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 34, ageUnit: "años", sex: "M", context: "Toma trazodona para dormir desde hace un mes. Viene a las 6 de la mañana, avergonzado." },
  frequency: "poco-frecuente",
  intro: "“Tengo una erección desde la medianoche que no se va y me duele mucho.”",
  vitals: { TA: "138/84 mmHg", FC: "96 lpm", "T°": "36,7 °C" },
  anamnesis: [
    act("duracion", "¿Desde qué hora exactamente?", "clave", "“Desde las 12, seis horas.”", "Más de 4 horas: urgencia. El daño del tejido eréctil empieza a las 4–6 horas."),
    act("dolor", "¿Le duele?", "clave", "“Muchísimo.”", "Dolor: priapismo isquémico (de bajo flujo)."),
    act("medicamentos", "¿Qué toma? ¿Usó algo para la erección o drogas?", "clave", "“La trazodona. Nada más, lo juro.”", "Trazodona y antipsicóticos causan priapismo isquémico por bloqueo alfa."),
    act("trauma", "¿Se golpeó en el periné o la ingle?", "clave", "“No.”", "El trauma perineal causa priapismo arterial, no isquémico e indoloro."),
    act("hemato", "¿Tiene alguna enfermedad de la sangre?", "util", "“No que sepa.”", "Drepanocitosis y leucemias son otras causas."),
    act("pareja", "¿Tuvo relaciones anoche?", "neutro", "“No.”", "No modifica la conducta."),
  ],
  exam: [
    act("pene", "Examen del pene", "clave", "Cuerpos cavernosos rígidos y dolorosos, glande y cuerpo esponjoso blandos.", "Típico del priapismo: no compromete el esponjoso."),
    act("perine", "Periné", "util", "Sin hematomas ni lesiones.", "Sin trauma."),
    act("abdomen", "Abdomen y ganglios", "util", "Sin esplenomegalia ni adenopatías.", "Busca enfermedad hematológica."),
  ],
  studies: [
    study("Laboratorio", "gases-cavernosos", "Gasometría de sangre aspirada de los cuerpos cavernosos", "clave", "Sangre oscura, pH 7,10, PO₂ 22 mmHg, PCO₂ 72 mmHg.", "Isquémico: hipoxia y acidosis."),
    study("Laboratorio", "hemograma", "Hemograma", "clave", "Normal.", "Descarta leucemia."),
    study("Imágenes", "doppler", "Doppler peneano", "util", "Flujo cavernoso ausente.", "Confirma bajo flujo si hay duda."),
    study("Laboratorio", "toxicos", "Tóxicos en orina", "util", "Negativos.", "Cocaína como causa."),
    study("Imágenes", "rmn", "Resonancia de pelvis antes de tratar", "riesgoso", "No se pidió.", "Retrasa una urgencia tiempo-dependiente."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("priapismo-isquemico", "Priapismo isquémico (de bajo flujo) por trazodona", true, "Erección dolorosa de 6 horas con cuerpos cavernosos rígidos, glande blando y gases cavernosos de hipoxia y acidosis."),
      dx("priapismo-arterial", "Priapismo no isquémico (arterial)", false, "Es indoloro, parcial, postraumático y con sangre roja oxigenada."),
      dx("parafimosis", "Parafimosis", false, "No hay anillo prepucial; hay erección de los cavernosos."),
      dx("fractura-pene", "Fractura de pene", false, "Sin trauma, detumescencia brusca ni hematoma."),
      dx("peyronie", "Enfermedad de Peyronie", false, "Curvatura crónica con placa, no erección persistente."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aspiracion", "Aspiración de sangre de los cuerpos cavernosos con lavado", "clave", "Primer paso del tratamiento."),
      mg("fenilefrina", "Fenilefrina intracavernosa con monitoreo de presión y frecuencia", "clave", "Agonista alfa que contrae y drena."),
      mg("shunt", "Si falla: derivación quirúrgica (shunt) por urología", "util", "Último recurso antes de la necrosis."),
      mg("suspender", "Suspender la trazodona y cambiar el tratamiento del insomnio", "clave", "Evita la recurrencia."),
      mg("analgesia", "Analgesia y bloqueo peneano", "util", "Dolor intenso."),
      mg("hielo-esperar", "Hielo y esperar a que ceda en casa", "riesgoso", "Cada hora suma riesgo de fibrosis y disfunción eréctil permanente."),
      mg("sildenafil", "Indicar sildenafil para la próxima", "riesgoso", "Puede precipitar otro episodio."),
    ],
  },
  debrief: {
    diagnosis: "Priapismo isquémico de 6 horas por trazodona, en un hombre de 34 años.",
    pathologies: [
      { name: "Priapismo isquémico", role: "principal", why: "Síndrome compartimental de los cuerpos cavernosos." },
      { name: "Efecto adverso de trazodona", role: "asociada", why: "Bloqueo alfa-1 que impide la detumescencia." },
      { name: "Priapismo arterial", role: "diferencial", why: "Indoloro y postraumático." },
    ],
    reasoning: [
      "Causa: bloqueo alfa adrenérgico por trazodona.",
      "Mecanismo: falla la detumescencia, la sangre queda atrapada y se vuelve hipóxica y ácida.",
      "Consecuencia: después de 24 horas, fibrosis y disfunción eréctil en hasta el 90 % de los casos.",
    ],
    epidemiology:
      "El priapismo isquémico es el 95 % de los priapismos. En adultos se asocia a fármacos (trazodona, antipsicóticos, inyecciones intracavernosas) y drogas; en niños, a drepanocitosis y leucemia. Es una urgencia urológica tiempo-dependiente.",
    management: [
      "Gasometría cavernosa.",
      "Aspiración y lavado.",
      "Fenilefrina intracavernosa.",
      "Shunt si falla.",
      "Retirar la causa.",
    ],
    sources: ["Sociedad Argentina de Urología — Urgencias urológicas: priapismo.", "AUA — Guideline on the management of priapism."],
    pearls: ["Doloroso = isquémico = urgencia.", "Glande blando, cavernosos duros.", "Trazodona: preguntá siempre."],
    pitfalls: ["Mandarlo a la casa con hielo.", "Demorarlo por estudios."],
    tribunal: [
      qa("¿Cómo se distingue el priapismo isquémico del no isquémico?", "El isquémico es doloroso, rígido y con gases cavernosos de hipoxia y acidosis; el arterial es indoloro, parcial y con sangre oxigenada."),
      qa("¿Qué fármacos causan priapismo?", "Trazodona, antipsicóticos, inyecciones intracavernosas de prostaglandina o papaverina y, más raramente, inhibidores de la PDE5."),
      qa("¿A partir de cuántas horas se considera urgencia?", "A partir de las 4 horas: después de 24 horas la disfunción eréctil es casi la regla."),
    ],
  },
};
