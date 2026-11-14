import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const stevensJohnsonAlopurinol: ClinicalCase = {
  id: "necrolisis-epidermica-alopurinol",
  level: 4,
  area: "Dermatología",
  setting: "Guardia",
  patient: { age: 72, ageUnit: "años", sex: "M", context: "Gota. Empezó alopurinol 300 mg hace 4 semanas. Enfermedad renal crónica." },
  frequency: "raro",
  intro: "“Me salieron manchas que arden en todo el cuerpo, ampollas y llagas en la boca. Tengo fiebre y no puedo comer.”",
  vitals: { TA: "104/62 mmHg", FC: "112 lpm", FR: "20 rpm", "T°": "38,9 °C", "SatO₂": "96 %" },
  anamnesis: [
    act("farmaco", "¿Qué medicamento empezó en los últimos 2 meses?", "clave", "“Alopurinol hace un mes.”", "Fármaco de alto riesgo."),
    act("renal", "¿Cómo están sus riñones?", "clave", "“Tengo los riñones flojos.”", "Dosis no ajustada."),
    act("mucosas", "¿Llagas en boca, ojos o genitales?", "clave", "“Boca y ojos.”", "Compromiso mucoso."),
    act("prodromo", "¿Tuvo fiebre antes de las manchas?", "util", "“Dos días antes.”", "Pródromo."),
    act("otros", "¿Otros fármacos nuevos?", "util", "“No.”", "Culpable único."),
    act("nietos", "¿Quién lo acompaña?", "neutro", "“Mi hija.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel", "clave", "Máculas en diana atípicas confluentes con ampollas y desprendimiento en 35 % de la superficie; Nikolsky positivo.", "Necrólisis epidérmica tóxica."),
    act("mucosas-ex", "Mucosas", "clave", "Erosiones orales, conjuntivitis y erosiones genitales.", "Dos o más mucosas."),
    act("hemodinamia", "Hemodinamia", "util", "Taquicardia, hipotensión leve.", "Gravedad."),
  ],
  studies: [
    study("Otros", "biopsia", "Biopsia de piel", "clave", "Necrosis epidérmica de espesor total.", "Confirma."),
    study("Laboratorio", "lab", "Hemograma, urea, glucemia, bicarbonato (SCORTEN)", "clave", "Urea 80; glucemia 260; bicarbonato 19.", "SCORTEN 4: alta mortalidad."),
    study("Otros", "oftalmo", "Evaluación oftalmológica urgente", "util", "Queratoconjuntivitis.", "Prevenir secuelas."),
    study("Otros", "seguir-farmaco", "Continuar el alopurinol a mitad de dosis", "riesgoso", "No se hizo.", "Progresión."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ten", "Necrólisis epidérmica tóxica por alopurinol", true, "Fármaco de riesgo iniciado hace 4 semanas, desprendimiento mayor del 30 %, Nikolsky y dos mucosas."),
      dx("sjs", "Síndrome de Stevens-Johnson", false, "Afecta más del 30 % de la superficie."),
      dx("eritema-multiforme", "Eritema multiforme mayor", false, "Desprendimiento extenso por fármaco."),
      dx("ssss", "Síndrome de piel escaldada estafilocócica", false, "Mucosas comprometidas y adulto."),
      dx("dress", "Síndrome DRESS", false, "Predomina el desprendimiento epidérmico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("suspender", "Suspender el alopurinol de inmediato", "clave", "Mejora el pronóstico."),
      mg("quemados", "Traslado a unidad de quemados o terapia intensiva", "clave", "Cuidado como gran quemado."),
      mg("soporte", "Fluidos, nutrición, cuidado de heridas y control de temperatura", "clave", "Soporte."),
      mg("oftalmo-mg", "Cuidado ocular diario", "util", "Ceguera."),
      mg("atb-profilactico", "Antibióticos profilácticos", "riesgoso", "Resistencias; se tratan infecciones documentadas."),
      mg("reexponer", "Reintentar alopurinol a dosis baja después", "riesgoso", "Reacción más grave."),
    ],
  },
  debrief: {
    diagnosis: "Necrólisis epidérmica tóxica por alopurinol con SCORTEN alto, en varón de 72 años con enfermedad renal.",
    pathologies: [
      { name: "Necrólisis epidérmica tóxica", role: "principal", why: "Reacción cutánea grave a fármacos." },
      { name: "Insuficiencia renal y dosis alta", role: "asociada", why: "Factor de riesgo." },
      { name: "SJS, SSSS", role: "diferencial", why: "Espectro y otras ampollas." },
    ],
    reasoning: [
      "Causa: alopurinol en dosis no ajustada a la función renal.",
      "Mecanismo: linfocitos T citotóxicos que inducen apoptosis de queratinocitos.",
      "Consecuencia: desprendimiento epidérmico, sepsis y falla multiorgánica.",
    ],
    epidemiology:
      "El alopurinol es una de las principales causas de SJS/NET, sobre todo en las primeras 8 semanas y con insuficiencia renal. El HLA-B*58:01 aumenta el riesgo. La mortalidad de la NET supera el 30 %.",
    management: [
      "Suspender.",
      "Unidad especializada.",
      "Soporte.",
      "Ojos y mucosas.",
    ],
    sources: ["Sociedad Argentina de Dermatología — Reacciones cutáneas graves por fármacos.", "British Association of Dermatologists — Guidelines for SJS/TEN."],
    pearls: ["Alopurinol: empezar bajo y ajustar a la función renal.", "Mucosas más ampollas: urgencia.", "SCORTEN."],
    pitfalls: ["Seguir el fármaco.", "Reexponer."],
    tribunal: [
      qa("¿Cómo se distingue SJS de NET?", "SJS: menos del 10 % de superficie; NET: más del 30 %; entre ambos, superposición."),
      qa("¿Qué es el SCORTEN?", "Puntaje pronóstico con edad, cáncer, FC, superficie, urea, glucemia y bicarbonato."),
      qa("¿Qué fármacos lo causan con más frecuencia?", "Alopurinol, anticonvulsivantes aromáticos, lamotrigina, sulfonamidas y nevirapina."),
    ],
  },
};
