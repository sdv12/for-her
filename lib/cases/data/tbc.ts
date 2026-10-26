import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const tbc: ClinicalCase = {
  id: "tuberculosis-pulmonar",
  level: 3,
  area: "Salud comunitaria",
  setting: "CAPS",
  patient: { age: 22, ageUnit: "años", sex: "M", context: "Trabaja en un taller textil. Vive con siete personas en dos ambientes." },
  frequency: "frecuente",
  intro: "“Tengo tos hace como dos meses, no se me va con nada. Bajé de peso y a la noche me despierto todo mojado.”",
  vitals: { TA: "110/70 mmHg", FC: "96 lpm", FR: "20 rpm", "T°": "37,8 °C", "SatO₂": "96 %", Peso: "54 kg (antes 61 kg)" },
  anamnesis: [
    act("tos", "¿Cómo es la tos? ¿Escupe? ¿Vio sangre?", "clave", "“Con catarro amarillento. La semana pasada escupí con hilitos de sangre.”", "Tos de más de 2 semanas = sintomático respiratorio: obliga a pedir baciloscopías. La hemoptisis suma sospecha."),
    act("constitucionales", "¿Bajó de peso, tiene fiebre a la tarde o sudores de noche?", "clave", "“Bajé siete kilos. A la tarde me siento afiebrado y a la noche transpiro mucho.”", "Síndrome de impregnación bacilar: fiebre vespertina, sudoración nocturna, astenia y pérdida de peso."),
    act("contactos", "¿Alguien en su casa o trabajo tiene tos o tuvo tuberculosis?", "clave", "“Un compañero del taller estuvo internado por tuberculosis el año pasado.”", "El contacto con un caso bacilífero es el principal factor de riesgo de infección."),
    act("vih", "¿Se hizo alguna vez el test de VIH?", "clave", "“Nunca.”", "Toda persona con tuberculosis debe testearse para VIH: cambia el pronóstico y el tratamiento."),
    act("tratamientos", "¿Tomó antes tratamiento para la tuberculosis?", "clave", "“No.”", "Un tratamiento previo (sobre todo abandonado) aumenta el riesgo de resistencia y obliga a pedir pruebas de sensibilidad."),
    act("habitos", "¿Fuma, toma alcohol o consume drogas?", "util", "“Fumo, y los fines de semana tomo.”", "Alcohol, tabaco y consumo de sustancias aumentan el riesgo y la probabilidad de abandono."),
    act("vivienda", "¿Cómo es su casa? ¿Cuántos duermen en la misma habitación?", "util", "“Dormimos cuatro en la misma pieza, sin ventana.”", "El hacinamiento y la mala ventilación favorecen la transmisión: define el estudio de contactos."),
    act("musica", "¿Qué música escucha?", "neutro", "“Cumbia.”", "No orienta."),
  ],
  exam: [
    act("pulmonar", "Auscultación pulmonar", "clave", "Rales crepitantes en el vértice derecho, con soplo anfórico.", "Lesión en el lóbulo superior; el soplo anfórico sugiere una cavidad."),
    act("ganglios", "Palpación de ganglios", "util", "Adenopatía cervical derecha pequeña, no adherida.", "La tuberculosis ganglionar es la forma extrapulmonar más frecuente."),
    act("nutricion", "Estado nutricional", "clave", "Adelgazado, IMC 18,6.", "La desnutrición es causa y consecuencia de la tuberculosis; se aborda en el tratamiento."),
    act("piel", "Piel y mucosas", "util", "Sin lesiones; sin muguet.", "La candidiasis oral orientaría a inmunosupresión (VIH)."),
    act("reflejos", "Reflejos osteotendinosos", "neutro", "Normales.", "No aporta."),
  ],
  studies: [
    study("Microbiología", "bk", "Baciloscopías de esputo seriadas (2 muestras) con cultivo", "clave", "Baciloscopía positiva (++) en ambas muestras. Cultivo en curso.", "El examen directo de esputo detecta a los bacilíferos (los que contagian) y es la base del diagnóstico en el primer nivel."),
    study("Microbiología", "xpert", "Prueba molecular rápida (GeneXpert MTB/RIF)", "util", "M. tuberculosis detectado; sin resistencia a rifampicina.", "Confirma en horas y detecta resistencia a rifampicina; se prioriza en VIH, contactos de resistentes y retratamientos."),
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Infiltrado en el lóbulo superior derecho con una cavidad de 3 cm.", "Cavitación apical: patrón típico de tuberculosis posprimaria."),
    study("Laboratorio", "vih", "Test de VIH", "clave", "No reactivo.", "Se ofrece a toda persona con tuberculosis."),
    study("Laboratorio", "hepatograma", "Hepatograma basal", "util", "Normal.", "Las drogas de primera línea son hepatotóxicas: sirve de referencia."),
    study("Otros", "ppd", "Prueba de tuberculina (PPD)", "innecesario", "No se realizó.", "Detecta infección, no enfermedad: con baciloscopía positiva no agrega nada."),
    study("Imágenes", "tc", "Tomografía de tórax", "innecesario", "No se realizó.", "No cambia la conducta con el diagnóstico bacteriológico confirmado."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tbc", "Tuberculosis pulmonar bacilífera, caso nuevo", true, "Tos prolongada, síndrome de impregnación, cavidad apical y baciloscopías positivas, sin tratamiento previo."),
      dx("nac", "Neumonía bacteriana", false, "Es aguda (días), con fiebre alta; no da dos meses de tos con pérdida de peso ni cavidad apical con BAAR."),
      dx("cancer", "Cáncer de pulmón", false, "Posible en fumadores mayores; con 22 años y BAAR positivos, no es lo más probable."),
      dx("absceso", "Absceso pulmonar", false, "Cavidad con nivel hidroaéreo, esputo pútrido, en general por aspiración; no hay BAAR."),
      dx("paracoco", "Paracoccidioidomicosis", false, "Micosis endémica de zonas rurales del noreste argentino, con lesiones mucosas; posible diferencial, pero los BAAR confirman tuberculosis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hrze", "Tratamiento con isoniacida, rifampicina, pirazinamida y etambutol 2 meses, luego isoniacida y rifampicina 4 meses", "clave", "Esquema estándar para casos nuevos: la fase intensiva baja rápido la carga bacilar y la de continuación esteriliza."),
      mg("tdo", "Tratamiento directamente observado (TDO) con seguimiento en el centro de salud", "clave", "Asegura la adherencia y previene el abandono y la resistencia."),
      mg("notificar", "Notificación obligatoria al Sistema Nacional de Vigilancia de la Salud (SNVS)", "clave", "La tuberculosis es de notificación obligatoria: dispara el estudio de contactos."),
      mg("contactos", "Estudio de contactos convivientes y laborales", "clave", "Busca enfermos y personas infectadas para tratar o prevenir (prioridad: menores de 5 años y personas con VIH)."),
      mg("control", "Baciloscopía de control al 2.º mes y al final del tratamiento", "util", "Verifica la respuesta (negativización)."),
      mg("monoterapia", "Isoniacida sola mientras llega el cultivo", "riesgoso", "La monoterapia de una tuberculosis activa selecciona resistencia."),
      mg("aislamiento", "Internación obligatoria hasta terminar el tratamiento", "innecesario", "La mayoría se trata en forma ambulatoria; se interna solo por gravedad o problemas sociales graves. Los contagios bajan rápido con el tratamiento."),
    ],
  },
  debrief: {
    diagnosis: "Tuberculosis pulmonar cavitada, bacilífera, caso nuevo, sensible a rifampicina, en varón de 22 años con hacinamiento.",
    pathologies: [
      { name: "Tuberculosis pulmonar", role: "principal", why: "Clínica, radiografía y baciloscopías positivas." },
      { name: "Desnutrición", role: "asociada", why: "Pérdida de peso con IMC bajo: empeora el pronóstico." },
      { name: "Neumonía bacteriana", role: "diferencial", why: "Cuadro agudo sin BAAR." },
      { name: "Cáncer de pulmón", role: "diferencial", why: "Considerar en fumadores mayores con cavidad." },
      { name: "Micosis endémicas (paracoccidioidomicosis, histoplasmosis)", role: "diferencial", why: "Cuadros crónicos con lesiones pulmonares en zonas endémicas." },
    ],
    reasoning: [
      "Causa: Mycobacterium tuberculosis, que se transmite por aire en gotitas que expulsa un enfermo bacilífero al toser. El hacinamiento y la mala ventilación facilitan el contagio.",
      "Mecanismo: el bacilo llega al alvéolo y es fagocitado; la inmunidad celular (Th1, interferón gamma) forma granulomas con necrosis caseosa que lo contienen (infección latente). Si la inmunidad falla, se reactiva sobre todo en los vértices, donde hay más oxígeno.",
      "Consecuencia: la necrosis caseosa se licúa y drena por un bronquio dejando una cavidad llena de bacilos → tos, hemoptisis y mucho contagio. Las citoquinas (TNF) dan fiebre, sudoración y pérdida de peso.",
      "Por eso el centro del control es diagnosticar y tratar rápido a los bacilíferos, y estudiar a sus contactos.",
    ],
    epidemiology:
      "En la Argentina se notifican más de 12.000 casos por año y la tasa viene en aumento, con mayor carga en el AMBA, el NOA y el NEA. Afecta más a adultos jóvenes de 15 a 44 años y a varones, y se asocia con pobreza, hacinamiento, VIH, diabetes, consumo de sustancias y privación de libertad. Es una enfermedad prevenible y curable que sigue siendo un problema de salud pública.",
    management: [
      "Sintomático respiratorio (tos de más de 2 semanas): pedir 2 baciloscopías de esputo con cultivo, y prueba molecular cuando esté disponible.",
      "Radiografía de tórax, test de VIH y hepatograma basal.",
      "Tratamiento de casos nuevos: 2HRZE/4HR, con dosis fijas combinadas y tratamiento directamente observado. Las drogas las provee gratuitamente el Programa Nacional.",
      "Notificación obligatoria al SNVS y estudio de contactos (tratamiento preventivo con isoniacida u otros esquemas en infectados, priorizando niños y personas con VIH).",
      "Baciloscopías de control, seguimiento de adherencia y efectos adversos (hepatitis, neuritis óptica, neuropatía).",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guía práctica para el diagnóstico y tratamiento de las personas con tuberculosis en el primer nivel de atención.",
      "Programa Nacional de Control de la Tuberculosis y Lepra — Boletín epidemiológico de tuberculosis.",
      "Ley 15.465 de notificación obligatoria y normas del Sistema Nacional de Vigilancia de la Salud.",
    ],
    pearls: [
      "Tos de más de 15 días = sintomático respiratorio: pedir baciloscopías.",
      "Etambutol: neuritis óptica. Isoniacida: neuropatía (dar piridoxina en riesgo). Rifampicina: orina naranja e interacciones.",
      "Todo paciente con tuberculosis se testea para VIH.",
    ],
    pitfalls: ["Tratar con antibióticos comunes una tos de dos meses sin pedir baciloscopías.", "Olvidar notificar y estudiar a los contactos.", "Usar monoterapia."],
  },
};
