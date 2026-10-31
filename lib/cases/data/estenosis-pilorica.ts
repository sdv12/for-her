import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const estenosisPilorica: ClinicalCase = {
  id: "estenosis-hipertrofica-piloro",
  level: 2,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 1, ageUnit: "meses", sex: "M", context: "5 semanas de vida. Primer hijo. Lactancia materna exclusiva." },
  frequency: "poco-frecuente",
  intro: "“Desde hace una semana vomita después de cada mamada, con mucha fuerza, como un chorro que llega lejos. Se queda con hambre y quiere volver a comer.”",
  vitals: { FC: "150 lpm", FR: "40 rpm", "T°": "36,6 °C", Peso: "3.500 g (al nacer: 3.600 g)" },
  anamnesis: [
    act("vomito", "¿Cómo son los vómitos? ¿Tienen color verde?", "clave", "“Leche cortada, a chorro, nunca verde.”", "Vómitos en proyectil no biliosos: obstrucción antes de la ampolla de Vater (píloro). Si fueran biliosos, pensar en malrotación con vólvulo (urgencia)."),
    act("hambre", "¿Cómo está después de vomitar?", "clave", "“Con hambre, llora para comer de nuevo.”", "El lactante hambriento después de vomitar es típico."),
    act("inicio", "¿Desde cuándo?", "util", "“Desde las 3–4 semanas, cada vez peor.”", "Aparece entre las 2 y 8 semanas de vida."),
    act("panales", "¿Cuántos pañales moja? ¿Hace caca?", "clave", "“Pocos pañales, y caca casi nada.”", "Deshidratación y poca ingesta efectiva."),
    act("familia", "¿Alguien de la familia tuvo algo parecido?", "util", "“El papá se operó del estómago de bebé.”", "Hay carga familiar."),
    act("eritromicina", "¿Recibió algún antibiótico?", "util", "“No.”", "La eritromicina o azitromicina en las primeras semanas aumentan el riesgo."),
    act("nombre", "¿Cómo se llama?", "neutro", "“Tomás.”", "No orienta."),
  ],
  exam: [
    act("oliva", "Palpación abdominal tras un vómito (o con el bebé tranquilo)", "clave", "Masa firme, móvil, del tamaño de una aceituna, en epigastrio a la derecha.", "La “oliva pilórica” es patognomónica."),
    act("ondas", "Inspección del abdomen tras alimentarlo", "util", "Ondas peristálticas que van de izquierda a derecha.", "Peristaltismo gástrico visible de lucha."),
    act("hidratacion", "Hidratación", "clave", "Fontanela algo deprimida, mucosas secas.", "Deshidratación que debe corregirse antes de operar."),
    act("ictericia", "Piel", "util", "Leve ictericia.", "Puede asociarse ictericia por menor actividad de la glucuroniltransferasa."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía de píloro", "clave", "Grosor del músculo pilórico de 5 mm y canal de 19 mm de largo.", "Confirma: grosor de 3 mm o más y longitud de 15 mm o más."),
    study("Laboratorio", "gases", "Gases, ionograma y cloro", "clave", "pH 7,52, bicarbonato 34, cloro 88, potasio 3,1.", "Alcalosis metabólica hipoclorémica e hipopotasémica por pérdida de jugo gástrico: hay que corregirla antes de la cirugía."),
    study("Imágenes", "seriada", "Seriada esofagogastroduodenal", "innecesario", "No se realizó.", "La ecografía la reemplazó; se reserva si la ecografía no es concluyente."),
    study("Otros", "veda", "Endoscopia digestiva", "innecesario", "No se realizó.", "No está indicada."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ehp", "Estenosis hipertrófica de píloro con alcalosis metabólica hipoclorémica", true, "Varón primogénito de 5 semanas con vómitos en proyectil no biliosos, hambre, oliva palpable, ecografía diagnóstica y alcalosis hipoclorémica."),
      dx("rge", "Reflujo gastroesofágico", false, "Regurgitaciones sin fuerza, buen progreso de peso, sin oliva ni alcalosis."),
      dx("volvulo", "Malrotación con vólvulo", false, "Vómitos biliosos: es una urgencia quirúrgica distinta."),
      dx("aplv", "Alergia a la proteína de la leche de vaca", false, "Vómitos, diarrea con sangre, eccema; no oliva pilórica."),
      dx("sepsis", "Infección (sepsis, infección urinaria)", false, "Fiebre o mal estado; no explica la oliva."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("corregir", "Corregir la deshidratación y la alcalosis (solución fisiológica con potasio) antes de operar", "clave", "Operar con alcalosis aumenta el riesgo de apnea posanestésica."),
      mg("piloromiotomia", "Piloromiotomía de Ramstedt (abierta o laparoscópica)", "clave", "Tratamiento curativo; se programa con el medio interno corregido."),
      mg("ayuno", "Ayuno y sonda nasogástrica", "util", "Evita vómitos y aspiración."),
      mg("realimentar", "Realimentación precoz tras la cirugía", "util", "Se recupera rápido."),
      mg("cirugia-urgente", "Cirugía de urgencia inmediata sin corregir el medio interno", "riesgoso", "No es una emergencia quirúrgica: primero se estabiliza."),
      mg("cambiar-leche", "Cambiar a una fórmula especial", "innecesario", "No resuelve una obstrucción mecánica."),
    ],
  },
  debrief: {
    diagnosis: "Estenosis hipertrófica de píloro con deshidratación y alcalosis metabólica hipoclorémica e hipopotasémica, en varón de 5 semanas.",
    pathologies: [
      { name: "Estenosis hipertrófica de píloro", role: "principal", why: "Hipertrofia del músculo pilórico que obstruye la salida gástrica." },
      { name: "Alcalosis metabólica hipoclorémica", role: "asociada", why: "Pérdida de ácido clorhídrico por los vómitos." },
      { name: "Reflujo y malrotación", role: "diferencial", why: "Otras causas de vómitos en lactantes." },
    ],
    reasoning: [
      "Causa: hipertrofia progresiva del músculo pilórico en las primeras semanas de vida, con factores genéticos y ambientales (macrólidos).",
      "Mecanismo: el canal se estrecha y alarga, y el estómago no puede vaciarse.",
      "Consecuencia: vómitos en proyectil no biliosos, hambre, pérdida de peso y pérdida de ácido clorhídrico: alcalosis metabólica hipoclorémica; el riñón intenta retener sodio a costa de potasio (hipopotasemia) y puede dar aciduria paradójica.",
    ],
    epidemiology:
      "Afecta a 2–3 de cada 1.000 recién nacidos, con un pico entre las 3 y 6 semanas. Es cuatro a cinco veces más frecuente en varones y en primogénitos, con agregación familiar.",
    management: [
      "Sospechar ante vómitos en proyectil no biliosos entre las 2 y 8 semanas.",
      "Ecografía para confirmar; gases e ionograma.",
      "Corregir deshidratación y alcalosis antes de la cirugía.",
      "Piloromiotomía y realimentación precoz.",
    ],
    sources: ["Sociedad Argentina de Cirugía Infantil — Recomendaciones sobre estenosis hipertrófica de píloro.", "Sociedad Argentina de Pediatría — Guía de vómitos en el lactante."],
    pearls: ["Varón primogénito + vómitos en proyectil + oliva = píloro.", "Alcalosis hipoclorémica hipopotasémica.", "Primero el medio interno, después el quirófano."],
    pitfalls: ["Operar sin corregir la alcalosis.", "No distinguir vómitos biliosos (vólvulo)."],
    tribunal: [
      qa("¿Por qué se produce alcalosis metabólica en la estenosis de píloro?", "Porque se pierde ácido clorhídrico con los vómitos; la hipovolemia activa la aldosterona, que retiene sodio y excreta potasio e hidrógeno (aciduria paradójica), perpetuando la alcalosis y la hipopotasemia."),
      qa("¿Qué significa un vómito bilioso en un recién nacido o lactante?", "Obstrucción por debajo de la ampolla de Vater; descartar malrotación con vólvulo, que es una urgencia quirúrgica por riesgo de necrosis de todo el intestino medio."),
      qa("¿Qué diferencias hay entre regurgitación y vómito?", "La regurgitación es pasiva, sin esfuerzo, frecuente y fisiológica en lactantes que crecen bien; el vómito es activo, con contracción abdominal, y en proyectil sugiere obstrucción."),
    ],
  },
};
