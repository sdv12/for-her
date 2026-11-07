import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const coartacionAorta: ClinicalCase = {
  id: "hta-adolescente-coartacion-aorta",
  level: 3,
  area: "Cardiovascular",
  setting: "Consultorio",
  patient: { age: 14, ageUnit: "años", sex: "M", context: "Va a pedir el apto físico para fútbol. Nunca le tomaron la presión en los controles." },
  frequency: "poco-frecuente",
  intro: "“Vengo por el apto físico. Me duele la cabeza a veces y se me cansan las piernas cuando corro.”",
  vitals: { TA: "158/92 mmHg", FC: "76 lpm", FR: "16 rpm", "T°": "36,5 °C", Peso: "54 kg" },
  anamnesis: [
    act("piernas", "¿Cuándo se te cansan las piernas?", "clave", "“Corriendo, y se me pasa al parar.”", "Claudicación por menor flujo distal."),
    act("cefalea", "¿Cefaleas, epistaxis?", "clave", "“Dolor de cabeza y sangrado de nariz.”", "Hipertensión en la parte superior."),
    act("sustancias", "¿Anabólicos, energizantes, medicamentos?", "clave", "“Nada.”", "Otras causas."),
    act("renal", "¿Infecciones de orina o problemas de riñón?", "util", "“No.”", "Causa renal: la más común en niños."),
    act("familia", "¿HTA o cardiopatías en la familia?", "util", "“No.”", "Base."),
    act("posicion", "¿En qué puesto jugás?", "neutro", "“De arquero.”", "No orienta."),
  ],
  exam: [
    act("ta4", "Presión en los cuatro miembros y pulsos femorales", "clave", "Brazos 158/92; piernas 104/62; pulsos femorales débiles y retrasados.", "Hallazgo clave."),
    act("soplo", "Corazón y espalda", "clave", "Soplo sistólico entre los omóplatos.", "Colaterales y coartación."),
    act("sindrome", "Rasgos físicos", "util", "Sin rasgos de Turner ni Marfan.", "Asociados."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecocardiograma con Doppler", "clave", "Coartación yuxtaductal, gradiente de 45 mmHg, válvula aórtica bicúspide.", "Confirma y busca asociados."),
    study("Imágenes", "angio", "AngioTC o angioRM", "clave", "Estenosis focal, colaterales.", "Planifica la intervención."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Muescas costales, signo del 3.", "Hallazgos clásicos."),
    study("Laboratorio", "lab", "Función renal, orina, ionograma", "util", "Normal.", "Excluye causa renal."),
    study("Otros", "ergometria", "Prueba de esfuerzo máxima para el apto antes de estudiar", "riesgoso", "No se realizó.", "No se da apto ni se exige hasta tratar."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("coartacion", "Hipertensión arterial secundaria a coartación de aorta con válvula bicúspide", true, "HTA en brazos con presión baja en piernas, pulsos femorales débiles, soplo y gradiente."),
      dx("esencial", "HTA esencial", false, "No explica la diferencia entre brazos y piernas."),
      dx("renal", "HTA de causa renal", false, "Estudios normales."),
      dx("feo", "Feocromocitoma", false, "No hay crisis."),
      dx("guardapolvo", "Hipertensión de guardapolvo blanco", false, "Hay soplo, pulsos débiles y gradiente."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("derivar", "Derivar a cardiología pediátrica: angioplastia con stent o cirugía", "clave", "Corrige la causa."),
      mg("antihta", "Betabloqueante o IECA hasta la reparación", "clave", "Controla la presión."),
      mg("apto", "No dar apto competitivo hasta corregir", "clave", "Riesgo de complicaciones."),
      mg("seguimiento", "Seguimiento de por vida (recoartación, aneurisma, HTA, bicúspide)", "clave", "Persisten riesgos."),
      mg("solo-dieta", "Solo dieta sin sal y dar el apto", "riesgoso", "Deja sin tratar una causa corregible."),
      mg("sin-piernas", "Tomar la presión solo en el brazo y citar en un año", "riesgoso", "Omite el diagnóstico."),
    ],
  },
  debrief: {
    diagnosis: "Coartación de aorta con válvula bicúspide e hipertensión arterial secundaria, en varón de 14 años.",
    pathologies: [
      { name: "Coartación de aorta", role: "principal", why: "Estrechamiento de la aorta descendente." },
      { name: "HTA secundaria, válvula bicúspide", role: "asociada", why: "Consecuencia y asociación." },
      { name: "HTA esencial, renal, guardapolvo blanco", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: malformación congénita cerca del ductus.",
      "Mecanismo: la obstrucción eleva la presión arriba y reduce el flujo abajo, con colaterales.",
      "Consecuencia: HTA, cefalea, claudicación, IC, aneurismas y ACV.",
    ],
    epidemiology:
      "Representa cerca del 5 al 8 % de las cardiopatías congénitas, es más frecuente en varones, y se asocia a síndrome de Turner y válvula bicúspide. Muchas formas pasan inadvertidas porque no se toman presión ni pulsos femorales en los controles.",
    management: [
      "Tomar la presión en controles y aptos.",
      "Palpar femorales.",
      "Reparar.",
      "Seguimiento prolongado.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de hipertensión arterial en pediatría.", "Sociedad Argentina de Cardiología — Cardiopatías congénitas del adulto."],
    pearls: ["HTA en un adolescente: palpá femorales.", "Tomá presión en brazos y piernas.", "Muescas costales."],
    pitfalls: ["Dar el apto sin examinar.", "Etiquetarla como HTA esencial."],
    tribunal: [
      qa("¿Cuáles son las causas de HTA en niños?", "Renal y renovascular, coartación, endocrina, fármacos; la esencial aumenta en adolescentes con obesidad."),
      qa("¿Qué síndrome genético se asocia?", "El síndrome de Turner (cariotipo 45,X)."),
      qa("¿Cuál es el motivo de las muescas costales?", "Las arterias intercostales dilatadas erosionan el borde inferior de las costillas."),
    ],
  },
};
