import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const faringitis: ClinicalCase = {
  id: "faringoamigdalitis-estreptococica",
  level: 1,
  area: "Infectología",
  setting: "Consultorio",
  patient: { age: 6, ageUnit: "años", sex: "M", context: "Septiembre. Lo trae el papá." },
  frequency: "muy-frecuente",
  intro: "“Desde ayer tiene fiebre de 39, le duele la garganta y no quiere comer. También dice que le duele la panza.”",
  vitals: { FC: "118 lpm", FR: "22 rpm", "T°": "39,1 °C", Peso: "21 kg" },
  anamnesis: [
    act("tos", "¿Tiene tos, mocos, disfonía o los ojos colorados?", "clave", "“No, nada de eso.”", "Tos, rinorrea, disfonía y conjuntivitis orientan a etiología viral. Su ausencia hace más probable el estreptococo."),
    act("inicio", "¿Cómo empezó?", "clave", "“De golpe, ayer a la tarde, con fiebre alta.”", "El inicio brusco con fiebre alta es típico de la faringitis estreptocócica."),
    act("alergia", "¿Es alérgico a la penicilina?", "clave", "“No, ya tomó amoxicilina otras veces.”", "Define qué antibiótico usar."),
    act("contactos", "¿Hay casos en la escuela o en la casa?", "util", "“En el grado hay varios con anginas.”", "El estreptococo circula en escolares; contexto epidemiológico compatible."),
    act("abdomen", "¿Vomitó? ¿Dónde le duele la panza?", "util", "“Vomitó una vez. Le duele alrededor del ombligo.”", "El dolor abdominal y los vómitos son frecuentes en la faringitis estreptocócica en niños."),
    act("reumatica", "¿Tuvo fiebre reumática o problemas en el corazón?", "util", "“No.”", "Antecedente que cambiaría la profilaxis."),
    act("vacunas", "¿Tiene las vacunas al día?", "neutro", "“Sí.”", "Recordá que la difteria es excepcional en vacunados."),
  ],
  exam: [
    act("fauces", "Examen de fauces", "clave", "Amígdalas hipertróficas, eritematosas, con exudado blanquecino; petequias en el paladar; úvula central.", "Exudado + petequias en el paladar sugieren estreptococo. Úvula central y sin abombamiento: no hay absceso periamigdalino."),
    act("ganglios", "Palpación de ganglios cervicales", "clave", "Adenopatías cervicales anteriores de 1,5 cm, dolorosas.", "Adenopatías anteriores dolorosas acompañan a la faringitis bacteriana; las generalizadas o posteriores orientan a mononucleosis."),
    act("piel", "Examen de piel", "util", "Sin exantema.", "Un exantema áspero “en papel de lija” con palidez peribucal sería escarlatina (misma bacteria, misma conducta)."),
    act("bazo", "Palpación de hígado y bazo", "util", "Sin visceromegalias.", "La esplenomegalia orienta a mononucleosis (virus de Epstein-Barr)."),
    act("oidos", "Otoscopía", "util", "Tímpanos normales.", "Descarta otitis media como foco asociado."),
    act("pulmon", "Auscultación pulmonar", "neutro", "Normal.", "Sin foco bajo."),
  ],
  studies: [
    study("Microbiología", "rapido", "Test rápido de antígeno estreptocócico", "clave", "Positivo.", "Confirma el estreptococo betahemolítico del grupo A (EBHGA). En pediatría los puntajes clínicos no alcanzan: se confirma antes de dar antibiótico."),
    study("Microbiología", "cultivo", "Cultivo de fauces", "neutro", "No se realizó: el test rápido fue positivo.", "Se reserva para cuando el test rápido es negativo y la sospecha sigue alta."),
    study("Laboratorio", "hemograma", "Hemograma", "innecesario", "Leucocitosis con neutrofilia.", "No diferencia viral de bacteriana con suficiente precisión."),
    study("Laboratorio", "asto", "ASTO (antiestreptolisina O)", "innecesario", "Normal.", "Mide infección pasada (tarda semanas en subir): no sirve para el diagnóstico agudo."),
    study("Laboratorio", "monotest", "Monotest", "innecesario", "Negativo.", "Solo si hay pistas de mononucleosis."),
    study("Imágenes", "rx", "Radiografía de cavum", "innecesario", "Normal.", "No tiene lugar en la faringitis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ebhga", "Faringoamigdalitis aguda por estreptococo betahemolítico del grupo A", true, "Escolar con fiebre alta de inicio brusco, exudado, petequias en el paladar, adenopatías anteriores, sin síntomas virales y con test rápido positivo."),
      dx("viral", "Faringitis viral (adenovirus)", false, "Suele venir con rinorrea, conjuntivitis, tos o disfonía; el test rápido sería negativo."),
      dx("mono", "Mononucleosis infecciosa", false, "Adolescentes, adenopatías generalizadas, esplenomegalia, astenia marcada; el exudado puede confundir."),
      dx("absceso", "Absceso periamigdalino", false, "Trismus, voz “en papa caliente”, abombamiento y desviación de la úvula."),
      dx("difteria", "Difteria", false, "Membrana grisácea adherente que sangra al despegarla, en no vacunados; excepcional hoy."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("amoxi", "Amoxicilina 50 mg/kg/día cada 12 h durante 10 días", "clave", "Elección: cura la infección y previene la fiebre reumática si se completan los 10 días."),
      mg("antitermico", "Antitérmico y analgésico (ibuprofeno o paracetamol)", "clave", "Mejora el dolor y la ingesta."),
      mg("penicilina", "Penicilina G benzatínica IM en dosis única (si no se asegura la adherencia)", "util", "Alternativa cuando no se puede garantizar el tratamiento oral completo."),
      mg("escuela", "Volver a la escuela 24 h después de iniciado el antibiótico", "util", "A partir de ahí deja de contagiar."),
      mg("azitro", "Azitromicina 5 días", "innecesario", "Solo para alérgicos a penicilina, y hay resistencia creciente a macrólidos."),
      mg("corticoides", "Corticoides", "innecesario", "No están indicados en la faringitis no complicada."),
      mg("convivientes", "Hisopar y tratar a todos los convivientes asintomáticos", "innecesario", "Solo se evalúa a convivientes con síntomas (o en contextos especiales, como fiebre reumática en la familia)."),
    ],
  },
  debrief: {
    diagnosis: "Faringoamigdalitis aguda por estreptococo betahemolítico del grupo A.",
    pathologies: [
      { name: "Faringoamigdalitis estreptocócica", role: "principal", why: "Cuadro típico confirmado con test rápido." },
      { name: "Faringitis viral", role: "diferencial", why: "La causa más frecuente de faringitis en general, sobre todo en menores de 3 años." },
      { name: "Mononucleosis infecciosa", role: "diferencial", why: "Exudado + adenopatías generalizadas + esplenomegalia." },
      { name: "Absceso periamigdalino", role: "asociada", why: "Complicación supurativa a vigilar." },
      { name: "Fiebre reumática y glomerulonefritis postestreptocócica", role: "asociada", why: "Complicaciones no supurativas: la primera se previene con el antibiótico; la segunda no." },
    ],
    reasoning: [
      "Causa: Streptococcus pyogenes (EBHGA), transmitido por gotitas.",
      "Mecanismo: se adhiere al epitelio faríngeo; la proteína M lo protege de la fagocitosis y sus exotoxinas pirogénicas causan la fiebre (y la escarlatina).",
      "Consecuencia local: inflamación con exudado, petequias y adenopatías. A distancia, por mimetismo molecular, los anticuerpos contra la proteína M reaccionan con tejidos propios (miosina, válvulas, articulaciones, núcleos basales) → fiebre reumática semanas después.",
      "La glomerulonefritis postestreptocócica es por inmunocomplejos y no se previene con el antibiótico; la fiebre reumática sí, si se trata dentro de los 9 días.",
    ],
    epidemiology:
      "El estreptococo causa alrededor del 15–30 % de las faringitis en escolares de 5 a 15 años, con más casos a fines del invierno y en primavera. En menores de 3 años es rara: ahí casi todas son virales y no se busca de rutina.",
    management: [
      "Sospechar clínicamente y confirmar con test rápido o cultivo antes de indicar antibiótico.",
      "Amoxicilina por 10 días (o penicilina benzatínica IM en dosis única); macrólidos solo en alérgicos.",
      "Analgesia y antitérmicos; volver a la escuela a las 24 h de iniciado el tratamiento.",
      "Pautas de alarma: dificultad para tragar o abrir la boca, babeo, fiebre persistente a las 48–72 h.",
    ],
    sources: [
      "Sociedad Argentina de Pediatría — Recomendaciones sobre faringitis aguda / infecciones respiratorias altas.",
      "Ministerio de Salud de la Nación — Uso racional de antimicrobianos.",
    ],
    pearls: [
      "El objetivo principal del antibiótico es prevenir la fiebre reumática: por eso son 10 días.",
      "ASTO no sirve para diagnosticar una faringitis aguda.",
      "Fiebre reumática (mimetismo molecular, se previene) vs. GNPE (inmunocomplejos, no se previene).",
    ],
    pitfalls: [
      "Dar antibiótico a toda faringitis sin confirmar.",
      "Indicar 5 días de amoxicilina.",
      "Usar macrólidos de primera elección.",
    ],
  },
};
