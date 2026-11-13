import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hipertensionPulmonar: ClinicalCase = {
  id: "hipertension-pulmonar",
  level: 3,
  area: "Cardiovascular",
  setting: "Consultorio",
  patient: { age: 34, ageUnit: "años", sex: "F", context: "Peluquera. Tomó anorexígenos hace años para bajar de peso." },
  frequency: "raro",
  intro: "“Hace un año me falta el aire cada vez más. Ahora subo un piso y me tengo que parar. El otro día casi me desmayo.”",
  vitals: { TA: "108/70 mmHg", FC: "98 lpm", FR: "20 rpm", "T°": "36,5 °C", "SatO₂": "92 %" },
  anamnesis: [
    act("disnea", "¿Cómo progresó la falta de aire?", "clave", "“Cada mes peor.”", "Disnea progresiva sin causa obvia."),
    act("sincope", "¿Se desmayó con el esfuerzo?", "clave", "“Casi, subiendo la escalera.”", "Síncope de esfuerzo: gravedad."),
    act("farmacos", "¿Tomó pastillas para adelgazar o drogas?", "clave", "“Sí, unas pastillas hace años.”", "Anorexígenos: causa conocida."),
    act("raynaud", "¿Dedos blancos con el frío, articulaciones?", "util", "“No.”", "Esclerodermia."),
    act("trombosis", "¿Coágulos en las piernas antes?", "util", "“No.”", "Tromboembolismo crónico."),
    act("trabajo", "¿Trabaja?", "neutro", "“Tengo una peluquería.”", "No orienta."),
  ],
  exam: [
    act("p2", "Auscultación cardíaca", "clave", "Segundo ruido pulmonar aumentado y soplo de insuficiencia tricuspídea.", "Hipertensión pulmonar."),
    act("derecho", "Signos de falla derecha", "clave", "Ingurgitación yugular, hepatomegalia y edemas.", "Sobrecarga del VD."),
    act("pulmon", "Auscultación pulmonar", "util", "Normal.", "No es enfermedad pulmonar."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecocardiograma", "clave", "PSAP estimada 78 mmHg, VD dilatado, FEy izquierda normal.", "Sospecha alta."),
    study("Otros", "cateterismo", "Cateterismo cardíaco derecho", "clave", "Presión media pulmonar 48 mmHg, enclavamiento normal.", "Confirma hipertensión precapilar."),
    study("Imágenes", "centellograma", "Centellograma V/Q y TC de tórax", "util", "Sin defectos de perfusión; parénquima normal.", "Excluye tromboembolismo crónico."),
    study("Otros", "prueba-esfuerzo", "Prueba de esfuerzo máxima en cinta", "riesgoso", "No se realizó.", "Riesgo de síncope y muerte súbita."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hap", "Hipertensión arterial pulmonar asociada a anorexígenos", true, "Disnea progresiva, P2 fuerte, PSAP alta con enclavamiento normal y sin causa pulmonar ni tromboembólica."),
      dx("asma", "Asma", false, "Pulmón normal y no hay broncoespasmo."),
      dx("tepc", "Hipertensión pulmonar tromboembólica crónica", false, "Centellograma normal."),
      dx("ic-izquierda", "Insuficiencia cardíaca izquierda", false, "FEy y enclavamiento normales."),
      dx("ansiedad", "Ansiedad", false, "Hay hallazgos objetivos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("centro", "Derivar a un centro de referencia en hipertensión pulmonar", "clave", "Tratamiento específico."),
      mg("especificos", "Fármacos específicos (antagonista de endotelina, sildenafil)", "clave", "Mejoran la sobrevida."),
      mg("anticoncepcion", "Anticoncepción eficaz y consejo sobre embarazo", "clave", "El embarazo tiene mortalidad muy alta."),
      mg("diureticos", "Diuréticos y oxígeno si hace falta", "util", "Soporte."),
      mg("ejercicio-intenso", "Indicar ejercicio intenso para mejorar la capacidad", "riesgoso", "Síncope y muerte súbita."),
      mg("anticonceptivos-combinados", "Anticonceptivos combinados con estrógenos", "riesgoso", "Riesgo trombótico."),
    ],
  },
  debrief: {
    diagnosis: "Hipertensión arterial pulmonar asociada a anorexígenos, con falla del ventrículo derecho, en mujer de 34 años.",
    pathologies: [
      { name: "Hipertensión arterial pulmonar", role: "principal", why: "Vasculopatía de la arteria pulmonar." },
      { name: "Falla del ventrículo derecho", role: "asociada", why: "Consecuencia." },
      { name: "Tromboembolismo crónico, cardiopatía izquierda", role: "diferencial", why: "Otros grupos." },
    ],
    reasoning: [
      "Causa: daño vascular pulmonar por anorexígenos.",
      "Mecanismo: proliferación de la íntima y vasoconstricción que aumentan la resistencia.",
      "Consecuencia: sobrecarga y falla del ventrículo derecho.",
    ],
    epidemiology:
      "La hipertensión arterial pulmonar es rara y se ve sobre todo en mujeres jóvenes. Se asocia a anorexígenos, esclerodermia, VIH y cardiopatías congénitas. El diagnóstico suele demorar años porque la disnea se atribuye a otras causas.",
    management: [
      "Ecocardiograma.",
      "Cateterismo derecho.",
      "Centro de referencia.",
      "Evitar embarazo.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de hipertensión pulmonar.", "ESC/ERS — Pulmonary Hypertension Guidelines."],
    pearls: ["Disnea sin causa en mujer joven: pensala.", "Síncope de esfuerzo es mal signo.", "El cateterismo confirma."],
    pitfalls: ["Rotular como ansiedad.", "Embarazo sin consejo."],
    tribunal: [
      qa("¿Cómo se define la hipertensión pulmonar?", "Presión media en la arteria pulmonar mayor de 20 mmHg medida por cateterismo derecho."),
      qa("¿Cuáles son los grupos de hipertensión pulmonar?", "Arterial, por cardiopatía izquierda, por enfermedad pulmonar, tromboembólica crónica y multifactorial."),
      qa("¿Qué hallazgos del examen orientan?", "P2 aumentado, soplo tricuspídeo, ingurgitación yugular y edemas."),
    ],
  },
};
