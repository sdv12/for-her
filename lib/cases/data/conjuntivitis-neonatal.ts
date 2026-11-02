import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const conjuntivitisNeonatal: ClinicalCase = {
  id: "conjuntivitis-neonatal-clamidia",
  level: 2,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 9, ageUnit: "días", sex: "F", context: "Parto vaginal. La madre tuvo pocos controles y flujo en el embarazo que no trató." },
  frequency: "poco-frecuente",
  intro: "“Desde hace dos días tiene los ojos hinchados con mucha lagaña amarillenta, se le pegan los párpados.” (relata la madre)",
  vitals: { FC: "142 lpm", FR: "44 rpm", "T°": "36,9 °C", "SatO₂": "98 %", Peso: "3,3 kg" },
  anamnesis: [
    act("inicio", "¿A los cuántos días de nacer empezó?", "clave", "“A la semana.”", "Entre los 5 y 14 días: típico de Chlamydia; el gonococo suele empezar a los 2–5 días."),
    act("madre", "¿Tuviste flujo o infecciones en el embarazo? ¿Te hicieron estudios?", "clave", "“Tuve flujo, no me lo trataron.”", "Infección materna no tratada: transmisión durante el parto."),
    act("tos", "¿Tiene tos, respira rápido o le cuesta tomar?", "clave", "“Toma bien, no tose.”", "La clamidia puede dar neumonía a las semanas."),
    act("profilaxis", "¿Le pusieron gotas en los ojos al nacer?", "util", "“Creo que sí.”", "La profilaxis ocular previene sobre todo la gonocócica; es menos eficaz para clamidia."),
    act("pareja", "¿Tu pareja tiene síntomas?", "util", "“No sé.”", "Hay que tratar a los padres."),
    act("nombre", "¿Cómo se llama?", "neutro", "“Emma.”", "No orienta."),
  ],
  exam: [
    act("ojos", "Examen ocular", "clave", "Edema palpebral, secreción mucopurulenta bilateral, conjuntiva hiperémica; córnea transparente.", "Conjuntivitis neonatal sin compromiso corneal."),
    act("general", "Estado general y fontanela", "clave", "Activa, buen tono, fontanela normal.", "Sin signos de sepsis."),
    act("pulmon", "Auscultación pulmonar", "util", "Normal.", "Sin neumonía por ahora."),
  ],
  studies: [
    study("Microbiología", "pcr", "Hisopado conjuntival para PCR de Chlamydia y gonococo, Gram y cultivo", "clave", "PCR positiva para Chlamydia trachomatis; Gram sin diplococos.", "Confirma el agente."),
    study("Laboratorio", "madre", "Estudiar a la madre y su pareja (PCR, VDRL, VIH)", "clave", "Madre con Chlamydia positiva.", "Tratar a los padres evita reinfecciones."),
    study("Imágenes", "rx", "Radiografía de tórax de rutina", "innecesario", "No se realizó.", "Sin síntomas respiratorios."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("clamidia", "Conjuntivitis neonatal por Chlamydia trachomatis", true, "Conjuntivitis mucopurulenta a los 9 días en hija de madre con flujo no tratado, con PCR positiva."),
      dx("gonococo", "Oftalmía gonocócica", false, "Suele empezar antes (2–5 días), es muy purulenta y el Gram mostraría diplococos."),
      dx("quimica", "Conjuntivitis química por la profilaxis", false, "Aparece en las primeras 24–48 h."),
      dx("lagrimal", "Obstrucción del conducto lagrimal", false, "Da lagrimeo y secreción sin conjuntiva roja ni edema."),
      dx("viral", "Conjuntivitis viral", false, "PCR positiva para clamidia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("azitro", "Azitromicina oral por 3 días (o eritromicina 14 días)", "clave", "Tratamiento sistémico: trata la conjuntivitis y previene la neumonía."),
      mg("padres", "Tratar a la madre y su pareja", "clave", "Evita la reinfección y las complicaciones maternas."),
      mg("seguimiento", "Control por tos o dificultad respiratoria en las próximas semanas", "util", "Puede aparecer neumonía afebril."),
      mg("higiene", "Limpieza de la secreción con solución fisiológica", "util", "Alivio."),
      mg("topico-solo", "Solo colirio antibiótico", "riesgoso", "No erradica la colonización nasofaríngea ni previene la neumonía."),
      mg("internar", "Internación y ceftriaxona", "innecesario", "Es para la oftalmía gonocócica."),
    ],
  },
  debrief: {
    diagnosis: "Conjuntivitis neonatal por Chlamydia trachomatis a los 9 días de vida, adquirida en el canal de parto, en hija de madre con infección no tratada.",
    pathologies: [
      { name: "Conjuntivitis neonatal por Chlamydia", role: "principal", why: "PCR positiva." },
      { name: "Infección materna por Chlamydia", role: "asociada", why: "Fuente." },
      { name: "Oftalmía gonocócica, química, obstrucción lagrimal", role: "diferencial", why: "Otras causas de ojo rojo neonatal." },
    ],
    reasoning: [
      "Causa: Chlamydia trachomatis del cuello uterino materno.",
      "Mecanismo: contagio durante el parto vaginal, con colonización de conjuntiva y nasofaringe.",
      "Consecuencia: conjuntivitis entre los 5 y 14 días y, a veces, neumonía afebril entre las 4 y 12 semanas.",
    ],
    epidemiology:
      "La clamidia es una de las ITS más frecuentes en mujeres jóvenes y muchas veces es asintomática. Es la causa infecciosa más común de conjuntivitis neonatal. El control prenatal con rastreo y tratamiento de ITS la previene.",
    management: [
      "Todo ojo rojo con secreción en el primer mes: hisopado y Gram.",
      "Clamidia: macrólido sistémico.",
      "Gonococo: ceftriaxona e internación.",
      "Tratar a los padres y rastrear otras ITS.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Recomendaciones sobre conjuntivitis neonatal.", "Ministerio de Salud de la Nación — Guía de ITS en el embarazo."],
    pearls: ["2–5 días: gonococo; 5–14 días: clamidia.", "Tratamiento sistémico.", "Tratar a los padres."],
    pitfalls: ["Solo colirio.", "Olvidar a los padres."],
    tribunal: [
      qa("¿Por qué la oftalmía gonocócica es una urgencia?", "Porque puede perforar la córnea en horas y producir ceguera; requiere ceftriaxona, internación, lavados oculares y evaluación de infección diseminada."),
      qa("¿Qué es la profilaxis ocular neonatal?", "La aplicación de un antibiótico tópico (eritromicina o similar) en los ojos al nacer, obligatoria en Argentina, para prevenir la oftalmía gonocócica."),
      qa("¿Qué es la neumonía afebril del lactante?", "Una neumonía por Chlamydia entre las 4 y 12 semanas de vida, sin fiebre, con tos en staccato, taquipnea, a veces eosinofilia e infiltrados intersticiales; se trata con macrólidos."),
    ],
  },
};
