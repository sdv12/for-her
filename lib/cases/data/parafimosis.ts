import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const parafimosis: ClinicalCase = {
  id: "parafimosis",
  level: 1,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 82, ageUnit: "años", sex: "M", context: "Vive en un geriátrico. Tiene sonda vesical permanente. Lo cambiaron de sonda ayer." },
  frequency: "frecuente",
  intro: "La enfermera del geriátrico: “Tiene la punta del pene muy hinchada y se queja cuando lo tocamos.”",
  vitals: { TA: "136/80 mmHg", FC: "88 lpm", "T°": "36,6 °C" },
  anamnesis: [
    act("sonda", "¿Después de cambiar la sonda volvieron el prepucio a su lugar?", "clave", "“No sé, lo hizo otra compañera.”", "Causa más frecuente en adultos: prepucio retraído y olvidado tras sondaje o higiene."),
    act("tiempo", "¿Desde cuándo está hinchado?", "clave", "“Desde anoche.”", "Cuanto más tiempo, más edema y riesgo de isquemia."),
    act("orina", "¿Drena orina la sonda?", "clave", "“Sí, normal.”", "Sin retención agregada."),
    act("dolor", "¿Le duele?", "util", "“Se queja si lo tocamos.”", "Dolor por compresión."),
    act("diabetes", "¿Es diabético?", "util", "“Sí, con pastillas.”", "Favorece balanitis y fimosis."),
    act("visitas", "¿Lo visita la familia?", "neutro", "“Los domingos.”", "No orienta."),
  ],
  exam: [
    act("glande", "Inspección del pene", "clave", "Prepucio retraído detrás del glande formando un anillo constrictivo, edema importante del prepucio distal, glande rosado y sensible.", "Parafimosis con glande viable."),
    act("color", "Color del glande", "clave", "Rosado, sin zonas negras.", "Si estuviera oscuro o negro, hay isquemia: urgencia quirúrgica."),
    act("abdomen", "Abdomen e hipogastrio", "util", "Sin globo vesical.", "Sonda funcionando."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Anillo constrictivo y edema distal.", "No requiere estudios."),
    study("Imágenes", "eco-doppler", "Ecografía Doppler del pene antes de reducir", "innecesario", "No se pidió.", "Retrasa la reducción y no cambia la conducta."),
    study("Laboratorio", "glucemia", "Glucemia", "util", "184 mg/dl.", "Control de un diabético."),
    study("Microbiología", "urocultivo", "Urocultivo de la sonda sin síntomas", "innecesario", "No se pidió.", "La sonda permanente siempre está colonizada."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("parafimosis", "Parafimosis por prepucio no reducido después del cambio de sonda", true, "Prepucio retraído con anillo constrictivo, edema distal y glande viable."),
      dx("balanitis", "Balanopostitis", false, "Hay inflamación, pero el prepucio no está atrapado detrás del glande."),
      dx("fimosis", "Fimosis", false, "En la fimosis el prepucio no se puede retraer; acá no se puede volver."),
      dx("priapismo", "Priapismo", false, "No hay erección de los cuerpos cavernosos."),
      dx("gangrena-fournier", "Gangrena de Fournier", false, "Sin necrosis, crepitación ni toxicidad."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reduccion", "Reducción manual: compresión del glande y empuje con los pulgares mientras los dedos llevan el prepucio hacia adelante", "clave", "Resuelve la mayoría."),
      mg("analgesia", "Analgesia y bloqueo peneano o lidocaína en gel", "clave", "Hace posible la maniobra."),
      mg("edema", "Reducir el edema antes: compresión con gasa, frío o pequeñas punciones", "clave", "Facilita la reducción."),
      mg("incision-dorsal", "Si falla: incisión dorsal del anillo por urología", "util", "Libera la constricción."),
      mg("educar", "Capacitar al geriátrico para volver siempre el prepucio", "clave", "Prevención."),
      mg("esperar", "Esperar a que baje la hinchazón sola", "riesgoso", "La constricción progresa y puede necrosar el glande."),
      mg("sacar-sonda", "Retirar la sonda y no recolocarla", "innecesario", "La sonda no es el problema; sí no reducir el prepucio."),
    ],
  },
  debrief: {
    diagnosis: "Parafimosis con glande viable por prepucio no reducido después del cambio de sonda vesical, en un hombre de 82 años institucionalizado.",
    pathologies: [
      { name: "Parafimosis", role: "principal", why: "Prepucio retraído que actúa como anillo constrictivo." },
      { name: "Sonda vesical permanente", role: "asociada", why: "Situación de riesgo." },
      { name: "Balanopostitis", role: "diferencial", why: "Edema prepucial inflamatorio." },
    ],
    reasoning: [
      "Causa: prepucio retraído que nadie volvió a su posición.",
      "Mecanismo: el anillo prepucial comprime el retorno venoso y linfático y se forma edema distal, que agranda el atrapamiento.",
      "Consecuencia: si no se reduce, compromiso arterial y necrosis del glande.",
    ],
    epidemiology:
      "Afecta a varones no circuncidados, sobre todo niños que manipulan el prepucio y adultos mayores con sonda o dependientes para la higiene. Es una urgencia urológica frecuente y casi siempre prevenible con educación del personal.",
    management: [
      "Analgesia.",
      "Reducir el edema.",
      "Reducción manual.",
      "Incisión dorsal si falla y circuncisión diferida.",
    ],
    sources: ["Sociedad Argentina de Urología — Urgencias urológicas.", "EAU — Guidelines on Paediatric Urology: phimosis and paraphimosis."],
    pearls: ["Siempre volver el prepucio.", "Glande oscuro: urgencia quirúrgica.", "Primero bajar el edema, después reducir."],
    pitfalls: ["Esperar que baje solo.", "Confundir con fimosis."],
    tribunal: [
      qa("¿Cuál es la diferencia entre fimosis y parafimosis?", "En la fimosis el prepucio no se puede retraer; en la parafimosis está retraído y no se puede volver sobre el glande."),
      qa("¿Por qué la parafimosis es una urgencia?", "Porque el anillo constrictivo genera edema progresivo que compromete la irrigación y puede necrosar el glande."),
      qa("¿Cómo se previene en pacientes con sonda?", "Volviendo siempre el prepucio sobre el glande después de colocar la sonda o hacer la higiene."),
    ],
  },
};
