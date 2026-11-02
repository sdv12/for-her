import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const glaucomaAgudo: ClinicalCase = {
  id: "glaucoma-agudo-angulo-cerrado",
  level: 2,
  area: "Oftalmología",
  setting: "Guardia",
  patient: { age: 64, ageUnit: "años", sex: "F", context: "Hipermétrope, usa anteojos para ver de cerca. Le dieron un antialérgico para el resfrío." },
  frequency: "poco-frecuente",
  intro: "“Me empezó a la noche un dolor terrible en el ojo derecho y en la cabeza, veo borroso, con halos de colores alrededor de las luces. Vomité dos veces.”",
  vitals: { TA: "158/90 mmHg", FC: "92 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("vision", "¿Cómo ves con ese ojo? ¿Ves halos alrededor de las luces?", "clave", "“Borroso, y halos como un arcoíris.”", "Los halos se deben al edema de córnea por presión intraocular alta."),
    act("desencadenante", "¿Empezó en un lugar oscuro o después de tomar algún remedio?", "clave", "“Estaba viendo la tele a oscuras; tomé un antialérgico con descongestivo.”", "La midriasis (oscuridad, anticolinérgicos, simpaticomiméticos) cierra el ángulo en ojos predispuestos."),
    act("hipermetropia", "¿Usás anteojos? ¿Para lejos o para cerca?", "clave", "“Para cerca, soy hipermétrope.”", "Los ojos hipermétropes tienen cámara anterior estrecha."),
    act("vomitos", "¿Tuviste náuseas o vómitos?", "util", "“Sí.”", "Frecuentes en el glaucoma agudo; pueden confundir con un cuadro abdominal o neurológico."),
    act("antes", "¿Te pasó algo parecido más leve?", "util", "“A veces halos y dolor leve que se iban al dormir.”", "Episodios previos subagudos."),
    act("lentes", "¿Usás lentes de contacto?", "util", "“No.”", "Descarta queratitis por lentes."),
    act("novela", "¿Qué estabas mirando?", "neutro", "“Una novela turca.”", "No orienta."),
  ],
  exam: [
    act("ojo", "Inspección del ojo", "clave", "Ojo rojo con inyección ciliar (alrededor de la córnea), córnea turbia.", "Ojo rojo doloroso con disminución de la visión: signo de alarma."),
    act("pupila", "Pupilas", "clave", "Pupila derecha en midriasis media, arreactiva.", "Típica del glaucoma agudo."),
    act("palpacion", "Palpación digital del globo (comparando ambos ojos)", "clave", "Ojo derecho duro como una piedra.", "Presión intraocular muy elevada."),
    act("agudeza", "Agudeza visual", "util", "Cuenta dedos a 1 metro con el ojo derecho.", "Disminución importante."),
  ],
  studies: [
    study("Otros", "tonometria", "Tonometría (presión intraocular)", "clave", "56 mmHg en el ojo derecho; 16 en el izquierdo.", "Confirma (normal: 10–21 mmHg)."),
    study("Otros", "gonioscopia", "Gonioscopía por oftalmología", "util", "Ángulo cerrado en el ojo derecho y estrecho en el izquierdo.", "Confirma el mecanismo y el riesgo del otro ojo."),
    study("Imágenes", "tc", "Tomografía de cerebro por la cefalea", "innecesario", "No se realizó.", "El examen ocular explica el cuadro; demora el tratamiento."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("glaucoma", "Glaucoma agudo por cierre angular primario del ojo derecho", true, "Dolor ocular intenso con cefalea y vómitos, visión borrosa con halos, ojo rojo con córnea turbia, midriasis media arreactiva y presión de 56 mmHg, en hipermétrope tras midriasis."),
      dx("conjuntivitis", "Conjuntivitis", false, "No duele así ni baja la visión; la pupila es normal."),
      dx("uveitis", "Uveítis anterior", false, "La pupila suele estar en miosis y la presión normal o baja."),
      dx("migrana", "Migraña", false, "No explica el ojo rojo ni la presión alta."),
      dx("hsa", "Hemorragia subaracnoidea", false, "El hallazgo es ocular: presión intraocular muy elevada."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("bajar-pio", "Bajar la presión: acetazolamida, betabloqueante tópico (timolol), alfa agonista y manitol si no baja", "clave", "Cada hora con presión alta daña el nervio óptico."),
      mg("pilocarpina", "Pilocarpina cuando baja la presión", "clave", "La miosis abre el ángulo."),
      mg("oftalmologia", "Derivación urgente a oftalmología para iridotomía láser en ambos ojos", "clave", "Es el tratamiento definitivo y previene el ataque en el otro ojo."),
      mg("analgesia", "Analgesia y antieméticos", "util", "Alivian síntomas."),
      mg("midriatico", "Gotas para dilatar la pupila y ver el fondo de ojo", "riesgoso", "Empeoran el cierre angular."),
      mg("alta-analgesicos", "Alta con analgésicos por migraña", "riesgoso", "Retrasa el tratamiento y lleva a la ceguera."),
    ],
  },
  debrief: {
    diagnosis: "Glaucoma agudo por cierre angular primario del ojo derecho, desencadenado por midriasis farmacológica y oscuridad, en mujer hipermétrope de 64 años.",
    pathologies: [
      { name: "Glaucoma agudo de ángulo cerrado", role: "principal", why: "Bloqueo del drenaje del humor acuoso con presión muy alta." },
      { name: "Ángulo estrecho del ojo contralateral", role: "asociada", why: "Riesgo de un ataque en el otro ojo." },
      { name: "Conjuntivitis, uveítis, migraña, HSA", role: "diferencial", why: "Otras causas de ojo rojo o cefalea." },
    ],
    reasoning: [
      "Causa: ojo pequeño (hipermétrope) con cámara anterior estrecha y cristalino que crece con la edad; desencadenante: midriasis.",
      "Mecanismo: el iris dilatado se pliega contra la malla trabecular y bloquea la salida del humor acuoso; la presión sube en horas.",
      "Consecuencia: edema corneal, dolor intenso, vómitos y daño isquémico del nervio óptico con pérdida visual permanente si no se trata.",
    ],
    epidemiology:
      "El glaucoma de ángulo cerrado es menos frecuente que el de ángulo abierto, pero el ataque agudo es una emergencia. Es más frecuente en mujeres, mayores de 60 años, hipermétropes y personas de origen asiático. Los fármacos anticolinérgicos y simpaticomiméticos pueden desencadenarlo.",
    management: [
      "Sospecharlo ante ojo rojo doloroso con baja visión, halos y midriasis media.",
      "Bajar la presión con fármacos tópicos y sistémicos.",
      "Derivación urgente: iridotomía láser en el ojo afectado y profiláctica en el otro.",
      "Evitar fármacos midriáticos en pacientes con ángulo estrecho.",
    ],
    sources: ["Consejo Argentino de Oftalmología — Guía de glaucoma.", "Sociedad Argentina de Oftalmología — Recomendaciones sobre ojo rojo."],
    pearls: ["Ojo rojo + dolor + baja visión = urgencia oftalmológica.", "Midriasis media arreactiva y ojo duro.", "Iridotomía en los dos ojos."],
    pitfalls: ["Confundirlo con migraña o un cuadro abdominal.", "Dilatar la pupila."],
    tribunal: [
      qa("¿Cuáles son los signos de alarma del ojo rojo?", "Dolor intenso, disminución de la agudeza visual, fotofobia marcada, inyección ciliar, pupila anormal, opacidad corneal, traumatismo o uso de lentes de contacto: requieren derivación oftalmológica urgente."),
      qa("¿Qué diferencia el glaucoma agudo del crónico de ángulo abierto?", "El agudo de ángulo cerrado es brusco, doloroso y con ojo rojo; el crónico de ángulo abierto es asintomático, con pérdida progresiva del campo visual periférico y se detecta con controles (presión, fondo de ojo, campo visual)."),
      qa("¿Qué fármacos pueden desencadenar un glaucoma agudo?", "Los que dilatan la pupila: anticolinérgicos (antihistamínicos de primera generación, antidepresivos tricíclicos, antiespasmódicos), simpaticomiméticos (descongestivos), topiramato y midriáticos tópicos."),
    ],
  },
};
