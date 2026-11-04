import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const icChagasica: ClinicalCase = {
  id: "insuficiencia-cardiaca-chagasica-descompensada",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 61, ageUnit: "años", sex: "M", context: "Chagásico con miocardiopatía dilatada. Dejó la medicación hace un mes por falta de dinero." },
  frequency: "frecuente",
  intro: "“Hace una semana me falta el aire con cualquier esfuerzo, se me hincharon las piernas y la panza, y duermo sentado.”",
  vitals: { TA: "98/64 mmHg", FC: "112 lpm (irregular)", FR: "26 rpm", "T°": "36,4 °C", "SatO₂": "90 %", Peso: "78 kg" },
  anamnesis: [
    act("medicacion", "¿Qué medicación tomás? ¿La dejaste?", "clave", "“Enalapril, carvedilol, espironolactona y furosemida; dejé todo hace un mes.”", "Abandono del tratamiento: causa frecuente de descompensación."),
    act("ortopnea", "¿Cuántas almohadas usás? ¿Te despertás ahogado?", "clave", "“Duermo sentado, me despierto ahogado.”", "Ortopnea y disnea paroxística nocturna: congestión."),
    act("palpitaciones", "¿Tuviste palpitaciones o desmayos?", "clave", "“Palpitaciones; casi me desmayo ayer.”", "Arritmias: frecuentes en la cardiopatía chagásica y causa de muerte súbita."),
    act("sal", "¿Comiste con más sal o tomaste mucha agua?", "util", "“Como lo que hay.”", "Factor de descompensación."),
    act("cobertura", "¿Tenés cobertura de salud? ¿Cómo conseguís los remedios?", "util", "“Sin obra social.”", "Barrera de acceso: se gestiona por el sistema público (Remediar)."),
    act("huerta", "¿Tenés huerta?", "neutro", "“Sí.”", "No orienta."),
  ],
  exam: [
    act("congestion", "Yugulares, rales, edemas, hepatomegalia", "clave", "Ingurgitación yugular, rales bibasales, hepatomegalia dolorosa, ascitis, edema hasta rodillas.", "Congestión biventricular."),
    act("perfusion", "Perfusión", "clave", "Extremidades tibias, relleno 3 s.", "Perfil caliente y húmedo, con perfusión limítrofe."),
    act("corazon", "Auscultación cardíaca", "util", "Galope por tercer ruido, soplo de insuficiencia mitral.", "Dilatación ventricular."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "Electrocardiograma", "clave", "Fibrilación auricular a 110, bloqueo de rama derecha y hemibloqueo anterior izquierdo, extrasístoles ventriculares.", "Patrón típico de cardiopatía chagásica."),
    study("Laboratorio", "lab", "BNP, ionograma, función renal, troponina, hepatograma", "clave", "BNP muy alto, Na 131, creatinina 1,5.", "Insuficiencia cardíaca con compromiso renal e hiponatremia."),
    study("Imágenes", "eco", "Ecocardiograma", "clave", "Ventrículo izquierdo dilatado, FEVI 25 %, aneurisma apical, trombo apical.", "Miocardiopatía chagásica con alto riesgo embólico."),
    study("Imágenes", "tc", "Tomografía de tórax de rutina", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ic", "Insuficiencia cardíaca descompensada con fracción reducida por miocardiopatía chagásica, desencadenada por abandono del tratamiento y FA, con trombo apical", true, "Congestión biventricular, FEVI de 25 %, aneurisma apical, bloqueo de rama derecha con hemibloqueo, FA y abandono de fármacos."),
      dx("isquemica", "Miocardiopatía isquémica", false, "Patrón de ECG y aneurisma apical típicos de Chagas, con serología positiva conocida."),
      dx("cirrosis", "Cirrosis con ascitis", false, "La ascitis es por congestión cardíaca, con yugulares ingurgitadas."),
      dx("nefrotico", "Síndrome nefrótico", false, "Hay ingurgitación yugular y FEVI baja."),
      dx("tep", "TEP", false, "La congestión y el eco explican el cuadro."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("diureticos", "Furosemida EV y restricción de sodio", "clave", "Descongestión."),
      mg("anticoagulacion", "Anticoagulación por FA y trombo apical", "clave", "Alto riesgo embólico."),
      mg("reiniciar", "Reiniciar en forma progresiva los fármacos que reducen la mortalidad (betabloqueante, IECA/ARNI, antagonista de aldosterona, iSGLT2) cuando esté estable", "clave", "Tratamiento de la IC con fracción reducida."),
      mg("acceso", "Gestionar el acceso gratuito a la medicación y educación", "util", "Evita nuevas internaciones."),
      mg("cdi", "Evaluar cardiodesfibrilador por el alto riesgo de muerte súbita", "util", "La muerte súbita es frecuente en Chagas."),
      mg("aine", "Ibuprofeno para el dolor del hígado", "riesgoso", "Empeora la insuficiencia cardíaca y renal."),
    ],
  },
  debrief: {
    diagnosis: "Insuficiencia cardíaca descompensada con fracción reducida (25 %) por miocardiopatía chagásica, con fibrilación auricular, aneurisma y trombo apical, desencadenada por abandono del tratamiento por barreras de acceso, en varón de 61 años.",
    pathologies: [
      { name: "Insuficiencia cardíaca chagásica descompensada", role: "principal", why: "Congestión con FEVI reducida." },
      { name: "FA y trombo apical", role: "asociada", why: "Riesgo embólico." },
      { name: "Cardiopatía isquémica, cirrosis, nefrótico", role: "diferencial", why: "Otras causas de edema." },
    ],
    reasoning: [
      "Causa: daño miocárdico crónico por Trypanosoma cruzi.",
      "Mecanismo: miocarditis crónica fibrosante que dilata el ventrículo, daña el sistema de conducción y forma aneurismas apicales.",
      "Consecuencia: insuficiencia cardíaca, arritmias, tromboembolias y muerte súbita.",
    ],
    epidemiology:
      "La miocardiopatía chagásica es una causa importante de insuficiencia cardíaca en Argentina, sobre todo en varones de 40 a 70 años nacidos en zonas endémicas del norte y en poblaciones migrantes. Tiene peor pronóstico que otras miocardiopatías.",
    management: [
      "Descongestión y tratamiento del desencadenante.",
      "Tratamiento de la IC con fracción reducida a dosis óptimas.",
      "Anticoagulación si hay FA, trombo o aneurisma con riesgo.",
      "Prevención de muerte súbita y acceso garantizado a la medicación.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de enfermedad de Chagas y de insuficiencia cardíaca.", "Programa Remediar — Ministerio de Salud de la Nación."],
    pearls: ["BRD + HBAI = pensar Chagas.", "Aneurisma apical con trombo = anticoagular.", "Preguntar por el acceso a la medicación."],
    pitfalls: ["No anticoagular.", "Dar AINE."],
    tribunal: [
      qa("¿Qué fármacos reducen la mortalidad en la insuficiencia cardíaca con fracción reducida?", "Betabloqueantes (carvedilol, bisoprolol, metoprolol), IECA o ARA II o sacubitril-valsartán, antagonistas de la aldosterona y los iSGLT2 (dapagliflozina, empagliflozina): los “cuatro pilares”."),
      qa("¿Cómo se clasifica la insuficiencia cardíaca según la NYHA?", "Clase I: sin síntomas con actividad habitual. II: síntomas con actividad habitual. III: síntomas con actividad menor a la habitual. IV: síntomas en reposo."),
      qa("¿Qué es el programa Remediar?", "Un programa del Ministerio de Salud de la Nación que distribuye medicamentos esenciales gratuitos a los centros de atención primaria para personas sin cobertura."),
    ],
  },
};
