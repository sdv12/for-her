import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const epi: ClinicalCase = {
  id: "enfermedad-pelviana-inflamatoria",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 22, ageUnit: "años", sex: "F" },
  frequency: "frecuente",
  intro: "“Hace cuatro días tengo dolor abajo, en los dos costados. Hoy tengo fiebre y un flujo amarillo. Me duele en las relaciones.”",
  vitals: { TA: "112/70 mmHg", FC: "98 lpm", FR: "18 rpm", "T°": "38,3 °C" },
  anamnesis: [
    act("fum", "¿Cuándo fue su última menstruación? ¿Puede estar embarazada?", "clave", "“Terminó hace una semana. No uso nada, pero me vino.”", "Embarazo ectópico es el primer diferencial a descartar en toda mujer con dolor pelviano."),
    act("sexual", "¿Tuvo parejas nuevas? ¿Usa preservativo?", "clave", "“Dos parejas en los últimos meses. Preservativo no siempre.”", "Las parejas múltiples sin preservativo aumentan el riesgo de clamidia y gonococo, las principales causas de EPI."),
    act("inicio", "¿El dolor empezó durante o después de la menstruación?", "util", "“Empezó al terminar la menstruación.”", "La EPI suele comenzar durante o poco después de la menstruación, cuando el moco cervical es menos protector."),
    act("urinario", "¿Le arde al orinar?", "util", "“Un poco.”", "Puede haber uretritis asociada; también ayuda con el diferencial urinario."),
    act("digestivo", "¿Tiene náuseas, vómitos o diarrea? ¿Dónde empezó el dolor?", "util", "“Algo de náuseas. El dolor fue en los dos lados desde el principio.”", "La migración del dolor desde el ombligo a la fosa ilíaca derecha orientaría a apendicitis."),
    act("diu", "¿Le colocaron un DIU o tuvo algún procedimiento ginecológico?", "util", "“No.”", "Las instrumentaciones recientes aumentan el riesgo."),
    act("serie", "¿Qué serie mira?", "neutro", "“Ninguna.”", "No orienta."),
  ],
  exam: [
    act("bimanual", "Tacto bimanual", "clave", "Dolor a la movilización del cuello, dolor anexial bilateral; sin masas palpables.", "Criterios mínimos de EPI: dolor a la movilización cervical, uterino o anexial."),
    act("especulo", "Especuloscopía", "clave", "Secreción mucopurulenta desde el cuello, que sangra al contacto.", "Cervicitis mucopurulenta: apoya el diagnóstico."),
    act("abdomen", "Palpación abdominal", "util", "Dolor en hipogastrio y ambas fosas ilíacas, sin defensa generalizada.", "Peritonismo difuso o masa sugeriría absceso o pelviperitonitis."),
    act("higado", "Palpación del hipocondrio derecho", "util", "Dolor leve.", "Puede haber perihepatitis (Fitz-Hugh-Curtis)."),
  ],
  studies: [
    study("Laboratorio", "beta", "Prueba de embarazo", "clave", "Negativa.", "Descarta el ectópico; obligatoria."),
    study("Microbiología", "pcr", "PCR para Chlamydia trachomatis y Neisseria gonorrhoeae (endocervical)", "clave", "Positiva para Chlamydia.", "Identifica el germen, permite tratar a las parejas y notificar."),
    study("Imágenes", "eco", "Ecografía transvaginal", "util", "Trompas engrosadas, sin absceso tuboovárico.", "Busca absceso (cambia a internación); no descarta EPI si es normal."),
    study("Laboratorio", "its", "Testeo de VIH, sífilis y hepatitis B", "clave", "No reactivos.", "Toda ITS obliga a buscar las otras."),
    study("Laboratorio", "lab", "Hemograma y PCR", "util", "Leucocitos 13.000, PCR 60 mg/l.", "Apoyan la inflamación."),
    study("Imágenes", "laparoscopia", "Laparoscopía diagnóstica", "innecesario", "No se realizó.", "Es el estándar, pero es invasiva; se reserva para dudas diagnósticas o falla del tratamiento."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("epi", "Enfermedad pelviana inflamatoria (por Chlamydia) sin absceso", true, "Dolor pelviano bilateral, fiebre, dispareunia, dolor a la movilización cervical y anexial, cervicitis mucopurulenta y PCR para Chlamydia positiva, con test de embarazo negativo."),
      dx("ectopico", "Embarazo ectópico", false, "Se descarta con la prueba de embarazo negativa."),
      dx("apendicitis", "Apendicitis", false, "Dolor que migra a fosa ilíaca derecha, unilateral, sin cervicitis ni dolor a la movilización del cuello."),
      dx("torsion", "Torsión anexial", false, "Dolor súbito unilateral con vómitos y masa anexial."),
      dx("pielo", "Pielonefritis", false, "Dolor lumbar y puñopercusión positiva, con orina patológica."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("esquema", "Ceftriaxona 500 mg IM dosis única más doxiciclina 100 mg cada 12 h y metronidazol 500 mg cada 12 h por 14 días", "clave", "Esquema ambulatorio que cubre gonococo, clamidia y anaerobios."),
      mg("pareja", "Estudiar y tratar a las parejas sexuales de los últimos 60 días", "clave", "Previene reinfecciones y corta la cadena de transmisión."),
      mg("control", "Control a las 72 h", "clave", "Si no mejora, internar y tratar por vía endovenosa."),
      mg("preservativo", "Consejería en preservativo y abstinencia hasta completar el tratamiento", "util", "Prevención."),
      mg("esperar", "Esperar el resultado de la PCR para empezar el antibiótico", "riesgoso", "Retrasar el tratamiento aumenta el daño tubario: infertilidad, ectópico y dolor crónico."),
      mg("azitro-sola", "Azitromicina sola en dosis única", "innecesario", "Es insuficiente para EPI: no cubre bien gonococo ni anaerobios y la duración es corta."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad pelviana inflamatoria por Chlamydia trachomatis, sin absceso tuboovárico, para tratamiento ambulatorio.",
    pathologies: [
      { name: "Enfermedad pelviana inflamatoria", role: "principal", why: "Infección ascendente del tracto genital superior." },
      { name: "Cervicitis por Chlamydia", role: "asociada", why: "Puerta de entrada." },
      { name: "Embarazo ectópico", role: "diferencial", why: "Se descarta siempre primero." },
      { name: "Apendicitis y torsión anexial", role: "diferencial", why: "Dolor pélvico agudo quirúrgico." },
      { name: "Absceso tuboovárico", role: "diferencial", why: "Complicación que cambia el manejo." },
    ],
    reasoning: [
      "Causa: Chlamydia trachomatis y Neisseria gonorrhoeae (más anaerobios y flora vaginal), transmitidas por vía sexual.",
      "Mecanismo: infectan el cuello y ascienden al endometrio, las trompas y el peritoneo pelviano, sobre todo tras la menstruación.",
      "Consecuencia: inflamación de las trompas (salpingitis) → dolor pélvico, fiebre, dolor a la movilización cervical. Las adherencias y la cicatrización de la mucosa tubaria dejan secuelas: infertilidad, embarazo ectópico y dolor pélvico crónico.",
      "Por eso se trata ante la sospecha clínica, sin esperar la confirmación.",
    ],
    epidemiology:
      "La EPI afecta sobre todo a mujeres de 15 a 25 años sexualmente activas, con parejas múltiples o nuevas y sin preservativo. La infección por Chlamydia es la ITS bacteriana más frecuente en jóvenes y suele ser asintomática. Después de un episodio de EPI, el riesgo de ectópico aumenta varias veces y el de infertilidad crece con cada episodio.",
    management: [
      "Sospechar ante dolor pelviano bajo con dolor a la movilización cervical, uterino o anexial en una mujer sexualmente activa, descartado el embarazo.",
      "Tratar empíricamente: ceftriaxona más doxiciclina más metronidazol por 14 días.",
      "Internar si hay embarazo, absceso, mal estado, intolerancia oral, falta de respuesta en 72 h o duda diagnóstica.",
      "Tratar a las parejas, testear otras ITS y notificar al SNVS.",
      "Consejería en prevención.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guía de diagnóstico y tratamiento de las infecciones de transmisión sexual.",
      "Sociedad Argentina de Infectología y SOGIBA — Recomendaciones de manejo de la enfermedad pelviana inflamatoria.",
    ],
    pearls: [
      "Dolor pélvico en mujer joven: primero test de embarazo.",
      "Dolor a la movilización cervical = criterio mínimo de EPI.",
      "Se trata con la sospecha, no con el cultivo.",
    ],
    pitfalls: ["Esperar la PCR para tratar.", "No tratar a las parejas.", "Usar solo azitromicina."],
  },
};
