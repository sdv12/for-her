import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const glomerulonefritis: ClinicalCase = {
  id: "glomerulonefritis-posestreptococica",
  level: 2,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 7, ageUnit: "años", sex: "M", context: "Lo trae la mamá. Octubre." },
  frequency: "frecuente",
  intro: "“Hace dos días se levanta con los ojos hinchados y hoy hizo pis como coca-cola. Hace poquito, y le duele la cabeza.”",
  vitals: { TA: "132/88 mmHg", FC: "96 lpm", FR: "22 rpm", "T°": "36,8 °C", Peso: "26 kg (hace un mes: 24,5 kg)" },
  anamnesis: [
    act("infeccion", "¿Tuvo anginas o lesiones con costra en la piel en las últimas semanas?", "clave", "“Hace dos semanas tuvo anginas con fiebre, se le pasó solo, no fuimos al médico.”", "La glomerulonefritis posestreptocócica aparece 1–3 semanas después de una faringitis (o 3–6 después de un impétigo): el período de latencia es clave."),
    act("orina", "¿Cómo es la orina y cuánto orina?", "clave", "“Oscura, como coca, y muy poquito.”", "Hematuria macroscópica de origen glomerular (color té o coca) y oliguria."),
    act("cefalea", "¿El dolor de cabeza es fuerte? ¿Ve borroso, vomitó o convulsionó?", "clave", "“Le duele bastante. No vomitó ni ve mal.”", "La cefalea con hipertensión puede preceder a la encefalopatía hipertensiva (convulsiones, alteración visual)."),
    act("disnea", "¿Le cuesta respirar acostado o tose?", "clave", "“No.”", "La sobrecarga de volumen puede causar edema pulmonar e insuficiencia cardíaca."),
    act("previos", "¿Tuvo sangre en la orina antes?", "util", "“No, nunca.”", "Episodios repetidos de hematuria coincidiendo con infecciones orientarían a nefropatía por IgA."),
    act("articular", "¿Tuvo dolor de articulaciones, manchas en las piernas o dolor de panza?", "util", "“No.”", "Orientaría a púrpura de Schönlein-Henoch (vasculitis por IgA)."),
    act("familia", "¿Hay enfermedades de los riñones o sordera en la familia?", "util", "“No.”", "Hematuria familiar con sordera: síndrome de Alport."),
    act("contactos", "¿Alguien más de la casa tuvo anginas?", "util", "“La hermana también.”", "Los contactos pueden portar la misma cepa nefritogénica."),
    act("juego", "¿Qué le gusta jugar?", "neutro", "“A la pelota.”", "No orienta."),
  ],
  exam: [
    act("edemas", "Edemas", "clave", "Edema palpebral y leve edema pretibial.", "Edemas por retención de sodio y agua (menos marcados que en el síndrome nefrótico)."),
    act("ta", "Presión arterial repetida con manguito adecuado", "clave", "130/88 mmHg: por encima del percentil 99 para su edad y talla.", "Hipertensión por sobrecarga de volumen."),
    act("pulmonar", "Auscultación pulmonar y cardíaca", "util", "Sin crepitantes; ritmo regular sin galope.", "Descarta congestión pulmonar."),
    act("fauces", "Fauces y piel", "util", "Fauces sin exudado; sin lesiones de impétigo.", "La infección ya se resolvió."),
    act("neuro", "Examen neurológico", "util", "Normal.", "Descarta encefalopatía hipertensiva."),
  ],
  studies: [
    study("Laboratorio", "orina", "Orina completa con sedimento", "clave", "Hematíes incontables dismórficos, cilindros hemáticos, proteínas ++.", "Los cilindros hemáticos y los hematíes dismórficos confirman el origen glomerular."),
    study("Laboratorio", "complemento", "Complemento C3 y C4", "clave", "C3 bajo, C4 normal.", "El C3 bajo transitorio (normaliza en 6–8 semanas) es característico de la glomerulonefritis posinfecciosa."),
    study("Laboratorio", "asto", "Antiestreptolisina O (ASTO)", "util", "Elevada.", "Evidencia de infección estreptocócica reciente (en el impétigo es más útil la anti-DNasa B)."),
    study("Laboratorio", "renal", "Urea, creatinina, ionograma y proteinuria/creatinina", "clave", "Creatinina 0,9 mg/dl (elevada para la edad), K 5,2; índice proteína/creatinina 0,8.", "Evalúa la función renal, el potasio y la proteinuria (no nefrótica)."),
    study("Imágenes", "eco", "Ecografía renal", "neutro", "Riñones de tamaño normal, ecogenicidad levemente aumentada.", "No es imprescindible en el cuadro típico."),
    study("Otros", "biopsia", "Biopsia renal de entrada", "innecesario", "No se realizó.", "Solo si el C3 no se normaliza a las 8 semanas, hay síndrome nefrótico persistente o insuficiencia renal progresiva."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("gnpe", "Síndrome nefrítico por glomerulonefritis posestreptocócica", true, "Hematuria glomerular, edemas, hipertensión y oliguria 2 semanas después de una faringitis, con C3 bajo y ASTO alta."),
      dx("nefrotico", "Síndrome nefrótico", false, "Daría proteinuria masiva con hipoalbuminemia y edemas importantes, sin hematuria ni hipertensión típicas."),
      dx("iga", "Nefropatía por IgA", false, "Hematuria macroscópica en simultáneo con la infección (1–2 días), no a las 2 semanas, con C3 normal."),
      dx("henoch", "Púrpura de Schönlein-Henoch", false, "Púrpura palpable en piernas, artralgias y dolor abdominal, con C3 normal."),
      dx("itu", "Infección urinaria", false, "Daría disuria, fiebre y leucocituria, no cilindros hemáticos ni hipertensión."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("restriccion", "Restricción de sodio y de líquidos (según la diuresis)", "clave", "Corrige la sobrecarga de volumen, causa de los edemas y la hipertensión."),
      mg("furosemida", "Furosemida y, si hace falta, un antihipertensivo", "clave", "Trata la sobrecarga y la hipertensión; previene la encefalopatía hipertensiva y el edema pulmonar."),
      mg("internacion", "Internación para control de presión, diuresis, peso y potasio", "clave", "Oliguria con hipertensión y potasio en el límite: requiere control estrecho."),
      mg("atb", "Penicilina para erradicar el estreptococo (y estudiar a los contactos sintomáticos)", "util", "No cambia la evolución de la nefritis, pero elimina la cepa nefritogénica."),
      mg("seguimiento", "Control de C3 a las 8 semanas y de la hematuria microscópica por meses", "util", "Si el C3 no se normaliza, se replantea el diagnóstico."),
      mg("hidratacion", "Hidratación abundante para “limpiar los riñones”", "riesgoso", "Empeora la sobrecarga: edema pulmonar e hipertensión."),
      mg("corticoides", "Corticoides", "innecesario", "No tienen beneficio en la glomerulonefritis posestreptocócica típica."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome nefrítico agudo por glomerulonefritis posestreptocócica, con hipertensión, oliguria y leve deterioro de la función renal, en niño de 7 años.",
    pathologies: [
      { name: "Glomerulonefritis posestreptocócica", role: "principal", why: "Nefritis por inmunocomplejos tras faringitis estreptocócica." },
      { name: "Encefalopatía hipertensiva y edema pulmonar", role: "diferencial", why: "Complicaciones a prevenir." },
      { name: "Nefropatía por IgA y púrpura de Schönlein-Henoch", role: "diferencial", why: "Otras causas de hematuria glomerular en niños." },
      { name: "Síndrome nefrótico", role: "diferencial", why: "El otro gran síndrome glomerular." },
    ],
    reasoning: [
      "Causa: infección faríngea o cutánea por cepas nefritogénicas del estreptococo betahemolítico del grupo A.",
      "Mecanismo: se forman inmunocomplejos (o se depositan antígenos estreptocócicos en el glomérulo) que activan el complemento por la vía alternativa (consumo de C3) e inflaman los capilares glomerulares.",
      "Consecuencia: cae el filtrado (oliguria, retención de sodio y agua: edemas e hipertensión) y se dañan los capilares (hematuria con cilindros hemáticos, proteinuria moderada).",
      "Por eso la latencia de 1–3 semanas y el C3 bajo transitorio son la firma diagnóstica.",
    ],
    epidemiology:
      "Es la causa más frecuente de síndrome nefrítico en la infancia. Afecta sobre todo a niños de 5 a 12 años, con predominio en varones (2:1), y es más frecuente en contextos de hacinamiento y en otoño-invierno (faringitis) o verano (impétigo). La mayoría se recupera por completo.",
    management: [
      "Sospechar ante hematuria, edemas e hipertensión tras una infección estreptocócica.",
      "Orina con sedimento, C3 y C4, ASTO o anti-DNasa B, función renal y potasio.",
      "Restricción de sodio y líquidos, furosemida y antihipertensivos según la presión.",
      "Internación si hay hipertensión significativa, oliguria, hiperpotasemia o insuficiencia renal.",
      "Seguimiento del C3 y de la hematuria; biopsia solo si la evolución es atípica.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Comité de Nefrología: recomendaciones sobre síndrome nefrítico.", "Sociedad Argentina de Nefrología — Glomerulopatías."],
    pearls: ["Hematuria tipo coca-cola + edemas + HTA 2 semanas después de anginas: GNPE.", "C3 bajo que normaliza en 8 semanas.", "Nefrítico: restringir líquidos, no hidratar."],
    pitfalls: ["Hidratar de más.", "Biopsiar de entrada.", "No tomar la presión con el manguito adecuado."],
    tribunal: [
      qa("¿Qué define al síndrome nefrítico?", "Hematuria glomerular (con cilindros hemáticos), hipertensión, edemas, oliguria con algún grado de insuficiencia renal y proteinuria en general no nefrótica."),
      qa("¿Qué glomerulonefritis cursan con complemento bajo?", "La posinfecciosa (transitoria), la membranoproliferativa, la lúpica, la asociada a crioglobulinemia y la de la endocarditis."),
      qa("¿Qué diferencias hay entre las complicaciones no supurativas del estreptococo?", "La fiebre reumática ocurre solo tras faringitis y se previene con el tratamiento antibiótico; la glomerulonefritis puede seguir a faringitis o impétigo y el antibiótico no la previene."),
      qa("¿Cuál es el pronóstico de la glomerulonefritis posestreptocócica en niños?", "Muy bueno: la diuresis se recupera en 1–2 semanas, la hematuria macroscópica cede en semanas, la microscópica puede durar hasta un año y el C3 se normaliza en 6–8 semanas."),
    ],
  },
};
