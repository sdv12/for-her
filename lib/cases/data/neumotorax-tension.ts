import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const neumotoraxTension: ClinicalCase = {
  id: "neumotorax-a-tension-traumatico",
  level: 4,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 26, ageUnit: "años", sex: "M", context: "Recibió una puñalada en el hemitórax izquierdo en una pelea, hace 20 minutos." },
  frequency: "poco-frecuente",
  intro: "“No puedo respirar... me ahogo...” Llega en camilla, muy agitado.",
  vitals: { TA: "74/40 mmHg", FC: "138 lpm", FR: "38 rpm", "T°": "36,2 °C", "SatO₂": "79 %" },
  anamnesis: [
    act("mecanismo", "¿Qué pasó y con qué?", "clave", "Un amigo: “Lo apuñalaron con un cuchillo en el costado.”", "Trauma penetrante de tórax."),
    act("tiempo", "¿Hace cuánto?", "util", "“Veinte minutos.”", "Evolución rápida."),
    act("otros", "¿Otras heridas?", "util", "“No vimos.”", "Buscar lesiones asociadas."),
    act("alergias", "¿Alergias, medicación, antecedentes?", "util", "“No sabemos.”", "Historia AMPLE."),
    act("consumo", "¿Tomó alcohol o drogas?", "util", "“Alcohol.”", "Modifica la evaluación."),
    act("barrio", "¿De dónde viene?", "neutro", "“Del barrio.”", "No orienta."),
  ],
  exam: [
    act("torax", "Inspección, percusión y auscultación del tórax", "clave", "Herida de 2 cm en el 5.º espacio intercostal izquierdo, hemitórax izquierdo inmóvil, timpanismo y murmullo abolido.", "Neumotórax del lado izquierdo."),
    act("traquea", "Tráquea y yugulares", "clave", "Tráquea desviada a la derecha, yugulares ingurgitadas.", "Signos de neumotórax a tensión."),
    act("perfusion", "Perfusión", "clave", "Frío, sudoroso, confuso.", "Shock obstructivo."),
  ],
  studies: [
    study("Imágenes", "rx-antes", "Radiografía de tórax antes de descomprimir", "riesgoso", "No se realizó.", "El neumotórax a tensión es un diagnóstico clínico: la demora puede ser mortal."),
    study("Imágenes", "efast", "Ecografía FAST extendida (eFAST) en la cama, si no demora", "util", "Ausencia de deslizamiento pleural izquierdo; sin derrame pericárdico.", "Confirma en segundos y descarta taponamiento."),
    study("Imágenes", "rx-despues", "Radiografía de tórax después del tubo", "clave", "Pulmón reexpandido, tubo bien colocado, pequeño hemotórax.", "Control."),
    study("Laboratorio", "lab", "Grupo y factor, hemograma", "util", "Hb 12.", "Por posible hemotórax."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tension", "Neumotórax a tensión izquierdo por herida de arma blanca, con shock obstructivo", true, "Trauma penetrante con disnea grave, hipotensión, timpanismo, murmullo abolido, tráquea desviada al lado opuesto y yugulares ingurgitadas."),
      dx("hemotorax", "Hemotórax masivo", false, "Daría matidez, no timpanismo, y yugulares colapsadas."),
      dx("taponamiento", "Taponamiento cardíaco", false, "Murmullo abolido unilateral y tráquea desviada; eFAST sin derrame."),
      dx("contusion", "Contusión pulmonar", false, "No explica la desviación traqueal ni el timpanismo."),
      dx("simple", "Neumotórax simple", false, "Hay compromiso hemodinámico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("descompresion", "Descompresión inmediata con aguja (4.º–5.º espacio intercostal, línea axilar media) o toracostomía con el dedo", "clave", "Salva la vida en segundos."),
      mg("tubo", "Tubo de drenaje pleural después", "clave", "Tratamiento definitivo."),
      mg("abcde", "ABCDE, oxígeno, dos vías y reevaluación", "clave", "Trauma grave."),
      mg("cirugia", "Evaluar cirugía si el drenaje de sangre es mayor de 1.500 ml o persiste", "util", "Indicaciones de toracotomía."),
      mg("intubar-primero", "Intubar y ventilar con presión positiva antes de descomprimir", "riesgoso", "Aumenta la tensión y puede producir paro."),
      mg("sacar-cuchillo", "Si el objeto sigue clavado, sacarlo en la guardia", "riesgoso", "Los objetos empalados se retiran en el quirófano."),
    ],
  },
  debrief: {
    diagnosis: "Neumotórax a tensión izquierdo por herida de arma blanca, con shock obstructivo, en varón de 26 años.",
    pathologies: [
      { name: "Neumotórax a tensión", role: "principal", why: "Aire a presión que comprime el mediastino." },
      { name: "Herida penetrante de tórax", role: "asociada", why: "Causa." },
      { name: "Hemotórax masivo, taponamiento", role: "diferencial", why: "Otras causas de shock en trauma de tórax." },
    ],
    reasoning: [
      "Causa: la herida crea una válvula que deja entrar aire a la pleura y no lo deja salir.",
      "Mecanismo: la presión intratorácica sube, colapsa el pulmón, desplaza el mediastino y comprime las venas cavas.",
      "Consecuencia: menor retorno venoso, shock obstructivo y paro si no se descomprime.",
    ],
    epidemiology:
      "El trauma es la principal causa de muerte en menores de 45 años en Argentina; las heridas de arma blanca y de fuego afectan sobre todo a varones jóvenes de contextos urbanos vulnerables. El neumotórax a tensión es una causa prevenible de muerte en el trauma.",
    management: [
      "Diagnóstico clínico: descomprimir sin esperar imágenes.",
      "Tubo de drenaje pleural.",
      "Evaluar hemotórax y lesiones asociadas.",
      "Notificación y abordaje de la violencia.",
    ],
    sources: ["Asociación Argentina de Cirugía — Recomendaciones de trauma de tórax.", "ATLS — Soporte vital avanzado en trauma."],
    pearls: ["Neumotórax a tensión es clínico.", "Aguja o dedo primero.", "Tráquea al lado opuesto."],
    pitfalls: ["Pedir radiografía antes.", "Intubar sin descomprimir."],
    tribunal: [
      qa("¿Qué diferencia el neumotórax a tensión del hemotórax masivo?", "Ambos dan murmullo abolido y shock; el neumotórax a tensión tiene timpanismo y yugulares ingurgitadas; el hemotórax masivo tiene matidez y yugulares colapsadas por la hipovolemia."),
      qa("¿Qué lesiones de tórax amenazan la vida en la evaluación primaria?", "Obstrucción de la vía aérea, neumotórax a tensión, neumotórax abierto, hemotórax masivo, tórax inestable con contusión pulmonar y taponamiento cardíaco."),
      qa("¿Qué es el neumotórax abierto y cómo se trata?", "Una herida de la pared que comunica la pleura con el exterior (herida soplante); se cubre con un apósito fijado por tres lados y luego se coloca un tubo de drenaje."),
    ],
  },
};
