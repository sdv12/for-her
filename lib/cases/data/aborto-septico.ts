import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const abortoSeptico: ClinicalCase = {
  id: "aborto-septico",
  level: 4,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 19, ageUnit: "años", sex: "F", context: "Embarazo de 12 semanas. Viene sola, asustada." },
  frequency: "poco-frecuente",
  intro: "“Hace tres días me empezó a sangrar y a doler la panza. Desde ayer tengo fiebre con escalofríos y el flujo tiene muy mal olor.”",
  vitals: { TA: "82/48 mmHg", FC: "132 lpm", FR: "26 rpm", "T°": "39,6 °C", "SatO₂": "94 %" },
  anamnesis: [
    act("confidencial", "Garantizar confidencialidad: “Lo que me cuentes es para cuidarte. ¿Te hiciste algo o alguien te hizo algo para interrumpir el embarazo?”", "clave", "“Fui a una mujer que me puso algo adentro.”", "Maniobras no seguras: fuente de infección polimicrobiana; preguntar sin juzgar facilita el relato."),
    act("tiempo", "¿Cuándo fue?", "clave", "“Hace cuatro días.”", "Infección de restos ovulares."),
    act("sangrado", "¿Cuánto sangrás?", "util", "“Bastante, con coágulos.”", "Puede haber restos y hemorragia."),
    act("orina", "¿Orinaste hoy?", "util", "“Muy poco.”", "Oliguria por sepsis."),
    act("alergias", "¿Sos alérgica a algún medicamento?", "util", "“No.”", "Antes del antibiótico."),
    act("familia", "¿Con quién vivís?", "neutro", "“Con mi mamá.”", "No orienta."),
  ],
  exam: [
    act("perfusion", "Perfusión y conciencia", "clave", "Piel fría, relleno 4 s, lúcida pero ansiosa.", "Shock séptico."),
    act("abdomen", "Abdomen", "clave", "Dolor y defensa en hipogastrio.", "Irritación peritoneal."),
    act("especulo", "Especuloscopía y tacto", "clave", "Orificio abierto con restos fétidos, útero blando y doloroso; sin cuerpos extraños visibles ni lesiones vaginales.", "Aborto infectado; descartar perforación."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, coagulograma, función renal, lactato, gases, grupo y factor", "clave", "Leucocitos 24.000, plaquetas 80.000, creatinina 2,0, lactato 5.", "Sepsis con disfunción orgánica."),
    study("Microbiología", "cultivos", "Hemocultivos y cultivo de restos", "clave", "Pendientes.", "Guía el tratamiento (incluye clostridios)."),
    study("Imágenes", "eco", "Ecografía transvaginal y abdominal", "clave", "Restos ovulares, sin aire libre ni colecciones.", "Descarta perforación y abscesos."),
    study("Otros", "denuncia", "Llamar a la policía antes de atender", "riesgoso", "No se realizó.", "Viola el secreto profesional y demora la atención; la Ley 27.610 garantiza atención sin denuncia."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("septico", "Aborto séptico con shock séptico tras maniobras abortivas inseguras", true, "Embarazo de 12 semanas con sangrado, fiebre, flujo fétido, restos en el útero y shock con disfunción orgánica."),
      dx("incompleto", "Aborto incompleto sin infección", false, "Hay fiebre, flujo fétido y shock."),
      dx("ectopico", "Embarazo ectópico roto", false, "Hay restos en el útero y fiebre."),
      dx("pielonefritis", "Pielonefritis", false, "El foco es uterino."),
      dx("molar", "Embarazo molar", false, "Ecografía con restos, sin imagen molar."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Antibióticos EV de amplio espectro en la primera hora (por ejemplo, clindamicina más gentamicina, o ampicilina-sulbactam)", "clave", "Infección polimicrobiana con anaerobios."),
      mg("reanimacion", "Reanimación con fluidos y vasopresores en terapia intensiva", "clave", "Shock séptico."),
      mg("evacuacion", "Evacuación uterina (AMEU o legrado) en cuanto inicia el antibiótico", "clave", "Sin retirar los restos infectados, la sepsis no se controla."),
      mg("trato", "Atención con trato digno, sin juzgar; consejería en anticoncepción", "util", "Ley 27.610 y derechos del paciente."),
      mg("esperar-evacuar", "Esperar 48 h de antibióticos antes de evacuar", "riesgoso", "El foco infectado sigue."),
      mg("histerectomia-ya", "Histerectomía de entrada", "innecesario", "Se reserva para perforación, necrosis o falta de respuesta."),
    ],
  },
  debrief: {
    diagnosis: "Aborto séptico tras maniobras abortivas inseguras, con shock séptico, insuficiencia renal y plaquetopenia, en adolescente de 19 años con embarazo de 12 semanas.",
    pathologies: [
      { name: "Aborto séptico", role: "principal", why: "Infección de restos ovulares y endometrio." },
      { name: "Shock séptico", role: "asociada", why: "Disfunción orgánica." },
      { name: "Ectópico, pielonefritis, mola", role: "diferencial", why: "Se descartan." },
    ],
    reasoning: [
      "Causa: maniobras inseguras que introducen bacterias en el útero con restos.",
      "Mecanismo: infección polimicrobiana (incluidos anaerobios y clostridios) del tejido necrótico, que pasa a la sangre.",
      "Consecuencia: sepsis, shock, CID, insuficiencia renal, perforación y muerte.",
    ],
    epidemiology:
      "El aborto inseguro fue durante décadas una de las principales causas de muerte materna en Argentina. Desde la Ley 27.610 (2020) el acceso al aborto seguro hasta la semana 14 redujo las internaciones por complicaciones, pero siguen ocurriendo por barreras de acceso, desinformación o miedo.",
    management: [
      "Reconocer la sepsis y tratar en la primera hora.",
      "Antibióticos, reanimación y evacuación uterina.",
      "Atención confidencial y sin juzgar.",
      "Consejería en anticoncepción y derechos.",
    ],
    sources: ["Ley 27.610 de Acceso a la Interrupción Voluntaria del Embarazo.", "Ministerio de Salud de la Nación — Protocolo para la atención integral de personas con derecho a la interrupción del embarazo."],
    pearls: ["Fiebre + flujo fétido + restos = aborto séptico.", "Antibiótico y evacuación.", "Secreto profesional."],
    pitfalls: ["Denunciar a la paciente.", "Demorar la evacuación."],
    tribunal: [
      qa("¿Qué dice la Ley 27.610?", "Garantiza el derecho a la interrupción voluntaria del embarazo hasta la semana 14 inclusive, y después por violación o riesgo para la vida o la salud; establece la atención posaborto y el acceso a anticoncepción, con plazos máximos de 10 días."),
      qa("¿Qué es la AMEU?", "La aspiración manual endouterina: evacuación del útero con una cánula y una jeringa de vacío; es más segura que el legrado con cureta, con menos perforaciones y adherencias."),
      qa("¿Qué es el secreto profesional y cuándo se puede romper?", "La obligación de no revelar información del paciente; solo se exceptúa por justa causa (riesgo para terceros) o por mandato legal, y nunca para denunciar a una persona que consulta por complicaciones de un aborto."),
    ],
  },
};
