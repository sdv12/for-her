import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const monoxido: ClinicalCase = {
  id: "intoxicacion-monoxido-carbono",
  level: 4,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 38, ageUnit: "años", sex: "F", context: "Julio, 7 de la mañana, 2 °C. Llega con sus dos hijos." },
  frequency: "poco-frecuente",
  intro: "“Me desperté con un dolor de cabeza terrible y vomité. Los chicos también dicen que les duele la cabeza. Debe ser algo que comimos anoche.”",
  vitals: { TA: "118/74 mmHg", FC: "108 lpm", FR: "22 rpm", "T°": "36,6 °C", "SatO₂": "99 % (oxímetro de pulso)", Glasgow: "15" },
  anamnesis: [
    act("convivientes", "¿Alguien más de la casa tiene los mismos síntomas?", "clave", "“Sí, mis dos hijos, y el perro estaba raro, como dormido.”", "Varios convivientes (incluso mascotas) con síntomas al mismo tiempo apuntan a una fuente ambiental, no alimentaria."),
    act("calefaccion", "¿Cómo calefaccionan la casa? ¿Usaron brasero, estufa o el horno?", "clave", "“Tenemos una estufa a gas sin salida al exterior. Anoche cerramos todo por el frío.”", "Artefactos a gas mal ventilados o con mala combustión son la fuente típica de monóxido en invierno."),
    act("mejora", "¿Los síntomas mejoran cuando sale de la casa?", "clave", "“Ahora que estoy acá me siento un poco mejor.”", "Mejorar al alejarse de la fuente es muy sugestivo."),
    act("conciencia", "¿Alguien se desmayó o estuvo confundido?", "clave", "“Yo me mareé mucho al levantarme y casi me caigo.”", "La pérdida de conciencia es criterio de gravedad (y de oxigenoterapia hiperbárica)."),
    act("embarazo", "¿Puede estar embarazada?", "clave", "“No, me ligué las trompas.”", "En el embarazo la hemoglobina fetal capta más monóxido: es criterio de tratamiento más agresivo."),
    act("pecho", "¿Tiene dolor de pecho o palpitaciones?", "util", "“Palpitaciones, sí.”", "El monóxido puede dañar el miocardio; hay que buscar isquemia."),
    act("cena", "¿Qué cenaron anoche?", "neutro", "“Guiso.”", "Distrae: la intoxicación alimentaria no explicaría un patrón ligado a la casa y la calefacción."),
  ],
  exam: [
    act("neuro", "Examen neurológico y cognitivo", "clave", "Lúcida, algo lenta para responder; marcha inestable; sin foco motor.", "Las alteraciones neurológicas sutiles indican exposición importante y riesgo de secuelas tardías."),
    act("piel", "Piel y mucosas", "util", "Sin cianosis. Coloración normal.", "El color “rojo cereza” es raro y tardío; su ausencia no descarta la intoxicación."),
    act("cardio", "Auscultación cardíaca y pulmonar", "util", "Taquicardia regular, pulmones limpios.", "Descarta otras causas de los síntomas."),
    act("fondo", "Fondo de ojo", "innecesario", "Normal.", "No aporta a la conducta inmediata."),
    act("abdomen", "Palpación abdominal", "neutro", "Blando, indoloro.", "Hace menos probable una causa digestiva."),
  ],
  studies: [
    study("Laboratorio", "cohb", "Carboxihemoglobina (co-oximetría en sangre venosa o arterial)", "clave", "COHb 26 % (no fumadora).", "Confirma la intoxicación. El oxímetro de pulso común no distingue la carboxihemoglobina de la oxihemoglobina: por eso marcaba 99 %."),
    study("Laboratorio", "gases", "Gasometría con lactato", "util", "pH 7,32, lactato 3,1 mmol/l, pO₂ normal.", "La pO₂ es normal (el oxígeno disuelto no cambia); la acidosis láctica refleja hipoxia tisular."),
    study("Electrofisiología", "ecg", "Electrocardiograma y troponina", "clave", "Taquicardia sinusal, sin isquemia. Troponina normal.", "El monóxido puede producir isquemia miocárdica; se busca en todo intoxicado moderado o grave."),
    study("Laboratorio", "cohb-hijos", "Carboxihemoglobina a los hijos", "clave", "15 % y 18 %.", "Todos los expuestos deben evaluarse y tratarse, aunque tengan pocos síntomas."),
    study("Imágenes", "tc", "Tomografía de cerebro", "innecesario", "No se realizó.", "Con un cuadro explicado por la exposición y sin foco, no cambia la conducta inicial."),
    study("Microbiología", "coprocultivo", "Coprocultivo", "innecesario", "No se realizó.", "No hay diarrea ni cuadro alimentario."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("co", "Intoxicación por monóxido de carbono", true, "Cefalea, vómitos y mareos en varios convivientes en invierno, con estufa a gas sin tiraje, mejora al salir de la casa y COHb 26 %."),
      dx("alimentaria", "Intoxicación alimentaria", false, "Daría diarrea y dolor abdominal, sin relación con la calefacción ni mejoría al salir de la casa."),
      dx("migrana", "Migraña", false, "No explica que toda la familia (y la mascota) tenga síntomas a la vez."),
      dx("viral", "Gastroenteritis viral en la familia", false, "Puede afectar a varios, pero no da mareo con inestabilidad ni carboxihemoglobina alta."),
      dx("hsa", "Hemorragia subaracnoidea", false, "Cefalea súbita “la peor de la vida” en una sola persona; no explica el cuadro familiar."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("o2", "Oxígeno al 100 % con máscara con reservorio de inmediato, para ella y los hijos", "clave", "Acorta la vida media de la COHb de unas 5 horas (aire) a 60–90 minutos. Es el tratamiento principal y no se espera al resultado."),
      mg("hiperbarica", "Consultar a toxicología para evaluar cámara hiperbárica", "clave", "Pérdida de conciencia, alteración neurológica, COHb > 25 %, embarazo o isquemia son criterios para considerarla."),
      mg("notificar", "Notificación al SNVS y aviso para revisar la vivienda antes de volver", "clave", "La intoxicación por monóxido es de notificación obligatoria; si vuelven a la casa sin corregir la fuente, se repite."),
      mg("seguimiento", "Control neurológico a las semanas por síndrome neurológico tardío", "util", "Entre días y semanas después puede aparecer deterioro cognitivo, cambios de conducta o parkinsonismo."),
      mg("alta", "Alta con analgésicos e hidratación", "riesgoso", "Sin oxígeno y de vuelta en la casa, la intoxicación continúa y puede ser mortal para toda la familia."),
      mg("antiemeticos", "Solo antieméticos y dieta blanda por la “intoxicación alimentaria”", "riesgoso", "Trata un diagnóstico equivocado y deja expuesta a la familia."),
      mg("bicarbonato", "Bicarbonato endovenoso para la acidosis", "innecesario", "La acidosis láctica se corrige al mejorar la oxigenación tisular."),
    ],
  },
  debrief: {
    diagnosis: "Intoxicación por monóxido de carbono moderada a grave (COHb 26 %, síncope y alteración neurológica) por estufa a gas sin tiraje; convivientes también intoxicados.",
    pathologies: [
      { name: "Intoxicación por monóxido de carbono", role: "principal", why: "Exposición, síntomas compatibles y COHb elevada." },
      { name: "Síndrome neurológico tardío", role: "asociada", why: "Complicación que se busca en el seguimiento." },
      { name: "Intoxicación alimentaria", role: "diferencial", why: "El error diagnóstico más frecuente." },
      { name: "Gastroenteritis viral", role: "diferencial", why: "Otra causa de vómitos en varios convivientes." },
      { name: "Migraña", role: "diferencial", why: "Cefalea, pero individual." },
    ],
    reasoning: [
      "Causa: combustión incompleta de gas, leña o carbón en ambientes cerrados y sin ventilación (estufas sin tiraje, braseros, calefones, hornos usados para calefaccionar).",
      "Mecanismo: el monóxido se une a la hemoglobina con una afinidad unas 240 veces mayor que el oxígeno y forma carboxihemoglobina. Además desplaza la curva de disociación a la izquierda (la hemoglobina no libera el oxígeno a los tejidos) e inhibe la citocromo oxidasa mitocondrial.",
      "Consecuencia: hipoxia tisular con pO₂ normal, que afecta primero a los órganos de mayor consumo: cerebro (cefalea, mareos, confusión, síncope, coma) y corazón (taquicardia, isquemia, arritmias).",
      "El oxímetro de pulso lee la carboxihemoglobina como oxihemoglobina: la saturación aparece normal. Para medirla hace falta co-oximetría.",
    ],
    epidemiology:
      "Es la principal causa de intoxicación mortal por gases en la Argentina y se concentra en los meses fríos (mayo a septiembre). Afecta a personas de todas las edades, con mayor gravedad en niños, embarazadas, adultos mayores y personas con enfermedad cardiovascular. Suele haber varios afectados en el mismo hogar y se asocia con viviendas precarias y artefactos sin mantenimiento.",
    management: [
      "Sospecharla en invierno ante cefalea, vómitos o mareos en varios convivientes; retirar de la fuente.",
      "Oxígeno al 100 % de inmediato, sin esperar la COHb.",
      "Medir COHb por co-oximetría, ECG y troponina; evaluar la función neurológica.",
      "Cámara hiperbárica según criterios (pérdida de conciencia, déficit neurológico, COHb > 25 %, embarazo con > 15 %, isquemia), consultando a un centro toxicológico.",
      "Evaluar a todos los expuestos, notificar al SNVS, prevenir la reexposición (revisión de artefactos por un gasista matriculado, ventilación) y seguimiento neurológico.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guía de prevención, diagnóstico, tratamiento y vigilancia epidemiológica de las intoxicaciones por monóxido de carbono.",
      "Asociación Toxicológica Argentina — recomendaciones de manejo; Centro Nacional de Intoxicaciones (Hospital Posadas, 0800-333-0160).",
    ],
    pearls: [
      "Saturación de 99 % en un intoxicado con monóxido: el oxímetro miente.",
      "Varios convivientes con cefalea en invierno: pensá en monóxido.",
      "Oxígeno al 100 % primero, la confirmación después.",
    ],
    pitfalls: ["Diagnosticar intoxicación alimentaria.", "Confiarse de la saturación del oxímetro de pulso.", "Dar el alta sin asegurar que la fuente se corrigió."],
  },
};
