import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const abortoIncompleto: ClinicalCase = {
  id: "aborto-incompleto",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 24, ageUnit: "años", sex: "F", context: "Embarazo de 9 semanas por fecha de última menstruación." },
  frequency: "frecuente",
  intro: "“Desde ayer sangro mucho, con coágulos, y tengo dolores como de parto. Hoy me salió algo como un pedazo de carne.”",
  vitals: { TA: "110/70 mmHg", FC: "92 lpm", "T°": "36,6 °C" },
  anamnesis: [
    act("sangrado", "¿Cuánto sangra? ¿Cuántas toallas usa?", "clave", "“Una toalla empapada cada dos horas, menos que ayer.”", "Cuantifica el sangrado: más de una toalla por hora o signos de shock requieren evacuación urgente."),
    act("fiebre", "¿Tiene fiebre, flujo con mal olor o dolor fuerte en la panza?", "clave", "“No.”", "Fiebre y flujo fétido orientan a aborto infectado (séptico), que cambia el manejo."),
    act("maniobras", "¿Usó algún medicamento o le hicieron algún procedimiento?", "util", "“No, empezó solo.”", "Se pregunta sin juzgar: orienta el riesgo de infección y de lesiones. La atención es confidencial."),
    act("grupo", "¿Sabe su grupo y factor?", "clave", "“A negativo.”", "Las mujeres Rh negativas reciben inmunoglobulina anti-D."),
    act("deseo", "¿Era un embarazo buscado? ¿Cómo se siente?", "util", "“Sí, lo estábamos buscando. Estoy muy triste.”", "Acompañar el duelo es parte de la atención."),
    act("trabajo", "¿Trabaja?", "neutro", "“En un comercio.”", "No orienta."),
  ],
  exam: [
    act("especulo", "Especuloscopía", "clave", "Sangrado moderado por el orificio cervical, restos ovulares asomando por el cuello.", "Restos visibles con cuello abierto: aborto en curso o incompleto. Retirarlos con una pinza reduce el sangrado."),
    act("tacto", "Tacto vaginal", "clave", "Cuello permeable, útero de 7 semanas, blando, poco doloroso; anexos libres.", "Cuello abierto con útero menor que la amenorrea: aborto incompleto."),
    act("hemodinamia", "Estado hemodinámico", "clave", "Estable, sin palidez marcada.", "Permite elegir entre opciones."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía transvaginal", "clave", "Restos endometriales heterogéneos de 22 mm, sin saco gestacional.", "Confirma los restos y descarta embarazo en curso o ectópico."),
    study("Laboratorio", "lab", "Hemograma, grupo y factor", "clave", "Hb 11,0. A Rh negativo.", "Evalúa la anemia y la necesidad de anti-D."),
    study("Laboratorio", "beta", "Beta-hCG cuantitativa", "util", "Positiva, en descenso respecto de un valor previo.", "Útil si la ecografía no es concluyente."),
    study("Imágenes", "tc", "Tomografía de abdomen", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("incompleto", "Aborto espontáneo incompleto", true, "Sangrado con expulsión parcial, cuello permeable y restos en la ecografía, sin saco."),
      dx("amenaza", "Amenaza de aborto", false, "El cuello está cerrado y hay un embrión vivo en la ecografía."),
      dx("completo", "Aborto completo", false, "El cuello se cierra, el sangrado cede y el endometrio es fino, sin restos."),
      dx("septico", "Aborto séptico", false, "Habría fiebre, flujo fétido y útero doloroso."),
      dx("ectopico", "Embarazo ectópico", false, "Útero vacío con masa anexial; acá hay restos intrauterinos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ameu", "Evacuación uterina por aspiración manual endouterina (AMEU) o misoprostol, según preferencia de la paciente", "clave", "La AMEU es segura, rápida y con menos complicaciones que el legrado; el misoprostol es una alternativa eficaz en pacientes estables."),
      mg("antid", "Inmunoglobulina anti-D", "clave", "Previene la aloinmunización en mujeres Rh negativas."),
      mg("anticoncepcion", "Consejería en anticoncepción posaborto, si la desea", "clave", "La fertilidad vuelve en pocas semanas."),
      mg("acompanamiento", "Acompañar el duelo y explicar que no fue culpa suya", "util", "La mayoría de los abortos espontáneos se deben a alteraciones cromosómicas."),
      mg("legrado", "Legrado con cureta (raspado)", "innecesario", "Tiene más riesgo de perforación y sinequias que la AMEU; ya no es la primera elección."),
      mg("denuncia", "Hacer una denuncia policial", "riesgoso", "Viola el secreto profesional y los derechos de la paciente; la atención posaborto es confidencial y está garantizada por ley."),
    ],
  },
  debrief: {
    diagnosis: "Aborto espontáneo incompleto de 9 semanas, hemodinámicamente estable, en mujer Rh negativa.",
    pathologies: [
      { name: "Aborto espontáneo incompleto", role: "principal", why: "Restos ovulares con cuello abierto." },
      { name: "Amenaza de aborto y aborto completo", role: "diferencial", why: "Se distinguen por el cuello y la ecografía." },
      { name: "Aborto séptico", role: "diferencial", why: "Complicación grave." },
      { name: "Embarazo ectópico", role: "diferencial", why: "Siempre a descartar." },
    ],
    reasoning: [
      "Causa: en más de la mitad de los abortos espontáneos del primer trimestre hay alteraciones cromosómicas del embrión.",
      "Mecanismo: el embarazo no evolutivo se desprende; el útero se contrae para expulsarlo, pero puede quedar tejido retenido.",
      "Consecuencia: sangrado persistente, dolor cólico y riesgo de infección y anemia mientras hay restos.",
      "Evacuar el útero resuelve el sangrado y previene la infección.",
    ],
    epidemiology:
      "Entre el 10 y el 15 % de los embarazos clínicamente reconocidos terminan en aborto espontáneo, la mayoría en el primer trimestre. El riesgo aumenta con la edad materna (más de 35 años) y con abortos previos. En la Argentina, las complicaciones del aborto siguen siendo una causa de mortalidad materna evitable, y la atención posaborto de calidad es un derecho garantizado (Ley 27.610).",
    management: [
      "Evaluar el estado hemodinámico y la infección.",
      "Confirmar con examen y ecografía.",
      "Opciones: expectante, misoprostol o AMEU; urgente si hay sangrado abundante o infección.",
      "Inmunoglobulina anti-D en Rh negativas.",
      "Consejería anticonceptiva y acompañamiento; atención confidencial y sin juicios.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Protocolo para la atención integral de las personas con derecho a la interrupción voluntaria y legal del embarazo y atención posaborto (Ley 27.610).",
      "Organización Mundial de la Salud — Directrices sobre la atención para el aborto.",
    ],
    pearls: ["Cuello abierto + restos = incompleto.", "AMEU antes que legrado.", "Rh negativa: anti-D."],
    pitfalls: ["Denunciar a la paciente.", "Hacer un legrado cuando hay AMEU.", "Olvidar la anti-D."],
  },
};
