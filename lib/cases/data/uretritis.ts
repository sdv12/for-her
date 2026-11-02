import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const uretritis: ClinicalCase = {
  id: "uretritis-gonococica",
  level: 1,
  area: "Infectología",
  setting: "Consultorio",
  patient: { age: 21, ageUnit: "años", sex: "M", context: "Estudiante. Sin enfermedades conocidas." },
  frequency: "frecuente",
  intro: "“Desde hace tres días me arde al orinar y me sale como pus por la punta. Me da un poco de vergüenza.”",
  vitals: { TA: "120/74 mmHg", FC: "76 lpm", "T°": "36,6 °C" },
  anamnesis: [
    act("relaciones", "¿Tuviste relaciones sexuales en los últimos meses? ¿Con preservativo?", "clave", "“Hace una semana, con una chica que conocí en una fiesta. Sin preservativo.”", "Exposición sexual reciente sin protección; la incubación del gonococo es de 2 a 7 días."),
    act("parejas", "¿Cuántas parejas tuviste en los últimos dos meses?", "clave", "“Dos.”", "Todas las parejas deben ser evaluadas y tratadas."),
    act("secrecion", "¿Cómo es la secreción?", "clave", "“Amarilla, abundante, mancha la ropa interior.”", "Secreción purulenta abundante: más típica del gonococo; la de clamidia suele ser escasa y clara."),
    act("otros", "¿Tuviste lesiones en los genitales, dolor en los testículos o en las articulaciones?", "util", "“No.”", "Busca epididimitis, infección diseminada u otras ITS."),
    act("hiv", "¿Te hiciste alguna vez el test de VIH y sífilis?", "util", "“Nunca.”", "Toda ITS es oportunidad para testear VIH, sífilis y hepatitis B."),
    act("profilaxis", "¿Conocés la PrEP?", "util", "“No.”", "Oportunidad de prevención combinada."),
    act("carrera", "¿Qué estudiás?", "neutro", "“Ingeniería.”", "No orienta."),
  ],
  exam: [
    act("meato", "Inspección del meato y genitales", "clave", "Secreción uretral purulenta espontánea; sin úlceras.", "Confirma uretritis; sin lesiones ulcerosas."),
    act("testiculos", "Palpación testicular y epidídimos", "util", "Normales.", "Descarta epididimitis."),
    act("ganglios", "Ganglios inguinales y piel", "util", "Sin adenopatías ni exantema.", "Sin signos de sífilis secundaria."),
  ],
  studies: [
    study("Microbiología", "gram", "Gram y cultivo de la secreción uretral", "clave", "Diplococos gram negativos intracelulares.", "Confirma gonococo y el cultivo permite ver resistencias."),
    study("Microbiología", "pcr", "PCR para Chlamydia y gonococo", "util", "Chlamydia negativa.", "La coinfección es frecuente."),
    study("Laboratorio", "serologias", "VIH, VDRL y hepatitis B", "clave", "Negativas.", "Se testean con consentimiento en toda ITS."),
    study("Imágenes", "eco", "Ecografía renal y vesical", "innecesario", "No se realizó.", "No aporta en una uretritis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("gonococo", "Uretritis gonocócica", true, "Disuria y secreción purulenta abundante tras relación sin preservativo, con diplococos gram negativos intracelulares."),
      dx("clamidia", "Uretritis no gonocócica por Chlamydia", false, "Suele dar secreción escasa y clara; el Gram mostró diplococos."),
      dx("cistitis", "Infección urinaria baja", false, "Rara en varones jóvenes; no explica la secreción uretral."),
      dx("prostatitis", "Prostatitis aguda", false, "Habría fiebre, dolor perineal y próstata dolorosa."),
      dx("herpes", "Herpes genital", false, "No hay vesículas ni úlceras."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ceftriaxona", "Ceftriaxona intramuscular dosis única", "clave", "Tratamiento de elección del gonococo por la resistencia a otros antibióticos."),
      mg("clamidia", "Sumar doxiciclina 7 días si no se descartó Chlamydia", "util", "Cubre la coinfección frecuente."),
      mg("parejas", "Notificar, evaluar y tratar a las parejas sexuales; abstinencia hasta 7 días después del tratamiento", "clave", "Evita la reinfección y corta la transmisión."),
      mg("prevencion", "Consejería sobre preservativo, oferta de testeo y PrEP", "clave", "Prevención combinada de ITS y VIH."),
      mg("cipro", "Ciprofloxacina por vía oral", "riesgoso", "El gonococo tiene alta resistencia a quinolonas en Argentina."),
      mg("esperar", "Esperar el cultivo antes de tratar", "innecesario", "Con clínica y Gram compatibles se trata en la consulta."),
    ],
  },
  debrief: {
    diagnosis: "Uretritis gonocócica en varón de 21 años con relaciones sexuales sin preservativo.",
    pathologies: [
      { name: "Uretritis gonocócica", role: "principal", why: "Infección por Neisseria gonorrhoeae." },
      { name: "Otras ITS (Chlamydia, sífilis, VIH, hepatitis B)", role: "asociada", why: "Se buscan siempre por compartir la vía de transmisión." },
      { name: "Uretritis no gonocócica, cistitis, prostatitis", role: "diferencial", why: "Otras causas de disuria." },
    ],
    reasoning: [
      "Causa: transmisión sexual de Neisseria gonorrhoeae.",
      "Mecanismo: el gonococo se adhiere al epitelio de la uretra mediante pili y provoca una intensa respuesta inflamatoria con neutrófilos.",
      "Consecuencia: disuria y secreción purulenta; sin tratamiento, epididimitis, infección diseminada (artritis, lesiones cutáneas), y en mujeres enfermedad pelviana e infertilidad.",
    ],
    epidemiology:
      "La gonorrea y la clamidia son de las ITS bacterianas más frecuentes, con mayor incidencia entre los 15 y los 29 años. En Argentina la notificación de ITS aumentó en los últimos años, y la resistencia del gonococo obliga a usar ceftriaxona.",
    management: [
      "Tratamiento sindrómico o etiológico en la primera consulta.",
      "Ceftriaxona IM dosis única; cubrir Chlamydia si no se descarta.",
      "Tratar a las parejas y testear VIH, sífilis y hepatitis B.",
      "Consejería, preservativos y prevención combinada; notificación al sistema de vigilancia.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de manejo de las infecciones de transmisión sexual.", "Sociedad Argentina de Infectología — Recomendaciones de tratamiento de ITS."],
    pearls: ["Secreción purulenta abundante = gonococo.", "Ceftriaxona IM única.", "Toda ITS: testear VIH y sífilis, y tratar parejas."],
    pitfalls: ["Usar quinolonas.", "No tratar a las parejas."],
    tribunal: [
      qa("¿Qué diferencia la uretritis gonocócica de la no gonocócica?", "La gonocócica tiene incubación corta (2–7 días), secreción purulenta abundante y diplococos gram negativos intracelulares en el Gram; la no gonocócica (Chlamydia, Mycoplasma) tiene incubación más larga, secreción escasa y clara, y a veces es asintomática."),
      qa("¿Qué complicaciones tiene la gonorrea?", "Epididimitis, prostatitis, estrechez uretral, infección gonocócica diseminada (artritis, tenosinovitis, pústulas), en mujeres enfermedad pelviana inflamatoria, infertilidad y embarazo ectópico, y en el recién nacido conjuntivitis (oftalmia neonatal)."),
      qa("¿Qué es la PrEP?", "La profilaxis preexposición al VIH: medicación antirretroviral que toman personas sin VIH con riesgo de exposición; es gratuita en Argentina y se acompaña de controles y testeo periódico de ITS."),
    ],
  },
};
