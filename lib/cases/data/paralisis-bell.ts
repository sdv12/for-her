import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const paralisisBell: ClinicalCase = {
  id: "paralisis-facial-periferica-bell",
  level: 1,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 34, ageUnit: "años", sex: "F", context: "Sana. Tuvo un resfrío la semana pasada. No está embarazada." },
  frequency: "frecuente",
  intro: "“Me levanté con la cara torcida, no puedo cerrar el ojo derecho y se me cae el agua por la comisura. Tengo miedo de que sea un ACV.”",
  vitals: { TA: "118/74 mmHg", FC: "78 lpm", "T°": "36,6 °C", "SatO₂": "99 %", Glucemia: "92 mg/dl" },
  anamnesis: [
    act("instalacion", "¿Cuándo empezó y cómo progresó?", "clave", "“Anoche me dolía detrás de la oreja; hoy amanecí así.”", "Instalación en horas, con dolor retroauricular: típico."),
    act("otros-deficits", "¿Debilidad en brazo o pierna, dificultad para hablar, visión doble?", "clave", "“No, solo la cara.”", "Déficit aislado del VII par."),
    act("vesiculas", "¿Ampollas en el oído o la boca? ¿Picaduras de garrapata?", "clave", "“No.”", "Ramsay Hunt y Lyme cambian el manejo."),
    act("audicion", "¿Oís los ruidos más fuerte de ese lado? ¿Cambió el gusto?", "util", "“Los ruidos me molestan y la comida no tiene gusto.”", "Ubica la lesión en el trayecto del nervio."),
    act("diabetes", "¿Diabetes, hipertensión o embarazo?", "util", "“No.”", "Factores de riesgo."),
    act("trabajo", "¿A qué te dedicás?", "neutro", "“Soy recepcionista.”", "No orienta."),
  ],
  exam: [
    act("frente", "Pedir que arrugue la frente y cierre los ojos", "clave", "No arruga la frente derecha; cierre incompleto con signo de Bell.", "Compromete toda la hemicara: es periférica."),
    act("neuro", "Examen neurológico completo", "clave", "Fuerza, sensibilidad y otros pares normales.", "Descarta lesión central."),
    act("oido", "Otoscopía y boca", "clave", "Sin vesículas ni otitis.", "Excluye Ramsay Hunt y causas otológicas."),
  ],
  studies: [
    study("Laboratorio", "glucemia", "Glucemia", "util", "Normal.", "La diabetes es factor de riesgo."),
    study("Otros", "clinico", "Diagnóstico clínico con examen completo", "clave", "Compatible con parálisis periférica idiopática.", "No requiere estudios si el cuadro es típico."),
    study("Imágenes", "tc", "TC de cerebro de rutina", "innecesario", "No se realizó.", "Solo si hay signos atípicos o centrales."),
    study("Otros", "emg", "Electromiograma en la primera semana", "innecesario", "No se realizó.", "No aporta en los primeros días."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("bell", "Parálisis facial periférica idiopática (de Bell)", true, "Instalación aguda, toda la hemicara afectada, sin otros déficits ni vesículas."),
      dx("acv", "ACV", false, "Un ACV respeta la frente porque tiene inervación bilateral."),
      dx("ramsay", "Síndrome de Ramsay Hunt", false, "No tiene vesículas en el oído ni dolor intenso."),
      dx("tumor", "Tumor de parótida", false, "La instalación es aguda, sin masa."),
      dx("guillain", "Guillain-Barré", false, "No hay debilidad de miembros ni arreflexia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("corticoide", "Prednisona dentro de las primeras 72 horas", "clave", "Mejora la recuperación completa."),
      mg("ojo", "Protección ocular: lágrimas, gel y oclusión nocturna", "clave", "Previene úlceras de córnea."),
      mg("control", "Control en semanas y derivación si no mejora en 3 meses", "clave", "La mayoría se recupera."),
      mg("antiviral", "Antiviral solo asociado al corticoide en casos graves", "util", "Beneficio dudoso como único tratamiento."),
      mg("sin-ojo", "No indicar cuidado del ojo", "riesgoso", "Riesgo de queratitis por exposición."),
      mg("trombolisis", "Activar código ACV y trombolizar", "riesgoso", "No es un ACV y expone a sangrado."),
    ],
  },
  debrief: {
    diagnosis: "Parálisis facial periférica idiopática derecha (de Bell), en mujer de 34 años.",
    pathologies: [
      { name: "Parálisis de Bell", role: "principal", why: "Mononeuropatía aguda del VII par." },
      { name: "Riesgo de queratitis", role: "asociada", why: "Por cierre ocular incompleto." },
      { name: "ACV, Ramsay Hunt, tumor", role: "diferencial", why: "Otras causas de parálisis facial." },
    ],
    reasoning: [
      "Causa: probablemente reactivación viral, como herpes simple.",
      "Mecanismo: inflamación y edema del nervio dentro del canal facial.",
      "Consecuencia: debilidad de toda la hemicara, hiperacusia y pérdida del gusto.",
    ],
    epidemiology:
      "Es la causa más frecuente de parálisis facial aguda, con un pico entre los 15 y 45 años; el embarazo y la diabetes aumentan el riesgo. Alrededor del 70 % se recupera por completo, y la proporción es mayor con corticoides tempranos. Distinguirla de un ACV es la primera tarea en la guardia.",
    management: [
      "Examen completo: frente comprometida y sin otros déficits.",
      "Corticoides en 72 horas.",
      "Cuidado del ojo.",
      "Seguimiento.",
    ],
    sources: ["Sociedad Neurológica Argentina — Parálisis facial periférica.", "American Academy of Otolaryngology — Clinical Practice Guideline: Bell's Palsy."],
    pearls: ["La frente distingue central de periférica.", "Corticoides temprano.", "Siempre cuidar el ojo."],
    pitfalls: ["Confundir con ACV.", "No mirar el oído."],
    tribunal: [
      qa("¿Por qué el ACV respeta la frente?", "Porque la parte superior de la cara recibe inervación cortical de ambos hemisferios."),
      qa("¿Qué es el síndrome de Ramsay Hunt?", "Parálisis facial con vesículas en el pabellón o canal auditivo por reactivación del virus varicela zóster."),
      qa("¿Qué es el signo de Bell?", "El ojo se desvía hacia arriba al intentar cerrarlo, visible porque el párpado no cierra."),
    ],
  },
};
