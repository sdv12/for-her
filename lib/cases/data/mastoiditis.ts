import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const mastoiditis: ClinicalCase = {
  id: "otitis-complicada-mastoiditis",
  level: 3,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 2, ageUnit: "años", sex: "M", context: "Agosto. Tuvo otitis hace 10 días; la madre suspendió la amoxicilina a los 3 días porque mejoró." },
  frequency: "poco-frecuente",
  intro: "“Volvió la fiebre y tiene la oreja izquierda despegada, roja e hinchada atrás. Llora mucho si lo toco.” (relata la madre)",
  vitals: { FC: "150 lpm", FR: "30 rpm", "T°": "39,5 °C", "SatO₂": "98 %", Peso: "12 kg" },
  anamnesis: [
    act("tratamiento", "¿Cuántos días tomó el antibiótico?", "clave", "“Tres días, después lo dejamos porque estaba bien.”", "Tratamiento incompleto de la otitis: factor de complicación."),
    act("neuro", "¿Vómitos, somnolencia, dolor de cabeza, convulsiones?", "clave", "“Vomitó una vez, está decaído pero responde.”", "Buscar complicaciones intracraneales."),
    act("oido", "¿Le supura el oído?", "util", "“Le salió pus hace unos días.”", "Perforación previa."),
    act("vacunas", "¿Vacunas al día?", "util", "“Sí.”", "Neumococo conjugada."),
    act("facial", "¿Se le torció la cara?", "util", "“No.”", "Descarta parálisis facial."),
    act("dibujos", "¿Qué dibujos mira?", "neutro", "“Peppa.”", "No orienta."),
  ],
  exam: [
    act("retroauricular", "Región retroauricular", "clave", "Eritema, edema y dolor sobre la mastoides izquierda; pabellón desplazado hacia adelante y abajo.", "Signos clásicos de mastoiditis aguda."),
    act("otoscopia", "Otoscopía", "clave", "Membrana abombada con otorrea purulenta.", "Otitis media activa."),
    act("neuro-ex", "Examen neurológico y signos meníngeos", "clave", "Sin rigidez de nuca ni foco; pares craneales normales.", "Sin complicación intracraneal evidente."),
  ],
  studies: [
    study("Imágenes", "tc", "Tomografía de oídos y cerebro con contraste", "clave", "Ocupación de celdas mastoideas con erosión ósea y absceso subperióstico pequeño; sin trombosis de senos.", "Define complicaciones y la necesidad de cirugía."),
    study("Laboratorio", "lab", "Hemograma, PCR, hemocultivos", "util", "Leucocitosis y PCR alta.", "Inflamación."),
    study("Microbiología", "cultivo", "Cultivo de la otorrea", "util", "Neumococo.", "Ajusta el tratamiento."),
    study("Otros", "puncion", "Punción lumbar de rutina", "innecesario", "No se realizó.", "Solo si hay signos meníngeos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("mastoiditis", "Mastoiditis aguda con absceso subperióstico como complicación de otitis media aguda", true, "Otitis tratada en forma incompleta con eritema, edema y dolor retroauricular, pabellón desplazado y tomografía con erosión y absceso."),
      dx("adenitis", "Adenitis retroauricular", false, "No desplaza el pabellón ni hay ocupación mastoidea."),
      dx("externa", "Otitis externa con celulitis", false, "La membrana está abombada y la mastoides afectada."),
      dx("meningitis", "Meningitis", false, "Sin signos meníngeos."),
      dx("otitis-simple", "Otitis media no complicada", false, "Hay compromiso de la mastoides."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb-ev", "Internación con antibiótico endovenoso (ceftriaxona)", "clave", "Complicación supurativa."),
      mg("orl", "Interconsulta con otorrinolaringología para drenaje del absceso y miringotomía", "clave", "El absceso requiere drenaje."),
      mg("vigilancia", "Vigilancia neurológica estricta", "clave", "Riesgo de meningitis, absceso cerebral y trombosis de senos."),
      mg("educacion", "Explicar la importancia de completar el antibiótico", "util", "Prevención."),
      mg("oral", "Amoxicilina oral ambulatoria", "riesgoso", "Insuficiente para una mastoiditis con absceso."),
      mg("gotas", "Gotas óticas solas", "innecesario", "No tratan la mastoiditis."),
    ],
  },
  debrief: {
    diagnosis: "Mastoiditis aguda izquierda con absceso subperióstico, complicación de una otitis media aguda tratada en forma incompleta, en niño de 2 años.",
    pathologies: [
      { name: "Mastoiditis aguda", role: "principal", why: "Infección de las celdas mastoideas." },
      { name: "Absceso subperióstico", role: "asociada", why: "Complicación." },
      { name: "Adenitis, otitis externa, meningitis", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: otitis media neumocócica tratada en forma incompleta.",
      "Mecanismo: la infección pasa del oído medio a las celdas mastoideas, erosiona el hueso y forma pus bajo el periostio.",
      "Consecuencia: dolor, eritema y edema retroauricular con pabellón desplazado; riesgo de complicaciones intracraneales.",
    ],
    epidemiology:
      "La mastoiditis es la complicación más frecuente de la otitis media, más en menores de 4 años, aunque es poco frecuente desde el uso de antibióticos y la vacuna antineumocócica. La suspensión precoz del tratamiento es un factor habitual.",
    management: [
      "Sospechar ante signos retroauriculares en un niño con otitis.",
      "Tomografía para complicaciones.",
      "Antibiótico endovenoso y drenaje quirúrgico si hay absceso.",
      "Vigilar complicaciones intracraneales.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de otitis media aguda.", "Asociación Argentina de Otorrinolaringología y Fonoaudiología Pediátrica — Recomendaciones sobre complicaciones de la otitis."],
    pearls: ["Pabellón despegado + dolor retroauricular = mastoiditis.", "Completar el antibiótico.", "Tomografía y ORL."],
    pitfalls: ["Tratamiento oral.", "Confundirla con una adenitis."],
    tribunal: [
      qa("¿Qué complicaciones intracraneales tiene la otitis?", "Meningitis, absceso epidural, subdural o cerebral, trombosis del seno sigmoideo e hidrocefalia otítica."),
      qa("¿Qué es la otitis media con efusión?", "Líquido en el oído medio sin signos de infección aguda; es frecuente tras una otitis y suele resolverse en semanas; si persiste más de 3 meses con hipoacusia, se consideran tubos de ventilación."),
      qa("¿Qué es el síndrome de Gradenigo?", "Una petrositis (infección del vértice del peñasco) con otitis, dolor retroorbitario y parálisis del VI par."),
    ],
  },
};
