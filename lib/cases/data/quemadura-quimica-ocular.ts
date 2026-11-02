import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const quemaduraQuimicaOcular: ClinicalCase = {
  id: "quemadura-quimica-ocular",
  level: 2,
  area: "Oftalmología",
  setting: "Guardia",
  patient: { age: 34, ageUnit: "años", sex: "M", context: "Trabaja en una empresa de limpieza. Llega 20 minutos después del accidente." },
  frequency: "poco-frecuente",
  intro: "“Me saltó en el ojo derecho un líquido para destapar cañerías. Me arde muchísimo y casi no lo puedo abrir.”",
  vitals: { TA: "138/86 mmHg", FC: "102 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("producto", "¿Qué producto era? ¿Tenés el envase?", "clave", "“Un destapador con soda cáustica.”", "Álcali (hidróxido de sodio): penetra profundo y es más grave que los ácidos."),
    act("lavado", "¿Te lavaste el ojo? ¿Cuánto?", "clave", "“Un poco con la canilla.”", "El lavado inmediato y abundante es lo que más determina el pronóstico."),
    act("tiempo", "¿Hace cuánto fue?", "util", "“Veinte minutos.”", "Cada minuto sin lavado agrava el daño."),
    act("lentes", "¿Usás lentes de contacto?", "util", "“No.”", "Retienen el químico."),
    act("proteccion", "¿Usabas protección ocular?", "util", "“No.”", "Prevención laboral."),
    act("club", "¿De qué cuadro sos?", "neutro", "“De Belgrano.”", "No orienta."),
  ],
  exam: [
    act("lavado-ya", "Iniciar irrigación inmediata con solución fisiológica o Ringer antes de examinar en detalle", "clave", "Se irriga con 2 litros con anestesia tópica, evertiendo los párpados.", "En las quemaduras químicas el tratamiento empieza antes del examen completo."),
    act("ph", "pH de la lágrima con tira reactiva", "clave", "pH 11 al inicio; 7,2 después de 2 litros.", "Se irriga hasta pH neutro (7–7,5)."),
    act("cornea", "Córnea, conjuntiva y limbo con fluoresceína", "clave", "Desepitelización corneal parcial, isquemia de un tercio del limbo.", "Define la gravedad y el pronóstico."),
    act("agudeza", "Agudeza visual (después de irrigar)", "util", "4/10 en el ojo derecho.", "Disminuida."),
  ],
  studies: [
    study("Otros", "lampara", "Evaluación oftalmológica urgente con lámpara de hendidura y presión intraocular", "clave", "Grado II–III de Roper-Hall.", "Clasificación y tratamiento."),
    study("Imágenes", "tc", "Tomografía de órbitas", "innecesario", "No se realizó.", "No hay traumatismo penetrante."),
    study("Otros", "esperar-oftalmo", "Esperar al oftalmólogo para empezar a lavar", "riesgoso", "No se realizó.", "La irrigación es inmediata, la hace cualquier miembro del equipo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("alcali", "Quemadura química ocular por álcali (soda cáustica) con desepitelización corneal e isquemia limbar", true, "Contacto con soda cáustica, pH 11, defecto epitelial y blanqueamiento de un tercio del limbo."),
      dx("acido", "Quemadura por ácido", false, "El producto era alcalino; los ácidos coagulan y penetran menos."),
      dx("cuerpo-extrano", "Cuerpo extraño corneal", false, "Hay químico y daño difuso."),
      dx("conjuntivitis", "Conjuntivitis irritativa leve", false, "Hay daño corneal y limbar."),
      dx("glaucoma", "Glaucoma agudo", false, "El antecedente químico explica el cuadro."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("irrigar", "Irrigación abundante inmediata hasta normalizar el pH, con eversión de párpados y retiro de partículas", "clave", "Es la medida más importante."),
      mg("oftalmo", "Derivación urgente a oftalmología", "clave", "Las quemaduras por álcali requieren tratamiento especializado."),
      mg("tratamiento", "Antibiótico tópico, ciclopléjico, analgesia y, según indicación oftalmológica, corticoide tópico y vitamina C", "util", "Previenen infección, dolor y favorecen la reparación."),
      mg("art", "Notificar a la ART y promover protección ocular laboral", "util", "Accidente laboral."),
      mg("neutralizar", "Neutralizar con vinagre u otro ácido", "riesgoso", "La reacción produce calor y más daño."),
      mg("parche", "Tapar el ojo con un parche y esperar", "riesgoso", "Retiene el químico."),
    ],
  },
  debrief: {
    diagnosis: "Quemadura química ocular derecha por álcali (soda cáustica) con desepitelización corneal e isquemia limbar parcial, en trabajador de limpieza sin protección ocular.",
    pathologies: [
      { name: "Quemadura química ocular por álcali", role: "principal", why: "Daño corneal y limbar." },
      { name: "Accidente laboral sin protección", role: "asociada", why: "Prevención." },
      { name: "Quemadura por ácido, cuerpo extraño", role: "diferencial", why: "Otras lesiones oculares." },
    ],
    reasoning: [
      "Causa: contacto con un álcali fuerte.",
      "Mecanismo: el álcali saponifica las grasas de las membranas, penetra en profundidad y daña las células madre del limbo.",
      "Consecuencia: opacidad corneal, neovascularización, glaucoma, cataratas y ceguera.",
    ],
    epidemiology:
      "Las quemaduras químicas oculares son una urgencia oftalmológica frecuente en accidentes laborales y domésticos, sobre todo en varones jóvenes; los álcalis (soda cáustica, cal, amoníaco) son los más graves.",
    management: [
      "Irrigación inmediata y prolongada hasta pH neutro.",
      "Evaluación oftalmológica urgente y clasificación de gravedad.",
      "Tratamiento médico y quirúrgico según el daño limbar.",
      "Prevención con protección ocular.",
    ],
    sources: ["Consejo Argentino de Oftalmología — Recomendaciones sobre urgencias oculares.", "Ley 24.557 de Riesgos del Trabajo."],
    pearls: ["Lavar primero, preguntar después.", "Álcali es peor que ácido.", "Irrigar hasta pH neutro."],
    pitfalls: ["Esperar al especialista para lavar.", "Neutralizar con otro químico."],
    tribunal: [
      qa("¿Por qué los álcalis son más graves que los ácidos?", "Porque saponifican los lípidos de las membranas y penetran rápidamente en la córnea y la cámara anterior; los ácidos coagulan las proteínas superficiales, formando una barrera que limita la penetración (excepto el fluorhídrico)."),
      qa("¿Qué es la clasificación de Roper-Hall?", "Una clasificación de gravedad de las quemaduras químicas oculares según la opacidad corneal y el porcentaje de isquemia limbar: grado I (buen pronóstico) a grado IV (pronóstico muy malo)."),
      qa("¿Qué se hace ante una quemadura química en la piel?", "Retirar la ropa contaminada, lavar con agua abundante durante al menos 20–30 minutos, no neutralizar, y evaluar profundidad y extensión; con protección del personal."),
    ],
  },
};
