import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const ectopicoMetotrexato: ClinicalCase = {
  id: "embarazo-ectopico-no-roto",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 33, ageUnit: "años", sex: "F", context: "Tuvo una enfermedad pelviana inflamatoria hace años. Busca embarazo hace un año." },
  frequency: "frecuente",
  intro: "“Tengo un atraso de seis semanas, el test dio positivo y estoy manchando un poquito, con un dolor leve abajo a la izquierda.”",
  vitals: { TA: "118/74 mmHg", FC: "76 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("dolor", "¿El dolor es fuerte o aumenta? ¿Te mareaste o te desmayaste?", "clave", "“Es leve, no me mareé.”", "Estable: permite opciones conservadoras."),
    act("factores", "¿Tuviste infecciones pelvianas, cirugías de trompas o ectópicos?", "clave", "“Una infección pelviana hace cinco años.”", "El daño tubario es el principal factor de riesgo."),
    act("hombro", "¿Te duele el hombro?", "util", "“No.”", "El dolor de hombro sugiere sangre en el abdomen."),
    act("fertilidad", "¿Querés tener hijos?", "util", "“Sí, mucho.”", "Influye en la elección del tratamiento."),
    act("lactancia", "¿Estás amamantando o tenés enfermedades del hígado o riñón?", "util", "“No.”", "Contraindicaciones del metotrexato."),
    act("trabajo", "¿A qué te dedicás?", "neutro", "“Soy contadora.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Blando, dolor leve en fosa ilíaca izquierda, sin defensa.", "Sin hemoperitoneo."),
    act("tacto", "Tacto vaginal suave", "util", "Útero normal, anexo izquierdo levemente doloroso.", "Compatible con ectópico."),
    act("hemodinamia", "Signos vitales y perfusión", "clave", "Estables.", "Sin rotura."),
  ],
  studies: [
    study("Imágenes", "eco-tv", "Ecografía transvaginal", "clave", "Útero vacío; masa anexial izquierda de 2,5 cm sin latido; sin líquido libre.", "Ectópico tubario no roto."),
    study("Laboratorio", "bhcg", "Beta-HCG cuantitativa (y repetir a las 48 h)", "clave", "2.100 mUI/ml, que sube poco a las 48 h.", "Por encima del umbral de visualización con útero vacío: ectópico."),
    study("Laboratorio", "lab", "Hemograma, función renal y hepática, grupo y factor", "clave", "Normales; Rh positivo.", "Antes del metotrexato."),
    study("Otros", "legrado", "Legrado uterino diagnóstico", "riesgoso", "No se realizó.", "Interrumpiría un posible embarazo intrauterino y no trata el ectópico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ectopico", "Embarazo ectópico tubario izquierdo no roto, hemodinámicamente estable", true, "Útero vacío con beta-HCG de 2.100 que sube poco, masa anexial sin latido, sin líquido libre y estable."),
      dx("roto", "Embarazo ectópico roto", false, "No hay hemoperitoneo ni inestabilidad."),
      dx("aborto", "Aborto espontáneo", false, "La beta sube y hay masa anexial."),
      dx("temprano", "Embarazo intrauterino temprano", false, "Con beta mayor de 1.500–2.000 debería verse el saco intrauterino."),
      dx("quiste", "Quiste de cuerpo lúteo", false, "No explica el útero vacío con beta alta."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("mtx", "Metotrexato intramuscular en dosis única con controles de beta-HCG en los días 4 y 7", "clave", "Candidata ideal: estable, beta menor de 5.000, masa pequeña sin latido."),
      mg("alarma", "Pautas de alarma: dolor intenso, mareos, dolor de hombro", "clave", "Puede romperse durante el tratamiento."),
      mg("evitar", "Evitar AINE, alcohol, ácido fólico y relaciones hasta la resolución; anticoncepción por 3 meses", "clave", "Interacciones y teratogenicidad."),
      mg("seguimiento", "Seguimiento semanal de beta-HCG hasta negativizar", "util", "Confirma la resolución."),
      mg("cirugia-abierta", "Laparotomía urgente", "innecesario", "Estable con criterios para tratamiento médico."),
      mg("alta-sin", "Alta sin seguimiento", "riesgoso", "Riesgo de rotura."),
    ],
  },
  debrief: {
    diagnosis: "Embarazo ectópico tubario izquierdo no roto, beta-HCG de 2.100, hemodinámicamente estable, candidata a metotrexato, en mujer de 33 años con antecedente de EPI.",
    pathologies: [
      { name: "Embarazo ectópico tubario no roto", role: "principal", why: "Implantación en la trompa." },
      { name: "Daño tubario por EPI previa", role: "asociada", why: "Factor de riesgo." },
      { name: "Aborto, embarazo temprano, quiste lúteo", role: "diferencial", why: "Se descartan con eco y beta seriada." },
    ],
    reasoning: [
      "Causa: daño de la trompa por infección previa que dificulta el paso del embrión.",
      "Mecanismo: el embrión se implanta en la trompa, que no puede distenderse.",
      "Consecuencia: dolor y sangrado; si crece, rotura con hemoperitoneo y shock.",
    ],
    epidemiology:
      "El embarazo ectópico ocurre en 1–2 % de los embarazos y sigue siendo causa de muerte materna en el primer trimestre. Los factores de riesgo son EPI, ectópico previo, cirugía tubaria, tabaco, DIU y técnicas de reproducción asistida.",
    management: [
      "Beta-HCG cuantitativa y ecografía transvaginal.",
      "Inestable o roto: cirugía urgente.",
      "Estable con criterios: metotrexato o, si corresponde, conducta expectante.",
      "Seguimiento de beta y anticoncepción.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de atención de emergencias obstétricas del primer trimestre.", "FASGO — Consenso de embarazo ectópico."],
    pearls: ["Útero vacío + beta mayor de 1.500–2.000 = ectópico.", "Estable con beta baja: metotrexato.", "Controles días 4 y 7."],
    pitfalls: ["Legrado diagnóstico.", "No dar pautas de alarma."],
    tribunal: [
      qa("¿Qué criterios debe cumplir una paciente para metotrexato?", "Estabilidad hemodinámica, sin rotura, beta-HCG preferentemente menor de 5.000, masa menor de 3,5–4 cm sin latido, función renal, hepática y hemograma normales, sin lactancia y con posibilidad de seguimiento."),
      qa("¿Cómo se evalúa la respuesta al metotrexato?", "Se mide la beta-HCG los días 4 y 7: si cae 15 % o más entre ambos, se sigue semanalmente hasta negativizar; si no, se repite la dosis o se opera."),
      qa("¿Qué es la zona de discriminación de la beta-HCG?", "El valor (alrededor de 1.500–3.500 mUI/ml) por encima del cual un embarazo intrauterino debería verse con ecografía transvaginal; un útero vacío por encima de él sugiere ectópico."),
    ],
  },
};
