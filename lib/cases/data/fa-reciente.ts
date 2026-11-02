import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const faReciente: ClinicalCase = {
  id: "fibrilacion-auricular-reciente",
  level: 2,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 58, ageUnit: "años", sex: "F", context: "Hipertensa con enalapril. Sin otros antecedentes." },
  frequency: "frecuente",
  intro: "“Hace unas cinco horas, mirando la tele, empecé con palpitaciones desordenadas. Nunca me pasó. Me siento rara pero bien.”",
  vitals: { TA: "136/84 mmHg", FC: "138 lpm (irregular)", FR: "18 rpm", "T°": "36,5 °C", "SatO₂": "97 %" },
  anamnesis: [
    act("inicio", "¿A qué hora empezaron exactamente?", "clave", "“A las 3 de la tarde, ahora son las 8.”", "Menos de 48 h de evolución: permite plantear cardioversión sin anticoagulación previa prolongada (con bajo riesgo)."),
    act("estabilidad", "¿Te duele el pecho, te falta el aire o te desmayaste?", "clave", "“No.”", "Estable: no requiere cardioversión eléctrica urgente."),
    act("riesgo-acv", "¿Tenés diabetes, tuviste ACV, insuficiencia cardíaca o enfermedad vascular?", "clave", "“Solo la presión.”", "CHA₂DS₂-VASc: hipertensión (1) + sexo femenino (1) = 2."),
    act("desencadenantes", "¿Tomaste alcohol, café, tenés problemas de tiroides o roncás de noche?", "util", "“Ronco mucho y me duermo de día.”", "La apnea del sueño es un factor de riesgo de FA."),
    act("sangrado", "¿Tuviste sangrados o úlceras?", "util", "“No.”", "Riesgo de sangrado antes de anticoagular."),
    act("serie", "¿Qué estabas mirando?", "neutro", "“Una serie española.”", "No orienta."),
  ],
  exam: [
    act("pulso", "Pulso y auscultación", "clave", "Pulso irregularmente irregular, déficit de pulso, sin soplos.", "Compatible con FA."),
    act("congestion", "Signos de insuficiencia cardíaca", "clave", "Sin rales ni edemas.", "Estable."),
    act("tiroides", "Tiroides", "util", "Normal.", "Descarta bocio."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "Electrocardiograma", "clave", "Ritmo irregular sin ondas P, ondulaciones f, QRS angosto a 138 lpm.", "Confirma fibrilación auricular."),
    study("Laboratorio", "lab", "Ionograma, TSH, función renal, hemograma", "clave", "Normales.", "Descarta desencadenantes y define dosis de anticoagulantes."),
    study("Imágenes", "eco", "Ecocardiograma", "util", "Fracción de eyección normal, aurícula izquierda levemente dilatada.", "Evalúa cardiopatía estructural."),
    study("Laboratorio", "troponina", "Troponina seriada de rutina", "innecesario", "No se realizó.", "Sin dolor ni isquemia, no está indicada de rutina."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("fa", "Fibrilación auricular de reciente comienzo (menos de 48 h), primer episodio, estable, CHA₂DS₂-VASc 2", true, "Palpitaciones irregulares de 5 horas, ECG sin P con ritmo irregular, hemodinámicamente estable, hipertensa."),
      dx("aleteo", "Aleteo auricular", false, "Tendría ondas F regulares en serrucho."),
      dx("tsv", "Taquicardia supraventricular por reentrada", false, "Es regular."),
      dx("extrasistoles", "Extrasístoles frecuentes", false, "No hay ritmo sinusal de base."),
      dx("permanente", "FA permanente", false, "Es el primer episodio de pocas horas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("frecuencia", "Control de la frecuencia (betabloqueante o diltiazem)", "clave", "Alivia los síntomas en cualquier caso."),
      mg("cardioversion", "Cardioversión eléctrica o farmacológica (amiodarona o flecainida si no hay cardiopatía estructural) por ser de menos de 48 h", "clave", "Restaurar el ritmo en una FA reciente sintomática es razonable; muchas revierten solas."),
      mg("anticoagulacion", "Anticoagulación (heparina en la cardioversión y anticoagulante oral a largo plazo por CHA₂DS₂-VASc 2 en mujer)", "clave", "Indicada en mujeres con 3 o más y considerada con 2; se anticoagula al menos 4 semanas tras cardiovertir."),
      mg("apnea", "Estudiar la apnea del sueño y controlar la presión", "util", "Disminuye recurrencias."),
      mg("digoxina", "Digoxina como primera opción", "innecesario", "Se reserva para insuficiencia cardíaca o fracasos."),
      mg("cardioversion-sin", "Cardiovertir sin anticoagulación ni evaluar el tiempo de evolución", "riesgoso", "Si llevara más de 48 h, riesgo de embolia."),
    ],
  },
  debrief: {
    diagnosis: "Fibrilación auricular de reciente comienzo (menos de 48 h), primer episodio, hemodinámicamente estable, con CHA₂DS₂-VASc de 2, en mujer hipertensa de 58 años con probable apnea del sueño.",
    pathologies: [
      { name: "Fibrilación auricular de reciente comienzo", role: "principal", why: "Primer episodio de menos de 48 h." },
      { name: "Hipertensión y apnea del sueño", role: "asociada", why: "Sustrato y desencadenantes." },
      { name: "Aleteo, TSV, extrasístoles", role: "diferencial", why: "Otras arritmias con palpitaciones." },
    ],
    reasoning: [
      "Causa: remodelado auricular por hipertensión, edad y apnea del sueño.",
      "Mecanismo: focos ectópicos (venas pulmonares) y múltiples circuitos de reentrada en una aurícula dilatada; el nodo AV conduce en forma irregular.",
      "Consecuencia: palpitaciones, menor gasto cardíaco y estasis en la orejuela izquierda con riesgo de trombos y ACV; el riesgo embólico aumenta después de 48 h.",
    ],
    epidemiology:
      "La FA es la arritmia sostenida más frecuente y aumenta con la edad (más del 10 % en mayores de 80). Hipertensión, obesidad, apnea del sueño, alcohol, diabetes y cardiopatía son los principales factores. Multiplica por cinco el riesgo de ACV.",
    management: [
      "Evaluar estabilidad: si es inestable, cardioversión eléctrica.",
      "Control de frecuencia y decidir control de ritmo según tiempo de evolución y síntomas.",
      "Anticoagulación según CHA₂DS₂-VASc (y riesgo de sangrado con HAS-BLED).",
      "Tratar factores de riesgo (presión, peso, alcohol, apnea).",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de fibrilación auricular.", "Guías ESC de fibrilación auricular."],
    pearls: ["Menos de 48 h: se puede cardiovertir.", "Más de 48 h o desconocida: anticoagular 3 semanas o ETE.", "CHA₂DS₂-VASc define anticoagular."],
    pitfalls: ["Cardiovertir sin saber cuándo empezó.", "Olvidar la anticoagulación posterior."],
    tribunal: [
      qa("¿Cómo se clasifica la FA según la duración?", "Primer diagnóstico; paroxística (termina sola o con tratamiento en menos de 7 días); persistente (más de 7 días); persistente de larga duración (más de 1 año, con intención de control de ritmo); permanente (se acepta y no se intenta revertir)."),
      qa("¿Qué es el HAS-BLED?", "Un puntaje de riesgo de sangrado con anticoagulación: hipertensión, función renal o hepática alterada, ACV, sangrado previo, RIN lábil, edad mayor de 65, fármacos (antiagregantes, AINE) o alcohol; 3 o más indica alto riesgo y obliga a corregir factores, no a negar la anticoagulación."),
      qa("¿Qué diferencia hay entre control de frecuencia y de ritmo?", "Control de frecuencia: aceptar la FA y mantener la frecuencia cardíaca menor de 110 en reposo con betabloqueantes, antagonistas cálcicos o digoxina. Control de ritmo: restaurar y mantener el ritmo sinusal con cardioversión, antiarrítmicos o ablación. En ambos se anticoagula según el riesgo."),
    ],
  },
};
