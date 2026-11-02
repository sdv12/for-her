import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const violenciaGenero: ClinicalCase = {
  id: "violencia-de-genero",
  level: 2,
  area: "Salud comunitaria",
  setting: "Guardia",
  patient: { age: 31, ageUnit: "años", sex: "F", context: "Viene sola con sus dos hijos chicos. Ama de casa." },
  frequency: "frecuente",
  intro: "“Me caí por la escalera. Me duele el brazo.” Evita mirar a los ojos.",
  vitals: { TA: "128/80 mmHg", FC: "98 lpm", FR: "18 rpm", "T°": "36,5 °C" },
  anamnesis: [
    act("privacidad", "Pedir hablar a solas y garantizar la confidencialidad", "clave", "Acepta que los chicos esperen con una enfermera.", "Preguntar por violencia siempre en privado, nunca frente a la pareja o hijos."),
    act("pregunta", "“A veces estas lesiones pasan cuando alguien nos lastima. ¿Alguien te está haciendo daño?”", "clave", "Llora. “Mi pareja me empujó y me agarró del brazo. No es la primera vez.”", "Preguntar en forma directa y sin juzgar facilita el relato."),
    act("riesgo", "¿Te amenazó de muerte? ¿Tiene armas? ¿La violencia aumentó? ¿Te intentó ahorcar?", "clave", "“Me dijo que si me voy me mata. Tiene un arma. Cada vez es peor. Una vez me apretó el cuello.”", "Indicadores de alto riesgo de femicidio: amenazas de muerte, armas, escalada, estrangulamiento."),
    act("hijos", "¿Los chicos están en riesgo? ¿Les pegó a ellos?", "clave", "“A ellos no, pero ven todo.”", "Los niños expuestos a violencia también son víctimas."),
    act("embarazo", "¿Podés estar embarazada?", "util", "“No.”", "El embarazo es un período de mayor riesgo."),
    act("red", "¿Tenés a dónde ir o alguien de confianza?", "util", "“Mi mamá vive en otro barrio.”", "Recurso para el plan de seguridad."),
    act("caida", "¿Cuántos escalones tiene la escalera?", "neutro", "Silencio.", "No aporta y puede generar desconfianza; el relato inicial no coincide con las lesiones."),
  ],
  exam: [
    act("lesiones", "Examen completo, con consentimiento, documentando las lesiones", "clave", "Hematomas en distintos estadios en brazos (marca de dedos), equimosis en cuello.", "Lesiones en distintos tiempos y con patrón de sujeción: no compatibles con una caída."),
    act("brazo", "Examen del brazo", "clave", "Dolor e impotencia funcional en el antebrazo derecho.", "Evaluar fractura."),
    act("emocional", "Estado emocional y riesgo suicida", "util", "Angustiada; niega ideas de muerte.", "La violencia aumenta el riesgo de depresión y suicidio."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de antebrazo", "clave", "Fractura no desplazada de cúbito medio (fractura de defensa).", "Típica de cubrirse ante un golpe."),
    study("Otros", "registro", "Registro detallado en la historia clínica con descripción y, con consentimiento, fotografías", "clave", "Realizado.", "La historia clínica es una prueba legal fundamental."),
    study("Laboratorio", "lab", "Laboratorio completo", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("vg", "Violencia de género física y psicológica por la pareja, de alto riesgo, con fractura de cúbito por defensa", true, "Relato que no coincide con las lesiones, lesiones en distintos estadios con patrón de sujeción y estrangulamiento previo, amenazas de muerte y arma en el hogar."),
      dx("caida", "Traumatismo por caída accidental", false, "Las lesiones no coinciden con el mecanismo relatado."),
      dx("coagulopatia", "Trastorno de la coagulación", false, "Hay patrón de sujeción y relato de violencia."),
      dx("riesgo-bajo", "Violencia de pareja de bajo riesgo", false, "Hay amenazas de muerte, arma, escalada y estrangulamiento: alto riesgo."),
      dx("autolesion", "Autolesiones", false, "El relato y el patrón indican agresión de un tercero."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("creer", "Escuchar, creerle, no juzgar y explicarle que no es su culpa", "clave", "Es la primera intervención y favorece que pida ayuda."),
      mg("seguridad", "Evaluar riesgo y armar un plan de seguridad; articular con servicio social, línea 144 y protocolos locales", "clave", "En alto riesgo se gestionan refugio o medidas de protección."),
      mg("informar", "Informar derechos y opciones de denuncia, respetando su decisión (es mayor de edad)", "clave", "La Ley 26.485 garantiza atención integral; la denuncia es decisión de ella, salvo situaciones específicas que prevé la ley."),
      mg("tratar", "Tratar la fractura e indicar controles", "clave", "Atención de las lesiones."),
      mg("hijos", "Considerar la situación de los niños y articular con el sistema de protección de derechos", "util", "Son víctimas indirectas."),
      mg("pareja", "Llamar a la pareja para conversar los tres", "riesgoso", "Aumenta el riesgo para ella; la mediación está prohibida en violencia de género."),
      mg("alta-caida", "Tratar la fractura y dar el alta registrando “caída”", "riesgoso", "Pierde la oportunidad de intervenir y deja sin protección a una mujer en riesgo."),
    ],
  },
  debrief: {
    diagnosis: "Violencia de género física y psicológica en el ámbito doméstico (pareja), con indicadores de alto riesgo, y fractura no desplazada de cúbito por defensa, en mujer de 31 años.",
    pathologies: [
      { name: "Violencia de género por la pareja", role: "principal", why: "Violencia física y psicológica reiterada." },
      { name: "Fractura de cúbito por defensa", role: "asociada", why: "Lesión al cubrirse." },
      { name: "Caída accidental", role: "diferencial", why: "El relato inicial no explica las lesiones." },
    ],
    reasoning: [
      "Causa: relaciones de poder desiguales entre géneros; la violencia es una forma de control.",
      "Mecanismo: ciclo de la violencia (acumulación de tensión, agresión, reconciliación o luna de miel), con aislamiento y escalada progresiva.",
      "Consecuencia: lesiones, enfermedades crónicas, depresión, consumo, suicidio y femicidio; daño a los hijos.",
    ],
    epidemiology:
      "En Argentina hay un femicidio cada 30 a 35 horas, y la mayoría lo comete la pareja o expareja. Una de cada tres mujeres sufre violencia física o sexual en su vida. La guardia y el primer nivel son muchas veces el primer lugar donde la violencia puede detectarse.",
    management: [
      "Detectar: preguntar en privado ante lesiones sin explicación, consultas repetidas, síntomas inespecíficos o en el embarazo.",
      "Atender las lesiones, documentar y evaluar el riesgo.",
      "Informar derechos y recursos (línea 144, comisarías y fiscalías especializadas), plan de seguridad.",
      "Articular con servicio social, salud mental y protección de niños; seguimiento.",
    ],
    sources: ["Ley 26.485 de Protección Integral a las Mujeres.", "Ley 27.499 (Ley Micaela) de capacitación en género.", "Ministerio de Salud de la Nación — Protocolo para la atención integral de personas en situación de violencia de género."],
    pearls: ["Preguntar a solas y sin juzgar.", "Amenazas, armas, escalada y estrangulamiento = alto riesgo.", "Línea 144, gratuita y las 24 h."],
    pitfalls: ["Hablar delante de la pareja.", "Registrar “caída” sin preguntar."],
    tribunal: [
      qa("¿Qué tipos de violencia define la Ley 26.485?", "Física, psicológica, sexual, económica y patrimonial, simbólica y política; y modalidades como la doméstica, institucional, laboral, contra la libertad reproductiva, obstétrica, mediática y en el espacio público."),
      qa("¿Qué es el ciclo de la violencia?", "Un patrón repetido en tres fases: acumulación de tensión, explosión o agresión, y arrepentimiento o luna de miel; con el tiempo las fases se acortan y la violencia escala."),
      qa("¿Cuándo es obligatorio denunciar?", "Cuando la víctima es una niña, niño o adolescente, o una persona con discapacidad que no puede hacerlo; en mujeres adultas la denuncia es una decisión propia, aunque el equipo de salud debe informar, acompañar y registrar."),
    ],
  },
};
