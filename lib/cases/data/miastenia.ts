import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const miastenia: ClinicalCase = {
  id: "miastenia-gravis-crisis",
  level: 3,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 31, ageUnit: "años", sex: "F", context: "Hace meses tiene párpados caídos a la tarde y visión doble. Le dieron ciprofloxacina por una infección urinaria hace 3 días." },
  frequency: "raro",
  intro: "“Desde ayer me cuesta tragar, se me sale el agua por la nariz, hablo con voz gangosa y ahora me falta el aire. Los párpados se me caen.”",
  vitals: { TA: "126/80 mmHg", FC: "108 lpm", FR: "28 rpm", "T°": "36,8 °C", "SatO₂": "93 %" },
  anamnesis: [
    act("fatigabilidad", "¿Los síntomas empeoran a la tarde o con el esfuerzo y mejoran con el descanso?", "clave", "“Sí, a la mañana estoy mejor.”", "Debilidad fatigable: característica de la miastenia."),
    act("farmacos", "¿Qué remedios empezaste?", "clave", "“Ciprofloxacina hace 3 días.”", "Quinolonas, aminoglucósidos, magnesio y betabloqueantes pueden desencadenar una crisis miasténica."),
    act("respiratorio", "¿Te cuesta respirar acostada o toser?", "clave", "“Sí, tengo tos débil y me ahogo acostada.”", "Compromiso respiratorio: crisis miasténica."),
    act("diplopia", "¿Ves doble?", "util", "“Desde hace meses, a la tarde.”", "Síntomas oculares previos."),
    act("sensibilidad", "¿Tenés hormigueos o pérdida de sensibilidad?", "util", "“No.”", "La miastenia no afecta la sensibilidad."),
    act("trabajo", "¿De qué trabajás?", "neutro", "“Soy profesora de música.”", "No orienta."),
  ],
  exam: [
    act("ojos", "Párpados y motilidad ocular, con mirada sostenida hacia arriba", "clave", "Ptosis bilateral asimétrica que empeora con la mirada sostenida; diplopía.", "Fatigabilidad ocular."),
    act("bulbar", "Habla, deglución y cuello", "clave", "Voz nasal, debilidad para flexionar el cuello.", "Compromiso bulbar y axial: riesgo respiratorio."),
    act("reflejos", "Reflejos y sensibilidad", "util", "Normales.", "Descarta Guillain-Barré y lesiones medulares."),
  ],
  studies: [
    study("Otros", "cvf", "Capacidad vital forzada y presión inspiratoria máxima seriadas", "clave", "CVF 14 ml/kg.", "Menos de 15–20 ml/kg indica riesgo de intubación; la saturación cae tarde."),
    study("Laboratorio", "achr", "Anticuerpos antirreceptor de acetilcolina", "clave", "Positivos.", "Confirman miastenia gravis."),
    study("Imágenes", "tc-torax", "Tomografía de tórax (buscar timoma)", "util", "Hiperplasia tímica.", "El timo se asocia a la miastenia."),
    study("Otros", "emg", "Estimulación repetitiva (EMG)", "util", "Respuesta decremental.", "Apoya el diagnóstico."),
    study("Otros", "esperar-sat", "Decidir la intubación solo por la saturación", "riesgoso", "No se realizó.", "En enfermedades neuromusculares la saturación cae tarde; se guía por la CVF y la clínica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("crisis", "Crisis miasténica (miastenia gravis generalizada) desencadenada por ciprofloxacina", true, "Debilidad fatigable ocular, bulbar y respiratoria con anticuerpos antirreceptor de acetilcolina positivos, CVF baja, tras una quinolona."),
      dx("guillain", "Guillain-Barré", false, "Reflejos normales y debilidad fatigable ocular."),
      dx("botulismo", "Botulismo", false, "Daría pupilas midriáticas y arreflexia; los anticuerpos son positivos."),
      dx("acv", "ACV de tronco", false, "Sin signos de vía larga y con fatigabilidad."),
      dx("colinergica", "Crisis colinérgica", false, "No recibe anticolinesterásicos en exceso; no hay miosis, sialorrea ni diarrea."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("uti", "Terapia intensiva con CVF seriada e intubación electiva si cae por debajo de 15–20 ml/kg", "clave", "Prevenir el paro respiratorio."),
      mg("ivig", "Inmunoglobulina EV o plasmaféresis", "clave", "Tratamiento de la crisis miasténica."),
      mg("suspender", "Suspender la ciprofloxacina y cambiar el antibiótico", "clave", "Desencadenante."),
      mg("inmunosupresion", "Corticoides e inmunosupresores después, y evaluar timectomía", "util", "Tratamiento a largo plazo."),
      mg("magnesio", "Sulfato de magnesio", "riesgoso", "Empeora la transmisión neuromuscular."),
      mg("sedacion", "Sedación para la ansiedad sin protección de la vía aérea", "riesgoso", "Puede precipitar la falla respiratoria."),
    ],
  },
  debrief: {
    diagnosis: "Crisis miasténica en miastenia gravis generalizada con anticuerpos antirreceptor de acetilcolina positivos e hiperplasia tímica, desencadenada por ciprofloxacina, en mujer de 31 años.",
    pathologies: [
      { name: "Miastenia gravis generalizada en crisis", role: "principal", why: "Debilidad respiratoria y bulbar." },
      { name: "Hiperplasia tímica", role: "asociada", why: "Se asocia a la miastenia." },
      { name: "Guillain-Barré, botulismo, crisis colinérgica", role: "diferencial", why: "Otras causas de debilidad aguda." },
    ],
    reasoning: [
      "Causa: anticuerpos contra el receptor de acetilcolina de la placa motora.",
      "Mecanismo: menos receptores funcionales: la transmisión falla con el uso repetido (fatigabilidad); ciertos fármacos empeoran la transmisión.",
      "Consecuencia: ptosis, diplopía, disfagia, disartria y debilidad respiratoria.",
    ],
    epidemiology:
      "La miastenia gravis es rara (alrededor de 15–20 casos cada 100.000), con dos picos: mujeres jóvenes de 20 a 40 años y varones mayores de 60. Hasta un 15–20 % presenta una crisis miasténica en algún momento.",
    management: [
      "Sospecharla ante debilidad fatigable ocular, bulbar o proximal.",
      "Evaluar función respiratoria con CVF.",
      "Crisis: terapia intensiva, inmunoglobulina o plasmaféresis.",
      "Largo plazo: piridostigmina, inmunosupresión, timectomía; evitar fármacos desencadenantes.",
    ],
    sources: ["Sociedad Neurológica Argentina — Guía de miastenia gravis.", "Consenso internacional de tratamiento de la miastenia gravis."],
    pearls: ["Debilidad que empeora con el uso.", "CVF, no saturación.", "Quinolonas y aminoglucósidos la empeoran."],
    pitfalls: ["Esperar la desaturación.", "Dar magnesio o sedantes."],
    tribunal: [
      qa("¿Qué es la prueba del hielo?", "Aplicar hielo sobre el párpado caído durante 2 minutos: si la ptosis mejora, sugiere miastenia, porque el frío mejora la transmisión neuromuscular."),
      qa("¿Qué fármacos pueden empeorar la miastenia?", "Aminoglucósidos, quinolonas, macrólidos, magnesio, betabloqueantes, bloqueantes neuromusculares, cloroquina e inhibidores de puntos de control inmunitario."),
      qa("¿Qué diferencia la crisis miasténica de la colinérgica?", "La miasténica es por enfermedad no controlada; la colinérgica, por exceso de anticolinesterásicos, con miosis, sialorrea, diarrea, bradicardia y fasciculaciones. En ambas puede haber debilidad respiratoria."),
    ],
  },
};
