import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const bronquitisAguda: ClinicalCase = {
  id: "bronquitis-aguda",
  level: 1,
  area: "Respiratorio",
  setting: "CAPS",
  patient: { age: 35, ageUnit: "años", sex: "F", context: "Sana, no fuma. Julio." },
  frequency: "muy-frecuente",
  intro: "“Hace diez días empecé con un resfrío y ahora tengo una tos con catarro amarillo que no se va. Quiero un antibiótico porque el catarro es verde.”",
  vitals: { TA: "116/74 mmHg", FC: "78 lpm", FR: "16 rpm", "T°": "36,8 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("tos", "¿Cómo es la tos y desde cuándo?", "clave", "“Diez días, con catarro, me molesta de noche.”", "Tos aguda tras un cuadro viral: bronquitis aguda."),
    act("fiebre", "¿Tenés fiebre, dolor al respirar o falta de aire?", "clave", "“No, solo tos.”", "Sin signos de neumonía."),
    act("sibilancias", "¿Te silba el pecho? ¿Asma o alergias?", "util", "“Un poco de silbido a la noche.”", "Hiperreactividad bronquial transitoria."),
    act("tbc", "¿Tos de más de 3 semanas, sudores, pérdida de peso o contacto con TBC?", "util", "“No.”", "Descarta tuberculosis."),
    act("coqueluche", "¿La tos viene en ataques que terminan en vómito o con un silbido al inspirar?", "util", "“No.”", "Descarta coqueluche."),
    act("trabajo", "¿Dónde trabajás?", "neutro", "“En un banco.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Auscultación pulmonar", "clave", "Roncus y sibilancias aisladas, sin rales ni signos de condensación.", "Bronquitis, no neumonía."),
    act("signos", "Signos vitales", "clave", "Normales.", "Sin taquicardia, taquipnea ni fiebre: baja probabilidad de neumonía."),
    act("orofaringe", "Orofaringe y oídos", "util", "Normales.", "Descarta otros focos."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax", "innecesario", "No se realizó.", "Con signos vitales y examen normales no está indicada."),
    study("Microbiología", "esputo", "Cultivo de esputo", "innecesario", "No se realizó.", "La mayoría es viral; no cambia la conducta."),
    study("Laboratorio", "hemograma", "Hemograma", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("bronquitis", "Bronquitis aguda (probablemente viral)", true, "Tos productiva tras un resfrío, sin fiebre ni taquipnea, con roncus y sin condensación."),
      dx("nac", "Neumonía", false, "Signos vitales y examen pulmonar normales."),
      dx("asma", "Asma", false, "Las sibilancias son transitorias tras un virus; se reevalúa si persisten."),
      dx("sinusitis", "Rinosinusitis bacteriana", false, "Sin dolor facial ni secreción nasal purulenta persistente."),
      dx("coqueluche", "Coqueluche", false, "Sin accesos de tos con estridor inspiratorio ni vómitos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("explicar", "Explicar que el color del catarro no indica bacterias y que la tos puede durar 2–3 semanas", "clave", "Reduce el uso innecesario de antibióticos."),
      mg("sintomaticos", "Miel, líquidos, paracetamol si hace falta; salbutamol si hay sibilancias que molestan", "clave", "Alivio sintomático."),
      mg("alarma", "Pautas de alarma: fiebre alta, falta de aire, tos de más de 3 semanas", "clave", "Indican reconsultar."),
      mg("antibiotico", "Amoxicilina por el catarro verde", "riesgoso", "No acorta el cuadro, produce efectos adversos y resistencia."),
      mg("antitusivo", "Jarabes antitusivos combinados", "innecesario", "Poca eficacia."),
      mg("vacuna", "Vacuna antigripal anual", "util", "Prevención."),
    ],
  },
  debrief: {
    diagnosis: "Bronquitis aguda probablemente viral con hiperreactividad bronquial transitoria, sin criterios de neumonía, en mujer sana de 35 años.",
    pathologies: [
      { name: "Bronquitis aguda", role: "principal", why: "Inflamación de los bronquios tras una infección viral." },
      { name: "Hiperreactividad bronquial transitoria", role: "asociada", why: "Sibilancias posvirales." },
      { name: "Neumonía, asma, coqueluche", role: "diferencial", why: "Otras causas de tos aguda." },
    ],
    reasoning: [
      "Causa: virus respiratorios (más del 90 % de los casos).",
      "Mecanismo: inflamación del epitelio bronquial con hipersecreción de moco.",
      "Consecuencia: tos con o sin catarro de hasta 3 semanas; el color amarillo o verde se debe a células inflamatorias, no a bacterias.",
    ],
    epidemiology:
      "La bronquitis aguda es una de las consultas más frecuentes en el primer nivel en invierno y una de las principales causas de prescripción innecesaria de antibióticos, lo que favorece la resistencia antimicrobiana.",
    management: [
      "Descartar neumonía (signos vitales y examen).",
      "Tratamiento sintomático.",
      "No indicar antibióticos.",
      "Reevaluar si persiste más de 3 semanas.",
    ],
    sources: ["Ministerio de Salud de la Nación — Estrategia nacional de control de la resistencia antimicrobiana.", "Sociedad Argentina de Infectología — Uso racional de antibióticos en infecciones respiratorias."],
    pearls: ["Catarro verde no es igual a bacterias.", "Signos vitales normales: sin radiografía.", "Sin antibióticos."],
    pitfalls: ["Dar antibióticos.", "Pedir radiografía de rutina."],
    tribunal: [
      qa("¿Por qué el catarro se pone amarillo o verde?", "Por la mieloperoxidasa de los neutrófilos y otras células inflamatorias, que aparecen tanto en infecciones virales como bacterianas; el color no permite distinguirlas."),
      qa("¿Qué es la resistencia antimicrobiana?", "La capacidad de las bacterias de sobrevivir a los antibióticos, favorecida por su uso innecesario o inadecuado; es una amenaza global de salud pública."),
      qa("¿Cuándo se estudia una tos?", "Aguda: menos de 3 semanas (infecciosa en general). Subaguda: 3 a 8 semanas (posinfecciosa, coqueluche). Crónica: más de 8 semanas (asma, reflujo, goteo posnasal, IECA, tabaco, TBC, cáncer)."),
    ],
  },
};
