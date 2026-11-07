import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const fracturaSupracondilea: ClinicalCase = {
  id: "fractura-supracondilea-nino",
  level: 2,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 6, ageUnit: "años", sex: "M", context: "Se cayó de la hamaca con el brazo extendido hace una hora. Vacunas al día." },
  frequency: "muy-frecuente",
  intro: "“Se cayó de la hamaca, apoyó la mano y el codo se le hinchó mucho. Llora y no lo mueve.” (relata el padre)",
  vitals: { FC: "122 lpm", FR: "24 rpm", "T°": "36,7 °C", Peso: "21 kg", "SatO₂": "99 %" },
  anamnesis: [
    act("mecanismo", "¿Cómo se cayó? ¿Qué altura?", "clave", "“De un metro y medio, con el brazo estirado.”", "Mecanismo típico."),
    act("mano", "¿Puede mover los dedos? ¿Siente la mano?", "clave", "“No puede hacer el OK con los dedos.”", "Sugiere nervio interóseo anterior (mediano)."),
    act("coherencia", "¿Lo vio alguien? ¿Tuvo otros golpes o fracturas?", "clave", "“Lo vi yo; nunca.”", "Mecanismo acorde a la lesión: valora maltrato."),
    act("cabeza", "¿Se golpeó la cabeza?", "util", "“No.”", "Lesiones asociadas."),
    act("comida", "¿Cuándo comió?", "util", "“Hace 3 horas.”", "Para sedación o quirófano."),
    act("escuela", "¿A qué grado va?", "neutro", "“A primero.”", "No orienta."),
  ],
  exam: [
    act("pulso", "Pulso radial y perfusión de la mano", "clave", "Pulso radial débil, relleno de 2 segundos, mano rosada.", "Riesgo de lesión de la arteria braquial."),
    act("nervios", "Función de nervios mediano, radial y cubital", "clave", "No flexiona pulgar e índice; sensibilidad conservada.", "Interóseo anterior."),
    act("codo", "Codo", "clave", "Deformidad, tumefacción, equimosis anterior, piel con hoyuelo.", "Fractura desplazada."),
    act("compartimento", "Antebrazo", "clave", "Antebrazo blando, sin dolor al extender los dedos.", "Sin síndrome compartimental por ahora."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de codo de frente y perfil", "clave", "Fractura supracondílea en extensión Gartland III, desplazada.", "Clasifica y orienta."),
    study("Imágenes", "doppler", "Doppler si falta el pulso", "util", "Flujo presente, disminuido.", "Evalúa la arteria."),
    study("Laboratorio", "lab", "Laboratorio prequirúrgico", "util", "Normal.", "Para cirugía."),
    study("Imágenes", "tac", "TC de codo", "innecesario", "No se realizó.", "No hace falta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("supra", "Fractura supracondílea de húmero Gartland III con compromiso del interóseo anterior y pulso débil", true, "Caída con brazo extendido, deformidad, Rx desplazada, y déficit neurovascular."),
      dx("pronacion", "Pronación dolorosa", false, "Se da por tracción, sin deformidad ni hinchazón, con radiografía normal."),
      dx("luxacion", "Luxación de codo", false, "La Rx muestra fractura."),
      dx("condilo", "Fractura de cóndilo lateral", false, "La línea es supracondílea."),
      dx("maltrato", "Maltrato", false, "El mecanismo es coherente, aunque siempre se evalúa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("inmovilizar", "Inmovilizar en la posición en que llegó, a unos 30 grados, sin vendaje apretado, y analgesia", "clave", "Evita más daño y dolor."),
      mg("cirugia", "Reducción cerrada y clavijas en quirófano con urgencia", "clave", "Gartland III lo requiere."),
      mg("reevaluar", "Reevaluar neurovascular y compartimentos con frecuencia", "clave", "Detecta isquemia y síndrome compartimental."),
      mg("exploracion", "Explorar la arteria si la mano queda sin perfusión tras reducir", "clave", "Mano fría y sin pulso: urgencia."),
      mg("yeso", "Yeso circular cerrado y alta", "riesgoso", "Riesgo de síndrome compartimental y Volkmann."),
      mg("traccion", "Extender el codo en guardia para alinearlo", "riesgoso", "Puede dañar arteria y nervio."),
    ],
  },
  debrief: {
    diagnosis: "Fractura supracondílea de húmero en extensión Gartland III, con neuroapraxia del interóseo anterior y pulso radial débil, en niño de 6 años.",
    pathologies: [
      { name: "Fractura supracondílea", role: "principal", why: "Fractura de húmero distal." },
      { name: "Lesión neurovascular", role: "asociada", why: "Arteria braquial y nervio mediano." },
      { name: "Luxación, fractura de cóndilo, pronación dolorosa", role: "diferencial", why: "Otras lesiones de codo." },
    ],
    reasoning: [
      "Causa: caída con el brazo extendido.",
      "Mecanismo: el olécranon actúa como palanca y la metáfisis fina se rompe, con el fragmento distal hacia atrás.",
      "Consecuencia: el fragmento proximal puede lesionar arteria y nervio; síndrome compartimental y contractura.",
    ],
    epidemiology:
      "Es la fractura de codo más frecuente en niños, con un pico entre los 5 y los 7 años. Casi siempre se produce en extensión, tras una caída de juegos como hamacas o trepadores. Hasta un 15 % tiene compromiso nervioso, que en general se recupera.",
    management: [
      "Evaluar y documentar pulso y nervios antes de todo.",
      "Inmovilizar y analgesia.",
      "Cirugía en desplazadas.",
      "Vigilar compartimentos.",
    ],
    sources: ["Sociedad Argentina de Ortopedia y Traumatología Infantil — Recomendaciones.", "Sociedad Argentina de Pediatría — Prevención de lesiones."],
    pearls: ["Documentá pulso y nervios antes y después.", "OK con los dedos: interóseo anterior.", "Sin yeso cerrado en agudo."],
    pitfalls: ["Yeso apretado.", "Olvidar la exploración neurológica."],
    tribunal: [
      qa("¿Cuál es la clasificación de Gartland?", "I: no desplazada. II: desplazada con cortical posterior intacta. III: completamente desplazada."),
      qa("¿Qué nervio se lesiona más en la fractura en extensión?", "El interóseo anterior, rama del mediano; en la de flexión, el cubital."),
      qa("¿Por qué los niños tienen fracturas en tallo verde?", "Su hueso es más elástico y tiene un periostio grueso; además, las fisis abiertas son un punto débil, y por eso aparecen lesiones de Salter-Harris."),
    ],
  },
};
