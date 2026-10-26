import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const escabiosis: ClinicalCase = {
  id: "escabiosis-familiar",
  level: 1,
  area: "Dermatología",
  setting: "CAPS",
  patient: { age: 7, ageUnit: "años", sex: "F", context: "La trae la mamá. Viven seis en dos ambientes." },
  frequency: "muy-frecuente",
  intro: "“Hace tres semanas que se rasca todo el tiempo, sobre todo de noche; no la deja dormir. Ahora el hermano también se rasca.”",
  vitals: { "T°": "36,4 °C", Peso: "24 kg" },
  anamnesis: [
    act("nocturno", "¿Cuándo le pica más?", "clave", "“A la noche, en la cama, es terrible.”", "El prurito nocturno es muy característico de la escabiosis (el ácaro es más activo con el calor de la cama)."),
    act("convivientes", "¿Alguien más en la casa tiene picazón?", "clave", "“El hermano y yo también un poco.”", "Varios convivientes con prurito: escabiosis hasta demostrar lo contrario. Hay que tratar a todos."),
    act("donde", "¿En qué partes del cuerpo le pica?", "clave", "“Entre los dedos, las muñecas, la panza y la cola.”", "La distribución típica respeta la cara y la cabeza en niños mayores y adultos."),
    act("cremas", "¿Le pusieron algo?", "util", "“Una crema con corticoide que nos dio una vecina.”", "Los corticoides alivian poco y pueden enmascarar las lesiones (escabiosis incógnita)."),
    act("fiebre", "¿Tiene fiebre o lesiones con pus?", "util", "“Algunas lastimaduras tienen costra amarilla.”", "El rascado se impetiginiza; puede necesitar antibiótico."),
    act("mascotas", "¿Tienen perros o gatos con sarna?", "util", "“Un perro, está bien.”", "La sarna animal en humanos es transitoria y no da surcos; orienta poco."),
    act("escuela", "¿En qué grado está?", "neutro", "“Segundo.”", "No orienta, aunque la escuela puede ser fuente de contagio."),
  ],
  exam: [
    act("surcos", "Buscar surcos y pápulas en espacios interdigitales, muñecas, axilas, cintura, glúteos", "clave", "Surcos acarinos lineales en espacios interdigitales y muñecas; pápulas excoriadas en abdomen, cintura y glúteos.", "El surco es la lesión patognomónica: el túnel que cava la hembra en la capa córnea."),
    act("impetigo", "Buscar sobreinfección", "util", "Algunas lesiones con costras melicéricas en el abdomen.", "Impetiginización secundaria por estreptococo o estafilococo."),
    act("ganglios", "Ganglios", "neutro", "Pequeñas adenopatías inguinales reactivas.", "No cambia la conducta."),
    act("cuero", "Cuero cabelludo y cara", "util", "Respetados.", "En lactantes la escabiosis puede afectar cara, palmas y plantas; en esta edad se respetan."),
  ],
  studies: [
    study("Microbiología", "raspado", "Raspado de un surco con observación al microscopio (o dermatoscopía)", "util", "Se observa el ácaro y huevos.", "Confirma, pero ante un cuadro típico no hace falta para tratar."),
    study("Laboratorio", "hemograma", "Hemograma", "innecesario", "Eosinofilia leve.", "No cambia la conducta."),
    study("Laboratorio", "ige", "IgE total y test de alergia", "innecesario", "No se realizaron.", "Orientan a alergia, no a escabiosis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("escabiosis", "Escabiosis (sarna) con impetiginización, en contexto familiar", true, "Prurito nocturno, convivientes afectados, surcos interdigitales y en muñecas, pápulas en cintura y glúteos."),
      dx("atopica", "Dermatitis atópica", false, "Antecedentes de atopía, xerosis, eccema en pliegues de codos y rodillas; no contagia a la familia."),
      dx("urticaria", "Urticaria", false, "Ronchas evanescentes que cambian de lugar en horas; sin surcos."),
      dx("prurigo", "Prúrigo por picaduras de insectos", false, "Pápulas en zonas expuestas, estacional; no hay surcos."),
      dx("pediculosis", "Pediculosis corporal", false, "Lesiones en zonas cubiertas por la ropa y piojos en las costuras; es más de situaciones de calle."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("permetrina", "Permetrina 5 % en loción o crema en todo el cuerpo (del cuello a los pies), de noche, y enjuagar a las 8–12 h; repetir a los 7 días", "clave", "Escabicida de elección; la segunda aplicación mata a los ácaros que nacen de los huevos."),
      mg("familia", "Tratar a todos los convivientes al mismo tiempo, tengan o no síntomas", "clave", "Si no se trata a todos, la reinfestación es la regla."),
      mg("ropa", "Lavar ropa de cama y vestir a 60 °C o guardarla en bolsas cerradas 72 h", "clave", "El ácaro no sobrevive más de 2–3 días fuera de la piel."),
      mg("impetigo", "Tratar la impetiginización (mupirocina tópica o cefalexina si es extensa)", "util", "Evita complicaciones, como la glomerulonefritis posestreptocócica."),
      mg("antihist", "Antihistamínico oral de noche y explicar que el prurito puede durar 2–4 semanas", "util", "El prurito persiste por la reacción inmune a los restos del ácaro: no es falla del tratamiento."),
      mg("corticoide", "Solo corticoide tópico para la picazón", "innecesario", "No trata la infestación y puede enmascararla."),
      mg("lindano", "Lindano tópico", "riesgoso", "Es neurotóxico (convulsiones), sobre todo en niños; no se recomienda."),
    ],
  },
  debrief: {
    diagnosis: "Escabiosis con impetiginización secundaria en niña de 7 años, con convivientes afectados.",
    pathologies: [
      { name: "Escabiosis", role: "principal", why: "Prurito nocturno, surcos y contagio familiar." },
      { name: "Impétigo secundario", role: "asociada", why: "Sobreinfección por el rascado." },
      { name: "Dermatitis atópica", role: "diferencial", why: "Otra causa frecuente de prurito en niños." },
      { name: "Prúrigo por insectos", role: "diferencial", why: "Pápulas en zonas expuestas." },
    ],
    reasoning: [
      "Causa: Sarcoptes scabiei var. hominis, que se transmite por contacto piel con piel prolongado (convivencia, colecho) y, menos, por ropa.",
      "Mecanismo: la hembra cava túneles en la capa córnea donde pone huevos. Tras 3–6 semanas aparece una reacción de hipersensibilidad tipo IV a los ácaros y sus heces.",
      "Consecuencia: prurito intenso, peor de noche, surcos y pápulas en zonas de piel fina y caliente (interdigitales, muñecas, axilas, cintura, glúteos, genitales). El rascado facilita la sobreinfección.",
      "Por la demora en la reacción, los convivientes pueden estar infestados sin síntomas aún: por eso se trata a todos.",
    ],
    epidemiology:
      "Es una de las consultas dermatológicas más frecuentes en los centros de salud de la Argentina, sobre todo en niños, con brotes familiares y en instituciones (escuelas, geriátricos, cárceles). No distingue sexo. Se asocia a hacinamiento, y aumenta en otoño e invierno por el mayor contacto y el colecho.",
    management: [
      "Diagnóstico clínico: prurito nocturno, distribución típica, surcos y contactos afectados.",
      "Permetrina 5 % en todo el cuerpo, dos aplicaciones con 7 días de diferencia; ivermectina oral como alternativa (más de 15 kg) o en brotes institucionales.",
      "Tratar a todos los convivientes y contactos íntimos a la vez.",
      "Medidas de ropa y ropa de cama; no hace falta fumigar la casa.",
      "Tratar la sobreinfección y el prurito; explicar que puede persistir semanas.",
    ],
    sources: [
      "Sociedad Argentina de Dermatología — Consenso sobre escabiosis.",
      "Sociedad Argentina de Pediatría — Guía de dermatología pediátrica.",
    ],
    pearls: [
      "Prurito nocturno + convivientes con picazón = sarna.",
      "Todos los convivientes, el mismo día, aunque no se rasquen.",
      "El prurito sigue semanas después de curar: no es fracaso.",
    ],
    pitfalls: ["Tratar solo al que consulta.", "Usar corticoides solos.", "Indicar una sola aplicación de permetrina."],
  },
};
