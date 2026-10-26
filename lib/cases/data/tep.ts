import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const tep: ClinicalCase = {
  id: "tromboembolismo-pulmonar",
  level: 4,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 36, ageUnit: "años", sex: "F", context: "Volvió hace cuatro días de un viaje en micro de 20 horas." },
  frequency: "poco-frecuente",
  intro: "“Desde ayer me falta el aire cuando subo la escalera y hoy me agarró un puntazo del lado derecho al respirar hondo. Pensé que era un músculo.”",
  vitals: { TA: "122/78 mmHg", FC: "112 lpm", FR: "24 rpm", "T°": "37,4 °C", "SatO₂": "92 % (aire ambiente)" },
  anamnesis: [
    act("acos", "¿Toma anticonceptivos u otras hormonas?", "clave", "“Sí, anticonceptivos combinados desde hace años.”", "Los estrógenos aumentan los factores de coagulación: son un factor de riesgo trombótico, sumado a la inmovilidad del viaje."),
    act("piernas", "¿Tiene dolor o hinchazón en alguna pierna?", "clave", "“La pantorrilla izquierda me tira desde el viaje. Pensé que era por estar sentada.”", "La trombosis venosa profunda de miembros inferiores es la fuente de la mayoría de los TEP."),
    act("tabaco", "¿Fuma?", "clave", "“Sí, unos diez por día.”", "Tabaco más anticonceptivos combinados aumenta el riesgo trombótico; además, en mayores de 35 años fumadoras los combinados están contraindicados."),
    act("hemoptisis", "¿Tuvo tos con sangre o se desmayó?", "util", "“Tosí un poco con sangre esta mañana. No me desmayé.”", "La hemoptisis sugiere infarto pulmonar; el síncope sugeriría TEP masivo."),
    act("previos", "¿Tuvo trombosis antes o alguien en su familia?", "util", "“Mi mamá tuvo una trombosis en el embarazo.”", "Antecedentes familiares: pensar en trombofilia hereditaria."),
    act("infeccion", "¿Tuvo fiebre alta, catarro o resfrío?", "util", "“Nada, solo algo de temperatura hoy.”", "Febrícula puede haber en el TEP; fiebre alta con catarro orientaría a neumonía."),
    act("viaje", "¿Adónde viajó?", "neutro", "“A visitar a mi hermana en Jujuy.”", "El destino no importa; sí la inmovilidad prolongada."),
  ],
  exam: [
    act("piernas", "Examen de miembros inferiores", "clave", "Pantorrilla izquierda 3 cm más gruesa que la derecha, dolorosa a la palpación del trayecto venoso, con edema con fóvea.", "Signos de trombosis venosa profunda: suman puntos en el score de Wells."),
    act("pulmonar", "Auscultación pulmonar", "util", "Roce pleural en base derecha; sin rales ni sibilancias.", "Un examen pulmonar casi normal con hipoxemia y taquicardia orienta a TEP."),
    act("cardio", "Auscultación cardíaca e ingurgitación yugular", "clave", "Taquicardia regular; segundo ruido pulmonar reforzado; sin ingurgitación yugular.", "Busca sobrecarga del ventrículo derecho (signos de gravedad)."),
    act("perfusion", "Perfusión periférica", "clave", "Normal; sin hipotensión.", "Sin shock ni hipotensión: TEP no de alto riesgo."),
    act("piel", "Piel", "neutro", "Normal.", "No aporta."),
  ],
  studies: [
    study("Otros", "wells", "Calcular la probabilidad clínica (score de Wells)", "clave", "Signos de TVP (3) + TEP como diagnóstico más probable (3) + FC > 100 (1,5) + hemoptisis (1) = 8,5: probabilidad alta.", "Con probabilidad alta se va directo a la imagen; el dímero D solo sirve para descartar cuando la probabilidad es baja o intermedia."),
    study("Imágenes", "angiotc", "Angiotomografía de tórax", "clave", "Defectos de relleno en la arteria pulmonar derecha (rama lobar inferior) y segmentarias. Relación VD/VI 1,1.", "Confirma el TEP; la relación VD/VI ≥ 1 indica sobrecarga del ventrículo derecho."),
    study("Laboratorio", "troponina", "Troponina y BNP", "util", "Troponina levemente elevada; BNP elevado.", "Marcadores de daño y sobrecarga del VD: junto con la imagen definen riesgo intermedio-alto."),
    study("Imágenes", "eco-doppler", "Ecografía doppler venosa de miembros inferiores", "util", "Trombosis de la vena poplítea izquierda.", "Confirma la fuente; en pacientes que no pueden recibir contraste, una TVP confirmada con síntomas de TEP permite tratar."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Taquicardia sinusal; S1Q3T3; inversión de T de V1 a V3.", "Suele mostrar solo taquicardia; los patrones de sobrecarga derecha son poco sensibles pero orientan."),
    study("Laboratorio", "dimero", "Dímero D", "innecesario", "Elevado.", "Con probabilidad clínica alta un dímero negativo no descartaría el TEP: no cambia la conducta."),
    study("Laboratorio", "trombofilia", "Estudio de trombofilia en la guardia", "innecesario", "No se realizó.", "No se hace en la fase aguda ni con anticoagulación (los resultados se alteran); se decide más adelante."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tep", "Tromboembolismo pulmonar de riesgo intermedio-alto secundario a TVP", true, "Factores de riesgo (anticonceptivos, viaje largo, tabaco), TVP clínica, disnea, dolor pleurítico, hipoxemia y taquicardia; la angiotomografía lo confirma y hay sobrecarga del VD sin hipotensión."),
      dx("nac", "Neumonía", false, "Daría fiebre alta, esputo y consolidación; acá el pulmón casi no tiene hallazgos y la hipoxemia es desproporcionada."),
      dx("neumotorax", "Neumotórax", false, "Dolor súbito con hipoventilación y timpanismo unilateral; se vería en la radiografía."),
      dx("pericarditis", "Pericarditis", false, "Dolor precordial que mejora al inclinarse hacia adelante, frote pericárdico y supradesnivel difuso del ST."),
      dx("ansiedad", "Crisis de ansiedad", false, "Nunca explica una saturación de 92 %: es un diagnóstico de exclusión y acá hay otra causa demostrada."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("anticoag", "Anticoagulación inmediata (heparina de bajo peso molecular o heparina sódica)", "clave", "Detiene la progresión del trombo y previene nuevos émbolos; con sospecha alta se empieza incluso antes de la confirmación."),
      mg("monitoreo", "Internación con monitoreo (riesgo intermedio-alto)", "clave", "Puede descompensarse en las primeras horas; si aparece hipotensión, se indica trombólisis de rescate."),
      mg("acos", "Suspender los anticonceptivos combinados y asesorar en métodos sin estrógenos", "clave", "El estrógeno sostiene el riesgo; se puede usar DIU o métodos solo con progestágeno."),
      mg("larga", "Anticoagulación oral por al menos 3 meses al alta", "util", "En un TEP con factor transitorio, 3 meses; luego se reevalúa."),
      mg("trombolisis", "Trombólisis sistémica de entrada", "riesgoso", "Sin hipotensión no se indica de rutina: el riesgo de sangrado mayor (incluido intracraneal) supera el beneficio."),
      mg("aspirina", "Aspirina sola", "innecesario", "Es un antiagregante: no trata ni previene la trombosis venosa de forma adecuada."),
      mg("filtro", "Filtro de vena cava", "innecesario", "Solo si la anticoagulación está contraindicada."),
    ],
  },
  debrief: {
    diagnosis: "Tromboembolismo pulmonar de riesgo intermedio-alto secundario a trombosis venosa profunda poplítea izquierda, en mujer de 36 años fumadora con anticonceptivos combinados y viaje prolongado.",
    pathologies: [
      { name: "Tromboembolismo pulmonar", role: "principal", why: "Confirmado por angiotomografía." },
      { name: "Trombosis venosa profunda", role: "asociada", why: "Fuente del émbolo." },
      { name: "Trombofilia hereditaria", role: "asociada", why: "Posible por el antecedente familiar; se estudia después." },
      { name: "Neumonía", role: "diferencial", why: "Disnea, dolor pleurítico y febrícula." },
      { name: "Neumotórax y pericarditis", role: "diferencial", why: "Otras causas de dolor torácico pleurítico." },
    ],
    reasoning: [
      "Causa: la tríada de Virchow. Estasis (20 horas sentada), hipercoagulabilidad (estrógenos, tabaco, posible trombofilia) y, a veces, daño endotelial.",
      "Mecanismo: se forma un trombo en las venas profundas de la pierna, se desprende y viaja por la cava y el corazón derecho hasta obstruir arterias pulmonares.",
      "Consecuencia: zonas ventiladas pero no perfundidas (espacio muerto) y redistribución del flujo → hipoxemia e hiperventilación. La obstrucción aumenta la poscarga del ventrículo derecho, que se dilata (VD/VI > 1) y libera troponina y BNP. Si falla, hay hipotensión y shock. El infarto pulmonar periférico da dolor pleurítico y hemoptisis.",
      "La gravedad no depende del tamaño del trombo en la imagen sino del estado del ventrículo derecho y de la presión arterial.",
    ],
    epidemiology:
      "La enfermedad tromboembólica venosa es la tercera causa de enfermedad cardiovascular después del infarto y el ACV. La incidencia aumenta con la edad; en mujeres jóvenes los factores de riesgo más frecuentes son los anticonceptivos con estrógenos, el embarazo y el puerperio, y se potencian con el tabaco, la obesidad, la inmovilidad y las trombofilias. Es un diagnóstico que se pierde con frecuencia por su clínica inespecífica.",
    management: [
      "Estimar la probabilidad clínica (Wells o Ginebra): baja o intermedia → dímero D; alta → angiotomografía directa.",
      "Estratificar el riesgo: hipotensión (alto riesgo), luego índice PESI, función del VD y troponina.",
      "Anticoagular desde la sospecha alta si no hay contraindicación; trombólisis solo en TEP de alto riesgo (con hipotensión) o en descompensación.",
      "Anticoagulación oral por al menos 3 meses; más tiempo si no hay causa transitoria.",
      "Suspender estrógenos, cesación tabáquica y prevención en futuras situaciones de riesgo (viajes, cirugías, embarazo).",
    ],
    sources: [
      "Sociedad Argentina de Cardiología — Consenso de enfermedad tromboembólica venosa y tromboembolismo pulmonar.",
      "Grupo Cooperativo Argentino de Hemostasia y Trombosis (CAHT) — Guías de tratamiento antitrombótico.",
    ],
    pearls: [
      "Taquicardia + hipoxemia con pulmón casi limpio: pensá en TEP.",
      "Dímero D solo para descartar con probabilidad baja o intermedia.",
      "La gravedad la define la presión arterial y el ventrículo derecho.",
    ],
    pitfalls: ["Etiquetar como ansiedad a una paciente hipoxémica.", "Pedir dímero D con probabilidad alta.", "Trombolizar un TEP sin hipotensión."],
  },
};
