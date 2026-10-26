import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const colicoRenal: ClinicalCase = {
  id: "colico-renal",
  level: 2,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 35, ageUnit: "años", sex: "M", context: "Enero, ola de calor. Trabaja en una obra." },
  frequency: "muy-frecuente",
  intro: "“Me agarró un dolor terrible en la cintura izquierda que me baja hasta los testículos. No encuentro posición, vomité dos veces.”",
  vitals: { TA: "150/90 mmHg", FC: "102 lpm", FR: "20 rpm", "T°": "36,7 °C" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor? ¿Va y viene?", "clave", "“Viene en oleadas, como puntadas fortísimas, y no se va del todo. Camino de un lado a otro.”", "Dolor cólico lumbar irradiado a genitales, con inquietud motora: típico de obstrucción ureteral."),
    act("fiebre", "¿Tiene fiebre o escalofríos?", "clave", "“No.”", "Cólico con fiebre = posible pielonefritis obstructiva: es una urgencia urológica que requiere desobstrucción."),
    act("orina", "¿Vio sangre en la orina o le arde al orinar?", "util", "“La orina está como rosada.”", "La hematuria aparece en la gran mayoría de los cólicos renales."),
    act("rinones", "¿Tiene un solo riñón, enfermedad renal o tuvo cálculos antes?", "clave", "“Dos riñones, que yo sepa. Hace cinco años tuve una piedra que eliminé.”", "Riñón único o insuficiencia renal convierten el cólico en una urgencia; la litiasis previa aumenta mucho la probabilidad."),
    act("liquidos", "¿Cuánta agua toma por día?", "util", "“Poco, un litro con suerte, y transpiro mucho en la obra.”", "La baja ingesta con pérdidas por sudor concentra la orina: factor de riesgo principal."),
    act("aines", "¿Es alérgico a algún medicamento o tiene úlcera?", "util", "“No.”", "Permite indicar AINE, la primera línea para el dolor."),
    act("perro", "¿Tiene perro?", "neutro", "“Sí.”", "No orienta."),
  ],
  exam: [
    act("puno", "Puñopercusión lumbar", "clave", "Positiva a izquierda.", "Signo de distensión de la cápsula renal por obstrucción o infección."),
    act("abdomen", "Palpación abdominal", "clave", "Blando, depresible, dolor leve en flanco izquierdo, sin defensa ni Blumberg.", "Sin irritación peritoneal: aleja causas quirúrgicas abdominales."),
    act("pulsos", "Pulsos femorales y masa pulsátil", "util", "Pulsos simétricos, sin masa pulsátil.", "En mayores de 50, un aneurisma de aorta en ruptura puede imitar un cólico renal."),
    act("testiculos", "Examen testicular", "util", "Normal.", "Descarta torsión testicular con dolor irradiado al flanco."),
  ],
  studies: [
    study("Laboratorio", "orina", "Orina completa", "clave", "Hematíes incontables, leucocitos 3–5 por campo, nitritos negativos.", "Hematuria sin piuria: apoya litiasis y aleja infección."),
    study("Laboratorio", "creatinina", "Creatinina y hemograma", "clave", "Creatinina 1,0 mg/dl. Leucocitos 9.800.", "La función renal define el riesgo (y si se puede usar AINE o contraste)."),
    study("Imágenes", "eco", "Ecografía renal y vesical", "util", "Hidronefrosis leve izquierda; no se visualiza el cálculo.", "Primera imagen accesible: muestra la dilatación; puede no ver cálculos ureterales."),
    study("Imágenes", "tc", "Tomografía de abdomen y pelvis sin contraste", "util", "Cálculo de 5 mm en el uréter distal izquierdo, con leve dilatación por encima.", "Es el estudio de mayor sensibilidad: confirma tamaño y ubicación, que predicen la expulsión espontánea."),
    study("Imágenes", "rx", "Radiografía de abdomen (árbol urinario)", "neutro", "Imagen cálcica dudosa en pelvis.", "Solo ve cálculos radiopacos y confunde con flebolitos; tiene utilidad en el seguimiento."),
    study("Imágenes", "uro-iv", "Urograma excretor con contraste", "innecesario", "No se realizó.", "Fue reemplazado por la tomografía sin contraste."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("colico", "Cólico renal izquierdo por litiasis ureteral distal no complicada", true, "Dolor cólico lumbar irradiado a genitales, inquietud, hematuria, sin fiebre, con cálculo de 5 mm en el uréter distal."),
      dx("pielo", "Pielonefritis obstructiva", false, "Daría fiebre, piuria y compromiso del estado general: requeriría desobstrucción urgente."),
      dx("aneurisma", "Aneurisma de aorta en ruptura", false, "En mayores de 50 con hipotensión y masa pulsátil; acá no hay."),
      dx("lumbalgia", "Lumbalgia mecánica", false, "Empeora con el movimiento y el paciente se queda quieto; el cólico renal no cambia con la posición."),
      dx("diverticulitis", "Diverticulitis", false, "Dolor en fosa ilíaca izquierda con fiebre en mayores de 50, sin hematuria."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aine", "AINE parenteral (diclofenac o ketorolac)", "clave", "Primera línea: además de analgésico, baja la presión intraureteral al reducir la síntesis de prostaglandinas y el flujo renal."),
      mg("tamsulosina", "Tamsulosina para facilitar la expulsión", "clave", "En cálculos ureterales distales de 5–10 mm, los alfabloqueantes aumentan la tasa de expulsión."),
      mg("pautas", "Alta con analgesia, filtrar la orina y pautas de alarma (fiebre, dolor que no cede, anuria)", "clave", "La mayoría de los cálculos menores de 5 mm se elimina solo; hay que detectar complicaciones."),
      mg("seguimiento", "Control con urología e indicaciones de prevención (2,5 litros de agua por día)", "util", "La litiasis recidiva en la mitad de los pacientes; la hidratación es la principal prevención."),
      mg("hiperhidratacion", "Hiperhidratación endovenosa forzada", "innecesario", "No acelera la expulsión y puede aumentar el dolor por mayor distensión."),
      mg("antiespasmodico", "Antiespasmódico (hioscina) como único analgésico", "innecesario", "Es menos eficaz que los AINE para el cólico renal."),
      mg("atb", "Ciprofloxacina empírica", "innecesario", "Sin fiebre ni piuria no hay infección que tratar."),
    ],
  },
  debrief: {
    diagnosis: "Cólico renal izquierdo por litiasis ureteral distal de 5 mm, no complicado.",
    pathologies: [
      { name: "Litiasis ureteral con cólico renal", role: "principal", why: "Cálculo de 5 mm en el uréter distal con hidronefrosis leve." },
      { name: "Pielonefritis obstructiva", role: "diferencial", why: "La complicación que transforma el cuadro en urgencia." },
      { name: "Aneurisma de aorta abdominal", role: "diferencial", why: "Imitador grave en mayores de 50." },
      { name: "Torsión testicular", role: "diferencial", why: "Dolor irradiado entre flanco y escroto." },
    ],
    reasoning: [
      "Causa: sobresaturación de la orina (poca agua, calor, sudoración) que precipita cristales, en general de oxalato de calcio.",
      "Mecanismo: el cálculo migra al uréter y lo obstruye en sus estrecheces (unión pieloureteral, cruce de los ilíacos, unión ureterovesical). Aumenta la presión por encima y se liberan prostaglandinas que dilatan la arteriola aferente y aumentan aún más la presión.",
      "Consecuencia: distensión de la cápsula y del uréter con peristaltismo intenso → dolor cólico que se irradia según la altura (lumbar alto, a genitales si es distal). El roce del cálculo produce hematuria.",
      "Los AINE cortan el círculo: bajan la síntesis de prostaglandinas, la presión y el dolor.",
    ],
    epidemiology:
      "Es una de las consultas más frecuentes en guardia, con pico en los meses de calor. Afecta al 5–10 % de la población en algún momento, con un pico entre los 30 y 50 años y predominio en varones (2–3:1). Recidiva en alrededor de la mitad de los pacientes en 5–10 años. Son factores de riesgo la baja ingesta de líquidos, la dieta rica en sal y proteína animal, la obesidad y los trabajos con calor.",
    management: [
      "Confirmar la sospecha y descartar complicaciones: fiebre, riñón único, insuficiencia renal, dolor refractario o anuria.",
      "Analgesia con AINE; opioides como rescate.",
      "Imagen: ecografía (embarazadas, niños, recurrentes) o tomografía sin contraste.",
      "Cálculos menores de 10 mm sin complicaciones: tratamiento expulsivo con tamsulosina y control.",
      "Urgencia urológica si hay infección con obstrucción (desobstrucción con catéter doble J o nefrostomía); prevención con hidratación y estudio metabólico en recurrentes.",
    ],
    sources: [
      "Sociedad Argentina de Urología — Guías de manejo de la litiasis urinaria.",
      "Guías de la Asociación Europea de Urología (EAU), adoptadas en las recomendaciones locales.",
    ],
    pearls: [
      "Cólico renal: el paciente no encuentra posición; en la peritonitis se queda quieto.",
      "Cólico + fiebre = urgencia: desobstruir y dar antibiótico.",
      "Mayor de 50 con su “primer cólico renal”: descartá aneurisma de aorta.",
    ],
    pitfalls: ["Hiperhidratar para “empujar” el cálculo.", "Olvidar preguntar por la fiebre.", "Indicar antibióticos sin infección."],
  },
};
