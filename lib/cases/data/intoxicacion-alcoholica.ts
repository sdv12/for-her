import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const intoxicacionAlcoholica: ClinicalCase = {
  id: "intoxicacion-alcoholica-aguda",
  level: 2,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 19, ageUnit: "años", sex: "M", context: "Domingo, 4 de la mañana. Lo traen dos amigos desde una fiesta." },
  frequency: "muy-frecuente",
  intro: "“Tomó un montón, fernet y vodka, y de repente se cayó al piso. Vomitó y no se despierta bien.” (cuentan los amigos)",
  vitals: { TA: "108/64 mmHg", FC: "112 lpm", FR: "14 rpm", "T°": "35,6 °C", "SatO₂": "95 %", Glasgow: "11 (O3 V3 M5)" },
  anamnesis: [
    act("golpe", "¿Se golpeó la cabeza al caer?", "clave", "“Se cayó de costado, no sabemos si pegó la cabeza.”", "El alcohol enmascara un traumatismo de cráneo: cualquier deterioro o foco obliga a pensar en hematoma."),
    act("otras", "¿Tomó o consumió algo más? ¿Pastillas, drogas?", "clave", "“Creemos que alguien le dio una pastilla, no sabemos qué.”", "Las coingestas (benzodiacepinas, cocaína, éxtasis) cambian el riesgo y el manejo."),
    act("cuando", "¿A qué hora fue lo último que tomó?", "util", "“Hace una hora más o menos.”", "El nivel de alcohol puede seguir subiendo en la primera hora."),
    act("convulsion", "¿Convulsionó?", "util", "“No.”", "Una convulsión haría pensar en hipoglucemia, coingesta o traumatismo."),
    act("enfermedades", "¿Tiene diabetes, epilepsia u otra enfermedad?", "util", "“No, es sano.”", "Comorbilidades que cambian la interpretación."),
    act("fiesta", "¿Dónde era la fiesta?", "neutro", "“En una casa en Nueva Córdoba.”", "No orienta."),
  ],
  exam: [
    act("via", "Vía aérea y reflejos protectores", "clave", "Ronca, con restos de vómito en la boca; reflejo nauseoso presente.", "El mayor riesgo inmediato es la broncoaspiración del vómito."),
    act("craneo", "Examen de cráneo y pupilas", "clave", "Sin hematomas ni heridas; pupilas iguales y reactivas.", "Una anisocoria o un hematoma obligan a tomografía."),
    act("neuro", "Examen neurológico", "clave", "Responde a estímulos verbales con lenguaje inapropiado, moviliza los cuatro miembros, sin foco.", "Un foco neurológico no se explica por el alcohol."),
    act("temperatura", "Temperatura y piel", "util", "Hipotermia leve, piel fría y vasodilatada.", "El alcohol produce vasodilatación y pérdida de calor."),
  ],
  studies: [
    study("Laboratorio", "glucemia", "Glucemia capilar", "clave", "62 mg/dl.", "El alcohol inhibe la gluconeogénesis y puede causar hipoglucemia, que empeora la conciencia."),
    study("Laboratorio", "alcoholemia", "Alcoholemia", "util", "2,8 g/l.", "Confirma y se correlaciona con la clínica; si la conciencia no mejora con el descenso, buscar otra causa."),
    study("Laboratorio", "lab", "Ionograma, gases y CPK", "util", "Leve acidosis láctica; K normal.", "Valora complicaciones."),
    study("Imágenes", "tc", "Tomografía de cerebro", "util", "Sin lesiones.", "Indicada si hay traumatismo posible con conciencia alterada que no mejora, foco o signos de trauma; acá se pidió por el golpe incierto."),
    study("Imágenes", "rx-craneo", "Radiografía de cráneo", "innecesario", "Sin fracturas visibles.", "No muestra lesiones intracraneales: si hace falta una imagen por el golpe, es la tomografía."),
    study("Laboratorio", "toxicos", "Búsqueda de tóxicos en orina", "util", "Benzodiacepinas positivas.", "Ante sospecha de coingesta; explica parte de la depresión de conciencia."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("intox", "Intoxicación alcohólica aguda grave con probable coingesta de benzodiacepinas e hipoglucemia", true, "Ingesta masiva, depresión de conciencia, vómitos, hipotermia, alcoholemia de 2,8 g/l, glucemia de 62 y benzodiacepinas positivas."),
      dx("tec", "Traumatismo de cráneo con hematoma", false, "Se sospecha por el golpe, pero la tomografía es normal y no hay foco."),
      dx("hipoglucemia", "Hipoglucemia aislada", false, "Está presente, pero es una complicación de la intoxicación."),
      dx("meningitis", "Meningitis", false, "Fiebre, rigidez de nuca; acá hay hipotermia y una explicación tóxica."),
      dx("cocaina", "Intoxicación por cocaína", false, "Daría agitación, hipertensión, taquicardia marcada, midriasis e hipertermia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("lateral", "Posición lateral de seguridad, aspiración de secreciones y monitoreo de la vía aérea", "clave", "Previene la aspiración; si el Glasgow cae a 8 o menos, considerar intubación."),
      mg("glucosa", "Dextrosa endovenosa (con tiamina si se sospecha alcoholismo crónico o desnutrición)", "clave", "Corrige la hipoglucemia; la tiamina previene la encefalopatía de Wernicke en riesgo."),
      mg("observacion", "Hidratación, abrigo y observación hasta que recupere la conciencia", "clave", "El alcohol se metaboliza a unos 0,15 g/l por hora: se espera la mejoría sostenida."),
      mg("consejeria", "Antes del alta: intervención breve sobre consumo y pautas de cuidado", "util", "Oportunidad de prevención en un joven con consumo episódico excesivo."),
      mg("flumazenil", "Flumazenil por la coingesta de benzodiacepinas", "riesgoso", "Puede precipitar convulsiones, sobre todo con coingestas desconocidas o consumo crónico; el sostén alcanza."),
      mg("vomito", "Inducir el vómito o lavado gástrico", "riesgoso", "El alcohol se absorbe rápido y el riesgo de aspiración con la conciencia alterada es alto."),
      mg("cafe", "Café cargado para despejarlo", "innecesario", "No acelera la eliminación del alcohol."),
    ],
  },
  debrief: {
    diagnosis: "Intoxicación alcohólica aguda grave (alcoholemia 2,8 g/l) con coingesta de benzodiacepinas, hipoglucemia e hipotermia leve, en varón de 19 años.",
    pathologies: [
      { name: "Intoxicación alcohólica aguda", role: "principal", why: "Depresión de conciencia con alcoholemia alta." },
      { name: "Coingesta de benzodiacepinas", role: "asociada", why: "Potencia la depresión del sistema nervioso." },
      { name: "Hipoglucemia", role: "asociada", why: "El alcohol inhibe la gluconeogénesis." },
      { name: "Traumatismo de cráneo", role: "diferencial", why: "Se enmascara con la intoxicación." },
      { name: "Intoxicación por estimulantes", role: "diferencial", why: "Cuadro simpaticomimético opuesto." },
    ],
    reasoning: [
      "Causa: consumo episódico excesivo de alcohol, frecuente en jóvenes los fines de semana.",
      "Mecanismo: el etanol potencia el GABA-A e inhibe el NMDA, como las benzodiacepinas (por eso se suman). En el hígado, su metabolismo aumenta el NADH y frena la gluconeogénesis.",
      "Consecuencia: desinhibición, luego ataxia, somnolencia, vómitos y, con niveles altos, coma y depresión respiratoria. La vasodilatación da hipotermia; la gluconeogénesis bloqueada, hipoglucemia; el vómito con reflejos deprimidos, aspiración.",
      "La conciencia debería mejorar a medida que baja la alcoholemia: si no, hay otra causa (trauma, coingesta, hipoglucemia).",
    ],
    epidemiology:
      "El alcohol es la sustancia psicoactiva más consumida en la Argentina, y el consumo episódico excesivo se concentra en varones de 18 a 34 años según la Encuesta Nacional de Factores de Riesgo y los estudios de SEDRONAR. Las intoxicaciones alcohólicas son una de las consultas más frecuentes en las guardias de fin de semana, y el alcohol está presente en una gran proporción de traumatismos y siniestros viales.",
    management: [
      "ABC: vía aérea, posición lateral, aspiración; intubar si no protege la vía aérea.",
      "Glucemia capilar siempre; dextrosa si hay hipoglucemia (tiamina en riesgo).",
      "Buscar trauma y coingestas; TC si hay golpe con conciencia alterada que no mejora o foco.",
      "Hidratación, abrigo y observación; no inducir vómito ni usar flumazenil.",
      "Antes del alta: acompañante, intervención breve y derivación si hay consumo problemático (Ley 24.788 de lucha contra el alcoholismo y red de SEDRONAR).",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guía de atención de la intoxicación alcohólica aguda y del consumo episódico excesivo.",
      "SEDRONAR — Estudios nacionales sobre consumo de sustancias.",
      "Ley Nacional 24.788 de Lucha contra el Alcoholismo.",
    ],
    pearls: [
      "En todo intoxicado: glucemia capilar.",
      "Si no mejora mientras baja el alcohol, buscá otra causa.",
      "Nunca solo boca arriba: posición lateral de seguridad.",
    ],
    pitfalls: ["Atribuir todo al alcohol y perder un hematoma.", "Usar flumazenil.", "Dar el alta sin acompañante."],
  },
};
