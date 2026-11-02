import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hepatitisA: ClinicalCase = {
  id: "hepatitis-a",
  level: 1,
  area: "Gastroenterología",
  setting: "CAPS",
  patient: { age: 14, ageUnit: "años", sex: "M", context: "Llegó hace un año de Bolivia. Vive en un barrio sin cloacas." },
  frequency: "frecuente",
  intro: "“Hace una semana tuvo fiebre, vómitos y no quería comer. Ahora tiene los ojos amarillos y el pis oscuro como Coca-Cola.” (relata la madre)",
  vitals: { TA: "110/70 mmHg", FC: "84 lpm", FR: "16 rpm", "T°": "37,2 °C", Peso: "46 kg" },
  anamnesis: [
    act("vacuna", "¿Recibió la vacuna de la hepatitis A?", "clave", "“No sé, no tenemos el carnet de allá.”", "En Argentina se vacuna al año de vida desde 2005; sin vacuna es susceptible."),
    act("agua", "¿De dónde sacan el agua? ¿Hay otros enfermos en la casa o la escuela?", "clave", "“De una canilla comunitaria. Un primo estuvo amarillo el mes pasado.”", "Transmisión fecal-oral por agua y contactos: típico de hepatitis A."),
    act("prodromo", "¿Cómo empezó?", "clave", "“Fiebre, cansancio, náuseas y dolor de panza arriba a la derecha.”", "Pródromo inespecífico seguido de ictericia."),
    act("conciencia", "¿Está somnoliento, confundido o sangró por algún lado?", "clave", "“No, está despierto. No sangró.”", "Descarta signos de hepatitis fulminante."),
    act("farmacos", "¿Tomó medicamentos, yuyos o alcohol?", "util", "“Paracetamol por la fiebre, poco.”", "Descarta causa tóxica."),
    act("heces", "¿De qué color es la caca?", "util", "“Más clara de lo normal.”", "Acolia por colestasis."),
    act("futbol", "¿Juega a algo?", "neutro", "“Al fútbol.”", "No orienta."),
  ],
  exam: [
    act("ictericia", "Piel y escleras", "clave", "Ictericia de piel y escleras.", "Hiperbilirrubinemia mayor de 2,5–3 mg/dl."),
    act("higado", "Palpación hepática", "clave", "Hepatomegalia dolorosa de 2 cm bajo reborde.", "Inflamación hepática."),
    act("encefalopatia", "Estado de conciencia, flapping", "clave", "Lúcido, sin asterixis.", "Sin encefalopatía hepática."),
    act("esplenomegalia", "Palpación de bazo", "util", "No palpable.", "Ayuda a diferenciar de otras causas."),
  ],
  studies: [
    study("Laboratorio", "hepatograma", "Hepatograma (transaminasas, bilirrubina, fosfatasa alcalina)", "clave", "TGP 2400 UI/l, TGO 1800, bilirrubina total 6,2 (directa 4,8).", "Patrón hepatocelular con transaminasas muy elevadas."),
    study("Laboratorio", "tp", "Tiempo de protrombina", "clave", "70 %.", "Es el mejor marcador de función hepática: menos de 50 % es signo de gravedad."),
    study("Laboratorio", "igm", "IgM anti-VHA", "clave", "Positiva.", "Confirma hepatitis A aguda."),
    study("Laboratorio", "otros-virus", "HBsAg, anti-HBc IgM y anti-VHC", "util", "Negativos.", "Descarta otras hepatitis virales."),
    study("Imágenes", "tc", "Tomografía de abdomen", "innecesario", "No se realizó.", "La ecografía alcanza si hace falta; no cambia la conducta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("vha", "Hepatitis A aguda sin criterios de gravedad", true, "Pródromo seguido de ictericia, coluria y acolia, transaminasas muy elevadas, IgM anti-VHA positiva y protrombina conservada, con contacto y sin vacuna."),
      dx("fulminante", "Hepatitis fulminante", false, "No hay encefalopatía y la protrombina es mayor de 50 %."),
      dx("vhb", "Hepatitis B aguda", false, "HBsAg y anti-HBc IgM negativos."),
      dx("toxica", "Hepatitis tóxica por paracetamol", false, "Dosis bajas y serología positiva para hepatitis A."),
      dx("biliar", "Obstrucción biliar", false, "Patrón hepatocelular, no colestásico predominante."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("sosten", "Tratamiento de sostén ambulatorio: hidratación, alimentación según tolerancia, reposo relativo", "clave", "No hay antiviral; la mayoría cura sola."),
      mg("controles", "Control clínico y de protrombina; pautas de alarma (somnolencia, sangrados, vómitos persistentes)", "clave", "Detecta la evolución a falla hepática."),
      mg("contactos", "Vacunar a los contactos susceptibles dentro de las dos semanas y medidas de higiene", "clave", "La vacuna como profilaxis posexposición corta brotes."),
      mg("notificar", "Notificar al sistema de vigilancia", "util", "Evento de notificación obligatoria."),
      mg("paracetamol", "Seguir con paracetamol a dosis altas por el malestar", "riesgoso", "Evitar hepatotóxicos durante la hepatitis."),
      mg("corticoides", "Corticoides", "riesgoso", "No tienen utilidad y pueden empeorar el cuadro."),
    ],
  },
  debrief: {
    diagnosis: "Hepatitis A aguda ictérica sin criterios de gravedad, en adolescente de 14 años no vacunado con exposición en el hogar.",
    pathologies: [
      { name: "Hepatitis A aguda", role: "principal", why: "IgM anti-VHA positiva con clínica y laboratorio compatibles." },
      { name: "Hepatitis fulminante", role: "diferencial", why: "Complicación rara a vigilar." },
      { name: "Hepatitis B, C, tóxica u obstructiva", role: "diferencial", why: "Otras causas de ictericia." },
    ],
    reasoning: [
      "Causa: virus de la hepatitis A, de transmisión fecal-oral (agua, alimentos, contacto cercano).",
      "Mecanismo: el virus se replica en el hepatocito y la respuesta inmune (linfocitos T) destruye las células infectadas.",
      "Consecuencia: pródromo, ictericia, coluria y acolia; casi siempre cura sin cronicidad, pero en raros casos produce falla hepática fulminante.",
    ],
    epidemiology:
      "La hepatitis A era la principal causa de trasplante hepático en niños en Argentina hasta 2005, cuando se incorporó la vacuna de dosis única al año de vida; los casos cayeron más del 80 %. Hoy aparece en no vacunados, en zonas sin agua segura y en brotes. En niños pequeños suele ser asintomática; en adolescentes y adultos, ictérica.",
    management: [
      "Diagnóstico con IgM anti-VHA y evaluación de gravedad (protrombina, encefalopatía).",
      "Tratamiento de sostén; internar si hay protrombina menor de 50 %, encefalopatía o intolerancia oral.",
      "Evitar hepatotóxicos.",
      "Vacunación de contactos y medidas de higiene; notificación.",
    ],
    sources: ["Ministerio de Salud de la Nación — Normas de vacunación (hepatitis A).", "Sociedad Argentina de Pediatría — Consenso de hepatitis virales."],
    pearls: ["IgM anti-VHA confirma.", "La protrombina mide la gravedad.", "Vacuna única al año en el Calendario Nacional."],
    pitfalls: ["No controlar la protrombina.", "Dar paracetamol a dosis altas."],
    tribunal: [
      qa("¿Qué es la hepatitis fulminante y cómo se reconoce?", "La insuficiencia hepática aguda grave en una persona sin hepatopatía previa: encefalopatía y protrombina menor de 50 % (RIN mayor de 1,5) en las primeras semanas de ictericia; requiere derivación a un centro con trasplante."),
      qa("¿Cuál es el patrón serológico de la hepatitis A?", "IgM anti-VHA positiva en la infección aguda (desde los síntomas hasta 3–6 meses); IgG anti-VHA indica infección pasada o vacunación e inmunidad de por vida. No hay portadores ni cronicidad."),
      qa("¿Cómo se transmite y cómo se previene?", "Por vía fecal-oral (agua, alimentos, manos); se previene con agua segura, saneamiento, lavado de manos y la vacuna (dosis única al año en Argentina, y profilaxis posexposición en contactos)."),
    ],
  },
};
