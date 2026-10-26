import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const fibrilacionAuricular: ClinicalCase = {
  id: "fibrilacion-auricular",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 76, ageUnit: "años", sex: "M", context: "Hipertenso. Vive solo." },
  frequency: "frecuente",
  intro: "“Hace unos días que siento el corazón desbocado y me canso con nada. No sé bien cuándo empezó, capaz el fin de semana.”",
  vitals: { TA: "132/84 mmHg", FC: "138 lpm, irregular", FR: "20 rpm", "T°": "36,5 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("inicio", "¿Puede precisar cuándo empezó?", "clave", "“No sé, tres o cuatro días seguro.”", "Más de 48 h o inicio desconocido: no se puede cardiovertir sin anticoagulación previa de 3 semanas (o ecocardiograma transesofágico) por riesgo de embolia."),
    act("gravedad", "¿Tuvo dolor de pecho, desmayos o falta de aire en reposo?", "clave", "“No, solo cansancio y algo de falta de aire al caminar.”", "Su ausencia indica estabilidad hemodinámica: se puede manejar sin cardioversión eléctrica urgente."),
    act("chads", "¿Tiene diabetes, insuficiencia cardíaca o tuvo un ACV o una trombosis?", "clave", "“Solo la presión alta.”", "Define el CHA₂DS₂-VASc: edad ≥ 75 (2) + hipertensión (1) = 3. Indica anticoagulación."),
    act("sangrado", "¿Tuvo sangrados, úlceras o caídas frecuentes?", "clave", "“No.”", "Evalúa el riesgo de sangrado (HAS-BLED) antes de anticoagular; no contraindica, pero se corrigen factores."),
    act("desencadenantes", "¿Tomó alcohol, tuvo fiebre o infecciones? ¿Está nervioso?", "util", "“Tomé bastante en un cumpleaños el sábado.”", "El alcohol (“corazón de fin de semana”), las infecciones y el hipertiroidismo desencadenan FA."),
    act("medicacion", "¿Qué medicación toma?", "util", "“Losartán.”", "Importa para elegir el control de frecuencia y por interacciones con los anticoagulantes."),
    act("barrio", "¿En qué barrio vive?", "neutro", "“En Alberdi.”", "No orienta."),
  ],
  exam: [
    act("pulso", "Pulso y auscultación cardíaca", "clave", "Ritmo irregularmente irregular, con déficit de pulso (la FC auscultada supera la del pulso radial). Sin soplos.", "Típico de la fibrilación auricular: algunos latidos no llenan lo suficiente para generar pulso."),
    act("ic", "Signos de insuficiencia cardíaca", "clave", "Sin ingurgitación yugular, crepitantes bibasales escasos, sin edemas.", "Congestión leve; si fuera importante, cambia la elección del fármaco (evitar diltiazem en disfunción sistólica)."),
    act("tiroides", "Palpación tiroidea", "util", "Normal.", "El hipertiroidismo es una causa a descartar."),
    act("neuro", "Examen neurológico", "util", "Sin déficit.", "Descarta un evento embólico ya ocurrido."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "Electrocardiograma", "clave", "Fibrilación auricular con respuesta ventricular de 136 lpm, QRS angosto, sin isquemia aguda.", "Confirma el diagnóstico: ausencia de ondas P, línea de base fibrilatoria, RR irregulares."),
    study("Laboratorio", "lab", "Hemograma, ionograma, función renal, TSH y hepatograma", "clave", "Normales, K 4,1, creatinina 1,1 (clearance 58 ml/min), TSH normal.", "Busca desencadenantes y define la dosis del anticoagulante."),
    study("Imágenes", "eco", "Ecocardiograma transtorácico", "util", "Aurícula izquierda dilatada, fracción de eyección 55 %, sin valvulopatía significativa.", "Evalúa la función ventricular y si es FA valvular (estenosis mitral reumática o prótesis mecánica cambian el anticoagulante)."),
    study("Laboratorio", "troponina", "Troponina", "neutro", "Levemente elevada, estable.", "Puede elevarse por la taquicardia sin infarto; sin dolor ni cambios isquémicos no cambia la conducta."),
    study("Imágenes", "tc", "Tomografía de cerebro", "innecesario", "No se realizó.", "Sin síntomas neurológicos no está indicada."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("fa", "Fibrilación auricular de alta respuesta, de más de 48 h, hemodinámicamente estable, CHA₂DS₂-VASc 3", true, "Ritmo irregularmente irregular, ECG sin ondas P con RR irregulares, inicio hace días, sin inestabilidad."),
      dx("aleteo", "Aleteo auricular", false, "Ondas F “en serrucho” a 300 lpm, en general con respuesta regular (2:1, 150 lpm)."),
      dx("tsv", "Taquicardia supraventricular por reentrada", false, "Es regular, de inicio y fin bruscos."),
      dx("extrasistoles", "Extrasístoles auriculares frecuentes", false, "Hay ondas P y un ritmo de base sinusal."),
      dx("tv", "Taquicardia ventricular", false, "Tiene QRS ancho; acá es angosto."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("frecuencia", "Control de frecuencia con betabloqueante (o diltiazem), meta < 110 lpm en reposo", "clave", "En el paciente estable, controlar la frecuencia alivia los síntomas y evita la taquicardiomiopatía."),
      mg("anticoag", "Anticoagulación (anticoagulante oral directo o acenocumarol)", "clave", "Con CHA₂DS₂-VASc 3 en un varón, el beneficio en prevención de ACV supera el riesgo de sangrado."),
      mg("seguimiento", "Control con cardiología para decidir control de ritmo o frecuencia a largo plazo", "util", "Luego de 3 semanas de anticoagulación se puede plantear la cardioversión."),
      mg("cve", "Cardioversión eléctrica inmediata", "riesgoso", "Con más de 48 h o inicio desconocido y sin anticoagulación previa ni ecocardiograma transesofágico, el riesgo de embolia es alto. Solo es urgente si hay inestabilidad."),
      mg("aspirina", "Aspirina en lugar de anticoagulante", "innecesario", "No protege adecuadamente contra el ACV en la FA y sangra casi igual."),
      mg("amiodarona-sin", "Amiodarona endovenosa para revertir sin anticoagular", "riesgoso", "La reversión farmacológica también puede embolizar si la FA lleva más de 48 h."),
    ],
  },
  debrief: {
    diagnosis: "Fibrilación auricular de alta respuesta ventricular, de más de 48 h de evolución, estable, con CHA₂DS₂-VASc de 3, desencadenada por alcohol en un hipertenso de 76 años.",
    pathologies: [
      { name: "Fibrilación auricular", role: "principal", why: "Ritmo irregularmente irregular sin ondas P." },
      { name: "Hipertensión arterial", role: "asociada", why: "Dilata la aurícula: principal sustrato de la FA." },
      { name: "Aleteo auricular", role: "diferencial", why: "Ondas F en serrucho." },
      { name: "Hipertiroidismo", role: "diferencial", why: "Causa reversible a descartar." },
    ],
    reasoning: [
      "Causa: remodelado de la aurícula izquierda por edad e hipertensión; el alcohol actuó como disparador.",
      "Mecanismo: focos ectópicos (sobre todo en las venas pulmonares) y múltiples circuitos de reentrada generan una actividad auricular caótica a 350–600 lpm. El nódulo AV deja pasar parte de los impulsos en forma irregular.",
      "Consecuencia: se pierde la contracción auricular (hasta un 20–25 % del llenado ventricular en ancianos) y la taquicardia acorta la diástole → caída del gasto, cansancio y disnea. La sangre estancada en la orejuela izquierda forma trombos que pueden embolizar al cerebro.",
      "A las 48 h ya puede haber trombo: por eso no se revierte sin anticoagular primero.",
    ],
    epidemiology:
      "Es la arritmia sostenida más frecuente. Su prevalencia crece con la edad: menos del 1 % antes de los 50 y alrededor del 10 % después de los 80. Es algo más frecuente en varones, pero las mujeres con FA tienen más riesgo de ACV (por eso el sexo femenino suma en el CHA₂DS₂-VASc). Multiplica por 5 el riesgo de ACV y explica cerca de un 20–25 % de los ACV isquémicos.",
    management: [
      "Evaluar la estabilidad: inestable (hipotensión, angina, edema de pulmón, alteración de conciencia) → cardioversión eléctrica urgente.",
      "Estable: control de frecuencia (betabloqueante, diltiazem; digoxina o amiodarona en insuficiencia cardíaca).",
      "Anticoagular según CHA₂DS₂-VASc (≥ 2 en varones, ≥ 3 en mujeres; considerar con 1/2), evaluando el riesgo de sangrado.",
      "Menos de 48 h: se puede cardiovertir con heparina; más de 48 h o desconocido: 3 semanas de anticoagulación o ecocardiograma transesofágico antes, y 4 semanas después.",
      "Buscar causas (TSH, ecocardiograma, alcohol, apnea del sueño) y controlar los factores de riesgo.",
    ],
    sources: [
      "Sociedad Argentina de Cardiología — Consenso argentino de fibrilación auricular.",
      "Federación Argentina de Cardiología — Guía de manejo de la fibrilación auricular.",
    ],
    pearls: [
      "Irregularmente irregular sin ondas P = FA.",
      "Más de 48 h: anticoagular antes de revertir.",
      "CHA₂DS₂-VASc: insuficiencia cardíaca, HTA, edad ≥ 75 (2), diabetes, ACV previo (2), enfermedad vascular, edad 65–74, sexo femenino.",
    ],
    pitfalls: ["Cardiovertir una FA de inicio desconocido sin anticoagular.", "Usar aspirina como prevención del ACV.", "Olvidar buscar desencadenantes."],
  },
};
