import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const empiemaPleural: ClinicalCase = {
  id: "empiema-pleural",
  level: 3,
  area: "Respiratorio",
  setting: "Internación",
  patient: { age: 47, ageUnit: "años", sex: "M", context: "Albañil. Toma alcohol a diario. Internado hace 5 días por neumonía derecha con ceftriaxona." },
  frequency: "frecuente",
  intro: "La enfermera avisa: “Sigue con fiebre al quinto día de antibiótico y ahora le duele el costado al respirar.”",
  vitals: { TA: "118/72 mmHg", FC: "112 lpm", FR: "24 rpm", "T°": "38,8 °C", "SatO₂": "92 %" },
  anamnesis: [
    act("evolucion", "¿Cómo evolucionó desde el ingreso?", "clave", "“No mejoró, la fiebre sigue igual.”", "Fracaso del tratamiento."),
    act("dolor", "¿Dónde duele y cómo?", "clave", "“Abajo a la derecha, como una puntada al respirar.”", "Dolor pleurítico."),
    act("dientes", "¿Problemas en los dientes o se atragantó tomando?", "clave", "“Tengo muchos dientes picados y a veces me ahogo cuando tomo.”", "Aspiración y anaerobios."),
    act("adherencia", "¿Recibió todas las dosis?", "util", "“Sí, por la vía.”", "Excluye falla de administración."),
    act("tos", "¿Expectoración?", "util", "“Algo, feo olor.”", "Anaerobios."),
    act("familia", "¿Quién lo visita?", "neutro", "“Mi hermano.”", "No orienta."),
  ],
  exam: [
    act("matidez", "Percusión y auscultación de la base derecha", "clave", "Matidez, vibraciones abolidas y murmullo abolido.", "Derrame."),
    act("boca", "Boca", "clave", "Múltiples caries y gingivitis.", "Foco de anaerobios."),
    act("sepsis", "Perfusión", "util", "Conservada.", "Sin shock."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía pleural", "clave", "Derrame moderado con tabiques.", "Derrame complicado."),
    study("Laboratorio", "toracocentesis", "Toracocentesis con pH, glucosa, LDH, Gram y cultivo", "clave", "Líquido turbio y espeso, pH 6,9, glucosa 30, LDH 2.400; Gram con cocos y bacilos.", "Empiema."),
    study("Microbiología", "hemocultivos", "Hemocultivos", "util", "Negativos.", "Germen."),
    study("Otros", "esperar", "Seguir igual 72 horas más sin drenar", "riesgoso", "No se realizó.", "Progresión y paquipleuritis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("empiema", "Empiema pleural derecho complicando una neumonía, con flora aspirativa", true, "Fiebre persistente, derrame tabicado, pH menor de 7,2 y Gram positivo."),
      dx("paraneumonico-simple", "Derrame paraneumónico no complicado", false, "pH bajo, glucosa baja y Gram positivo."),
      dx("tbc-pleural", "Tuberculosis pleural", false, "Líquido purulento con gérmenes comunes."),
      dx("absceso", "Absceso pulmonar sin compromiso pleural", false, "Hay colección pleural."),
      dx("resistencia", "Neumonía por germen resistente sin derrame", false, "Hay derrame complicado."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("drenaje", "Tubo de drenaje pleural", "clave", "Control del foco."),
      mg("atb", "Ampliar a ampicilina-sulbactam para cubrir anaerobios", "clave", "Flora aspirativa."),
      mg("cirugia", "Consultar a cirugía torácica por tabiques (VATS o fibrinolíticos)", "clave", "Tabicado."),
      mg("abstinencia", "Prevenir abstinencia alcohólica con tiamina", "util", "Comorbilidad."),
      mg("solo-atb", "Solo cambiar el antibiótico sin drenar", "riesgoso", "El pus no se esteriliza sin drenaje."),
      mg("alta", "Alta con antibiótico oral", "riesgoso", "Empiema activo."),
    ],
  },
  debrief: {
    diagnosis: "Empiema pleural derecho que complica una neumonía con flora aspirativa, en varón alcohólico de 47 años.",
    pathologies: [
      { name: "Empiema pleural", role: "principal", why: "Pus en el espacio pleural." },
      { name: "Neumonía aspirativa y alcoholismo", role: "asociada", why: "Origen y factor de riesgo." },
      { name: "Derrame simple, TBC pleural", role: "diferencial", why: "Otros derrames." },
    ],
    reasoning: [
      "Causa: neumonía por aspiración de flora oral en un paciente alcohólico.",
      "Mecanismo: el derrame paraneumónico se infecta y forma tabiques de fibrina.",
      "Consecuencia: fiebre persistente, sepsis y paquipleuritis.",
    ],
    epidemiology:
      "Fiebre que persiste más de 72 horas con antibiótico obliga a buscar derrame complicado. El alcoholismo, la mala dentición y la diabetes son factores frecuentes. El empiema sigue siendo una causa importante de internación prolongada.",
    management: [
      "Ecografía y toracocentesis.",
      "Drenaje.",
      "Antibiótico con anaerobios.",
      "Cirugía si está tabicado.",
    ],
    sources: ["Asociación Argentina de Medicina Respiratoria — Derrame pleural.", "BTS — Pleural Disease Guideline."],
    pearls: ["Neumonía que no mejora: buscá derrame.", "pH menor de 7,2: drenar.", "Pensá en anaerobios."],
    pitfalls: ["Solo cambiar antibiótico.", "No punzar."],
    tribunal: [
      qa("¿Qué criterios indican drenar un derrame paraneumónico?", "Pus, Gram o cultivo positivo, pH menor de 7,2 o glucosa menor de 60."),
      qa("¿Qué son los criterios de Light?", "Definen exudado: proteínas o LDH del líquido altas en relación al suero."),
      qa("¿Qué complicación tardía deja el empiema?", "Paquipleuritis con restricción pulmonar (fibrotórax)."),
    ],
  },
};
