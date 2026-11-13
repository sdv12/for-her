import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tbcDiabetico: ClinicalCase = {
  id: "tuberculosis-pulmonar-diabetico",
  level: 2,
  area: "Infectología",
  setting: "Consultorio",
  patient: { age: 57, ageUnit: "años", sex: "M", context: "Diabético tipo 2 mal controlado (HbA1c 11 %). Trabaja en un frigorífico. Vive con esposa y dos nietos." },
  frequency: "frecuente",
  intro: "“Hace dos meses tengo tos con flema, transpiro de noche y bajé ocho kilos. Pensé que era por el azúcar.”",
  vitals: { TA: "128/80 mmHg", FC: "92 lpm", FR: "20 rpm", "T°": "37,8 °C", "SatO₂": "95 %", Peso: "68 kg", Glucemia: "286 mg/dl" },
  anamnesis: [
    act("tos", "¿Cuánto hace que tose?", "clave", "“Dos meses, con flema, a veces con hilos de sangre.”", "Sintomático respiratorio."),
    act("sistemicos", "¿Fiebre, sudor nocturno, pérdida de peso?", "clave", "“Todo eso.”", "Impregnación."),
    act("contactos", "¿Contacto con alguien con tuberculosis?", "clave", "“Un compañero del frigorífico estuvo en tratamiento.”", "Exposición."),
    act("vih", "¿Te hiciste el test de VIH?", "util", "“Nunca.”", "Se ofrece siempre."),
    act("convivientes", "¿Quiénes viven con vos?", "util", "“Mi esposa y dos nietos de 3 y 6.”", "Contactos prioritarios."),
    act("trabajo", "¿Qué hacés en el frigorífico?", "neutro", "“Desposte.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Auscultación", "clave", "Rales y soplo anfórico en vértice derecho.", "Cavidad."),
    act("peso-ex", "Estado nutricional", "clave", "Adelgazado.", "Consunción."),
    act("ganglios", "Adenopatías", "util", "No palpables.", "Base."),
  ],
  studies: [
    study("Microbiología", "esputo", "Baciloscopia y GeneXpert en esputo", "clave", "Baciloscopia 2+; Xpert MTB detectado, sin resistencia a rifampicina.", "Confirma."),
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Cavidad en lóbulo superior derecho e infiltrados.", "Tuberculosis cavitada."),
    study("Laboratorio", "lab", "HbA1c, función renal, hepatograma, VIH", "util", "HbA1c 11 %; VIH negativo.", "Base para el tratamiento."),
    study("Imágenes", "tc", "TC de tórax para confirmar", "innecesario", "No se realizó.", "El diagnóstico es microbiológico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tbc", "Tuberculosis pulmonar cavitada bacilífera sensible, en diabético mal controlado", true, "Tos de más de 15 días, impregnación, cavidad apical y Xpert positivo sin resistencia."),
      dx("cancer", "Cáncer de pulmón", false, "Bacilos en el esputo."),
      dx("absceso", "Absceso pulmonar", false, "Microbiología confirma TBC."),
      dx("nac", "Neumonía bacteriana", false, "Evolución de meses."),
      dx("paracoccidioidomicosis", "Paracoccidioidomicosis", false, "Bacilos ácido-alcohol resistentes."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tratamiento", "Isoniacida, rifampicina, pirazinamida y etambutol, luego isoniacida y rifampicina", "clave", "Esquema estándar."),
      mg("glucemia", "Optimizar la diabetes, probablemente con insulina", "clave", "Mejora la respuesta y la rifampicina interfiere con orales."),
      mg("contactos", "Estudio de contactos y tratamiento preventivo de los nietos", "clave", "Niños menores de 5 tienen alto riesgo."),
      mg("notificar", "Notificar y tratamiento directamente observado", "util", "Adherencia."),
      mg("dos-drogas", "Tratar con dos fármacos para reducir efectos adversos", "riesgoso", "Genera resistencia."),
      mg("aislamiento-indefinido", "Aislamiento estricto por meses sin tratar", "riesgoso", "El tratamiento es lo que corta el contagio."),
    ],
  },
  debrief: {
    diagnosis: "Tuberculosis pulmonar cavitada bacilífera sensible, en varón diabético de 57 años mal controlado.",
    pathologies: [
      { name: "Tuberculosis pulmonar", role: "principal", why: "Infección por Mycobacterium tuberculosis." },
      { name: "Diabetes mal controlada", role: "asociada", why: "Triplica el riesgo de TBC." },
      { name: "Cáncer, absceso", role: "diferencial", why: "Otras cavidades." },
    ],
    reasoning: [
      "Causa: exposición laboral y diabetes que debilita la inmunidad celular.",
      "Mecanismo: reactivación o infección con necrosis caseosa y cavitación.",
      "Consecuencia: tos, consunción y contagio a convivientes.",
    ],
    epidemiology:
      "La diabetes triplica el riesgo de tuberculosis y empeora la respuesta al tratamiento. En Argentina los casos de TBC aumentaron en los últimos años. Los menores de 5 años convivientes reciben tratamiento preventivo.",
    management: [
      "Esputo y Xpert.",
      "Esquema de cuatro fármacos.",
      "Glucemia.",
      "Contactos.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía práctica para el diagnóstico y tratamiento de la tuberculosis.", "OMS — Consolidated Guidelines on Tuberculosis."],
    pearls: ["Tos de más de 15 días: esputo.", "Diabetes y TBC van juntas.", "Contactos niños."],
    pitfalls: ["Atribuir el peso al azúcar.", "Menos fármacos."],
    tribunal: [
      qa("¿Qué interacción tiene la rifampicina?", "Induce enzimas hepáticas y baja niveles de sulfonilureas, anticonceptivos y anticoagulantes."),
      qa("¿Qué efecto adverso tiene el etambutol?", "Neuritis óptica con alteración de la visión de colores."),
      qa("¿Qué es el tratamiento preventivo?", "Isoniacida u otros esquemas a contactos con infección latente para evitar la enfermedad."),
    ],
  },
};
