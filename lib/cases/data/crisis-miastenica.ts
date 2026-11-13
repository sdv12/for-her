import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const crisisMiastenica: ClinicalCase = {
  id: "crisis-miastenica",
  level: 4,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 64, ageUnit: "años", sex: "M", context: "Miastenia gravis generalizada con timoma operado hace 2 años. Toma piridostigmina y azatioprina. Neumonía hace 3 días." },
  frequency: "raro",
  intro: "“No puedo tragar, se me cae la cabeza, hablo gangoso y me falta el aire acostado.”",
  vitals: { TA: "138/82 mmHg", FC: "108 lpm", FR: "28 rpm", "T°": "38,1 °C", "SatO₂": "92 %" },
  anamnesis: [
    act("debilidad", "¿Cómo progresó la debilidad?", "clave", "“En dos días, cada vez peor.”", "Crisis."),
    act("infeccion", "¿Qué le dieron para la neumonía?", "clave", "“Levofloxacina.”", "Fármaco que empeora la miastenia."),
    act("respirar", "¿Le cuesta respirar acostado o toser?", "clave", "“Mucho, la tos es débil.”", "Debilidad diafragmática."),
    act("piridostigmina", "¿Cuánta piridostigmina tomó?", "util", "“Tomé el doble por las dudas.”", "Crisis colinérgica posible."),
    act("secreciones", "¿Mucha saliva o diarrea, cólicos?", "util", "“No.”", "Orienta a crisis miasténica, no colinérgica."),
    act("nietos", "¿Quién lo cuida?", "neutro", "“Mi esposa.”", "No orienta."),
  ],
  exam: [
    act("bulbar", "Pares bulbares y cuello", "clave", "Voz nasal, disfagia, debilidad de flexores del cuello.", "Compromiso bulbar."),
    act("respiratorio-ex", "Conteo en una respiración y uso de músculos accesorios", "clave", "Cuenta hasta 10, respiración paradojal.", "Falla respiratoria inminente."),
    act("pupilas", "Pupilas y fasciculaciones", "util", "Normales, sin fasciculaciones.", "No es colinérgica."),
  ],
  studies: [
    study("Otros", "cvf", "Capacidad vital forzada y presión inspiratoria máxima seriadas", "clave", "CVF 14 ml/kg; PIM −22 cmH₂O.", "Criterios de intubación."),
    study("Laboratorio", "gases", "Gases arteriales", "clave", "PaCO₂ 48.", "Hipoventilación."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Consolidación basal derecha.", "Desencadenante."),
    study("Otros", "saturacion-sola", "Guiarse solo por la saturación", "riesgoso", "No se hizo.", "Cae tarde en la falla neuromuscular."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("crisis", "Crisis miasténica desencadenada por neumonía y quinolona", true, "Miastenia conocida, empeoramiento bulbar y respiratorio, CVF baja, infección y levofloxacina."),
      dx("colinergica", "Crisis colinérgica", false, "Sin miosis, secreciones ni fasciculaciones."),
      dx("guillain", "Guillain-Barré", false, "Miastenia conocida y predominio bulbar."),
      dx("acv-tronco", "ACV de tronco", false, "Bilateral simétrico y fatigable."),
      dx("botulismo", "Botulismo", false, "Miastenia conocida y pupilas normales."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("uti", "Terapia intensiva e intubación electiva si sigue cayendo la CVF", "clave", "CVF menor de 15 ml/kg."),
      mg("ivig", "Inmunoglobulina EV o plasmaféresis", "clave", "Tratamiento de la crisis."),
      mg("cambiar-atb", "Cambiar la quinolona por un betalactámico", "clave", "Las quinolonas empeoran la transmisión neuromuscular."),
      mg("pausar-piridostigmina", "Suspender transitoriamente la piridostigmina si se intuba", "util", "Reduce secreciones."),
      mg("aminoglucosidos", "Agregar gentamicina", "riesgoso", "Bloqueo neuromuscular."),
      mg("corticoides-altos", "Corticoides en dosis altas solos de entrada", "riesgoso", "Pueden empeorar transitoriamente al inicio."),
    ],
  },
  debrief: {
    diagnosis: "Crisis miasténica desencadenada por neumonía y levofloxacina, en varón de 64 años con miastenia y timoma operado.",
    pathologies: [
      { name: "Crisis miasténica", role: "principal", why: "Falla respiratoria por debilidad." },
      { name: "Neumonía y fármaco desencadenante", role: "asociada", why: "Precipitantes." },
      { name: "Crisis colinérgica, Guillain-Barré", role: "diferencial", why: "Otras causas de debilidad aguda." },
    ],
    reasoning: [
      "Causa: infección y fármaco que reducen la transmisión neuromuscular.",
      "Mecanismo: anticuerpos contra el receptor de acetilcolina con menor margen de seguridad.",
      "Consecuencia: debilidad bulbar y respiratoria con necesidad de ventilación.",
    ],
    epidemiology:
      "Hasta un 15 a 20 % de los pacientes con miastenia tiene una crisis, casi siempre desencadenada por infecciones o fármacos. La medición seriada de la CVF guía la intubación. Quinolonas, aminoglucósidos y magnesio están entre los fármacos a evitar.",
    management: [
      "CVF seriada.",
      "Vía aérea.",
      "Inmunoglobulina o plasmaféresis.",
      "Desencadenantes.",
    ],
    sources: ["Sociedad Neurológica Argentina — Miastenia gravis.", "International Consensus Guidance for Management of Myasthenia Gravis."],
    pearls: ["Regla 20/30/40.", "Saturación cae tarde.", "Quinolonas empeoran."],
    pitfalls: ["Esperar desaturación.", "Aminoglucósidos."],
    tribunal: [
      qa("¿Qué es la regla 20/30/40?", "CVF menor de 20 ml/kg, PIM menos negativa que −30 o PEM menor de 40 indican riesgo de falla."),
      qa("¿Qué relación tiene el timo?", "El timoma o la hiperplasia tímica se asocian a miastenia y la timectomía mejora el pronóstico."),
      qa("¿Cómo diferenciás la crisis colinérgica?", "La colinérgica tiene miosis, secreciones, cólicos, diarrea y fasciculaciones."),
    ],
  },
};
