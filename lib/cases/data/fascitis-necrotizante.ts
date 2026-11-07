import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const fascitisNecrotizante: ClinicalCase = {
  id: "fascitis-necrotizante",
  level: 4,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 58, ageUnit: "años", sex: "M", context: "Diabético mal controlado, alcohol diario. Herida leve en la pantorrilla con un alambre hace tres días." },
  frequency: "raro",
  intro: "“La pierna se me puso roja ayer, me duele muchísimo, y ahora tengo ampollas. Me siento muy mal.”",
  vitals: { TA: "88/52 mmHg", FC: "128 lpm", FR: "26 rpm", "T°": "39,3 °C", "SatO₂": "94 %", Glucemia: "342 mg/dl", Glasgow: "14/15" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor comparado con lo que se ve?", "clave", "“Insoportable, no me dejan ni tocarla.”", "Dolor desproporcionado: la clave para sospechar."),
    act("velocidad", "¿Qué tan rápido avanzó?", "clave", "“En horas subió hasta la rodilla.”", "La progresión rápida es signo de alarma."),
    act("factores", "¿Tenés diabetes, tomás AINE?", "clave", "“Sí, y mucho ibuprofeno.”", "Inmunocompromiso; los AINE pueden enmascarar."),
    act("herida", "¿Cómo fue la herida?", "util", "“Un rasguño con alambre oxidado.”", "Puerta de entrada mínima."),
    act("tetanos", "¿Antitetánica?", "util", "“Hace muchos años.”", "Hay que actualizarla."),
    act("trabajo", "¿A qué te dedicás?", "neutro", "“Soy albañil.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel y tejidos", "clave", "Eritema mal delimitado, ampollas hemorrágicas, zonas violáceas y necróticas, edema más allá del eritema.", "Signos duros de infección necrotizante."),
    act("crepitacion", "Crepitación y sensibilidad", "clave", "Crepitación y anestesia sobre la zona necrótica.", "Gas y destrucción de nervios cutáneos."),
    act("hemodinamia", "Perfusión", "clave", "Hipotensión, relleno de 4 segundos, confuso.", "Shock séptico."),
  ],
  studies: [
    study("Laboratorio", "lab", "Laboratorio completo, lactato, CPK, gases", "clave", "Leucocitos 26.000, Na 128, creatinina 2,6, lactato 6, CPK alta, PCR muy alta.", "Evalúa la disfunción orgánica."),
    study("Microbiología", "cultivos", "Hemocultivos y cultivos intraoperatorios", "clave", "Streptococcus pyogenes y flora mixta.", "Guían el tratamiento."),
    study("Imágenes", "tac", "TC solo si no demora la cirugía", "util", "Gas y líquido en planos fasciales.", "Con signos claros no debe demorar el quirófano."),
    study("Otros", "esperar", "Esperar resultados de imagen para decidir", "riesgoso", "No se realizó.", "El diagnóstico es clínico y quirúrgico; cada hora aumenta la mortalidad."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("fascitis", "Fascitis necrotizante de la pierna con shock séptico", true, "Dolor desproporcionado, progresión rápida, ampollas hemorrágicas, crepitación y shock en un diabético."),
      dx("celulitis", "Celulitis", false, "No da necrosis, crepitación ni shock tan rápido."),
      dx("erisipela", "Erisipela", false, "Tiene bordes netos y es superficial."),
      dx("tvp", "Trombosis venosa profunda", false, "No explica fiebre, ampollas hemorrágicas ni crepitación."),
      dx("gota", "Gota", false, "No afecta así ni produce shock."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Desbridamiento quirúrgico urgente y amplio", "clave", "Es lo que más cambia la sobrevida."),
      mg("atb", "Antibióticos de amplio espectro con clindamicina y cobertura de SAMR", "clave", "La clindamicina reduce la producción de toxinas."),
      mg("shock", "Bundle de sepsis: cristaloides, vasopresores, terapia intensiva", "clave", "Sostiene la perfusión."),
      mg("insulina", "Insulina y control metabólico, antitetánica", "clave", "Corrige factores y previene complicaciones."),
      mg("antibiotico-solo", "Solo antibióticos y reevaluar a las 24 horas", "riesgoso", "Sin cirugía la mortalidad es muy alta."),
      mg("aine", "AINE para el dolor", "riesgoso", "Enmascaran y empeoran el daño renal."),
    ],
  },
  debrief: {
    diagnosis: "Fascitis necrotizante del miembro inferior con shock séptico, en varón de 58 años con diabetes y alcoholismo.",
    pathologies: [
      { name: "Fascitis necrotizante", role: "principal", why: "Infección que destruye la fascia y el tejido subcutáneo." },
      { name: "Shock séptico, insuficiencia renal", role: "asociada", why: "Disfunción orgánica." },
      { name: "Celulitis, erisipela, TVP", role: "diferencial", why: "Otras causas de pierna roja." },
    ],
    reasoning: [
      "Causa: ingreso bacteriano por una lesión mínima en un huésped con diabetes y alcohol.",
      "Mecanismo: toxinas y enzimas se extienden por la fascia, causando trombosis de vasos perforantes y necrosis.",
      "Consecuencia: dolor intenso, ampollas, anestesia y gas, shock tóxico, falla multiorgánica.",
    ],
    epidemiology:
      "Es infrecuente, con mortalidad del 20 al 30 % o más. La diabetes es el principal factor de riesgo. Puede ser polimicrobiana (tipo I) o por Streptococcus del grupo A (tipo II). Compromete cada vez más a adultos mayores y personas con comorbilidades.",
    management: [
      "Sospecha clínica ante dolor desproporcionado.",
      "Cirugía temprana y reexploraciones.",
      "Antibióticos de amplio espectro con clindamicina.",
      "Soporte en terapia intensiva y reconstrucción posterior.",
    ],
    sources: ["Sociedad Argentina de Infectología — Recomendaciones de infecciones de piel y partes blandas.", "IDSA — Guía de infecciones de piel y partes blandas."],
    pearls: ["Dolor desproporcionado: pensá en necrotizante.", "Cirugía antes que imagen.", "Clindamicina frena toxinas."],
    pitfalls: ["Tratarla como celulitis.", "Esperar la tomografía."],
    tribunal: [
      qa("¿Cuáles son los signos duros de infección necrotizante?", "Ampollas hemorrágicas, necrosis cutánea, crepitación, anestesia local y toxicidad sistémica."),
      qa("¿Qué es la gangrena de Fournier?", "Una fascitis necrotizante del periné y los genitales, polimicrobiana, más frecuente en diabéticos."),
      qa("¿Qué diferencia celulitis de erisipela?", "La erisipela afecta la dermis superficial con bordes netos y sobreelevados, generalmente por estreptococo; la celulitis es más profunda con bordes mal definidos."),
    ],
  },
};
