import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const endocarditisProtesisValvular: ClinicalCase = {
  id: "endocarditis-protesis-valvular",
  level: 4,
  area: "Cardiovascular",
  setting: "Internación",
  patient: { age: 74, ageUnit: "años", sex: "F", context: "Prótesis mecánica mitral hace 8 meses. Anticoagulada con acenocumarol. Hace un mes le hicieron un tratamiento de conducto sin profilaxis." },
  frequency: "raro",
  intro: "“Hace tres semanas tengo fiebre que va y viene, estoy muy cansada y hoy se me durmió un rato el brazo izquierdo.”",
  vitals: { TA: "118/68 mmHg", FC: "104 lpm", FR: "20 rpm", "T°": "38,4 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("fiebre", "¿Cuánto hace que tiene fiebre?", "clave", "“Tres semanas, con escalofríos.”", "Fiebre prolongada."),
    act("dientes", "¿Procedimientos dentales recientes?", "clave", "“Un conducto hace un mes, sin antibiótico.”", "Puerta de entrada."),
    act("neuro", "¿Cómo fue lo del brazo?", "clave", "“Se me durmió y aflojó 20 minutos.”", "Embolia cerebral."),
    act("atb-previo", "¿Recibió antibióticos?", "util", "“Amoxicilina tres días por la fiebre.”", "Puede negativizar cultivos."),
    act("disnea", "¿Falta de aire?", "util", "“Más que antes.”", "Disfunción protésica."),
    act("nietos", "¿Quién la acompaña?", "neutro", "“Mi nieta.”", "No orienta."),
  ],
  exam: [
    act("soplo", "Auscultación", "clave", "Clic protésico atenuado y soplo sistólico nuevo.", "Disfunción o fuga paravalvular."),
    act("piel", "Piel, uñas y conjuntivas", "clave", "Hemorragias en astilla y petequias conjuntivales.", "Fenómenos embólicos."),
    act("bazo", "Bazo", "util", "Polo palpable.", "Infección subaguda."),
  ],
  studies: [
    study("Microbiología", "hemocultivos", "Tres pares de hemocultivos antes del antibiótico", "clave", "Streptococcus del grupo viridans en 3/3.", "Criterio mayor."),
    study("Imágenes", "eco-te", "Ecocardiograma transesofágico", "clave", "Vegetación de 12 mm en la prótesis mitral con fuga paravalvular.", "Criterio mayor."),
    study("Imágenes", "rm-cerebro", "RM de cerebro", "util", "Pequeños infartos embólicos.", "Complicación."),
    study("Imágenes", "eco-tt-solo", "Descartar con ecocardiograma transtorácico normal", "riesgoso", "No se hizo.", "Baja sensibilidad en prótesis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ei-protesica", "Endocarditis infecciosa precoz sobre prótesis mitral mecánica por estreptococo viridans, con embolias cerebrales y fuga paravalvular", true, "Prótesis, fiebre prolongada, hemocultivos positivos, vegetación en el transesofágico y embolias."),
      dx("trombo-protesico", "Trombosis protésica", false, "Hemocultivos positivos y fiebre."),
      dx("fiebre-origen", "Fiebre de origen desconocido sin foco", false, "Hay foco documentado."),
      dx("acv-anticoagulacion", "ACV por anticoagulación insuficiente", false, "Infección documentada."),
      dx("pielonefritis", "Pielonefritis", false, "Sin síntomas urinarios y vegetación."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Penicilina o ceftriaxona con gentamicina por 6 semanas", "clave", "Endocarditis protésica estreptocócica."),
      mg("equipo", "Equipo de endocarditis con cirugía cardíaca", "clave", "Fuga paravalvular y embolias: indicación quirúrgica."),
      mg("anticoagulacion", "Mantener anticoagulación con heparina, ajustada por neurología", "clave", "Prótesis mecánica."),
      mg("odontologia", "Profilaxis antibiótica en futuros procedimientos dentales", "util", "Prevención."),
      mg("suspender-anticoagulacion", "Suspender toda anticoagulación por la embolia", "riesgoso", "Trombosis de la prótesis mecánica."),
      mg("tratamiento-corto", "Tratamiento corto de 2 semanas", "riesgoso", "Insuficiente en prótesis."),
    ],
  },
  debrief: {
    diagnosis: "Endocarditis infecciosa sobre prótesis mitral mecánica por estreptococo viridans, con embolias cerebrales y fuga paravalvular, en mujer de 74 años.",
    pathologies: [
      { name: "Endocarditis protésica", role: "principal", why: "Infección de una válvula artificial." },
      { name: "Embolias cerebrales y fuga paravalvular", role: "asociada", why: "Complicaciones." },
      { name: "Trombosis protésica", role: "diferencial", why: "Otra causa de disfunción y embolias." },
    ],
    reasoning: [
      "Causa: bacteriemia por estreptococos orales tras un procedimiento dental sin profilaxis.",
      "Mecanismo: colonización del anillo protésico con vegetación y absceso.",
      "Consecuencia: embolias, disfunción valvular e insuficiencia cardíaca.",
    ],
    epidemiology:
      "La endocarditis protésica tiene mayor mortalidad que la nativa y requiere cirugía con frecuencia. Los portadores de prótesis son el grupo de mayor riesgo en el que se mantiene la profilaxis dental. El ecocardiograma transesofágico es indispensable.",
    management: [
      "Hemocultivos.",
      "Transesofágico.",
      "Antibiótico prolongado.",
      "Cirugía si hay complicaciones.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de endocarditis infecciosa.", "ESC — Endocarditis Guidelines."],
    pearls: ["Prótesis con fiebre: hemocultivos.", "Transesofágico.", "Profilaxis dental."],
    pitfalls: ["Transtorácico normal.", "Antibiótico sin cultivos."],
    tribunal: [
      qa("¿Qué son los criterios de Duke?", "Criterios mayores (hemocultivos e imagen) y menores para diagnosticar endocarditis."),
      qa("¿Quiénes reciben profilaxis dental?", "Prótesis valvulares, endocarditis previa y ciertas cardiopatías congénitas."),
      qa("¿Cuándo se opera?", "Ante insuficiencia cardíaca, infección no controlada, absceso o embolias con vegetación grande."),
    ],
  },
};
