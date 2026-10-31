import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const isquemiaAgudaMiembro: ClinicalCase = {
  id: "isquemia-arterial-aguda",
  level: 3,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 77, ageUnit: "años", sex: "M", context: "Tiene fibrilación auricular; dejó el anticoagulante hace un mes porque le sangraban las encías." },
  frequency: "poco-frecuente",
  intro: "“Hace tres horas, mirando la tele, me agarró un dolor terrible en la pierna derecha, de golpe. La tengo fría, blanca y no la siento bien.”",
  vitals: { TA: "146/84 mmHg", FC: "108 lpm, irregular", FR: "18 rpm", "T°": "36,4 °C" },
  anamnesis: [
    act("inicio", "¿Cómo empezó el dolor?", "clave", "“De golpe, como un latigazo, en reposo.”", "El inicio súbito en reposo sugiere embolia (en la trombosis sobre una placa suele haber claudicación previa)."),
    act("anticoag", "¿Toma anticoagulantes?", "clave", "“Los dejé hace un mes.”", "Fibrilación auricular sin anticoagulación: fuente embólica."),
    act("claudicacion", "¿Antes le dolían las piernas al caminar?", "util", "“No, caminaba bien.”", "Sin enfermedad arterial previa conocida: apoya embolia."),
    act("tiempo", "¿Hace cuánto empezó?", "clave", "“Tres horas.”", "La viabilidad del miembro depende del tiempo: la revascularización debe hacerse en menos de 6 horas."),
    act("sensibilidad", "¿Puede mover los dedos? ¿Los siente?", "clave", "“Los muevo poco, y siento hormigueo.”", "El déficit sensitivo y motor indica isquemia que amenaza el miembro."),
    act("otras", "¿Tuvo dolor de panza, problemas para hablar o debilidad del brazo?", "util", "“No.”", "Busca otras embolias (mesentérica, cerebral)."),
    act("nietos", "¿Tiene nietos?", "neutro", "“Siete.”", "No orienta."),
  ],
  exam: [
    act("seis-p", "Examen del miembro: dolor, palidez, pulsos, parestesias, parálisis, temperatura", "clave", "Pierna derecha pálida y fría hasta la rodilla, relleno capilar ausente, hipoestesia en el pie y debilidad para mover los dedos.", "Las “6 P” de la isquemia aguda: dolor, palidez, ausencia de pulsos, parestesias, parálisis y frialdad (poiquilotermia)."),
    act("pulsos", "Pulsos de ambos miembros", "clave", "Derecho: femoral presente, poplíteo y distales ausentes. Izquierdo: todos presentes.", "Oclusión a nivel femoropoplíteo; pulsos contralaterales normales apoyan embolia."),
    act("cardio", "Auscultación cardíaca", "util", "Ritmo irregular, sin soplos.", "Fibrilación auricular."),
    act("pantorrilla", "Palpación de la pantorrilla", "util", "Blanda, sin rigidez.", "La rigidez muscular indicaría isquemia irreversible."),
  ],
  studies: [
    study("Imágenes", "doppler", "Ecodoppler arterial (o angiotomografía) si no demora el tratamiento", "util", "Oclusión de la arteria femoral superficial distal y poplítea, sin flujo distal.", "Localiza la oclusión; en un miembro amenazado no debe demorar la cirugía."),
    study("Laboratorio", "lab", "Hemograma, coagulograma, función renal, CPK, potasio", "clave", "CPK 1.200, potasio 4,6.", "Valora la rabdomiólisis y prepara la cirugía y la reperfusión."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Fibrilación auricular.", "Confirma la fuente embólica."),
    study("Imágenes", "demora", "Esperar 24 h de heparina para ver si mejora antes de decidir", "riesgoso", "No se realizó.", "Un miembro con déficit sensitivo y motor requiere revascularización urgente."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("embolia", "Isquemia arterial aguda del miembro inferior derecho por embolia femoropoplítea (fibrilación auricular sin anticoagulación), amenazada (Rutherford IIb)", true, "Dolor súbito en reposo, las 6 P con déficit sensitivo-motor, pulsos ausentes desde el poplíteo, FA sin anticoagulación."),
      dx("tvp", "Trombosis venosa profunda", false, "Daría pierna hinchada, caliente y roja con pulsos presentes."),
      dx("ciatica", "Ciatalgia", false, "Dolor irradiado sin frialdad, palidez ni pulsos ausentes."),
      dx("trombosis-arterial", "Trombosis sobre placa aterosclerótica", false, "Suele tener claudicación previa y circulación colateral, con inicio menos brusco."),
      dx("diseccion", "Disección aórtica con isquemia de miembro", false, "Daría dolor torácico o dorsal desgarrante."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("heparina", "Heparina no fraccionada endovenosa en bolo de inmediato", "clave", "Evita la progresión del trombo mientras se prepara la revascularización."),
      mg("cirugia", "Revascularización urgente: embolectomía con catéter de Fogarty", "clave", "Un miembro amenazado debe revascularizarse en horas."),
      mg("reperfusion", "Vigilar el síndrome de reperfusión y el compartimental (fasciotomía si hace falta)", "util", "Tras restablecer el flujo puede haber edema, hiperpotasemia, acidosis y mioglobinuria."),
      mg("anticoag-larga", "Anticoagulación crónica por la fibrilación auricular y abordar el sangrado de encías", "clave", "Previene nuevas embolias."),
      mg("calor", "Aplicar calor local y elevar la pierna", "riesgoso", "El calor aumenta la demanda metabólica y la elevación reduce aún más la perfusión."),
      mg("aspirina-sola", "Solo aspirina y control ambulatorio", "riesgoso", "Lleva a la pérdida del miembro."),
    ],
  },
  debrief: {
    diagnosis: "Isquemia arterial aguda del miembro inferior derecho por embolia femoropoplítea de origen cardíaco (fibrilación auricular sin anticoagulación), miembro amenazado.",
    pathologies: [
      { name: "Isquemia arterial aguda por embolia", role: "principal", why: "Oclusión brusca de la arteria femoral y poplítea." },
      { name: "Fibrilación auricular sin anticoagulación", role: "asociada", why: "Fuente del émbolo." },
      { name: "Trombosis arterial y TVP", role: "diferencial", why: "Otras causas de pierna dolorosa." },
    ],
    reasoning: [
      "Causa: un trombo formado en la aurícula izquierda por la fibrilación auricular se desprende y viaja hasta una bifurcación arterial (la femoral es la más frecuente).",
      "Mecanismo: la oclusión súbita sin circulación colateral deja al miembro sin flujo; los nervios y músculos toleran pocas horas de isquemia.",
      "Consecuencia: las 6 P; si no se revasculariza, necrosis muscular, rigidez, gangrena y amputación; al reperfundir, liberación de potasio, ácido y mioglobina.",
    ],
    epidemiology:
      "La isquemia aguda de miembros es una urgencia vascular relativamente frecuente en adultos mayores, sobre todo con fibrilación auricular o aterosclerosis. Tiene alta morbimortalidad (amputación en hasta un cuarto de los casos y mortalidad del 10–15 %).",
    management: [
      "Reconocer las 6 P y clasificar la gravedad (Rutherford).",
      "Heparina endovenosa de inmediato.",
      "Revascularización urgente (embolectomía, trombólisis dirigida o cirugía) en miembro amenazado; amputación si es irreversible.",
      "Manejo del síndrome de reperfusión y anticoagulación crónica.",
    ],
    sources: ["Colegio Argentino de Cirujanos Cardiovasculares — Recomendaciones sobre isquemia aguda de miembros.", "Sociedad Argentina de Cardiología — Consenso de fibrilación auricular (prevención embólica)."],
    pearls: ["6 P: dolor, palidez, pulsos ausentes, parestesias, parálisis, frialdad.", "Déficit sensitivo-motor = miembro amenazado: horas.", "FA sin anticoagular: fuente embólica."],
    pitfalls: ["Confundirla con una TVP.", "Demorar la revascularización."],
    tribunal: [
      qa("¿Qué diferencia una embolia de una trombosis arterial aguda?", "Embolia: inicio súbito, fuente embólica (FA, infarto reciente), sin claudicación previa, pulsos contralaterales normales. Trombosis: sobre una placa, con claudicación previa, circulación colateral y enfermedad arterial bilateral."),
      qa("¿Qué es la clasificación de Rutherford de la isquemia aguda?", "I viable (sin déficit), IIa marginalmente amenazado (déficit sensitivo mínimo), IIb inmediatamente amenazado (déficit sensitivo y motor leve a moderado: revascularizar ya), III irreversible (parálisis, anestesia, rigidez: amputación)."),
      qa("¿Qué es el síndrome de reperfusión?", "Al restablecer el flujo se liberan potasio, ácido láctico y mioglobina (hiperpotasemia, acidosis, insuficiencia renal) y el edema muscular puede causar síndrome compartimental."),
    ],
  },
};
