import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const neumoniaAspirativa: ClinicalCase = {
  id: "neumonia-aspirativa-adulto-mayor",
  level: 2,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 83, ageUnit: "años", sex: "F", context: "Tuvo un ACV hace un año; vive en un geriátrico. Se atraganta con los líquidos." },
  frequency: "frecuente",
  intro: "“Desde ayer tiene fiebre, tos y respira rápido. Se atragantó con la sopa hace dos días.” (relata la cuidadora)",
  vitals: { TA: "122/70 mmHg", FC: "108 lpm", FR: "28 rpm", "T°": "38,5 °C", "SatO₂": "89 %" },
  anamnesis: [
    act("atragantamiento", "¿Tose o se ahoga al comer o tomar?", "clave", "“Siempre con los líquidos; hace dos días se ahogó con la sopa.”", "Disfagia orofaríngea tras ACV: principal factor de neumonía aspirativa."),
    act("dientes", "¿Cómo está su higiene bucal? ¿Usa prótesis?", "util", "“Tiene pocos dientes y la limpieza es difícil.”", "Mala higiene oral: flora con anaerobios."),
    act("posicion", "¿Cómo la alimentan? ¿Sentada?", "clave", "“Acostada, en la cama.”", "La posición aumenta el riesgo de aspiración."),
    act("atb", "¿Recibió antibióticos o estuvo internada en los últimos 3 meses?", "util", "“No.”", "Bajo riesgo de gérmenes resistentes."),
    act("directivas", "¿Tiene directivas anticipadas?", "util", "“La familia quiere todo el tratamiento.”", "Define el nivel de cuidado."),
    act("radio", "¿Le gusta la radio?", "neutro", "“Tangos.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Auscultación", "clave", "Rales crepitantes en base derecha.", "Foco en lóbulo inferior derecho (el más común en aspiración)."),
    act("deglucion", "Evaluación de la deglución con agua (por fonoaudiología)", "clave", "Tos y voz húmeda con líquidos finos.", "Disfagia confirmada."),
    act("conciencia", "Estado de conciencia", "util", "Somnolienta, despertable.", "Riesgo de nuevas aspiraciones."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Infiltrado en el lóbulo inferior derecho.", "Neumonía en territorio declive."),
    study("Laboratorio", "lab", "Hemograma, urea, PCR, gases", "clave", "Leucocitos 15.000, urea 54.", "CURB-65 de 3: internación."),
    study("Microbiología", "hemocultivos", "Hemocultivos", "util", "Pendientes.", "En internados."),
    study("Otros", "broncoscopia", "Broncoscopía de rutina", "innecesario", "No se realizó.", "Solo si se sospecha cuerpo extraño u otra causa."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("aspirativa", "Neumonía aspirativa del lóbulo inferior derecho en adulta mayor con disfagia post-ACV", true, "Atragantamiento con líquidos, fiebre, taquipnea, hipoxemia e infiltrado en base derecha, con disfagia confirmada."),
      dx("neumonitis", "Neumonitis química pura (síndrome de Mendelson)", false, "Esa aparece en horas tras aspirar contenido gástrico, sin fiebre de días."),
      dx("ic", "Insuficiencia cardíaca", false, "Infiltrado unilateral con fiebre."),
      dx("tbc", "Tuberculosis", false, "Cuadro agudo tras aspiración."),
      dx("absceso", "Absceso pulmonar", false, "No hay cavidad con nivel hidroaéreo; puede ser una complicación."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Internación con ampicilina-sulbactam (o amoxicilina-clavulánico EV)", "clave", "Cubre la flora oral y respiratoria habitual."),
      mg("deglucion", "Suspender la vía oral hasta evaluar la deglución; luego espesantes y alimentación sentada a 90°", "clave", "Previene nuevas aspiraciones."),
      mg("o2", "Oxígeno y kinesiología respiratoria", "clave", "Hipoxemia."),
      mg("higiene", "Higiene oral diaria", "util", "Reduce la neumonía aspirativa en geriátricos."),
      mg("sonda-todos", "Sonda nasogástrica permanente a todos los que se atragantan", "innecesario", "No elimina el riesgo de aspiración de saliva y debe decidirse con la familia."),
      mg("seguir-sopa", "Seguir dándole sopa acostada", "riesgoso", "Repite la aspiración."),
    ],
  },
  debrief: {
    diagnosis: "Neumonía aspirativa del lóbulo inferior derecho con hipoxemia (CURB-65 de 3), en mujer de 83 años institucionalizada con disfagia orofaríngea por ACV previo.",
    pathologies: [
      { name: "Neumonía aspirativa", role: "principal", why: "Infección tras aspirar contenido orofaríngeo." },
      { name: "Disfagia post-ACV", role: "asociada", why: "Causa." },
      { name: "Neumonitis química, absceso, IC", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: disfagia por ACV, mala higiene oral y alimentación acostada.",
      "Mecanismo: el contenido orofaríngeo con bacterias pasa a la vía aérea y, por gravedad, al lóbulo inferior derecho.",
      "Consecuencia: neumonía, a veces absceso o empiema; alta mortalidad en adultos mayores.",
    ],
    epidemiology:
      "La neumonía aspirativa es una causa principal de neumonía en adultos mayores institucionalizados y en personas con ACV, demencia o Parkinson. Es una de las primeras causas de muerte en geriátricos.",
    management: [
      "Antibiótico que cubra flora oral.",
      "Evaluación de la deglución y adaptación de la dieta.",
      "Posición sentada al comer y después.",
      "Higiene oral y revisión de sedantes.",
    ],
    sources: ["Sociedad Argentina de Infectología — Recomendaciones de neumonía en adultos mayores.", "Sociedad Argentina de Gerontología y Geriatría — Recomendaciones sobre disfagia."],
    pearls: ["Atragantamiento + neumonía basal derecha = aspirativa.", "Comer sentado a 90°.", "Evaluar la deglución."],
    pitfalls: ["Seguir alimentando igual.", "Olvidar la higiene oral."],
    tribunal: [
      qa("¿Qué diferencia la neumonitis química de la neumonía aspirativa?", "La neumonitis química (Mendelson) es una lesión pulmonar por ácido gástrico que aparece en horas tras una aspiración presenciada; la neumonía aspirativa es una infección por flora orofaríngea, de evolución más lenta."),
      qa("¿Qué es la disfagia orofaríngea?", "La dificultad para pasar el bolo de la boca al esófago, con tos, atragantamiento, voz húmeda o regurgitación nasal; frecuente tras ACV, en Parkinson y demencias."),
      qa("¿Por qué la aspiración suele afectar el lóbulo inferior derecho?", "Porque el bronquio fuente derecho es más vertical y ancho; acostado, también se afectan los segmentos posteriores de los lóbulos superiores."),
    ],
  },
};
