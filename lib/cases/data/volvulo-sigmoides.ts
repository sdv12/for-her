import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const volvuloSigmoides: ClinicalCase = {
  id: "obstruccion-intestinal-volvulo-sigmoides",
  level: 2,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 78, ageUnit: "años", sex: "M", context: "Vive en geriátrico, constipado crónico, con laxantes. Chagas conocido. Parkinson." },
  frequency: "frecuente",
  intro: "“Tiene la panza enorme y dura. Hace 3 días no evacúa ni expulsa gases, y hoy vomitó.” (relata la enfermera)",
  vitals: { TA: "118/70 mmHg", FC: "104 lpm", FR: "22 rpm", "T°": "37,2 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("inicio", "¿De golpe? ¿Sin gases ni deposición?", "clave", "“De golpe; sin gases.”", "Obstrucción completa."),
    act("previo", "¿Otros episodios? ¿Constipación crónica?", "clave", "“Un episodio que se resolvió.”", "Recurrente."),
    act("chagas", "¿Chagas, Parkinson o medicación?", "clave", "“Tiene Chagas y Parkinson.”", "Megacolon."),
    act("cirugia", "¿Cirugías previas?", "util", "“Ninguna.”", "Bridas."),
    act("cancer", "¿Sangrado o pérdida de peso?", "util", "“No.”", "Cáncer."),
    act("residencia", "¿Qué geriátrico?", "neutro", "“Uno del barrio.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Distensión asimétrica, timpanismo, sin peritonismo.", "Grande."),
    act("rectal", "Tacto rectal", "clave", "Ampolla vacía, sin masa.", "No hay impactación baja."),
    act("signos", "Perfusión", "util", "Sin shock.", "Sin gangrena clara."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de abdomen", "clave", "Asa en grano de café.", "Muy sugestiva."),
    study("Imágenes", "tc", "TC de abdomen", "clave", "Signo del remolino, sin isquemia.", "Confirma y evalúa viabilidad."),
    study("Laboratorio", "lab", "Hemograma, ionograma, lactato", "clave", "Hipopotasemia, lactato normal.", "Sin isquemia."),
    study("Imágenes", "bario", "Colon por enema con bario", "riesgoso", "No se realizó.", "Riesgo de perforación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("vs", "Obstrucción intestinal por vólvulo de sigmoides", true, "Distensión, grano de café, remolino, adulto mayor con constipación."),
      dx("cancer", "Cáncer de colon obstructivo", false, "No hay masa en TC."),
      dx("ogilvie", "Seudoobstrucción de Ogilvie", false, "Hay torsión en TC."),
      dx("bridas", "Obstrucción por bridas", false, "Sin cirugías, y es de colon."),
      dx("fecaloma", "Fecaloma", false, "Tacto sin impactación."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reanimar", "Reanimar: líquidos, sonda, corregir electrolitos", "clave", "Antes de intervenir."),
      mg("descomprimir", "Rectosigmoidoscopia para destorsión, si no hay isquemia", "clave", "Primera opción sin gangrena."),
      mg("cirugia", "Sigmoidectomía electiva en la misma internación si se puede", "clave", "Alta recurrencia."),
      mg("urgencia", "Cirugía urgente si hay isquemia o perforación", "clave", "Riesgo vital."),
      mg("laxante", "Laxantes y enemas a repetición sin más", "riesgoso", "Riesgo de perforación."),
      mg("alta", "Alta con fibra", "riesgoso", "Obstrucción activa."),
    ],
  },
  debrief: {
    diagnosis: "Obstrucción intestinal baja por vólvulo de sigmoides, en varón de 78 años con Chagas y constipación crónica.",
    pathologies: [
      { name: "Vólvulo de sigmoides", role: "principal", why: "Torsión del colon." },
      { name: "Megacolon chagásico, Parkinson", role: "asociada", why: "Predisponen." },
      { name: "Cáncer, Ogilvie, bridas", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: colon redundante y largo, con constipación crónica.",
      "Mecanismo: gira sobre su eje, se cierra el asa y se compromete el flujo.",
      "Consecuencia: obstrucción, gangrena y perforación.",
    ],
    epidemiology:
      "Es más frecuente en mayores institucionalizados, con enfermedades neurológicas y constipación. En Argentina, el Chagas digestivo también predispone, sobre todo en zonas endémicas. La recurrencia sin cirugía llega a la mitad de los casos.",
    management: [
      "Reconocer obstrucción baja.",
      "TC.",
      "Destorsión endoscópica.",
      "Resecar si es posible.",
    ],
    sources: ["Sociedad Argentina de Cirugía Digestiva — Obstrucción de colon.", "ASCRS — Guía de vólvulo colónico."],
    pearls: ["Grano de café.", "Sin isquemia: desenrollar por endoscopia.", "Se reseca porque recurre."],
    pitfalls: ["Enemas sin imagen.", "No resecar."],
    tribunal: [
      qa("¿Qué causas tiene la obstrucción de colon?", "Cáncer, vólvulo, diverticulitis, y fecaloma."),
      qa("¿Cómo se manifiesta la gangrena?", "Dolor intenso, peritonismo, fiebre, lactato elevado."),
      qa("¿Qué hace el Chagas en el colon?", "Destruye plexos nerviosos y produce megacolon."),
    ],
  },
};
