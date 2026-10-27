import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hepatitisB: ClinicalCase = {
  id: "hepatitis-b-aguda",
  level: 2,
  area: "Infectología",
  setting: "Consultorio",
  patient: { age: 27, ageUnit: "años", sex: "M", context: "Trabaja en un delivery." },
  frequency: "frecuente",
  intro: "“Hace dos semanas que estoy cansadísimo, sin hambre, con náuseas. Desde hace tres días los ojos están amarillos y la orina como coca-cola.”",
  vitals: { TA: "118/72 mmHg", FC: "84 lpm", "T°": "37,4 °C", Peso: "70 kg" },
  anamnesis: [
    act("sexual", "¿Tuvo relaciones sin preservativo en los últimos meses?", "clave", "“Sí, con varias parejas, no siempre me cuido.”", "La vía sexual es la principal forma de transmisión de la hepatitis B en adultos en la Argentina."),
    act("vacuna", "¿Recibió la vacuna contra la hepatitis B?", "clave", "“Creo que no, de chico no estaba.”", "La vacuna se incorporó al Calendario Nacional en 2000 para recién nacidos y en 2012 para toda la población; muchos adultos no la tienen."),
    act("drogas", "¿Usó drogas inyectables o compartió canutos, máquinas de afeitar o cepillos?", "util", "“No.”", "Otras vías de transmisión parenteral."),
    act("tatuajes", "¿Se hizo tatuajes o piercings?", "util", "“Un tatuaje hace cuatro meses.”", "Los tatuajes con material no estéril transmiten hepatitis B y C."),
    act("alcohol", "¿Toma alcohol? ¿Toma medicamentos o yuyos?", "clave", "“Cerveza el fin de semana. Paracetamol para el malestar.”", "El alcohol y los fármacos hepatotóxicos (paracetamol en dosis altas) empeoran la lesión hepática."),
    act("materia", "¿Cómo es la materia fecal?", "util", "“Más clara que siempre.”", "Acolia y coluria: componente colestásico."),
    act("comida", "¿Comió mariscos crudos o tomó agua no segura? ¿Hay alguien con hepatitis en la casa?", "util", "“No.”", "Orientaría a hepatitis A o E (transmisión fecal-oral)."),
    act("confusion", "¿Está confundido, somnoliento o tuvo sangrados?", "clave", "“No.”", "Encefalopatía o sangrado indicarían insuficiencia hepática aguda grave."),
    act("equipo", "¿De qué cuadro es?", "neutro", "“De Belgrano.”", "No orienta."),
  ],
  exam: [
    act("ictericia", "Piel y escleras", "clave", "Ictericia en escleras y piel, sin estigmas de hepatopatía crónica.", "Ictericia aguda sin signos de cirrosis."),
    act("higado", "Palpación hepática", "clave", "Hígado palpable a 2 cm, blando, doloroso.", "Hepatomegalia dolorosa de la hepatitis aguda."),
    act("encefalopatia", "Asterixis y estado de conciencia", "clave", "Lúcido, sin asterixis.", "Sin encefalopatía: no hay insuficiencia hepática aguda grave."),
    act("ganglios", "Ganglios y bazo", "util", "Bazo no palpable.", "Esplenomegalia orientaría a hipertensión portal o a mononucleosis."),
  ],
  studies: [
    study("Laboratorio", "hepatograma", "Hepatograma y tiempo de protrombina", "clave", "ALT 1.850 U/l, AST 1.320 U/l, bilirrubina 6,2 mg/dl (directa 4,8), FAL levemente elevada, tiempo de protrombina 75 % (RIN 1,2).", "Patrón hepatocelular (transaminasas en miles). El tiempo de protrombina es el mejor marcador de la función hepática: normal, no hay insuficiencia grave."),
    study("Laboratorio", "serologias", "Serologías: HBsAg, anti-HBc IgM, anti-HAV IgM, anti-HCV, VIH y sífilis", "clave", "HBsAg positivo, anti-HBc IgM positivo, HBeAg positivo. Anti-HAV IgM negativo, anti-HCV negativo, VIH y VDRL no reactivos.", "HBsAg con anti-HBc IgM: hepatitis B aguda. Toda ITS obliga a buscar las otras."),
    study("Imágenes", "eco", "Ecografía abdominal", "util", "Hígado aumentado, ecogenicidad normal, vía biliar no dilatada.", "Descarta obstrucción biliar como causa de ictericia."),
    study("Otros", "biopsia", "Biopsia hepática", "innecesario", "No se realizó.", "No se necesita para diagnosticar una hepatitis viral aguda."),
    study("Laboratorio", "carga", "Carga viral de hepatitis B", "neutro", "Elevada.", "Confirma replicación; no cambia el manejo de la hepatitis aguda."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hbv-aguda", "Hepatitis B aguda", true, "Pródromo, ictericia con transaminasas en miles, HBsAg y anti-HBc IgM positivos, sin insuficiencia hepática grave, en un adulto no vacunado con relaciones sin protección."),
      dx("hav", "Hepatitis A aguda", false, "Se diagnostica con anti-HAV IgM positivo; acá es negativo."),
      dx("hbv-cronica", "Hepatitis B crónica reactivada", false, "En la crónica el anti-HBc es IgG; el IgM positivo indica infección aguda."),
      dx("toxica", "Hepatitis tóxica por paracetamol", false, "Requiere dosis altas; las serologías explican el cuadro."),
      dx("obstructiva", "Ictericia obstructiva (coledocolitiasis)", false, "Predominaría la FAL y habría vía biliar dilatada."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("sosten", "Tratamiento de sostén ambulatorio: reposo relativo, hidratación, alimentación normal", "clave", "Más del 95 % de los adultos elimina el virus espontáneamente; no se indica antiviral en la hepatitis aguda no grave."),
      mg("evitar", "Suspender alcohol y limitar el paracetamol (no más de 2 g por día)", "clave", "Evita sumar daño hepático."),
      mg("contactos", "Testear y vacunar a las parejas sexuales y convivientes (con gammaglobulina específica si la exposición fue reciente)", "clave", "Previene nuevos casos; la gammaglobulina es eficaz en los primeros 14 días tras la exposición sexual."),
      mg("control", "Control de tiempo de protrombina y hepatograma, y HBsAg a los 6 meses", "clave", "Detecta insuficiencia hepática grave y define si pasa a crónica (HBsAg positivo más de 6 meses)."),
      mg("notificar", "Notificar al SNVS y consejería en preservativo", "util", "La hepatitis B es de notificación obligatoria."),
      mg("corticoides", "Corticoides para bajar la inflamación", "riesgoso", "No benefician y aumentan la replicación viral y el riesgo de cronicidad."),
      mg("antiviral", "Tenofovir de inmediato", "innecesario", "Se reserva para la hepatitis aguda grave (insuficiencia hepática) o la crónica con criterios de tratamiento."),
    ],
  },
  debrief: {
    diagnosis: "Hepatitis B aguda ictérica, sin insuficiencia hepática grave, en varón de 27 años no vacunado, de probable transmisión sexual.",
    pathologies: [
      { name: "Hepatitis B aguda", role: "principal", why: "HBsAg y anti-HBc IgM positivos." },
      { name: "Hepatitis A, C y E", role: "diferencial", why: "Otras hepatitis virales agudas." },
      { name: "Hepatitis tóxica", role: "diferencial", why: "Paracetamol, alcohol, fármacos." },
      { name: "Ictericia obstructiva", role: "diferencial", why: "Se descarta con la ecografía." },
    ],
    reasoning: [
      "Causa: virus de la hepatitis B, transmitido por vía sexual, parenteral o vertical.",
      "Mecanismo: el virus no es citopático por sí mismo; el daño hepático se debe a la respuesta inmune (linfocitos T citotóxicos) que destruye los hepatocitos infectados.",
      "Consecuencia: pródromo (astenia, anorexia, náuseas), luego ictericia con coluria, acolia y transaminasas muy altas. Una respuesta inmune eficaz elimina el virus; si es débil (recién nacidos, inmunosuprimidos), se cronifica.",
      "Por eso el riesgo de cronicidad es del 90 % en recién nacidos y menos del 5 % en adultos sanos.",
    ],
    epidemiology:
      "En la Argentina la prevalencia de hepatitis B es baja a intermedia, y la vía sexual es la principal forma de transmisión en adultos. Los casos agudos se concentran en adultos jóvenes no vacunados, con predominio en varones. La vacuna es universal y gratuita en el Calendario Nacional; la hepatitis B crónica puede llevar a cirrosis y hepatocarcinoma.",
    management: [
      "Confirmar con serologías (HBsAg, anti-HBc IgM) y descartar otras hepatitis e ITS.",
      "Evaluar la gravedad con el tiempo de protrombina y la conciencia (insuficiencia hepática aguda grave: derivar a centro de trasplante).",
      "Sostén ambulatorio, evitar hepatotóxicos.",
      "Testear y vacunar contactos; notificar; consejería.",
      "Control a los 6 meses para descartar evolución a hepatitis crónica.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guía de diagnóstico y tratamiento de hepatitis B.",
      "Sociedad Argentina de Hepatología — Consenso de hepatitis B.",
      "Ley 27.675 de Respuesta Integral al VIH, Hepatitis Virales, otras ITS y Tuberculosis.",
    ],
    pearls: ["Anti-HBc IgM = hepatitis B aguda.", "El tiempo de protrombina mide la gravedad, no las transaminasas.", "HBsAg más de 6 meses = crónica."],
    pitfalls: ["Dar corticoides.", "No testear ni vacunar a las parejas.", "No pedir VIH y sífilis."],
    tribunal: [
      qa("¿Cómo interpretás los marcadores de hepatitis B?", "HBsAg: infección actual. Anti-HBs: inmunidad (por vacuna o curación). Anti-HBc IgM: infección aguda. Anti-HBc IgG: contacto previo (curada si hay anti-HBs, crónica si sigue el HBsAg). HBeAg: alta replicación. Vacunado: solo anti-HBs positivo."),
      qa("¿Qué diferencias hay entre las hepatitis virales A, B, C, D y E?", "A y E: fecal-oral, agudas, no se cronifican (la E puede ser grave en embarazadas). B: sexual, parenteral y vertical; puede cronificarse. C: parenteral, se cronifica en la mayoría, tratable con antivirales de acción directa. D: solo con hepatitis B."),
      qa("¿Qué es la insuficiencia hepática aguda grave?", "Coagulopatía (RIN de 1,5 o más) con encefalopatía en un paciente sin hepatopatía previa, en menos de 26 semanas. Requiere derivación urgente a un centro con trasplante."),
      qa("¿Cómo se previene la transmisión vertical de la hepatitis B?", "Tamizaje con HBsAg en el embarazo y, en hijos de madres positivas, vacuna y gammaglobulina específica en las primeras 12 horas de vida (más antivirales a la madre con carga viral alta)."),
    ],
  },
};
